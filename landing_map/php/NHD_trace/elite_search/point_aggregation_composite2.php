<?php


include_once('watershed_search_composite/geoPHP/geoPHP.inc');
include_once('watershed_search_composite/dss_ws_config.php');
include_once('watershed_search_composite/ws_search_utility.php');




parse_str($_SERVER['QUERY_STRING'],$request);



/*start of search engine input*/

/*if lat and long remaines -1, them the script should use HUC connectivity to trace, if they are not -1, it means the input is not HUC number, but a spatial point on the map*/
/*in this script, we only focus on comid search, which uses coordinates instead of HUC number*/

 
/*end of search engine input*/

query_string_controller($request);


function query_string_controller($request){
	
	if(isset($request['lat']) && isset($request['lng'])){  //check if request is coordinates
				
		$comid_poi=get_poi::get_huc_from_coord($request['lat'],$request['lng'],'catchment');
		$upstream_comid=trace_watershed::upstream_via_comid($comid_poi[0]);
			
	} //end of coordinate request
	
	if(isset($request['huc'])){  //check if request is huc watershed
		
	} //end of coordinate huc watershed request	
	
}

	



	



?>
