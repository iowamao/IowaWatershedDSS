<?php

//include_once('geoPHP/geoPHP.inc');
error_reporting(E_ALL);



 $data_content =$_POST['feature_geom'];
 $poi_json_content =$_POST['poi_geom'];
// $file_name_output =$_POST['file_name_path'];
 
  $output_content= $data_content;
  
  $json=json_decode($data_content);
  
  $file_name_output=$json->properties->path_name;
  //$poi_json_content=$json->properties->poi;
  $poi_file_name_output="poi".$file_name_output;
  $siteDirectory="../../IowaWS/data/temp_WBD/".$file_name_output.".json";
   $siteDirectory_POI="../../IowaWS/data/temp_WBD/".$poi_file_name_output.".json";
  //$siteDirectory="/var/www/html/dev/IowaWS/data/temp_WBD/ws.json";
  echo $siteDirectory;
file_put_contents($siteDirectory, $output_content); 
file_put_contents($siteDirectory_POI,$poi_json_content); 
 

?>