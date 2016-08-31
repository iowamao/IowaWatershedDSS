<?php
include_once('../geoPHP/geoPHP.inc');

function json_to_wkt($json) {
  $geom = geoPHP::load($json,'json');
  return $geom->out('wkt');
}


error_reporting(E_ALL);
ini_set('display_errors', 1);
parse_str($_SERVER['QUERY_STRING']);
$json_data=$_POST['json_data'];
$culvert_id=$_POST['culvert_id'];
$dir="../../../data/dss/IDOT/state_data/geo_json/sedimentation_analysis/sed_ana_".$culvert_id.".geojson";
file_put_contents($dir,$json_data);


$stc=$_POST['stc'];
$json_obj=json_decode($json_data);

$db="cfs_v1";
$dbconn = pg_pconnect("host=127.0.0.1 port=5432 dbname=".$db." user=haowen password=haowen1") or die('Connection failed'); 

$json_features=$json_obj->features;

$culvert_width=$json_obj->culvert_width;

$query="DELETE FROM public.sed_analysis WHERE site_id = '".$culvert_id."'";
$query_insert = pg_query($dbconn, $query);

foreach ($json_features as $row) {
	//echo $row;
	//var_dump($row);
	//$location=$row["properties"]
	 $geom_wkt = json_to_wkt($row);
	 $location = $row->properties->location;
	 $sate_map_src = $row->properties->sate_map_src;
	 
	echo $culvert_width ;
	$query="INSERT INTO public.sed_analysis (file_url, site_id, stream_to_culvert,geom,location,culvert_width,sate_map_src) VALUES ('".$dir."','".$culvert_id."','".implode(",", $stc)."',ST_MakeValid(ST_SetSRID(ST_GeomFromText('".$geom_wkt."'),4326)),'".$location."','".$culvert_width."','".$sate_map_src."');";
	$query_insert = pg_query($dbconn, $query);
}


//$query="INSERT INTO public.sed_analysis (file_url, site_id, stream_to_culvert) VALUES ('".$dir."','".$culvert_id."','".implode(",", $stc)."',);";
//$query_insert = pg_query($dbconn, $query);
/*
while ($row = pg_fetch_row($query_insert)) {
	    foreach ($row as $value) { 
			array_push($result_array,$value);
	}
}
*/

?> 
