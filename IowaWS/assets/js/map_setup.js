// Map setup
// Third level data


/*---------------*/
/*
 $(".navbar-inverse").css("background-color", "#009933");
 $(".navbar-inverse").css("border-color", "#006600");
*/

/* --------------------------Map Inilization-----------------------*/
var basemap={	
	"esri":{
	"imagery":new L.esri.basemapLayer("Imagery"),
	"Road":new L.esri.basemapLayer("Streets"),
	"topo":new L.esri.basemapLayer("Topographic"),
	"nation_geo":new L.esri.basemapLayer("NationalGeographic"),
	"shadedRelief":new L.esri.basemapLayer("ShadedRelief",{  opacity : 0.4,position:'front'}),		
	},
	"USGS":{
	"national_map":new L.TileLayer('http://basemap.nationalmap.gov/ArcGIS/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {maxZoom: 15, attribution: "<a href='http:usgs.gov'>USGS</a> National Map Data"},{noWrap: true}),
	"NHD_map":new L.TileLayer('http://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroNHD/MapServer/tile/{z}/{y}/{x}', {maxZoom: 15, attribution: "<a href='http:usgs.gov'>USGS</a> NHD Map Data"}),	
	},
	"google":{
	"imagery":new L.Google(),
	"google_terrain":new L.Google('TERRAIN'),		
	},
	"map_quest":new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {attribution:'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">'}),
	"open_street_map":new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
}
var baseMapsControl = { 
  "Road Map": basemap["esri"]["Road"],
  //"Road Map Quest": basemap["map_quest"],
  "National HydroGraph Map": basemap["USGS"]["NHD_map"],
  "Topographic Map": basemap["USGS"]["national_map"]/*esri_nation_geo*/, 
  "Imagery Map 2011":basemap["esri"]["imagery"],
  "Imagery Map 2013":basemap["google"]["imagery"],
  "Google Terrain":basemap["google"]["google_terrain"],
};


/*-----------Map use default state boundary, which will be modified later --------------------*/
var map = L.map('map', {
    center: [42.000, -93.911],
    zoom: 9,
//crs: L.CRS.EPSG102100,  -- do not apply this, it will break the geoserver wms
 continuousWorld: true,
 zoomControl:false,
layers: [basemap["google"]["google_terrain"]],
});
var map_scale=L.control.scale({"position":"bottomleft","maxWidth":200});
map_scale.addTo(map);


/* --------------------------End of Map Inilization-----------------------*/

var dss_project = dss_core.dss_controls.getQueryVariable("project");
var dss_ws = dss_core.dss_controls.getQueryVariable("dss-ws");
var ws_mask_name = dss_core.dss_controls.getQueryVariable("ws_route");


//watershed-name

window["dss_query_string"]={
	"dss_project":dss_core.dss_controls.getQueryVariable("project"),
	"dss_ws":dss_core.dss_controls.getQueryVariable("dss-ws"),
	"ws_mask_name":dss_core.dss_controls.getQueryVariable("ws_route"),
    "ws_boundary":dss_core.dss_controls.getQueryVariable('wbd'),
	"ws_title":(dss_core.dss_controls.getQueryVariable("ws_route")).split("-"),
}


function determine_special_project(query_string_obj){
	var project=query_string_obj["dss_project"];
	var ws_key=query_string_obj["dss_ws"]; 
	
	if(project=="yes"&&ws_key!="default"){
		var project_obj=ws_project_generate_project_prompt(ws_key,watershed_projects,project_detail,"info");
		var project_key=project_obj["project_key"];
		window["dss_query_string"]["list"]=project_key;
		return project_key;
		//console.log(ws_project_generate_project_prompt(ws_key,watershed_projects,project_detail,"info"));
		
	}else{
		return "no_model_by_ws";
	}
}









