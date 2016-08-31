<?php

// $time_content =$_POST['time'];
 $data_content =$_POST['feature_geom'];

// $output_content=$time_content+","+$data_content;


 $output_content= $data_content;



//echo  "$time_content[$x]"." , "."$data_content[$x]"."\n";

     

echo $output_content;


$siteDirectory="/var/www/html/dev/landing_map/watershed_result.json";
file_put_contents($siteDirectory, $output_content);

?>