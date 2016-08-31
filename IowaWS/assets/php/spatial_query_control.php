<?php

include_once('geoPHP/geoPHP.inc');
error_reporting(E_ALL);


function json_to_wkt($json) {
  $geom = geoPHP::load($json,'json');
  return $geom->out('wkt');
}

 $data_content =$_POST['feature_geom'];
   $huc_list =$_POST['huc_list'];
  $huc_json=json_decode($huc_list);
  



$wkt = json_to_wkt($data_content);


 

 

$interst_sensor=array();
$interst_project=array();
$dbconn = pg_pconnect("host=127.0.0.1 port=5432 dbname=Iowa_Watershed user=haowen password=haowen1") or die('Connection failed'); 

$query_intersect = "SELECT site_code FROM ws_project_spatial_query.state_sensor WHERE ST_Intersects( geom, ST_SetSRID(ST_GeomFromText('".$wkt."'),4326)); ";
//$query_intersect = "SELECT sitecode FROM public.state_sensors WHERE ST_Intersects( geom, ST_SetSRID(ST_GeomFromText('".$wkt."'),3395) ); ";
//$query_transformation = "SELECT ST_AsText(geom) FROM (SELECT ST_Transform(ST_SetSrid(ST_GeomFromText('".$wkt."'),3395),32615) as geom) g;";
//$query_bbox="SELECT ST_AsText(ST_Envelope(ST_SetSRID(ST_GeomFromText('".$wkt."'),3395)::geometry));";

$res_intersect = pg_query($dbconn, $query_intersect);
while ($row = pg_fetch_row($res_intersect)) {
	    foreach ($row as $value) {
    	
			array_push($interst_sensor,$value);
	}
}
//$query_intersect_project = "SELECT project FROM public.dss_project WHERE ST_Contains( geom, ST_SetSRID(ST_GeomFromText('".$wkt."'),3395) ); ";
$query_intersect_project = "SELECT watershed,Id_1 FROM ws_project_spatial_query.dss_project WHERE ST_Intersects(ST_SetSRID(ST_GeomFromText('".$wkt."'),4326), ST_Centroid(geom) ); ";
$res_intersect_project = pg_query($dbconn, $query_intersect_project);
while ($row = pg_fetch_row($res_intersect_project)) {
	    foreach ($row as $value) {
    	
			
	}
	array_push($interst_project,$row);
}


$huc_12_text=$huc_json->huc_12;

$huc_12_res=array();
$query_join_12 ="SELECT hu_12_name,huc_12 FROM public.huc12 where huc_12 in (".$huc_12_text.")";
//echo $query_join_12;
$res_huc12 = pg_query($dbconn, $query_join_12);
while ($row = pg_fetch_row($res_huc12)) {
	  // foreach ($row as $value) {
    	
			
	//}
			array_push($huc_12_res,$row);
}

$huc_10_text=$huc_json->huc_10;
$huc_10_res=array();
$query_join_10 ="SELECT hu_10_name,huc_10 FROM public.huc10 where huc_10 in (".$huc_10_text.")";
$res_huc10 = pg_query($dbconn, $query_join_10);
while ($row = pg_fetch_row($res_huc10)) {
	   // foreach ($row as $value) {
    	
		//}
	array_push($huc_10_res,$row);
}

$huc_8_text=$huc_json->huc_8;
$huc_8_res=array();
$query_join_8 ="SELECT BASIN,huc_8 FROM public.huc8 where huc_8 in (".$huc_8_text.")";
//echo json_encode($query_join_8);
$res_huc8 = pg_query($dbconn, $query_join_8);
while ($row = pg_fetch_row($res_huc8)) {
	   // foreach ($row as $value) {
    	    //$val_list=explode(",", $value);
			
			
	//}
	array_push($huc_8_res,$row);
}


//if( empty( $huc_json ) )
	
//if (array_key_exists('project_ws', $huc_json)) 
if(array_key_exists('project_ws', $huc_json))
{
	
$huc_12_res=array();
$query_intersect_huc12 = "SELECT hu_12_name,huc_12 FROM public.huc12 WHERE ST_Intersects(ST_SetSRID(ST_GeomFromText('".$wkt."'),3395), ST_Centroid(geom) ); ";
$res_intersect_12 = pg_query($dbconn, $query_intersect_huc12);
while ($row = pg_fetch_row($res_intersect_12)) {
	  
	array_push($huc_12_res,$row);
} 
	 
}


$final_res=array(
"sensor"=>$interst_sensor,
"huc12"=>$huc_12_res,
"huc10"=>$huc_10_res,
"huc8"=>$huc_8_res,
"project"=>$interst_project,

);
echo json_encode($final_res);
/**/







?>