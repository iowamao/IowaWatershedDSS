<?php
$output="org,site,date,time,type,variable1,variable2\n";





$IFC_bridge_sitecode = array("CLRCRK03", "CLRCRKW01", "CLRCRKS01","CLRCRKS02", "RHNCR01", "CLRCRK01","BFFLOCR01", "BFFLOCR02", "DEERCR01");
for ($x = 0; $x < 9; $x++) {
$siteDirectory[$x] = "/var/www/html/CZO/data/IFC/BridgeSensor_$IFC_bridge_sitecode[$x].txt";
$file = file_get_contents($siteDirectory[$x]);
$Bridge_sensor_Array=explode ("\n",$file);
$Bridge_sensor_Array=array_reverse($Bridge_sensor_Array);
$Bridge_sensor_Lines=explode (",",$Bridge_sensor_Array[1]);
$output.="IFC,$IFC_bridge_sitecode[$x],".$Bridge_sensor_Lines[0].",".$Bridge_sensor_Lines[1].",IFC Bridge Sensors,stage,\n";
}


$USGS_sitecode = array("05454220","05454300");
for ($z = 0; $z < 2; $z++) {
$siteDirectory[$z] = "/var/www/html/CZO/data/USGS/USGS_Stream_$USGS_sitecode[$z].txt";

$file = file_get_contents($siteDirectory[$z]);
$Bridge_sensor_Array=explode ("\n",$file);
$Bridge_sensor_Array=array_reverse($Bridge_sensor_Array);
$Bridge_sensor_Lines=explode (",",$Bridge_sensor_Array[2]);
$output.="USGS,$USGS_sitecode[$z],".$Bridge_sensor_Lines[2].",".$Bridge_sensor_Lines[3].",USGS StreamFlow,stage,discharge\n";
}

$IFC_Precip_siteID=array("RGS0016","RGS0015","RGS0017","RGS0020","RGS0018","RGS0024","RGS0009","RGS0031","RGS0011","ICY06");
for ($y = 0; $y < 10; $y++) {
$siteDirectory_p[$y] = "/var/www/html/CZO/data/IFC_p/IFC_precip_$IFC_Precip_siteID[$y].txt";
$file_p = file_get_contents($siteDirectory_p[$y]);
$Precip_sensor_Array=explode ("\n",$file_p);
$Precip_sensor_Array=array_reverse($Precip_sensor_Array);
$Precip_sensor_Lines=explode (",",$Precip_sensor_Array[2]);
$output.="IFC,$IFC_Precip_siteID[$y],".$Precip_sensor_Lines[0].",".$Precip_sensor_Lines[1].",IFC Rain Gauges,precipitation,\n";
}





//date(DATE_ISO8601, $document["Timestamp"]->sec)



echo $output;




?>