function generate_app_title_bar(title_obj){
	if(title_obj.length>1){
		var ws_type=title_obj[0];
		var ws_title=title_obj[1];
		var title_html="";
			title_html=parse_project_ws_name();
		if(ws_type.indexOf("HUC")>-1){
			title_html= ws_type+": "+ws_title;	
		}
		if(ws_type.indexOf("city")>-1){
			title_html=capitalizeFirstLetter(ws_title);	
		}
		if(ws_type.indexOf("county")>-1){
			title_html=ws_title+" "+capitalizeFirstLetter(ws_type);	
		}
		if(ws_type.indexOf("point")>-1){
			title_html=capitalizeFirstLetter(ws_title.replace("_"," ")+"  "+ws_type.replace("_"," "));	
			
		}

		
	}else{
		if(title_obj[0].indexOf("state")>-1 || title_obj[0].indexOf("IDOT")>-1){
			title_html="State of Iowa";	
			
		}else{
			title_html=parse_project_ws_name();
		}
		
	} 
	
	$("#watershed-name").append('<p>'+title_html+'</p>');
	
		function parse_project_ws_name(){
			if(window["dss_query_string"]["dss_project"]!="default"){
				var temp_array=window["dss_query_string"]["dss_ws"].split("-");
				var temp_ws_array;
				if(temp_array.length>1){
					temp_ws_array=temp_array[1].split("_");
				}else{
					temp_ws_array=temp_array[0].split("_");
				}
				
				var result="";
				for(var each in temp_ws_array){
					result+=capitalizeFirstLetter(temp_ws_array[each])+" ";			
				}
				return result;
				
			}else{
				return "";
			}

		}	
		

}

generate_app_title_bar(window["dss_query_string"]["ws_title"])

/*
<script src="assets/js/dss_core/leaflet_core_function.js"></script>
*/





window["function_event_list_main"]={
	"initialize":{
		"Flood_Mitigation_Analysis":{
			//the order of this does matters as it is referenced in the corresponding script
			"name":"Flood mitigation analysis (actual ponds)",
			"btn_id":"HUD",
			"dss_script":["assets/js/dss_app/hud/hud_setup.js"], 
            "sidebar_width":"450px",			
            "type":"initialize",			
			},
		"Flood_Mitigation_Analysis_Tony":{
			//the order of this does matters as it is referenced in the corresponding script
			"name":"Flood mitigation analysis (simulated ponds)",
			"btn_id":"HUD_t",
			"dss_script":["assets/js/dss_app/hud_tony/hud_tony_setup.js"], 
            "sidebar_width":"450px",			
            "type":"initialize",			
			},
		"Flood_Damage_Reduction_Analysis":{
			//the order of this does matters as it is referenced in the corresponding script
			"name":"Flood damage reduction analysis",
			"btn_id":"FSA",
			"dss_script":["assets/js/dss_app/fsa/fsa_setup.js"],  
			"sidebar_width":"450px",
            "type":"initialize",	
		
			},
		"Real_Time_Data":{					
			//the order of this does matters as it is referenced in the corresponding script
			"name":" Active data layers",
			"btn_id":"variableLayers",
			"dss_script":["assets/js/functionality/current_status.js"],            		
			"type":"initialize",
			},
		"USGS_baseflow":{					
			//the order of this does matters as it is referenced in the corresponding script
			"name":" USGS Baseflow",
			"btn_id":"usgs_baseflow",
			"dss_script":["assets/js/functionality/usgs_baseflow.js"],            		
			"type":"initialize",
		},
		"surveyed_culvert":{					
			//the order of this does matters as it is referenced in the corresponding script
			"name":"Sedimentation Matrix",
			"btn_id":"surveyed_culvert_baseflow",
			"dss_script":["assets/js/dss_app/iowa_culvert/surveyed_result/survey_correlation.js"],            		
			"type":"initialize",
		},
		"sediment_analysis":{					
			//the order of this does matters as it is referenced in the corresponding script
			"name":"Sedimentation Analysis",
			"btn_id":"idot_sedanalysis", 
			"dss_script":["assets/js/dss_app/iowa_culvert/sediment_analysis/culvert_sed_analysis.js"],            		
			"type":"initialize",
		},
	}, //end of initialize
	"configure":{
		"Iowa_Culvert_Package":{					
			//the order of this does matters as it is referenced in the corresponding script
			"name":null, //not btn triggered
			"btn_id":null,
			"dss_script":["assets/js/dss_app/iowa_culvert/idot_setup.js"],
			"type":"configure",			
			
			},
		"Iowa_Culvert_Package_DSS_menue_modification":{					
			//the order of this does matters as it is referenced in the corresponding script
			"name":null, //not btn triggered
			"btn_id":null,
			"dss_script":["assets/js/dss_app/iowa_culvert/idot_dss_menu_configure.js"],
			"type":"configure",			
			
	},	"Iowa_Culvert_Package_DSS_menue_modification_class":{					
			//the order of this does matters as it is referenced in the corresponding script
			"name":null, //not btn triggered
			"btn_id":null,
			"dss_script":["assets/js/dss_app/iowa_culvert/idot_dss_menu_configure_class.js"],
			"type":"configure",			
			
	},
		"Hydrologic_Toolsets_Package":{
			//the order of this does matters as it is referenced in the corresponding script
			"name":null, //not btn triggered
			"btn_id":null,
			"dss_script":["assets/js/functionality/hydrotoolset_1.js"], 
            "type":"configure",				
			},
		"Hydrologic_Toolsets_Package2":{
			//the order of this does matters as it is referenced in the corresponding script
			"name":null, //not btn triggered
			"btn_id":null,
			"dss_script":["assets/js/functionality/hydrotoolset_2.js"], 
            "type":"configure",				
			},
		"Data_domain":{
			//the order of this does matters as it is referenced in the corresponding script
			"name":null, //not btn triggered
			"btn_id":null,
			"dss_script":["assets/js/functionality/data_domain.js"], 
            "type":"configure",				
			},
		"Iowa_state_dss":{
			//the order of this does matters as it is referenced in the corresponding script
			"name":null, //not btn triggered
			"btn_id":null,
			"dss_script":["assets/js/dss_app/state/state_setup.js"], 
            "type":"configure",				
			},
	}//end of configure
	
			
}

