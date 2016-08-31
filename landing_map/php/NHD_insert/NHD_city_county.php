<?php

include_once('../geoPHP/geoPHP.inc');
error_reporting(E_ALL);

function wkt_to_json($wkt) {
  $geom = geoPHP::load($wkt,'wkt');
  return $geom->out('json');
}
function json_to_wkt($json) {
  $geom = geoPHP::load($json,'json');
  return $geom->out('wkt');
}

//http://s-iihr32.iihr.uiowa.edu/dev/landing_map/NHD/script_conn.php?lat=41.21223805828677&lng=-92.96424865722656

ini_set('display_errors', 1);
set_time_limit(0);

ini_set('memory_limit', '1G');


$geom="null";
$dbconn = pg_pconnect("host=127.0.0.1 port=5432 dbname=IWDSS user=IWDSS password=iwdss1") or die('Connection failed');


function search_for_node($id, $hash) {
    $children = array($id);
    $visited = array();
    while (!empty($children)) {
        $node = array_pop($children);
        if (!in_array($node, $visited)) {
            $visited[] = $node;
            $children = array_merge($children, isset($hash[$node]) ? $hash[$node] : array());
            $children = array_unique($children);
        }
    }
    return $visited;
}


function trace_city_county($geom2,$data,$poi,$dbconn){
	
//echo json_encode($geom2);
parse_str($_SERVER['QUERY_STRING']);
 


/*

$geom_json = json_decode($geom2, true);
echo $geom_json;
*/
$wkt = json_to_wkt(json_encode($geom2));
//echo $wkt;



$final_res="";
//$dbconn = pg_pconnect("host=127.0.0.1 port=5432 dbname=Iowa_Watershed user=haowen password=haowen1") or die('Connection failed'); 


$interst_huc_array=array();
$query_intersect = "SELECT huc_12 FROM nhd_structure.huc_12 WHERE ST_Intersects(geom,ST_SetSRID(ST_GeomFromText('".$wkt."'),4326) ); ";
$res_intersect = pg_query($dbconn, $query_intersect);
while ($row = pg_fetch_row($res_intersect)) {
	    foreach ($row as $value) {	
			
			array_push($interst_huc_array,$value);
	}
}

	
	



$final_merge_huc=array();	
$final_merge_huc8=array();

 foreach ($interst_huc_array as $row){
	 //echo $row."  ";	 
	 
	 $add = search_for_node( $row, $data); // 13361758
	  foreach ($add as $each_res){
		  if (!in_array($each_res, $final_merge_huc)) {
         array_push($final_merge_huc,$each_res);		 
		  }
	  }
 }
 
 
 

$origin_huc10_exclude=array();
foreach ($interst_huc_array as $each_huc12_exc){
	if (!in_array($each_huc12_exc,$origin_huc10_exclude)){
	array_push($origin_huc10_exclude,substr($each_huc12_exc,0,10));		
	}  
}


$huc12_res=array();
$huc10_res=array();

foreach ($final_merge_huc as $comid) {	
    if (in_array(substr($comid,0,10),$origin_huc10_exclude)){
	//if($data_huc12[$comid][0]==$origin_huc10_exclude){	
	array_push($huc12_res,$comid);    
		
	}else{
		if (!in_array(substr($comid,0,10),$huc10_res)){
		array_push($huc10_res,substr($comid,0,10));  
		}
	}	
}


//echo implode(", ", $final_merge_huc) . "\n";
$huc_12_res_text="";
$huc12_pure_text="";
foreach ($huc12_res as $lines){
	$huc_12_res_text.="'".$lines."',";
	$huc12_pure_text.=$lines.",";
}
$huc_12_res_text=trim($huc_12_res_text, ",");

$huc10_res_text="";
$huc10_pure_text="";
foreach ($huc10_res as $lines){
	$huc10_res_text.="'".$lines."',";
	$huc10_pure_text.=$lines.",";
}
$huc10_res_text=trim($huc10_res_text, ",");
$query_join = "";	

if( strlen( $huc10_res_text )!=0){
$query_join = "SELECT ST_ASTEXT(ST_UNION(geom)) FROM (SELECT geom FROM nhd_structure.huc_12 where huc_12 in (".$huc_12_res_text.") UNION select geom from nhd_structure.huc_10 where huc_10 in (".$huc10_res_text.")) as t";
}else{
$query_join = "SELECT ST_AsText(ST_UNION(geom)) FROM nhd_structure.huc_12 WHERE huc_12 in (".$huc_12_res_text.")";	
}


$res2 = pg_query($dbconn, $query_join);

$ws_boundary;
while ($row = pg_fetch_row($res2)) {

  //echo "Age: $row[0]  QM: $row[1]";

      foreach ($row as $value) {
    		//echo $value."\n";
			//$ws_boundary =json_decode(wkt_to_json($value));
			//echo 
			$ws_boundary=$value;
	}
}
/*
$ws_boundary->huc->huc_10=$huc10_res_text;
$ws_boundary->huc->huc_12=$huc_12_res_text;*/
//echo json_encode($ws_boundary);


$insert_query="INSERT INTO nhd_structure.county_upstream(poi, geom,huc_10,huc_12,location_type) VALUES('".$poi."', ST_GeomFromText('".$ws_boundary."', 3395),'".$huc10_pure_text."','".$huc12_pure_text."','city')";
$res_insert = pg_query($dbconn, $insert_query);
while ($row = pg_fetch_row($res_insert)) {
	 
}
	
}
$hash_file = 'hash_huc12_conn.json';
$data = file_get_contents($hash_file);
$data = json_decode($data,true);
$hash_city_file = 'huc_data/IA_city.json';
//$hash_city_file = 'huc_data/IA_county_ws_gen.json';
$geom_data = file_get_contents($hash_city_file);
$geom_json = json_decode($geom_data, true);
//echo $geom_json["features"];

foreach ($geom_json["features"] as $geom_each){
	//echo json_encode($geom_each);
	//trace_city_county($geom_each,$data,$geom_each["properties"]["city_10"],$dbconn); 
}
echo "county done";





?>