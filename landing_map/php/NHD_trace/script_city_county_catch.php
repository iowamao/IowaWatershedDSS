<?php

include_once('../geoPHP/geoPHP.inc');


function wkt_to_json($wkt) {
  $geom = geoPHP::load($wkt,'wkt');
  return $geom->out('json');
}
function json_to_wkt($json) {
  $geom = geoPHP::load($json,'json');
  return $geom->out('wkt');
}


$t01 = microtime(true);

//http://s-iihr32.iihr.uiowa.edu/dev/landing_map/NHD/script_conn.php?lat=41.21223805828677&lng=-92.96424865722656
error_reporting(E_ALL);
ini_set('display_errors', 1);
set_time_limit(0);

ini_set('memory_limit', '1G');


$geom="null";
parse_str($_SERVER['QUERY_STRING']);
$dbconn = pg_pconnect("host=127.0.0.1 port=5432 dbname=Iowa_Watershed user=haowen password=haowen1") or die('Connection failed'); 




$geom2 = $_POST['geom'];

/*

$geom_json = json_decode($geom2, true);
echo $geom_json;
*/
$wkt = json_to_wkt($geom2);
//echo $wkt;



$final_res="";
$dbconn = pg_pconnect("host=127.0.0.1 port=5432 dbname=Iowa_Watershed user=haowen password=haowen1") or die('Connection failed'); 


$interst_catch_array=array();
$query_intersect = "SELECT featureid FROM public.catchment WHERE ST_Intersects(geom,ST_SetSRID(ST_GeomFromText('".$wkt."'),3395) ); ";
$res_intersect = pg_query($dbconn, $query_intersect);
while ($row = pg_fetch_row($res_intersect)) {
	    foreach ($row as $value) {
    	
			
			array_push($interst_catch_array,$value);
	}
}

$t02 = microtime(true);
	
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
$hash_file = 'hash.json';
//$hash_file = 'hash_huc12_conn.json';
$data = file_get_contents($hash_file);
$data = json_decode($data, true);


$result_comid_array=array();	
 foreach ($interst_catch_array as $row){
	 //echo $row."  ";	 
	 $add = search_for_node( $row, $data); // 13361758
	  foreach ($add as $each_res){
		  if (!in_array($each_res, $result_comid_array)) {
         array_push($result_comid_array,$each_res);		 
		  }
	  }
	 
	 //echo implode(", ", $add) . "end \n";

 }
// generating the array of catchment



$hash_file_huc12 = 'hash_huc12.json';
$data_huc12 = file_get_contents($hash_file_huc12);
$data_huc12 = json_decode($data_huc12, true);

$huc_12_res=array();
$catch_res=array();
$origin_huc12_exclude=array();

$t03 = microtime(true);

foreach ($interst_catch_array as $each_huc12_exc){	
    array_push($origin_huc12_exclude,$data_huc12[$each_huc12_exc][0]);
	
}






foreach ($result_comid_array as $comid) {
	$children_id = array($comid);
	//echo $data_huc12[$comid][0];
	if (array_key_exists( $comid, $data_huc12)) {
	if (!in_array($data_huc12[$comid][0], $huc_12_res)&& $data_huc12[$comid][0]!=$origin_huc12_exclude ) {
	array_push($huc_12_res,$data_huc12[$comid][0]);
    }
//	if($data_huc12[$comid][0]==$origin_huc12_exclude){
	if(in_array($data_huc12[$comid][0], $origin_huc12_exclude)){
	array_push($catch_res,$comid); 
	}	
	}
}
/*
echo "\n";
echo implode(",",$huc_12_res) . "\n";
echo implode(",",$catch_res) . "\n";
*/
$catch_res_text="";
$huc_12_res_text="";
foreach ($catch_res as $lines){
	$catch_res_text.="'".$lines."',";
}
foreach ($huc_12_res as $lines){
	$huc_12_res_text.="'".$lines."',";
}

$catch_res_text=trim($catch_res_text, ",");
$huc_12_res_text=trim($huc_12_res_text, ",");

echo $catch_res_text;
echo $huc_12_res_text;
$t04 = microtime(true);
//$query_join = "SELECT ST_AsText(ST_Union(geom)) FROM public.catchment WHERE featureid in (".trim($visited_text, ",").")";
//$query_join = "SELECT geom FROM public.catchment,public.huc12 WHERE public.catchment.featureid in (".$catch_res_text.") AND public.catchment.huc12 in (071000090203)";

if( strlen( $huc_12_res_text )!=0){
$query_join = "SELECT ST_ASTEXT(ST_UNION(geom)) FROM (SELECT geom FROM public.catchment where featureid in (".$catch_res_text.") UNION select geom from public.huc12 where huc_12 in (".$huc_12_res_text.")) as t";

}else{
	
$query_join = "SELECT ST_AsText(ST_UNION(geom)) FROM public.catchment WHERE featureid in (".$catch_res_text.")";	
	
}


$res2 = pg_query($dbconn, $query_join);

$t05 = microtime(true);


echo "overlay catchment".($t02-$t01);
echo "seatch upstream catchment".($t03-$t02);
echo "convert to HUC12".($t04-$t03);
echo "aggregate".($t05-$t04);
echo "\n\n";
while ($row = pg_fetch_row($res2)) {

  //echo "Age: $row[0]  QM: $row[1]";

      foreach ($row as $value) {
    		//echo $value."\n";
			echo wkt_to_json($value);
	}
}
//////////////////////////