window["project_plugin_spec"]={
	"State":{		
		"config":[
			window["function_event_list_main"]["configure"]["Iowa_state_dss"],			
					
		],		
	},	
	"HUD|IA_WS|sun":{		
		"planning_category_SA":[
			window["function_event_list_main"]["initialize"]["Flood_Mitigation_Analysis"],
		],
		"config":[
			window["function_event_list_main"]["configure"]["Hydrologic_Toolsets_Package"],
					
		],		
	},
	"HUD|IA_WS|tony":{		
		"planning_category_SA":[
			window["function_event_list_main"]["initialize"]["Flood_Mitigation_Analysis_Tony"],
		],
		"config":[
			window["function_event_list_main"]["configure"]["Hydrologic_Toolsets_Package"],	
			
		],		
	},
	"FSA|Pilot":{		
		"planning_category_SA":[
			window["function_event_list_main"]["initialize"]["Flood_Damage_Reduction_Analysis"],
		],
		"config":[
			window["function_event_list_main"]["configure"]["Hydrologic_Toolsets_Package"],			
		],		
	},
	"Current_Status":{		
		"current_status_category":[
				window["function_event_list_main"]["initialize"]["Real_Time_Data"],
		],	
	},
	"IDOT":{		
		"config":[
			window["function_event_list_main"]["configure"]["Iowa_Culvert_Package"],
			//window["function_event_list_main"]["initialize"]["Real_Time_Data"],	  //this package can be used for both UI initialization and function configuration		
		],
		"culvert_sedimentation_catagory":[
		window["function_event_list_main"]["initialize"]["surveyed_culvert"],  
		window["function_event_list_main"]["initialize"]["sediment_analysis"],
		
		
		]
		
	
	},
	"IDOT_DSS":{		
		"config":[
			window["function_event_list_main"]["configure"]["Iowa_Culvert_Package"],
			window["function_event_list_main"]["configure"]["Iowa_Culvert_Package_DSS_menue_modification_class"], 
			window["function_event_list_main"]["configure"]["Hydrologic_Toolsets_Package"],		
		],	
		"current_status_category":[
				window["function_event_list_main"]["initialize"]["Real_Time_Data"],
		],	
		"culvert_sedimentation_catagory":[
		window["function_event_list_main"]["initialize"]["surveyed_culvert"],
		
		]
	},
	"hydrologic_toolsets":{	
		"config":[
			window["function_event_list_main"]["configure"]["Hydrologic_Toolsets_Package"],			
		],	
	},
	"hydrologic_toolsets2":{	
		"config":[
			window["function_event_list_main"]["configure"]["Hydrologic_Toolsets_Package2"],			
		],	
	},
	"usgs_baseflow":{
		"planning_category_Tool":[
			window["function_event_list_main"]["initialize"]["USGS_baseflow"],
		]
	},	
	"Data_domain":{		
		"config":[
			window["function_event_list_main"]["configure"]["Data_domain"],			
		],	
	},	

};

