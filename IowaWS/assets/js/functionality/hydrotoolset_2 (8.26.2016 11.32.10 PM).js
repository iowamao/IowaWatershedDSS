// JavaScript Document
//require script fist to load all app
//The nature of this script is "config", so all function are generated inside of it
script_manager(["assets/js/utility/plotting.js","assets/js/functionality/ifis_watershed.js"]);	



 

 var dss_app_settings_hydro_tool2={
	 "resource_statistic":{
	 "sidebar_ui_html":'<div id="tools_search" class="panel-collapse collapse in"><div class="panel-body"><p style="color:#0493d3; font-weight: bold" ><input id="watershed_resource_search" type="checkbox" name="search-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" >&nbsp;Enable Search</p><p style="color:#0493d3; font-weight: bold"><br> <label for="discharge_result">Landuse Statistic:</label> <div id="watershed_resource_search_result" style="height:250px;overflow:scroll" class="form-control" rows="8"></div> <br><button id="watershed_resource_search_clear_search" class="form-control btn btn-primary" > &nbsp;Clear Result&nbsp; </button></p></div></div>',
	 "sidebar_ui_title":"Resource statistics",
	 "app_btn_id":"landuse_resource_statistic",
	 "app_leaflet_layer":"main",//window["script_temp_data"]+"_leaflet_layers",
	 "panel_id":"landuse_resource_statistic_panel", //this is for configure only
	 },
 };
var function_btn_event_list_hydro_tool2={	
	"resource_statistic":{
			//the order of this does matters as it is referenced in the corresponding script
			"name":"Resource statistics",
			"btn_id":dss_app_settings_hydro_tool2["resource_statistic"]["app_btn_id"],
			"dss_script":[], 
			"event":function(){
						
						loading_sidebar(dss_app_settings_hydro_tool2["resource_statistic"]);
						
						$("#watershed_resource_search").bootstrapSwitch(); 
						
						watershed_resource_search_event();
	
				
			},			
			},//end of the first btn
	
	
}

var tool_set_plugin_spec2={
		"planning_category_Tool":[
			function_btn_event_list_hydro_tool2["resource_statistic"],
		],	
	};
	
	
parse_app_btn_event(tool_set_plugin_spec2);		


var Huc_ws_trace_style={
	            fill:true,
				stroke:"#ff0066",
				weight: 1,
				opacity: 0.5,
				color: '#ff0066',
				fillOpacity: 0.02	
						};

function watershed_resource_search_event(){	
		
	map.on('click', function(e) {		
		
			if($("#watershed_resource_search").bootstrapSwitch('state')==true){
	
			 //console.log($("#watershed_search").val());
			 
				window["ifis_search_result"].clearLayers();	


				
		
				//instant_watershed(map,Huc_ws_trace_style,e.latlng.lat,e.latlng.lng, 500,"fit");
			    ifis_ws_search(map,Huc_ws_trace_style,e.latlng.lat,e.latlng.lng,500,"fit","9x9"); 
				
				watershed_resource_search({'lat':e.latlng.lat,'lng':e.latlng.lng,'display_id':"watershed_resource_search_result"});
				
				//layer:window["ifis_search_result"],display_id:
			}
		
	});	//end of map click
		
	 $(document).on("click","#watershed_resource_search_clear_search",function() {
		window["ifis_search_result"].clearLayers();	
        $("#watershed_resource_search_result").html("");	

	});
	
	$("#watershed_resource_search").on('switchChange.bootstrapSwitch', function(event, state) { 
	if(state==true){
		$('#map').css('cursor','crosshair');
	}else{
		
		$('#map').css('cursor','grab');
		$('#watershed_resource_search_result').html("");
		
	}	
	});	  

	function watershed_resource_search(options){
		$("#"+result_box).html("");
	
		var result_box=options["display_id"];
		var lat=options["lat"];		 
		var lng=options["lng"];			 
					 
				
				 
					
				 //console.log(first_geom["feature"]);
				 $.ajax({
								  url : "../landing_map/php/NHD_trace/elite_search/point_aggregation_resource.php?lat="+lat+"&lng="+lng,							  
								  type: "get",
								  async: false,
								  dataType : 'json',
								  jsonpCallback: 'getJson',


								  
						success: function(data){
								   //console.log(data);							   
								   var result="Water: "+data["water"].toFixed(2)+"%<br>Wetland: "+data["wetland"].toFixed(2)+"%<br>Urban: "+data["structures"].toFixed(2)+"%<br>Corn: "+data["corn"].toFixed(2)+"%<br>Soybeans: "+data["soybeans"].toFixed(2)+"%<br>Coniferous Forest: "+data["coniferous_forest"].toFixed(2)+"%<br>Deciduous Short: "+data["deciduous_short"].toFixed(2)+"%<br>Deciduous Medium: "+data["deciduous_medium"].toFixed(2)+"%<br>Deciduous Tall: "+data["deciduous_tall"].toFixed(2)+"%<br>Grass: "+(data["grass_1"]+data["grass_2"]).toFixed(2)+"%<br>Cut Hay: "+data["cut_hay"].toFixed(2)+"%<br>Barren_ Fallow: "+data["barren__fallow"].toFixed(2)+"%";
								   $("#"+result_box).html(result);
							}
					});	//end of ajax	
			 
	}	
}





						
						

/*

$(".planning_no_data_btn").remove();
var discharge_btn='<li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="landuse_resource_statistic" class="sidebar-control generic_planning">&nbsp;&nbsp;Estimate Discharge</a></li>';
$(".planning_tab").append(discharge_btn);

$(".generic_planning").on("click",function() {
	
       var menu_click_id=this.id;
	  $(".function_panel").hide();
		if($('#'+menu_click_id+"_panel").length == 0) {
			
			$("#utility_panel").append(idot_dss_html[menu_click_id]);
			idot_dss_functions[menu_click_id]();
		}else{
			$('#'+menu_click_id+"_panel").remove();
		}
});


*/
