<?php




//$file = file_get_contents($_GET['requrl']);
//echo $file;


/*echo "Maomao"*/
/*
$url
$cont = file_get_contents($url);
*/


//http://ifis.iowafloodcenter.org/ifis/ws/sites.php?site="+layer.feature.properties.sitecode+"&period=1108&format=xml



$sitecontent;
$siteDirectory;


 //   echo "http://ifis.iowafloodcenter.org/ifis/ws/sites.php?site=$sitecode[$x]&period=1108&format=xml<br>";
   // $sitecontent = file_get_contents($_GET['requrl']);
    

parse_str($_SERVER['QUERY_STRING']);
  
    $sitecontent = file_get_contents("http://ifis.iowafloodcenter.org/ifis/ws/sites.php?site=$sitecode&period=1108&format=tab");


    $my_array = explode ("\n",$sitecontent);
    $reversed_my_array = array_reverse($my_array); 

    $out_str = "date,time,stage"; 


foreach ($reversed_my_array as $line){
        if (substr($line, 0,1) == '#' ) continue;	
		
		$each_line_array = multiexplode(array(" ","	"),$line);                

	        $comma_separated = implode(",", $each_line_array);
		$out_str .=$comma_separated."\n";
}
echo $out_str;




    

     



function multiexplode ($delimiters,$string) {

    $ready = str_replace($delimiters, $delimiters[0], $string);
    $launch = explode($delimiters[0], $ready);
    return  $launch;
}




?>