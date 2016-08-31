<?php


class get_poi{
		public function get_huc_from_coord($lat,$lng,$output_option){
			/* Use spatial query to get comid (catchment) from the input coordinates*/
			$huc_query=Array(
			   'catchment'=>Array(
								'table'=>'nhd_structure.catchment_join',						
								'parameter'=>'featureid,huc_12',						
							),
			);
			
			if( isset($huc_query[$output_option]) ){
				$query_gethuc = "SELECT ".$huc_query[$output_option]['parameter']." FROM ".$huc_query[$output_option]['table']." WHERE ST_CONTAINS(geom,ST_SetSRID(ST_GeomFromText('POINT(".$lng." ".$lat.")'),4326) ); ";
				return self::select_query_db($_SESSION['dbconn'],$query_gethuc);
			}else{
				echo "option invalid";
			}

			//select_query_db($dbconn,$query_gethuc);
		/*end of query*/
		}

		/* Use spatial query to get comid (catchment) from the input coordinates*/
		/*
		function get_huc_boundary($huc){
			
			$huc_level=strlen($huc);
			$huc_level_query=Array(
			   '8'=>Array(
								'table'=>'nhd_structure.catchment_join',						
								'parameter'=>'featureid,huc_12',						
							),
			);
			
			if( isset($huc_query[$output_option]) ){
				$query_gethuc = "SELECT ".$huc_query[$output_option]['parameter']." FROM ".$huc_query[$output_option]['table']." WHERE ST_CONTAINS(geom,ST_SetSRID(ST_GeomFromText('POINT(".$lng." ".$lat.")'),4326) ); ";
				select_query_db($_SESSION['dbconn'],$query_gethuc);
			}else{
				echo "option invalid";
			}

			//select_query_db($dbconn,$query_gethuc);

		}
		*/ /*end of query*/

		public function select_query_db($dbconn,$query){
			$query_request = pg_query($dbconn,$query);
			$final_res=Array(); // this variable stores the comid of catchment, it will be used as input for the hash tavle search
			while ($row = pg_fetch_row($query_request)) {
					foreach ($row as $value) {
						//echo $value."<br>";
						array_push($final_res,$value);				
					}
				}
				return $final_res;
			}//end of query db method
}

class trace_watershed{
		
		static $raw_csv_conn = 'data/comid_conn.csv';
		static $comid_conn = 'data/comid_conn.json';
	
	
		function group_array($arr) {
			$hash = array();
			foreach ($arr as $row) {
				$key = $row[0];
				$val = $row[1];
				if (!isset($hash[$key])) {
					$hash[$key] = array();
				}
				if ($val != -1) {
					$hash[$key][] = $val;
				}
			}
			return $hash;
		}

		function search_for_node($id, $hash) {
			$children = array($id);
			$visited = array();
			while (!empty($children)) {
				$node = array_pop($children);
				if (!in_array($node, $visited)) {
					$visited[] = $node;
					$children = array_merge($children, $hash[$node]);
					$children = array_unique($children);
				}
			}
			return $visited;
		}



		function upstream_via_comid($poi_input){

			//$t01 = microtime(true);
			if (file_exists(self::$comid_conn)) {
				$data = file_get_contents(self::$comid_conn);				
				$data = json_decode($data, true);
			} else {
				$data = file_get_contents(self::$raw_csv_conn) or die("Data file not found...");
				$data = explode("\n", $data);
				$data = array_filter($data, 'trim');
				$data = array_map('trim', $data);
				$data = array_map(function ($row) {
					$row = explode(",", $row);
					return array($row[1], $row[0]);
				}, $data);
				$data = self::group_array($data);
				file_put_contents(self::$comid_conn, json_encode($data));
			}
			//$t02 = microtime(true);
			$upstream_comid = self::search_for_node($poi_input, $data); // 13361758
			//$t03 = microtime(true);
			var_dump($upstream_comid);
			return $upstream_comid;
		}
	
}

?>