window["query_string_controller"]={
	"always":{  
		//"real_time":project_plugin_spec["Current_Status"],
		"data_domain":project_plugin_spec["Data_domain"],
		"usgs_baseflow":project_plugin_spec["usgs_baseflow"],
		"hydro_tool":project_plugin_spec["hydrologic_toolsets"],
		"hydro_tool2":project_plugin_spec["hydrologic_toolsets2"],
	},
	"default":{
		"hydro_tool":project_plugin_spec["hydrologic_toolsets"],
		"usgs_baseflow":project_plugin_spec["usgs_baseflow"],
	},
	"dss_project":{
		"IDOT":project_plugin_spec["IDOT"],
		"IDOT_DSS":project_plugin_spec["IDOT_DSS"],
		"default":project_plugin_spec["hydrologic_toolsets"],
		"state":project_plugin_spec["State"],		
	},
	"dss_ws":{		
	// place holder for future dev		
	
	},
	"ws_mask_name":{		
	// place holder for future dev		
	},
    "ws_boundary":{		
	// place holder for future dev	
	},
	"dss_model_by_ws":{
		"HUD|IA_WS|sun":project_plugin_spec["HUD|IA_WS|sun"],
		"FSA|Pilot":project_plugin_spec["FSA|Pilot"],
		//"IDOT":project_plugin_spec["IDOT"],
		//"IDOT_DSS":project_plugin_spec["IDOT_DSS"],
		"default":project_plugin_spec["hydrologic_toolsets"],
		"HUD|IA_WS|tony":project_plugin_spec["HUD|IA_WS|tony"],
		//"state":project_plugin_spec["State"],
		
	},

};

window["scripts_loading"]={
	"sidebar-status":"off",
	"active-btn":"",
	"app_layer_loading":[],	
};





var exceptial_project=["IDOT_DSS","state","IDOT"];
if(exceptial_project.indexOf(window["dss_query_string"]["dss_project"])>-1){
var model_by_ws_list=determine_special_project(window["dss_query_string"]);
if(model_by_ws_list!='no_model_by_ws'){

var project_ws_list=model_by_ws_list.split("+");
for (var index in project_ws_list){	
	var each_ws_proj=project_ws_list[index]; //split project and watershed in the "project" query string	
	var each_proj_ws=window["dss_query_string"]["dss_ws"];	
	//console.log(each_ws_proj+" "+each_proj_ws);
	if(window["query_string_controller"]["dss_model_by_ws"].hasOwnProperty(each_ws_proj)){  //test if the project is defined in the project_plugin_spec obj		
		//console.log(each_ws_proj);
		var project_spec=window["query_string_controller"]["dss_model_by_ws"][each_ws_proj];
		parse_app_btn_event(project_spec,each_proj_ws);
	}	
}//end of for loop for project query string
}//end of testing if there are model by ws

var project_list=window["dss_query_string"]["dss_project"].split("+");
for (var each_pj in project_list){	
	var each_proj=project_list[each_pj];
	if(window["query_string_controller"]["dss_project"].hasOwnProperty(each_proj)){  //test if the project is defined in the project_plugin_spec obj		
		//console.log(each_proj);
		var project_spec=window["query_string_controller"]["dss_project"][each_proj];
		parse_app_btn_event(project_spec,each_proj_ws);
	}

}
}






for (var each_index in window["query_string_controller"]["always"]){
	var each_proj_spec=window["query_string_controller"]["always"][each_index];	
    parse_app_btn_event(each_proj_spec);		
}



