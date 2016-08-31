<?php

include_once('../geoPHP/geoPHP.inc');
error_reporting(E_ALL);


function json_to_wkt($json) {
  $geom = geoPHP::load($json,'json');
  return $geom->out('wkt');
}



 $data_content =json_decode($_POST['geom']);


 $watershed_wkt = json_to_wkt($data_content);
//echo $watershed_wkt;
$dbconn = pg_pconnect("host=127.0.0.1 port=5432 dbname=Iowa_Watershed user=haowen password=haowen1") or die('Connection failed'); 

//$query_intersect = "SELECT ST_Area(ST_Intersection( geom, ST_MakeValid(ST_SetSRID(ST_GeomFromText('".$watershed_wkt."'),4326)))) FROM idot.eash_4326_noz ; ";
$query_intersect = "SELECT ST_Area(ST_Transform(ST_Intersection( geom, ST_MakeValid(ST_SetSRID(ST_GeomFromText('".$watershed_wkt."'),4326))),26915)) FROM idot.eash_4326_noz ; ";

//$query_intersect = "SELECT id FROM idot.eash_4326_noz WHERE ST_Intersects( geom, ST_SetSRID(ST_GeomFromText('".$watershed_wkt."'),4326) ); ";
//echo $query_intersect;
//$query_intersect = "SELECT id FROM idot.eash_3395  ";
$interst_area=array();

$res_intersect = pg_query($dbconn, $query_intersect);
while ($row = pg_fetch_row($res_intersect)) {
	    foreach ($row as $value) {
    	    
			
			array_push($interst_area,$value);	
			
			//echo $value." ";	
				
	}

}
//echo implode(",",$interst_area); 
/*
*/
function eash_equations($input){
	/*Convert everything into squalre miles*/
	$region1=$input[0]*3.861E-7;
	$region3=$input[1]*3.861E-7;
	$region2=$input[2]*3.861E-7; 
	
	//echo $region1."  ".$region3."  ".$region2;
	
	$Q1_2=33.8*pow($region1, 0.656);
	$Q1_5=60.8*pow($region1, 0.658);
	$Q1_10=80.1*pow($region1, 0.660);
	$Q1_25=105*pow($region1, 0.663);
	$Q1_50=123*pow($region1, 0.666);
	$Q1_100=141*pow($region1, 0.669);
	$Q1_200=159*pow($region1, 0.672);
	$Q1_500=183*pow($region1, 0.676);
	
	$Q2_2=182*pow($region2, 0.540);
	$Q2_5=464*pow($region2, 0.490);
	$Q2_10=728*pow($region2, 0.465);
	$Q2_25=1120*pow($region2, 0.441);
	$Q2_50=1440*pow($region2, 0.427);
	$Q2_100=1800*pow($region2, 0.415);
	$Q2_200=2200*pow($region2, 0.403);
	$Q2_500=2790*pow($region2, 0.389);
	
	$Q3_2=286*pow($region3, 0.536);
	$Q3_5=737*pow($region3, 0.466);
	$Q3_10=1180*pow($region3, 0.431);
	$Q3_25=1900*pow($region3, 0.397);
	$Q3_50=2550*pow($region3, 0.376);
	$Q3_100=3300*pow($region3, 0.357);
	$Q3_200=4160*pow($region3, 0.340);
	$Q3_500=5490*pow($region3, 0.321);
	
	$Q2=$Q1_2+$Q2_2+$Q3_2;
	$Q5=$Q1_5+$Q2_5+$Q3_5;
	$Q10=$Q1_10+$Q2_10+$Q3_10;
	$Q25=$Q1_25+$Q2_25+$Q3_25;
	$Q50=$Q1_50+$Q2_50+$Q3_50;
	$Q100=$Q1_100+$Q2_100+$Q3_100;
	$Q200=$Q1_200+$Q2_200+$Q3_200;
	$Q500=$Q1_500+$Q2_500+$Q3_500;
	
	$json_result=array("Q2" => $Q2, "Q5" => $Q5, "Q10" => $Q10, "Q25" => $Q25, "Q50" => $Q50, "Q50" => $Q50, "Q100" => $Q100, "Q200" => $Q200, "Q500" => $Q500);
	echo json_encode($json_result);
}
//3.861E-7

eash_equations($interst_area);

?>