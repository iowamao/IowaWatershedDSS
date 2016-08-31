<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
set_time_limit(0);
ini_set('memory_limit', '1G');
/*
 $dbconn = pg_pconnect("host=127.0.0.1 port=5432 dbname=Iowa_Watershed user=haowen password=haowen1") or die('Connection failed');
echo $dbconn; 
$insert_query="SELECT id_1, 2 FROM ws_project_spatial_query.dss_project";
	$res_insert = pg_query($dbconn, $insert_query);
	while ($row = pg_fetch_row($res_insert)) {
		foreach($row as $r){
			echo "<br>R: $r";
		}
	 //echo implode(" ", $row);
	}
	echo "whatever";
exit();
*/ 
$out_str = 'datetime,01_00060_00003,01_00060_00003_cd'."\n"; 
 //http://waterdata.usgs.gov/nwis/dv?referred_module=sw&cb_00060=on&format=rdb&site_no=06608500&begin_date=2000-03-08&%20end_date=2016-03-06

 	$todayh= getdate();
	 $d = $todayh[mday];
	 $m = $todayh[mon];
	 $y = $todayh[year];
	 $beginYear=$y - 10;


$end_time=$y."-".$m."-".$d;
$start_time=$beginYear."-".$m."-".$d;

parse_str($_SERVER['QUERY_STRING']);
    


//$url = "http://waterdata.usgs.gov/nwis/dv?referred_module=sw&cb_00060=on&format=rdb&site_no=$siteID&end_date=2016-3-6&begin_date=2000-3-8";


/*
$service_control=array(
	"percentage_all"=>estimate_percentage_at_all_site($siteID,$end_time,$start_time),
	"percentage"=>estimate_percentage_at_a_site($siteID,$end_time,$start_time),
	"baseflow"=>'estimate_baseflow'
);
$service_control[$action]($siteID,$end_time,$start_time);
*/
estimate_baseflow($siteID,$end_time,$start_time);


function estimate_percentage_at_all_site($siteID,$end_time,$start_time){
	$final_result_list=array();
	$list_usgs=file_get_contents("data/usgs_sitecodes.txt");
	$usgs_array=explode("\r\n", $list_usgs);
	foreach($usgs_array as $siteID_all){
		produce_percentage($siteID_all,$end_time,$start_time);
		
	}
	echo object_to_csv($final_result_list);
}
function estimate_percentage_at_a_site($siteID,$end_time,$start_time){
	$result=produce_percentage($siteID,$end_time,$start_time);
	echo object_to_csv($result);
}
function estimate_baseflow($siteID,$end_time,$start_time){
	$result=produce_baseflow_seperation($siteID,$end_time,$start_time);
	echo object_to_csv($result);
}




function produce_percentage($siteID,$end_time,$start_time){
 
	$url = "http://waterdata.usgs.gov/nwis/dv?referred_module=sw&cb_00060=on&format=rdb&site_no=$siteID&begin_date=".$start_time."&end_date=".$end_time;

	$cont= file_get_contents($url);	
	if (strpos($cont, 'No sites/data') == true) {
		echo 'No sites/data';
		}else{
			$result_obj=baseflow_calculation(parse_usgs_daily($cont));			
			$final_res=baseflow_percentage($result_obj,$siteID);			
			array_push($GLOBALS['final_result_list'],$final_res);	
		
			//echo $GLOBALS['final_result_list'];
			//echo "done!";
		}	
}

function produce_baseflow_seperation($siteID,$end_time,$start_time){
	$url = "http://waterdata.usgs.gov/nwis/dv?referred_module=sw&cb_00060=on&format=rdb&site_no=$siteID&begin_date=".$start_time."&end_date=".$end_time;
	$cont= file_get_contents($url);
	if (strpos($cont, 'No sites/data') == true) {
		echo 'No sites/data';
		}else{
			$result_obj=baseflow_calculation(parse_usgs_daily($cont));			
			echo object_to_csv_withmeta($result_obj);

		}
}



function parse_usgs_daily($cont){	
    $result_object=array();	
	$my_array = explode ("\n",$cont);   //each line
	foreach ($my_array as $line){
					if (substr($line, 0,1) == '#' || substr($line, 0,2) == '5s' || substr($line, 0,5) == 'agenc' || substr($line, 0,2) == '\n') continue;
					//$tmp_arr = explode ("	", $line);
					$each_record = multiexplode(array("	"," "),$line);
					

	unset($each_record[0]);
	unset($each_record[1]);
	
	array_push($result_object, array("datetime"=>$each_record[2],"discharge"=>(int)$each_record[3]));	
	$comma_separated = implode(",", $each_record);
	$out_str.=$comma_separated."\n";	
					 }
	$my_array = explode ("\n",$cont); 
	array_pop($result_object);
	//$result_object_reversed = array_reverse($result_object);
	
	return $result_object;	
	//result format: [{"datetime":(string),"discharge":(int)}]
	
}

