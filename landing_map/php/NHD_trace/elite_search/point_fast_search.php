<?php

include_once('../geoPHP/geoPHP.inc');

/*import geoPHP for spatial format conversion*/
function wkt_to_json($wkt) {
  $geom = geoPHP::load($wkt,'wkt');
  return $geom->out('json');
}
/*end of import geoPHP for spatial format conversion*/

/*This link is used for testing, it has a fixed coordinates for query string*/


/*start of script configuration*/
error_reporting(E_ALL);
ini_set('display_errors', 1);
set_time_limit(0);
ini_set('memory_limit', '1G');
$dbconn = pg_pconnect("host=127.0.0.1 port=5432 dbname=Iowa_Watershed user=haowen password=haowen1") or die('Connection failed'); 
/*end of script configuration*/

/*start of search engine input*/
$lat=-1;  //latitude, default is -1
$lng=-1;  //Longitude, default is -1
$huc="null"; //this is for HUC number input, default is null
/*if lat and long remaines -1, them the script should use HUC connectivity to trace, if they are not -1, it means the input is not HUC number, but a spatial point on the map*/
/*in this script, we only focus on comid search, which uses coordinates instead of HUC number*/

parse_str($_SERVER['QUERY_STRING']);  
/*end of search engine input*/



//http://s-iihr32.iihr.uiowa.edu/dev/landing_map/NHD/script_conn.php?lat=41.21223805828677&lng=-92.96424865722656
//-92.371181  42.180071

/* Use spatial query to get comid (catchment) from the input coordinates*/
$query_intersect = "SELECT featureid FROM public.catchment WHERE ST_CONTAINS(geom,ST_SetSRID(ST_GeomFromText('POINT(".$lng." ".$lat.")'),3395) ); ";
$res_intersect = pg_query($dbconn, $query_intersect);

$final_res=""; // this variable stores the comid of catchment, it will be used as input for the hash tavle search
while ($row = pg_fetch_row($res_intersect)) {
	    foreach ($row as $value) {
    		//echo $value."<br>";
			$final_res.=$value;		
	}
}
/*end of query*/








$composite_hash_file = 'data/composite_conn.json';
$hash_file_huc12 = 'data/comid_huc12.json'; //this is a hash table that convert comid(catchment) to HUC12 
$huc12_conn = 'data/huc12_conn.json';

$data_comid_huc12 = file_get_contents($hash_file_huc12); //it is placed on local
$data_comid_huc12 = json_decode($data_comid_huc12, true);  //encode json
$origin_huc12_exclude= $data_comid_huc12[$final_res][0];  //have to exclude the input huc12, only trace huc12 upstream of the huc12 that contains the input catchment

$upstream_huc12_comid=array();


$t01 = microtime(true);
$composite_data = file_get_contents($composite_hash_file);
$composite_data = json_decode($composite_data, true);
$composite_data=$composite_data[$origin_huc12_exclude];



$t02 = microtime(true);
$result_comid_array = search_for_node( $final_res, $composite_data,$data_comid_huc12); // 13361758
$t03 = microtime(true);


//echo implode(", ", $visited) . "\n";


/*start of converting result array to string for SQL input*/
$catch_res_text="";
$huc_12_res_text="";
foreach ($result_comid_array as $lines){
	$catch_res_text.="'".$lines."',";
}

foreach ($upstream_huc12_comid as $lines){
	$huc_12_res_text.="'".$lines."',";
}
$catch_res_text=trim($catch_res_text, ",");		//the result will be a string list of catchment comid numbers spereated with ","
$huc_12_res_text=trim($huc_12_res_text, ",");  //the result will be a string list of huc12 numbers spereated with ","

$t04 = microtime(true);
/*end of converting result array to string for SQL input*/




//$query_join = "SELECT ST_AsText(ST_Union(geom)) FROM public.catchment WHERE featureid in (".trim($visited_text, ",").")";
//$query_join = "SELECT geom FROM public.catchment,public.huc12 WHERE public.catchment.featureid in (".$catch_res_text.") AND public.catchment.huc12 in (071000090203)";


/*use SQL to spatial queruy and generate the watershed boundary*/
/*
if(!empty($upstream_huc12_comid)){
	$query_join = "SELECT ST_AsGeoJSON(1,ST_ExteriorRing(ST_UNION(geom)),4,0) FROM (SELECT geom FROM public.catchment where featureid in (".$catch_res_text.") UNION select geom from watershed_trace.huc_12_upstream where poi in (".$huc_12_res_text.")) as t";

}else{*/
	$query_join = "SELECT ST_AsGeoJSON(1,ST_UNION(geom),4,0) FROM public.catchment WHERE featureid in (".$catch_res_text.")";
//}


$t05 = microtime(true);

$res2 = pg_query($dbconn, $query_join);
$ws_boundary; //final result boundary, only geometery
while ($row = pg_fetch_row($res2)) {
      foreach ($row as $value) {
    		//echo $value."\n";
			
			$ws_boundary =$value;
			//$ws_boundary =json_decode(wkt_to_json($value));
			//echo 
	}
}
$t06 = microtime(true);
$ws_boundary=json_decode($ws_boundary);
//bind attributes to the result boundary geom
$ws_boundary->huc->comid=$catch_res_text;	  //attributes of the containing comid(catchment)
$ws_boundary->huc->huc_12=$huc_12_res_text;   //attributes of the containing huc12


$ws_boundary->performance->agg=($t06-$t05);   //attributes of the containing huc12
$ws_boundary->performance->rearrange=($t05-$t04);   //attributes of the containing huc12
$ws_boundary->performance->query=($t04-$t01);   //attributes of the containing huc12
echo json_encode($ws_boundary);


//http://s-iihr32.iihr.uiowa.edu/dev/landing_map/NHD/script.php?lat=41.21223805828677&lng=-92.96424865722656


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

function search_for_node($id, $hash,$comid_to_huc12) {
    $children = array($id);
    $visited = array();
    while (!empty($children)) {
        $node = array_pop($children);
		if(array_key_exists($node, $hash)){
			if (!in_array($node, $visited)) {
				$visited[] = $node;
				$children = array_merge($children, $hash[$node]);
				$children = array_unique($children);
			}			
		}else{
			if(array_key_exists($node,$comid_to_huc12)){
				$temp_12=$comid_to_huc12[$node][0];
				array_push($GLOBALS['upstream_huc12_comid'],$temp_12);	
			}			
		}
    }
    return $visited;
}