function parse_app_btn_event(project_spec,each_proj_ws){
	//console.log(each_proj_ws);
	for(var tab_name in project_spec){  //tab name is the category name
	
	     
	     if(tab_name!="config"){
			 
				var tab_cat=project_spec[tab_name];
				for(var app_btn_index in tab_cat){	
				
				
							
						if ($('.'+tab_name+"_no_data_btn").length > 0) { //remove the default no data btns
							$('.'+tab_name+"_no_data_btn").remove();							
						}// this lines of code will remove no_data btns
						
						$(".dropdown-toggle").dropdown();  //this is for ipad and iphone debugging
				
						var app_btn_obj=tab_cat[app_btn_index];
						
						
						//window["script_temp_data"]=app_btn_obj['btn_id']+"-"+each_proj_ws;
						//window["script_temp_ws"]=each_proj_ws;
						
						
						//console.log(app_btn_obj);
						var name=app_btn_obj["name"];
						var id=app_btn_obj["btn_id"]+"-"+each_proj_ws;	
						var btn_html="<li><a data-toggle='collapse' data-target='.navbar-collapse.in' id='"+id+"' class='sidebar-control'><i></i>&nbsp;&nbsp;"+name+"</a></li>";			
						$("."+tab_name).append(btn_html); 
						//}
						generate_dss_app_event(app_btn_obj);
						

						

			}//end of app ben obj parse	 
		}//not config app, but button triggered	
		
		if(tab_name=="config"){			 
				var tab_cat=project_spec[tab_name];
				for(var app_btn_index in tab_cat){	
					
					var app_btn_obj=tab_cat[app_btn_index];
					window["script_temp_data"]=app_btn_obj['btn_id'];
					window["script_temp_ws"]=each_proj_ws;
					//console.log("config_loading");
					//console.log(app_btn_obj["dss_script"]);
					script_manager(app_btn_obj["dss_script"]);	
					

	
			}//end of app ben obj parse	 
		}//not config app, but button triggered	
		
	
	}	
				
				function generate_dss_app_event(app_btn_obj){
	
						
						//$(document).on("click","#"+app_btn_obj["btn_id"],function(){    //temperorily do not use document.click, becasue it doesn't work on ipad and safria
							$("#"+id).click(function(){  // this event works on ipad
							
										var btnid_project_list=(this.id).split("-");
										
										if(app_btn_obj.hasOwnProperty("sidebar_width")){
											$("#sidebar").css("width", app_btn_obj["sidebar_width"]); 
										}else{
											$("#sidebar").css("width", "350px"); 
										}
										
										//first, has to test if script needs to be loaded and UI should be initilized
										var sidebar_app_holder="<div class='"+app_btn_obj['btn_id']+"_panel function_panel panel-collapse collapse in'></div>"	
										var sidebar_app_holder_id=app_btn_obj['btn_id']+"_panel";									
										var array1=app_btn_obj["dss_script"];
										var array2=window["dss_scripting"];	
										
										window["script_temp_data"]=btnid_project_list[0];
										window["script_temp_ws"]=btnid_project_list[1];
										
										var project_layer_id=leaflet_map_control.dss_leaflet_layer_group(app_btn_obj['btn_id']);// construct_object
										
										
										$(".function_panel").hide();	
																
										if(!superbag(array2, array1) || app_btn_obj["dss_script"].length==0){   // by checking the script, it will determine if the "initization script" if loaded
										
														// This ID is very import for the control panel of a specific app to be displayed
										
										
										remove_all_dss_layer(scripts_loading["app_layer_loading"]);
										
										if(scripts_loading["app_layer_loading"].indexOf(project_layer_id)==-1){
											scripts_loading["app_layer_loading"].push(project_layer_id);
										}
										
										if($("#"+sidebar_app_holder_id).length == 0){                   // by checking the script, it will determine if the "configure script" if loaded
										$("#utility_panel").append(sidebar_app_holder);	                //create a place holder for the intended application in the sidebar
										script_manager(app_btn_obj["dss_script"]);	
										//first time configure, will load the event and define the event							
										if(app_btn_obj.hasOwnProperty("event")){			          // This part is used for "configure script" to generate button events when multiple functions are in single script			
											app_btn_obj["event"]();
										}// End of the part that is used for "configure script" to generate button events when multiple functions are in single script		
										} // end of check first load of "config script"
										$("."+sidebar_app_holder_id).show();	// for safty, it will show the control panel for the invoked app
										}else{
											remove_all_dss_layer(scripts_loading["app_layer_loading"]);
											
											/*--------------logical test, if the user doent click the same btn twice--------------*/
											if(app_btn_obj["btn_id"]!=scripts_loading["active-btn"]){  
												$("."+sidebar_app_holder_id).show();				         // show the dss app panel								
											    dss_layer_group_handler(project_layer_id,"add");			 //show the dss app leaflet layer
																		//this section is used in sider bar control, it is moved to this part for safe
											}else{
												//console.log("same not load"); 
											}
											/*--------------end of logical test, if the user doent click the same btn twice--------------*/
											
										}
						});
	
	
			}
}

