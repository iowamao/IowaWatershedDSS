<?php

include_once('../geoPHP/geoPHP.inc');

/*import geoPHP for spatial format conversion*/
function wkt_to_json($wkt) {
  $geom = geoPHP::load($wkt,'wkt');
  return $geom->out('json');
}
/*end of import geoPHP for spatial format conversion*/

/*This link is used for testing, it has a fixed coordinates for query string*/
//http://s-iihr32.iihr.uiowa.edu/dev/landing_map/NHD/script_conn.php?lat=41.21223805828677&lng=-92.96424865722656

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



$final_res=""; //this is a variable created to store the intersecting HUC/comid, it is used as input for the hash table search


if($huc=="null"){  //if it is not a HUC number input, them use coordinate to trace
//-92.371181  42.180071 this is for testing
$query_intersect = "SELECT HUC_12 FROM public.huc12 WHERE ST_CONTAINS(geom,ST_SetSRID(ST_GeomFromText('POINT(".$lng." ".$lat.")'),3395) ); ";
$res_intersect = pg_query($dbconn, $query_intersect);
while ($row = pg_fetch_row($res_intersect)) {
	    foreach ($row as $value) {
    		//echo $value."<br>";
			$final_res.=$value;	 //get the value	
	}
}
}else{ //	
$final_res=$huc;	
	
}

$hash_file ="";
if (strlen($final_res)==12 ){
	$hash_file = 'hash_huc12_conn.json';
}
if (strlen($final_res)==8 ){
	$hash_file = 'hash_huc8_conn.json';
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




/*
$file = 'huc12_featureid.csv';
$hash_file = 'hash_huc12.json';
*/

$t01 = microtime(true);
if (file_exists($hash_file)) {
    $data = file_get_contents($hash_file);
    $data = json_decode($data, true);
} else {
    $data = file_get_contents($file) or die("Data file not found...");
    $data = explode("\n", $data);
    $data = array_filter($data, 'trim');
    $data = array_map('trim', $data);
    $data = array_map(function ($row) {
        $row = explode(",", $row);
        return array($row[1], $row[0]);
    }, $data);
    $data = group_array($data);
    file_put_contents($hash_file, json_encode($data));
}
$t02 = microtime(true);
$visited = search_for_node( $final_res, $data); // 13361758
$t03 = microtime(true);


$huc_res_text="";
foreach ($visited as $lines){
	$huc_res_text.="'".$lines."',";
}
$huc_res_text=trim($huc_res_text, ",");
//echo $huc_res_text;

$query_join = "";
$huc8_res_txt="";
$huc12_res_txt="";
if (strlen($final_res)==12 ){
	$query_join = "SELECT ST_ASTEXT(ST_UNION(geom)) FROM public.huc12 where HUC_12 in (".$huc_res_text.")";
	$huc12_res_txt=$huc_res_text;
}
if (strlen($final_res)==8 ){
	$query_join = "SELECT ST_ASTEXT(ST_UNION(geom)) FROM public.huc8 where HUC_8 in (".$huc_res_text.")";
	$huc8_res_txt=$huc_res_text;
}


//$query_join = "SELECT ST_ASTEXT(ST_UNION(geom)) FROM public.huc12 where HUC_12 in (".$huc_res_text.")";
//http://s-iihr32.iihr.uiowa.edu/dev/landing_map/NHD/script.php?lat=41.21223805828677&lng=-92.96424865722656


$wkt_final="";
$res2 = pg_query($dbconn, $query_join);
$ws_boundary;
while ($row = pg_fetch_row($res2)) {

  //echo "Age: $row[0]  QM: $row[1]";

      foreach ($row as $value) {
    		//echo $value."\n";
			$wkt_final= $value;
			$ws_boundary =json_decode(wkt_to_json($value));
			//echo 
	}
}
/*
$watershed_name="nhd_huc_trace_".$final_res;
//$insert_query="INSERT INTO watershed_trace.watershed_geom(ws_name,geom) SELECT ".$watershed_name.",ST_GeomFromText(".$wkt_final.",3395)";
$insert_query="INSERT INTO watershed_trace.watershed_geom(ws_name, geom) VALUES('".$watershed_name."', ST_GeomFromText('".$wkt_final."', 4326))";
$res_insert = pg_query($dbconn, $insert_query);
while ($row = pg_fetch_row($res_insert)) {
	    foreach ($row as $value) {
    		//echo $value."<br>";
			//$final_res.=$value;		
	}
}
*/




$ws_boundary->huc->huc_8=$huc8_res_txt;	
$ws_boundary->huc->huc_12=$huc12_res_txt;


echo json_encode($ws_boundary);


?>