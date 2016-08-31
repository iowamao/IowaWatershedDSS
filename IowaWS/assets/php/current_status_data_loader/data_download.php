<?php

 $time_content =$_POST['time'];
 $data_content =$_POST['data'];

// $output_content=$time_content+","+$data_content;


 $output_content=array();

$time_length = count($time_content);

for($x = 0; $x < $time_length; $x++) {



//echo  "$time_content[$x]"." , "."$data_content[$x]"."\n";
     $output_content[$x] = "$time_content[$x]"." , "."$data_content[$x]"."\n";
     
}
echo $output_content;


$siteDirectory="/var/www/html/CZO/data_export/export.csv";
file_put_contents($siteDirectory, $output_content);

?>