<?php

 
$out_str = 'agency_cd,site_no,date,time,tz_cd,discharge,02_00060_cd,stage,16_00065_cd'."\n"; 
 

$todayh= getdate();
$d = $todayh[mday];
$m = $todayh[mon];
$y = $todayh[year];


$lastmonth=$m - 1 ;
$beginYear=$y;


 if($lastmonth <=0){
 $beginYear=$y - 1 ;
 $lastmonth=11;
 }





parse_str($_SERVER['QUERY_STRING']);
$siteIDa=$siteID;
echo $siteIDa;

$url = "http://waterdata.usgs.gov/nwis/uv?cb_00060=on&cb_00065=on&format=rdb&site_no=$siteIDa&period=&begin_date=$beginYear-$lastmonth-$d&end_date=$y-$m-$d";


//$url = "http://s-iihr62.iihr.uiowa.edu/dev/get_sr_data_period.php?site=RGS0011&start=2014-{$today[mon]}-{$today[mday]}&end=2015-{$today[mon]}-{$today[mday]}";

$cont = file_get_contents($url);

$my_array = explode ("\n",$cont); 


foreach ($my_array as $line){



                if (substr($line, 0,1) == '#' || substr($line, 0,2) == '5s' || substr($line, 0,5) == 'agenc' || substr($line, 0,2) == '\n') continue;

                 //$tmp_arr = explode ("	", $line);
				 
                 $tmp_arr = multiexplode(array("	"," "),$line);

if (substr($line, 0,1) == 'a')	{
$tmp_arr[6]="gage_height";
$tmp_arr[4]="discharge";
}

				 $comma_separated = implode(",", $tmp_arr);
				 $out_str.=$comma_separated."\n";	 

}
$my_array = explode ("\n",$cont); 
echo $out_str;





function multiexplode ($delimiters,$string) {

    $ready = str_replace($delimiters, $delimiters[0], $string);
    $launch = explode($delimiters[0], $ready);
    return  $launch;
}


?>
 