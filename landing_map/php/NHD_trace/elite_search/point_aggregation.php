<?php

include_once('../../geoPHP/geoPHP.inc');

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
$dbconn = pg_pconnect("host=127.0.0.1 port=5432 dbname=IWDSS user=haowen password=haowen1") or die('Connection failed'); 
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
$query_intersect = "SELECT featureid FROM nhd_structure.catchment WHERE ST_CONTAINS(geom,ST_SetSRID(ST_GeomFromText('POINT(".$lng." ".$lat.")'),4326) ); ";
$res_intersect = pg_query($dbconn, $query_intersect);

$final_res=""; // this variable stores the comid of catchment, it will be used as input for the hash tavle search
while ($row = pg_fetch_row($res_intersect)) {
	    foreach ($row as $value) {
    		//echo $value."<br>";
			$final_res.=$value;		
	}
}
/*end of query*/






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




$file = 'data/comid_conn.csv';
$hash_file = 'data/comid_conn.json';


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



//echo implode(", ", $visited) . "\n";



$result_comid_array=$visited;  //this gives the result, which is an array of comid (catchment level)
$hash_file_huc12 = 'data/comid_huc12_convert_river.json'; //this is a hash table that convert comid(catchment) to HUC12 
$data_huc12 = file_get_contents($hash_file_huc12); //it is placed on local
$data_huc12 = json_decode($data_huc12, true);  //encode json

$huc_12_res=array();   //result of huc12 array
$huc_10_res=array();   //result of huc12 array
$huc_8_res=array();   //result of huc12 array
$catch_res=array();   //result of catchment 

$origin_huc12_exclude= $data_huc12[$final_res][0];  //have to exclude the input huc12, only trace huc12 upstream of the huc12 that contains the input catchment
$origin_huc10_exclude=substr($data_huc12[$final_res][0],0,10);
$origin_huc8_exclude=substr($data_huc12[$final_res][0],0,8);

/*generate huc12 result from comid array*/
foreach ($result_comid_array as $comid) {
	$children_id = array($comid);

	//echo $data_huc12[$comid][0];
	if (array_key_exists( $comid, $data_huc12)) {
	$each_hu12=$data_huc12[$comid][0];
	$each_hu10=substr($each_hu12,0,10);
	$each_hu8=substr($each_hu12,0,8);
		
		
	if (!in_array($each_hu12, $huc_12_res)&& $each_hu12!=$origin_huc12_exclude && $each_hu10==$origin_huc10_exclude ) {
	array_push($huc_12_res,$each_hu12);
    }
	if (!in_array($each_hu10, $huc_10_res)&& $each_hu10!=$origin_huc10_exclude && $each_hu8==$origin_huc8_exclude ) {
	array_push($huc_10_res,$each_hu10);
    }
	if (!in_array($each_hu8, $huc_8_res)&& $each_hu8!=$origin_huc8_exclude ) {
	array_push($huc_8_res,$each_hu8);
    }
	if($data_huc12[$comid][0]==$origin_huc12_exclude){	
	array_push($catch_res,$comid);
	}
	}
}
/*end of generating huc12 result from comid array*/

$t04 = microtime(true);



/*start of converting result array to string for SQL input*/
$catch_res_text="";
$huc_12_res_text="";
$huc_10_res_text="";
$huc_8_res_text="";

foreach ($catch_res as $lines){
	$catch_res_text.="'".$lines."',";
}
foreach ($huc_12_res as $lines){
	$huc_12_res_text.="'".$lines."',";
}
foreach ($huc_10_res as $lines){
	$huc_10_res_text.="'".$lines."',";
}
foreach ($huc_8_res as $lines){
	$huc_8_res_text.="'".$lines."',";
}
$catch_res_text=trim($catch_res_text, ",");		//the result will be a string list of catchment comid numbers spereated with ","
$huc_12_res_text=trim($huc_12_res_text, ",");  //the result will be a string list of huc12 numbers spereated with ","
$huc_10_res_text=trim($huc_10_res_text, ",");		//the result will be a string list of catchment comid numbers spereated with ","
$huc_8_res_text=trim($huc_8_res_text, ",");  //the result will be a string list of huc12 numbers spereated with ","

/*end of converting result array to string for SQL input*/


//$query_join = "SELECT ST_AsText(ST_Union(geom)) FROM nhd_structure.catchment WHERE featureid in (".trim($visited_text, ",").")";
//$query_join = "SELECT geom FROM nhd_structure.catchment,nhd_structure.huc_12 WHERE nhd_structure.catchment.featureid in (".$catch_res_text.") AND nhd_structure.catchment.huc12 in (071000090203)";


/*use SQL to spatial queruy and generate the watershed boundary*/

if( strlen( $huc_12_res_text )==0){
	$huc_12_res_text="''";
}
if( strlen( $huc_10_res_text )==0){
	$huc_10_res_text="''";
}
if( strlen( $huc_8_res_text )==0){
	$huc_8_res_text="''";
}


$query_join = "SELECT ST_AsGeoJSON(1,ST_UNION(geom),4,0) FROM (SELECT geom FROM nhd_structure.catchment where featureid in (".$catch_res_text.") UNION select geom from nhd_structure.huc_12 where huc_12 in (".$huc_12_res_text.") UNION select geom from nhd_structure.huc_10 where huc_10 in (".$huc_10_res_text.") UNION select geom from nhd_structure.huc_8 where huc_8 in (".$huc_8_res_text.")) as t";
//echo $query_join;
//$query_join ="SELECT ST_AsGeoJSON(1,ST_UNION(a.geom),4,0) FROM (SELECT ST_Collect(ST_MakePolygon(geom)) AS geom FROM (SELECT ST_NRings(geom) AS nrings,ST_ExteriorRing((ST_Dump(geom)).geom) AS geom FROM ( SELECT geom FROM (SELECT geom FROM nhd_structure.catchment where featureid in (".$catch_res_text.") UNION select geom from nhd_structure.huc_12 where huc_12 in (".$huc_12_res_text.") UNION select geom from nhd_structure.huc_10 where huc_10 in (".$huc_10_res_text.") UNION select geom from nhd_structure.huc_8 where huc_8 in (".$huc_8_res_text.")) as t) as t2 WHERE ST_NRings(geom) > 1) s WHERE nrings > 1) a";
//echo $query_join;

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
$ws_boundary->huc->huc_10=$huc_10_res_text;   //attributes of the containing huc12
$ws_boundary->huc->huc_8=$huc_8_res_text;   //attributes of the containing huc12

$ws_boundary->performance->agg=($t06-$t05);   //attributes of the containing huc12
$ws_boundary->performance->rearrange=($t05-$t04);   //attributes of the containing huc12
$ws_boundary->performance->query=($t04-$t01);   //attributes of the containing huc12
echo json_encode($ws_boundary);


//http://s-iihr32.iihr.uiowa.edu/dev/landing_map/NHD/script.php?lat=41.21223805828677&lng=-92.96424865722656


