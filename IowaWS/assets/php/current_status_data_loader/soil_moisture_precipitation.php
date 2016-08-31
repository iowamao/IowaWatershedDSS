<?php
 

$todayh= getdate();
$d = $todayh[mday];
$m = $todayh[mon];
$y = $todayh[year];


parse_str($_SERVER['QUERY_STRING']);

//"ICY06",



$url = "http://s-iihr62.iihr.uiowa.edu/dev/get_sr_data_period.php?site=$siteID&start=2015-7-01&end=$y-$m-$d";

if($siteID == 'ICY06'){

$url = "http://s-iihr62.iihr.uiowa.edu/dev/get_sr_data_period.php?site=$siteID&start=2013-3-30&end=$y-$m-$d";
}

$out = "/var/www/html/CZO/data/IFC_p/IFC_precip_$siteID.txt";

$cont = file_get_contents($url);
// echo $cont;



$my_array = explode ("\n",$cont); 
//var_dump ($my_array); 
$out_str = 'date,time,UTC,Water1,Water2,Water3,Water4,Temp1,Temp2,Temp3,Temp4,BucketA,BucketB'."\n"; 

foreach ($my_array as $line){
                if (substr($line, 0,1) == '#' ) continue;

                $each_line_array = multiexplode(array(" ",", "),$line);                

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
 