function remove_all_dss_layer(sidebar_app_holder_id_list){
	for(var each_index in sidebar_app_holder_id_list){
		var sidebar_holder_id=sidebar_app_holder_id_list[each_index];
		dss_layer_group_handler(sidebar_holder_id,"removal");
		
	}	
	
}




/*----------this section is the sidebar show/hide control-------------------------*/
  $(document).on("click",".sidebar-control",function() {
	


  
   //console.log(scripts_loading["sidebar-status"]);
   if(scripts_loading["sidebar-status"]=="off"){
	   scripts_loading["sidebar-status"]="on";
	   scripts_loading["active-btn"]=this.id;	   
	   $("#sidebar").toggle();
	   //setTimeout(function(){ map.fitBounds(map_boundary.customized_boundary); }, 500);
	   
   }else{
	   if(this.id==scripts_loading["active-btn"]){
		scripts_loading["sidebar-status"]="off";
		$("#sidebar").toggle();
		//setTimeout(function(){ map.fitBounds(map_boundary.customized_boundary); }, 500);
		scripts_loading["active-btn"]="";
		//$(".function_panel").hide();  		   
	   }else{
		 scripts_loading["active-btn"]=this.id;  
	   }
	   
   }
   
});

/*----------end of sidebar show/hide control section-------------------------*/






/*
var UI_menue_configure=[
"planning_category":{
	
	
},
"current_status_category":{
	
	
},
"forecast_category":{
	
	
},
"forecast_category":{
	
	
},
"generic_question_category":{
	
	
}
];
*/



/*
	map.fitBounds([
    [40.254, -96.634],
    [43.530, -90.053]
		]);

*/





/* --------------------------Map Modification Inilization-----------------------*/

var map_boundary={
	"state_boundary":[
    [40.37544, -96.639485],
    [43.501196, -90.140061]],
	"customized_boundary":function(ws_bd_obj){
		
			if(ws_bd_obj!="default"){
				return JSON.parse(ws_bd_obj);
			}else{
				return [[40.37544, -96.639485],[43.501196, -90.140061]];
			}	
	},
	
}

map.fitBounds(map_boundary.customized_boundary(window["dss_query_string"]["ws_boundary"]));
leaflet_wms.nhd_dynamic_river_layer(map,"wms_nhd_river",3);
//console.log(map_boundary.customized_boundary(window["dss_query_string"]["ws_boundary"]));



leaflet_map_control.map_basic_control_blocks(map,map_boundary.customized_boundary(window["dss_query_string"]["ws_boundary"]),baseMapsControl);

/* --------------------------End of Map Modification Inilization-----------------------*/

/*-------------------------UI Map sizing modification -----------------*/
ui_element_control["window_resize_nav_map_css"]();
window.addEventListener("resize", ui_element_control["window_resize_nav_map_css"]);
/*-------------------------End of UI Map sizing modification -----------------*/


