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


$interst_huc_array=array();
$query_intersect = "SELECT HUC_12 FROM public.huc12 WHERE ST_Intersects(geom,ST_SetSRID(ST_GeomFromText('".$wkt."'),3395) ); ";
$res_intersect = pg_query($dbconn, $query_intersect);
while ($row = pg_fetch_row($res_intersect)) {
	    foreach ($row as $value) {
    	
			
			array_push($interst_huc_array,$value);
	}
}
	//echo $interst_huc_array."<br>";
	//echo implode(",",$interst_huc_array) . "\n";
/*
	$interst_huc10_array=array();
	foreach ($interst_huc8_array as $huc_10){
		 if (!in_array($huc_10, $interst_huc8_array)) {
			$parsed_10=substr($huc_10,0,10) ;
		 array_push($interst_huc10_array,$each_res);
					}		
	}
	echo implode(",",$interst_huc10_array) . "\n";
	*/
	
	
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

$hash_file = 'hash_huc12_conn.json';
$data = file_get_contents($hash_file);
$data = json_decode($data, true);

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
foreach ($huc12_res as $lines){
	$huc_12_res_text.="'".$lines."',";
}
$huc_12_res_text=trim($huc_12_res_text, ",");

$huc10_res_text="";
foreach ($huc10_res as $lines){
	$huc10_res_text.="'".$lines."',";
}
$huc10_res_text=trim($huc10_res_text, ",");
/*
echo $huc_12_res_text;
echo "<------------------------------------------------------>";
echo $huc10_res_text;
*/

$query_join = "";	






if( strlen( $huc10_res_text )!=0){
$query_join = "SELECT ST_ASTEXT(ST_UNION(geom)) FROM (SELECT geom FROM public.huc12 where huc_12 in (".$huc_12_res_text.") UNION select geom from public.huc10 where huc_10 in (".$huc10_res_text.")) as t";
}else{
$query_join = "SELECT ST_AsText(ST_UNION(geom)) FROM public.huc12 WHERE huc_12 in (".$huc_12_res_text.")";	
}


$res2 = pg_query($dbconn, $query_join);

$ws_boundary;
while ($row = pg_fetch_row($res2)) {

  //echo "Age: $row[0]  QM: $row[1]";

      foreach ($row as $value) {
    		//echo $value."\n";
			$ws_boundary =json_decode(wkt_to_json($value));
			//echo 
	}
}
$ws_boundary->huc->huc_10=$huc10_res_text;
$ws_boundary->huc->huc_12=$huc_12_res_text;
echo json_encode($ws_boundary);






?>