function baseflow_calculation($stream_flow_object){
	 $result_object=array();	 
	 
	 foreach ($stream_flow_object as $each_day){
		 //echo ($each_day['discharge']); 
		 
		 $key= array_keys($stream_flow_object, $each_day);
		 if($key[0]==0){
		   array_push($result_object, array("date"=>$each_day['datetime'],"time"=>"00:00:00-06","00060"=>(int)$each_day['discharge'],"direct_runoff"=>(int)0,"act_direct_runoff"=>0,"baseflow"=>0));	 			 
		 }else{
		  $previous_key=(int)$key[0]-1;
		  $direct_runoff=0.91*$result_object[$previous_key]["direct_runoff"]+((1+0.91)/2*($each_day["discharge"]-$stream_flow_object[$previous_key]["discharge"]));
		 if($direct_runoff<0){
			  $act_direct_runoff=0;
		  }else{
			  $act_direct_runoff=$direct_runoff;
		  }

		 $baseflow=(int)($each_day['discharge']-$act_direct_runoff);
	  
		  array_push($result_object, array("date"=>$each_day['datetime'],"time"=>"00:00:00-06","discharge"=>$each_day['discharge'],"direct_runoff"=>$direct_runoff,"act_direct_runoff"=>$act_direct_runoff,"baseflow"=>$baseflow)); 
		 }
		 
	 }
	 //array_pop($result_object);
	 return $result_object;	
	//result format: [{"datetime":(string),"discharge":(int),"direct_runoff":(int),"act_direct_runoff":(int),"baseflow":(int)}]
}

function object_to_csv($data_object){
	 $result_text='';	 
	 foreach ($data_object as $each_day){
	 $key= array_keys($data_object, $each_day);
	 if($key[0]==0){
		  	$result_text.=implode(",", array_keys($each_day))."\n";  	 
		 }
		 
		 $result_text.=implode(",", $each_day)."\n";
		 
	 }
	 return $result_text;	
}
function object_to_csv_withmeta($data_object){
	 
	 $last_record=$data_object[count($cars)-1];
	 
	 $o="O	USGS";
	 $st="ST	Peak Streamflow (USGS-NWIS)";
	 $ad="AD	N\A";
	 $ll="LL	N\A";
	 $v="V	00060	Discharge (cfs)	River Discharge	Discharge	cfs	".$last_record["00060"]."	".$last_record["date"]." ".$last_record["time"]."";
	 $v2="V	baseflow	Baseflow (cfs)	Baseflow Seperation	Baseflow	cfs	".$last_record["baseflow"]."	".$last_record["date"]." ".$last_record["time"]."";
	 $it="TI	".$GLOBALS["start_time"]." to ".$GLOBALS["end_time"];
	 $sep="-----\n";	 

	  
	 $meta_title=$o."\n".$st."\n".$ad."\n".$ll."\n".$v."\n".$v2."\n".$it."\n".$sep;	
	 $result_text=$meta_title;
	 foreach ($data_object as $each_day){
	 $key= array_keys($data_object, $each_day);
	 if($key[0]==0){
		  	$result_text.=implode(",", array_keys($each_day))."\n";  	 
		 }
		 
		 $result_text.=implode(",", $each_day)."\n";
		 
	 }
	 return trim($result_text,"\n") ;	
}

function baseflow_percentage($data_object,$siteID){
	 $stream_flow_sum=0;
	 $baseflow_sum=0;
	 
	 foreach ($data_object as $each_day){
	 $stream_flow_sum+=$each_day["discharge"];
	 $baseflow_sum+=$each_day["baseflow"];
	 }
	 //return $baseflow_sum/$stream_flow_sum;
	 //$dbconn = pg_pconnect("host=127.0.0.1 port=5432 dbname=IWDSS user=haowen password=haowen1") or die('Connection failed'); 
	$result=$baseflow_sum/$stream_flow_sum*100;
	return array("site_id"=>$siteID,"baseflow_percentage"=>$result,"start_date"=>$GLOBALS["start_time"],"end_time"=>$GLOBALS["end_time"]);
	
	
	/*
	$insert_query="INSERT INTO hydrology.baseflow_seperation(sitecode,site_org,baseflow_percentage,method,method_spec,end_date,start_date) VALUES('".$siteID."', 'usgs','".$result."','digital filter','single parameter','".$end_time."','".$start_time."')";
	$res_insert = pg_query($dbconn, $insert_query);
	while ($row = pg_fetch_row($res_insert)) {	 
	}
	*/
}




function multiexplode ($delimiters,$string) {

    $ready = str_replace($delimiters, $delimiters[0], $string);
    $launch = explode($delimiters[0], $ready);
    return  $launch;
}


?>
 