var Main_layer_styles={
	"Huc_Default_style":{
	            weight: 2,
                opacity: 0.5,
                fillColor: '#FFFFFF ',
				color: '#999999  ', //#999999     color: '#0099FF ',
                fillOpacity: 0.1,
				stroke:true,
				fill:true	},
	"Huc_Highlight_style":{
	            fill:true,
				stroke:"#FF3399",
				weight: 5,
				opacity: 1,
				color: '#FF3399',
				fillOpacity: 0.3 	
						},
	"Huc_ws_trace_style":{
	            fill:true,
				stroke:"#0066FF",
				weight: 5,
				opacity: 1,
				color: '#0066FF',
				fillOpacity: 0.02	
						},
	"project_Default_style":{
		        weight: 3,
                opacity: 1,
                color: '#800000',
                fillOpacity: 0.01,
				fill:true,
				stroke:true  },
	"mask_style":{
				weight: 2,
                opacity: 0.7,
                fillColor: '#FFFFFF ',
				color: '#999999 ',
                fillOpacity: 0.6,
				stroke:true,
				fill:true,				   
			   },
	"poi_bd_style":{
		
				fill:false,
				stroke:"#6600FF",
				weight: 5,
				opacity: 1,
				color: '#FF3399',
				fillOpacity: 0.1,							
			},
	"Huc_ws_trace_mask_style":{
				weight: 5,
                opacity: 1,
                fillColor: '#FFFFFF ',
				color: '#0066FF ',
                fillOpacity: 0.6,
				stroke:true,
				fill:true,	

						},
		
	};//end of layer style
	
		
			   
var Main_layer_features={
"iowa":{
"layer_group":"main",
"geometery_type":"regular",
"default_style":Main_layer_styles.mask_style,
"default_layer":"yes",
"url":"data/state_data/iowa_state_mask.json",
"onEachFeature":function (feature, layer){
	if(window["dss_query_string"]["dss_project"]=="state"){
		
	$( document ).ajaxComplete(function( event, xhr, settings ) {
	if ( settings.url === "data/state_data/iowa_state_mask.json" ) {
	dss_core.layer_event.mask_cliping_hydro_semantics(feature,layer);
	  }
	});	
		
	}
	
},
},
"WBD":{
"layer_group":"main",
"geometery_type":"regular",
"default_style":Main_layer_styles.Huc_ws_trace_mask_style,
"default_layer":"query_string_mask_fit_bound",
"url":"data/temp_WBD/"+ws_mask_name+".json",

"onEachFeature":function (feature, layer){
	
	$( document ).ajaxComplete(function( event, xhr, settings ) {
	if ( settings.url === "data/temp_WBD/"+ws_mask_name+".json" ) {
	dss_core.layer_event.mask_cliping_hydro_semantics(feature,layer);
	  }
	});	
	
	if(window["dss_query_string"]["dss_project"]!="default"){
		layer.setStyle(Main_layer_styles.mask_style);
	}
},
},

};// end of feature layer object


//--------------------------------------------------------------------------------------------------------------

leaflet_map_control.Layer_initialization(map,Main_layer_features);
window['main']["WBD"].getBounds();



var Main_poi_layer_features={
	"poi_boundary":{
"layer_group":"main",
"geometery_type":"regular",
"default_style":Main_layer_styles.poi_bd_style,
"default_layer":"query_string",
//"bringtofront":"yes",
"url":"data/temp_WBD/poi"+ws_mask_name+".json",
"onEachFeature":function (feature, layer){
	//dss_core.layer_event.mask_cliping_hydro_semantics(feature,layer);
},
}};
if(window["dss_query_string"]["dss_project"]=="default"){
	

	
	$( document ).ajaxComplete(function(event, xhr, settings) {
	if ( settings.url === "data/temp_WBD/"+ws_mask_name+".json" ) {
		leaflet_map_control.Layer_initialization(map,Main_poi_layer_features);
		var legend_text="<p ><b style='font-size:16px; color:#0066FF;'>|&nbsp;</b><b  style='font-size:16px; color:#0D0D0D;'>POI drainage area </b></p ><p ><b  style='font-size:16px; color:#FF3399;'>|&nbsp;</b><b style='font-size:16px; color:#0D0D0D;'>Selected POI </b></p>";
		var style="style='position: absolute;  padding: 5px 10px; background-color: rgba(255, 255, 255, 0.5); border-color: rgba(255, 255, 255, 0.9);'";
		leaflet_legend(legend_text);
	}});
	
}



ui_element_control["navbar_collapse"]();



