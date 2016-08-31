// JavaScript Document
//require script fist to load all app
//The nature of this script is "config", so all function are generated inside of it
console.log("?")

script_manager(["assets/js/utility/spin.min.js","assets/js/utility/simple_statics.js","assets/js/functionality/current_status_live_data.js"]);
 //"assets/js/functionality/current_status_live_data.js"

 var pupover='data-toggle="popover" data-trigger="hover" title="" data-content="Coming Soon!" data-placement="top"  ';
 
 
 
 window["sensor_data"]={};
 var non_structure_data_domain_btns={
	 "hydrology_domain":[
	 '<p style="color:#0493d3; font-weight: bold" > <input id="stream_stages" type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch">&nbsp;&nbsp;&nbsp;Stream Stages</p>',
	 '<p style="color:#0493d3; font-weight: bold"> <input id="stage_discharge,stream_stages" type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch">&nbsp;&nbsp;&nbsp;Stream Stage & Discharge</p>',
	 '<p style="color:#0493d3; font-weight: bold" '+pupover+'> <input  type="checkbox"  name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch" disabled="true" >&nbsp;&nbsp;&nbsp;Lake Levels</p>',
	 '<p style="color:#0493d3; font-weight: bold" '+pupover+'> <input  type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch" disabled="true">&nbsp;&nbsp;&nbsp;Runoff Potential</p>',
	 
	 //'<p style="color:#0493d3; font-weight: bold"> <input id="stage_discharge" type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch">&nbsp;&nbsp;&nbsp;Discharge</p>',
	 ],
	 "geomorphology_domain":[
	 '<p style="color:#0493d3; font-weight: bold" '+pupover+'> <input id="soil_types" type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch"  disabled="true">&nbsp;&nbsp;&nbsp;Soil Types</p>',
	 '<p><span '+pupover+' style="font-weight: bold"><input type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch" disabled="true"></span><span style="color:#0493d3; font-weight: bold">&nbsp;&nbsp;&nbsp<a href="http://www.mrlc.gov/nlcd2011.php" target="_blank"><u>Land Use</u></a></span></p>',
	 '<p><span '+pupover+' style="font-weight: bold"><input type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch" disabled="true"></span><span style="color:#0493d3; font-weight: bold">&nbsp;&nbsp;&nbsp<a href="http://www.nass.usda.gov/Statistics_by_State/Iowa/Publications/Cropland_Data_Layer/" target="_blank"><u>Land Cover</u></a></span></p>',
	 '<p style="color:#0493d3; font-weight: bold" '+pupover+'> <input id="soil_erosion_potential" type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch"  disabled="true">&nbsp;&nbsp;&nbsp;Soil Erosion Potential</p>',
	 '<p style="color:#0493d3; font-weight: bold" '+pupover+'> <input id="sedimentation_potential " type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch"  disabled="true">&nbsp;&nbsp;&nbsp;Sedimentation Potential</p>',
	 '<p style="color:#0493d3; font-weight: bold" '+pupover+'> <input id="groundwater" type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch"  disabled="true">&nbsp;&nbsp;&nbsp;Groundwater Level</p>',
	 ],
	 "water_quality_domain":[
	 '<p style="color:#0493d3; font-weight: bold" > <input id="nitrate_nitrite" type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch" >&nbsp;&nbsp;&nbsp;Nitrate + Nitrite as N</p>',
	 '<p style="color:#0493d3; font-weight: bold" '+pupover+'> <input type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch" disabled="true" >&nbsp;&nbsp;&nbsp;Temperature (water)</p>',
	 '<p style="color:#0493d3; font-weight: bold" > <input id="ph" type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch" >&nbsp;&nbsp;&nbsp;PH</p>',
	 '<p style="color:#0493d3; font-weight: bold" > <input id="dissolved_oxygen" type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch" >&nbsp;&nbsp;&nbsp;Dissolved Oxygen</p>',
	 '<p style="color:#0493d3; font-weight: bold" > <input id="specific_conductance" type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch" >&nbsp;&nbsp;&nbsp;Specific Conductance</p>',
	 '<p style="color:#0493d3; font-weight: bold" > <input id="turbidity" type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch" >&nbsp;&nbsp;&nbsp;Turbidity</p>',
	 '<p style="color:#0493d3; font-weight: bold" '+pupover+'> <input type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch" disabled="true" >&nbsp;&nbsp;&nbsp;Impaired Streams</p>',
	 ],
	 "meteorology_domain":[
	 '<p style="color:#0493d3; font-weight: bold" > <input id="temp_air" type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch">&nbsp;&nbsp;&nbsp;Temperature (air)</p>',
	 '<p style="color:#0493d3; font-weight: bold" > <input id="precipitation_point" type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch" >&nbsp;&nbsp;&nbsp;Precipitation (point)</p>',
	 '<p style="color:#0493d3; font-weight: bold" '+pupover+'> <input type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch" disabled="true" >&nbsp;&nbsp;&nbsp;Precipitation (radar)</p>',
	 ],
	 "land_water_habitat_domain":[
	 '<p style="color:#0493d3; font-weight: bold" '+pupover+'> <input type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch" disabled="true" >&nbsp;&nbsp;&nbsp;Land Species</p>',
	 '<p style="color:#0493d3; font-weight: bold" '+pupover+'> <input type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch" disabled="true" >&nbsp;&nbsp;&nbsp;Water Species</p>',
	 '<p style="color:#0493d3; font-weight: bold" '+pupover+'> <input type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch" disabled="true" >&nbsp;&nbsp;&nbsp;Endangered Species</p>',
	 ],
	 "socio_economic_domain":[
	 '<p><span '+pupover+' style="font-weight: bold"><input type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch" disabled="true"></span><span style="color:#0493d3; font-weight: bold">&nbsp;&nbsp;&nbsp<a href="http://factfinder.census.gov/faces/nav/jsf/pages/index.xhtml" target="_blank"><u>Census Data (FEMA)</u></a></span></p>',
	 '<p><span '+pupover+' style="font-weight: bold"><input type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch" disabled="true"></span><span style="color:#0493d3; font-weight: bold">&nbsp;&nbsp;&nbsp<a href="http://www.census.gov/geo/maps-data/data/tiger-data.html" target="_blank"><u>Census Data Mapper (FEMA)</u></a></span></p>',
	 '<p><span '+pupover+' style="font-weight: bold"><input type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch" disabled="true"></span><span style="color:#0493d3; font-weight: bold">&nbsp;&nbsp;&nbsp<a href="http://www.census.gov/geo/maps-data/data/tiger-data.html" target="_blank"><u>Demographic & Economic Data</u></a></span></p>',
	 ],
 }
 
 
   //<p style="color:#0493d3; font-weight: bold" > <input id="stream-flow" type="checkbox" name="catagory-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" class="data_layer_switch"> Stream Stages </p> 
 
 
 
 

 
 
 var comming_soon_btn='<center><button type="button" class="btn btn-sm " '+pupover+'>More Data</button></center></br>'
 

 var dss_app_settings_data_domain_tool={
	 "hydrology_domain":{
	 "sidebar_ui_html":'<div id="hydrology_domain" class="panel-collapse collapse in"><div class="panel-body">'+non_structure_data_domain_btns['hydrology_domain'].join('')+'</div></div>'+comming_soon_btn,
	 "sidebar_ui_title":"Hydrology",
	 "app_btn_id":"hydrology_domain_btn",
	 "app_leaflet_layer":"main",//window["script_temp_data"]+"_leaflet_layers",
	 "panel_id":"hydrology_domain_panel", //this is for configure only
	 },
	 "geomorphology_domain":{
	 "sidebar_ui_html":'<div id="geomorphology_domain" class="panel-collapse collapse in"><div class="panel-body">'+non_structure_data_domain_btns['geomorphology_domain'].join('')+'</div></div>'+comming_soon_btn,
	 "sidebar_ui_title":"Geomorphology",
	 "app_btn_id":"geomorphology_domain_btn",
	 "app_leaflet_layer":"main",//window["script_temp_data"]+"_leaflet_layers",
	 "panel_id":"geomorphology_domain_panel", //this is for configure only
	 },
	 "water_quality_domain":{
	 "sidebar_ui_html":'<div id="water_quality_domain" class="panel-collapse collapse in"><div class="panel-body">'+non_structure_data_domain_btns['water_quality_domain'].join('')+'</div></div>'+comming_soon_btn,
	 "sidebar_ui_title":"Water Quality",
	 "app_btn_id":"water_quality_domain_btn",
	 "app_leaflet_layer":"main",//window["script_temp_data"]+"_leaflet_layers",
	 "panel_id":"water_quality_domain_panel", //this is for configure only
	 },
	 "meteorology_domain":{
	 "sidebar_ui_html":'<div id="meteorology_domain" class="panel-collapse collapse in"><div class="panel-body">'+non_structure_data_domain_btns['meteorology_domain'].join('')+'</div></div>'+comming_soon_btn,
	 "sidebar_ui_title":"Meteorology",
	 "app_btn_id":"meteorology_domain_btn",
	 "app_leaflet_layer":"main",//window["script_temp_data"]+"_leaflet_layers",
	 "panel_id":"meteorology_domain_panel", //this is for configure only
	 },
	 "land_water_habitat_domain":{
	 "sidebar_ui_html":'<div id="land_water_habitat_domain" class="panel-collapse collapse in"><div class="panel-body">'+non_structure_data_domain_btns['land_water_habitat_domain'].join('')+'</div></div>'+comming_soon_btn,
	 "sidebar_ui_title":"Land & Water Habitat",
	 "app_btn_id":"land_water_habitat_domain_btn",
	 "app_leaflet_layer":"main",//window["script_temp_data"]+"_leaflet_layers",
	 "panel_id":"land_water_habitat_domain_panel", //this is for configure only
	 },
	 "socio_economic_domain":{
	 "sidebar_ui_html":'<div id="socio_economic_domain" class="panel-collapse collapse in"><div class="panel-body">'+non_structure_data_domain_btns['socio_economic_domain'].join('')+'</div></div>'+comming_soon_btn,
	 "sidebar_ui_title":"Socio-economic",
	 "app_btn_id":"socio_economic_domain_btn",
	 "app_leaflet_layer":"main",//window["script_temp_data"]+"_leaflet_layers",
	 "panel_id":"socio_economic_domain_panel", //this is for configure only
	 },
 };
		var ifc='<div class="round-html-div" style="width:12px;height:12px;background:#BB77FF; border-color:black"><a class="round-div" ></a></div>IFC Bridge Sensor \n';
 		var epa='<div class="round-html-div" style="width:12px;height:12px;background:#cc0000; border-color:black""><a class="round-div" ></a></div>EPA Sensor \n';
		var usgs='<div class="round-html-div" style="width:12px;height:12px;background:#33FFFF; border-color:black""><a class="round-div"></a></div>USGS Streamflow\n';
		var precip='<div class="round-html-div" style="width:12px;height:12px;background:#54ac6d; border-color:black""><a class="round-div"></a></div>IFC Tipping Buckets \n';	
		var sensor_group=ifc+usgs+precip+epa;
var function_btn_event_list={	
	"hydrology_domain":{
			//the order of this does matters as it is referenced in the corresponding script
			"name":"Hydrology",
			"btn_id":dss_app_settings_data_domain_tool["hydrology_domain"]["app_btn_id"],
			
			"dss_script":[], 
			"event":function(){
					     
						loading_sidebar(dss_app_settings_data_domain_tool["hydrology_domain"] );								
						$("[name='catagory-checkbox']").bootstrapSwitch(); 
						
						$(document).ready(function(){								
								$('[data-toggle="popover"]').popover(); 								
							});
						
						
						
						leaflet_legend(sensor_group,"Symbology",'','function_panel');			
			},			
			},//end of the first btn
	"geomorphology_domain":{
			//the order of this does matters as it is referenced in the corresponding script
			"name":"Geomorphology",
			"btn_id":dss_app_settings_data_domain_tool["geomorphology_domain"]["app_btn_id"],
			"dss_script":[], 
			"event":function(){
					
						loading_sidebar(dss_app_settings_data_domain_tool["geomorphology_domain"] );
						$("[name='catagory-checkbox']").bootstrapSwitch(); 
							$(document).ready(function(){								
								$('[data-toggle="popover"]').popover(); 								
							});
						//$("#watershed_search").bootstrapSwitch();						
						//culvert_hydraulic_discharge_event();				
			},			
			},//end of the first btn	
	"water_quality_domain":{
			//the order of this does matters as it is referenced in the corresponding script
			"name":"Water Quality",
			"btn_id":dss_app_settings_data_domain_tool["water_quality_domain"]["app_btn_id"],
			"dss_script":[], 
			"event":function(){
					
						loading_sidebar(dss_app_settings_data_domain_tool["water_quality_domain"] );
						$("[name='catagory-checkbox']").bootstrapSwitch(); 
							$(document).ready(function(){								
								$('[data-toggle="popover"]').popover(); 								
							});

						
						leaflet_legend(sensor_group,"Symbology",'','function_panel');		
			},			
			},//end of the first btn	
	"meteorology_domain":{
			//the order of this does matters as it is referenced in the corresponding script
			"name":"Meteorology",
			"btn_id":dss_app_settings_data_domain_tool["meteorology_domain"]["app_btn_id"],
			"dss_script":[], 
			"event":function(){
						
						loading_sidebar(dss_app_settings_data_domain_tool["meteorology_domain"] );
						$("[name='catagory-checkbox']").bootstrapSwitch(); 
							$(document).ready(function(){								
								$('[data-toggle="popover"]').popover(); 								
							});
						
						leaflet_legend(sensor_group,"Symbology",'','function_panel');			
			},			
			},//end of the first btn
	"land_water_habitat_domain":{
			//the order of this does matters as it is referenced in the corresponding script
			"name":"Land & water habitat",
			"btn_id":dss_app_settings_data_domain_tool["land_water_habitat_domain"]["app_btn_id"],
			"dss_script":[], 
			"event":function(){
					
						loading_sidebar(dss_app_settings_data_domain_tool["land_water_habitat_domain"] );
						$("[name='catagory-checkbox']").bootstrapSwitch(); 
							$(document).ready(function(){								
								$('[data-toggle="popover"]').popover(); 								
							});
						//$("#watershed_search").bootstrapSwitch();						
						//culvert_hydraulic_discharge_event();				
			},			
			},//end of the first btn
	"socio_economic_domain":{
			//the order of this does matters as it is referenced in the corresponding script
			"name":"Socio-economic",
			"btn_id":dss_app_settings_data_domain_tool["socio_economic_domain"]["app_btn_id"],
			"dss_script":[], 
			"sidebar_width":"360px",
			"event":function(){
					
						loading_sidebar(dss_app_settings_data_domain_tool["socio_economic_domain"] );
						$("[name='catagory-checkbox']").bootstrapSwitch(); 
							$(document).ready(function(){								
								$('[data-toggle="popover"]').popover(); 								
							});
						//$("#watershed_search").bootstrapSwitch();						
						//culvert_hydraulic_discharge_event();				
			},			
			},//end of the first btn				
}

var tool_set_plugin_spec={
		"current_status_category":[
			function_btn_event_list["hydrology_domain"],
			function_btn_event_list["geomorphology_domain"],
			function_btn_event_list["water_quality_domain"],
			function_btn_event_list["meteorology_domain"],
			function_btn_event_list["land_water_habitat_domain"],
			function_btn_event_list["socio_economic_domain"],
			
			
		],	
			
	};
	
	
parse_app_btn_event(tool_set_plugin_spec);		


var Huc_ws_trace_style={
	            fill:true,
				stroke:"#0066FF",
				weight: 1,
				opacity: 0.5,
				color: '#0066FF',
				fillOpacity: 0.02	
						};

						
						
						
						
						
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	

var sensor_grouping = {
"catagory-checkbox":{
    "stream-flow":"IFC+USGS",
	"precip":"Precipitation",
	"USGS_stream":"USGS",
	"wq":"Water_Quality+IIHR_CZO", 
},"datasource-checkbox":{
    "IFC":"stream-flow",
	"Precipitation":"precip",
	"USGS":"stream-flow",
	"Water_Quality":"wq", 
	"IIHR_CZO":"wq"
}};





var sensor_properties_points={
	"ifis":{		
		"style":{			
				fillColor: "#BB77FF",
				color: "#000000",
			},
			
	},
	"usgs":{
		"style":{			
				fillColor: "#33FFFF",
				color: "#000000",
			},	
		
	},
	"epa":{		
		"style":{			
				fillColor: " #CC0000 ",
				color: "#000000",
			 },	
		
	},
	"iihr":{
		"style":{			
				fillColor: " #33FF33  ",
				color: "#000000",
			},
	}
	
	
	
	
};
		
	

 
var Sensor_layer_styles={
	"generic":{
		radius: 6,
		weight: 1,
		opacity: 0.5,
		fillOpacity: 0.8,	
		fill:false,
		stroke:false,
	},
   "in":{
	   //fill:false,
		radius: 6,
		weight: 1,
		opacity: 0.4,
		fillOpacity: 0.8,	

	},	
    "out":{
		//fill:false,
		radius: 4,
		weight: 1,
		opacity: 0.09,
		fillOpacity: 0.3,	

	},
"flash":{radius: 9,				

	weight: 1,
	opacity: 0.5,
	fillOpacity: 0.8,}	
}				
				
		
var Sensor_layer_features={
"sensor":{
"default_style":Sensor_layer_styles.generic,
"default_layer":"yes",
"geometery_type":"circular_marker",
"layer_group": "main",
"url":"data/state_data/state_sensors.json",
"onEachFeature":function (feature, layer){
	//console.log(feature.properties.org);
	layer.setStyle(sensor_properties_points[feature.properties.org]["style"]);
	

	style_sensor_based_on_filter(feature,layer);

	sensor_click_blinking(layer,feature);
	sensor_popup_generation(feature,layer);
	sensor_switch_on_off(layer,feature);
	ifis_trace(layer,feature,Huc_ws_trace_style);
},
},
};// end of feature layer object

var Huc_ws_trace_style={
	            fill:true,
				stroke:"#0066FF",
				weight: 1,
				opacity: 0.5,
				color: '#0066FF',
				fillOpacity: 0.02	
						};



leaflet_map_control.Layer_initialization(map,Sensor_layer_features);


//window["wb_clip_feature"]["state_sensor"]
/*
window["ifis_search_result"]= new L.LayerGroup();
window["ifis_search_result"].addTo(map);
*/
function style_sensor_based_on_filter(feature,layer){
	
		//$( document ).ajaxStop(function() {  //must use ajax stop, as it has to wait for the spatial select result to pass back
	
	$( document ).ajaxComplete(function(event, xhr, settings) {
	if (settings.url== 'assets/php/spatial_query_control.php') {
		
	if(typeof(window["wb_clip_feature"])!="undefined"){
		
		high_light_clip_sensor(feature,layer,window["wb_clip_feature"]["state_sensor"]);
	}else{
		
		high_light_clip_sensor(feature,layer,[]);
	}
		}});//end of ajax text
		//});
	function high_light_clip_sensor(feature,layer,intersect_feature_array){
	
		if(intersect_feature_array.length!=0){
				if(intersect_feature_array.indexOf(feature.properties.site_code)!=-1){
					layer.setStyle(Sensor_layer_styles["in"]);
					feature.properties.default_feature="in";
						
				}else{
					layer.setStyle(Sensor_layer_styles["out"]);
					feature.properties.default_feature="out";
				}
			
		}else{ 
			layer.setStyle(Sensor_layer_styles["generic"]);
			feature.properties.default_feature="generic";
		}
		layer.setStyle({fill:false,
			stroke:false,});
	
	}
}

function ifis_trace(layer,feature,style){
	layer.on('click', function (e) {
		console.log(feature);
		var lng = feature.geometry.coordinates[0];
		var lat = feature.geometry.coordinates[1];
	  ifis_ws_search(map,style,lat, lng, 500,"fix","9x9"); 

	});
	/*
	layer.on('mouseout', function (e) {
		window["ifis_search_result"].clearLayers();

	});*/
	
//instant_watershed(e.latlng.lat,e.latlng.lng,500,"");
}

	map.on('click', function (e) {
		if($("#watershed_search").bootstrapSwitch('state')==false){  // this is a counter measure to avoid conflict for discharge estimation
		window["ifis_search_result"].clearLayers();
		}
	});











//-------------------------------------------------------Class Functions-------------------------------------------------------------------------//


		
		
		
		
		
		
window["blinking_control"]={
	"sensorClickBlink":{},
	"numberOfBlink":0,
	"sensorClickBlink_g":{}
}
function sensor_click_blinking(layer,feature){
	
	map.on('click', function (e) {
		sensorblinking(feature,layer,false,0);

		});
	
	layer.on('click', function (e) {
	var oldsensorstyle="";
	
		 
		 sensorblinking(feature,layer,true,0);
		setTimeout(function(){  //set time out is used to wait for the close button generation, otherwise, it will be broke
        
		$(".leaflet-popup-close-button").click(function(e){	
			sensorblinking(feature,layer,false,0);	
						
             window["ifis_search_result"].clearLayers();			
		});
		
		$(document).on("click",".leaflet-popup-close-button",function() {
			
				sensorblinking(feature,layer,false,0);		
             window["ifis_search_result"].clearLayers();
		});
		
		}, 200);
		

		
		
		
		
		//display_time_serise_data(layer.feature.properties.sitecode,feature.properties.org,[]);
		 
		
	 });
	 



}// end of sensor blinking

function sensorblinking(feature,layer,blinking,style){ 
		
			clearInterval(window["blinking_control"]["sensorClickBlink"]);
				if(blinking==true){
					
			window["blinking_control"]["sensorClickBlink"]=setInterval(function(){
				
			
			window["blinking_control"]["numberOfBlink"]=1;
			layer.setStyle(Sensor_layer_styles["flash"]);	
			setTimeout(function(){
				if(typeof(feature.properties.default_feature)!="undefined"){
					layer.setStyle(	Sensor_layer_styles[feature.properties.default_feature]	);
				}else{
					
					layer.setStyle(	Sensor_layer_styles["in"]	);
				}
			
				
			}, 500);
				
			}, 1000);
				}else{
				window["blinking_control"]["numberOfBlink"]=0;
				clearInterval(window["blinking_control"]["sensorClickBlink"]);
				}
}	
function sensorblinking_group(layer,sensor_id,blinking,style){

//clearInterval(sensorClickBlink);
	if(blinking==true){
	   window["blinking_control"]["sensorClickBlink_g"][sensor_id]=setInterval(function(){
numberOfBlink=1;
layer.setStyle(Sensor_layer_styles["flash"]);	
setTimeout(function(){

layer.setStyle(Sensor_layer_styles["in"]);

}, 500);
}, 1000);
	}else{
		
	numberOfBlink=0;
	clearInterval(window["blinking_control"]["sensorClickBlink_g"][sensor_id]);
	}
	
}




function sensor_popup_generation(feature,layer){
	
	
	
	var site_code=feature.properties.site_code;	
	var site_org=feature.properties.org;	
	//var site_url='http://s-iihr32.iihr.uiowa.edu/pro/ds/index.php?r=ws&site_code='+site_code;
	var site_url='../../../pro/ds/index.php?r=ws&site_code='+site_code;
	layer.on('click', function (e) {
	
	//window["sensor_data"]={};
	
	if(typeof(window["sensor_data"][site_code])=="undefined"){
	window["sensor_data"][site_code]={"meta":{},"time_serise":{},"site_code":site_code};	
	 //create namespace

	
	
			$.ajax({	
				dataType: 'text',
				  type : 'GET', 
				  async: true,
				url : site_url,
				success:function(data){
					//console.log(data)
					var data_array=(data.split("-----\n"));
					if(data_array.length>1){
						var meta_data=data_array[0].split("\n");
						var time_serise=data_array[1];
						window["sensor_data"][site_code]["time_serise"]=time_serise;
						
						var meta_code={
							"O":function(data_array){
								if(data_array.length>1){
								window["sensor_data"][site_code]["meta"]["Owner"]=data_array[1];	
								}
								
							},			
							"ST":function(data_array){
								if(data_array.length>1){
								window["sensor_data"][site_code]["meta"]["Sensor"]=data_array[1];	
								}
							},	
							"AD":function(data_array){
								if(data_array.length>1){
								window["sensor_data"][site_code]["meta"]["Site"]=data_array[1];	
								}
							},
							"V":function(data_array){
								if(data_array.length>1){
								var variable_attribute_list=data_array;
								console.log(variable_attribute_list);
								/*below assign meta to variable meta obj*/
								if(!window["sensor_data"][site_code]["meta"].hasOwnProperty("variables")){
									window["sensor_data"][site_code]["meta"]["variables"]={};
									window["sensor_data"][site_code]["meta"]["variables"][variable_attribute_list[1].replace(",","")]=variable_attribute_list;
								}else{
									window["sensor_data"][site_code]["meta"]["variables"][variable_attribute_list[1].replace(",","")]=variable_attribute_list;
								}
								//window["sensor_data"][site_code]["meta"]["variables"]=data_array[1];	
								}//end of testing array length
								
							},
							"TI":function(data_array){
								if(data_array.length>1){
								window["sensor_data"][site_code]["meta"]["Interval"]=data_array[1];	
								}
							}			
						}//end of meta code
						
						
						for(var meta_data_each_line in meta_data){
							!function(meta_data_each_line){
							var meta_data_entry=meta_data[meta_data_each_line].split("	");
							if(meta_code.hasOwnProperty(meta_data_entry[0])){
								meta_code[meta_data_entry[0]](meta_data_entry);
								
							}			
						}(meta_data_each_line)	
						}//end of for
						
						//console.log(window["sensor_data"]);
						//data_conversion.csvToJSON'
						//if((time_serise.split('\n')).length>1){
						generate_popup_basedon_meta(feature,layer);
						//console.log(this);
						layer.openPopup();
							
						//}

					}//end of testing data validation
				}//end of success
			});//end of ajax
		
	
		
	}else{
		
		//if((window["sensor_data"][site_code]["time_serise"].split('\n')).length>1){
		console.log(this);
		generate_popup_basedon_meta(feature,layer);
		//feature.openPopup();
		//}
	}
	
	});	//end of on click
	
		/*---------------------------------------------------------------------*/
	/*--------------------------generate popup-----------------------------*/
	function generate_popup_basedon_meta(feature,layer){
				var html_sensor_table_content=""
				var html_sensor_var_table_content="<table style='width:100%'><tr style='width:30%'><td class='data_td'><b>Site ID</b></td><td class='data_td'><b>"+site_code+"</b></td></tr></table>";
			for(var each in window["sensor_data"][site_code]["meta"]){
				
				if(each!="variables"){
					html_sensor_table_content+="<tr ><td class='data_td'><b>"+each+"</b></td><td class='data_td'><b>"+window["sensor_data"][site_code]["meta"][each]+"</b></td></tr>";			
				}
				
				if(each=="variables"){
					html_sensor_var_table_content+="<br><table style='width:100%'>";
					for(var each_var in window["sensor_data"][site_code]["meta"][each]){
						
						var each_var_obj=window["sensor_data"][site_code]["meta"][each][each_var];
						
						var unit=each_var_obj[5];
						if(each_var_obj[6]=='No Data'){
							unit="";
						}
						html_sensor_var_table_content+="<tr class='data_td'><td class='data_td'>"+each_var_obj[4]+"</td><td class='data_td'>"+each_var_obj[6]+" "+unit+"</td></tr>";		
					}
					html_sensor_var_table_content+="</table>";	
				}
				
			}
			var logo="assets/img/sensor_logos/"+site_org+".jpg";			
			var sensor_logo="<img src="+logo+" style='width:100px;'><br><br><table style='width:100%; ' >";
			var sensor_info_table="<table style='width:100%; ' >"+html_sensor_table_content+"</table><br> <b>Last Record</b> <div style='width:100%;  max-height:200px; overflow:auto'>"+html_sensor_var_table_content+"</div>";
			var ts_btn="<input type='button' class='DataWindowButton' id='TimeSerise' value='Time Series'>";
			layer.bindPopup(sensor_logo+sensor_info_table+"<br>"+ts_btn);	
	
		//this is only for sensor click blinking
			var oldsensorstyle="";		 
			sensorblinking(feature,layer,true,0);
			setTimeout(function(){  //set time out is used to wait for the close button generation, otherwise, it will be broke
			
			$(".leaflet-popup-close-button").click(function(e){	
				sensorblinking(feature,layer,false,0);		
				 window["ifis_search_result"].clearLayers();			
			});
			
			
			
			
			
			
			 //$(document).on("click","#TimeSerise",function() {
			$("#TimeSerise").click(function(e) {				
				display_time_serise_data(site_code,site_org,window["sensor_data"][site_code]);				
			});// TimeSerise
			
				
			}, 200);
			//this is end of sensor click blinking	
			
			
		

		
		
		
		//display_time_serise_data(site_code,window["sensor_data"][site_code]);
		//display_time_serise_data(site_code,site_org,window["sensor_data"][site_code]);
		 
		
	 
	}
	
	
	
	/*
	
O	IFC
ST	IFC Bridge Sensors
AD	North Skunk River
LL	41.687869	-92.859233
V	stage	Stage	feet
TI	2015-12-25 20:15:04-06 to 2016-01-24 20:00:00-06
	*/
		 //window["sensor_data"]
		
		/*
		var logo=sensor_properties_points[feature.properties.org]["logo"];
			
		var Tables_NOx_mgL_Raw = "<table style='width:100%'><tr><td id='returnvalue_NOx_mgL_Raw'></td><td id='returndate_NOx_mgL_Raw' class='nutrient_tables'></td></tr><tr><td>Variable</td><td>NOx Concentration(Raw Data) </td></tr></table><br>";
		var Tables_Turb_NTU_Raw = "<table style='width:100%'><tr><td id='returnvalue_Turb_NTU_Raw'></td><td id='returndate_Turb_NTU_Raw' class='nutrient_tables'></td></tr><tr><td>Variable</td><td> Turbidity(Raw Data) </td></tr></table><br>";
		var Tables_Temp_C_Raw = "<table style='width:100%'><tr><td id='returnvalue_Temp_C_Raw'></td><td id='returndate_Temp_C_Raw' class='nutrient_tables'></td></tr><tr><td>Variable</td><td> Temperature(Raw Data) </td></tr></table><br>";
		var Tables_pH_Raw = "<table style='width:100%'><tr><td id='returnvalue_pH_Raw'></td><td id='returndate_pH_Raw' class='nutrient_tables'></td></tr><tr><td>Variable</td><td> PH(Raw Data) </td></tr></table><br>";
		var Tables_SpC_uScm_Raw = "<table style='width:100%'><tr><td id='returnvalue_SpC_uScm_Raw'></td><td id='returndate_SpC_uScm_Raw' class='nutrient_tables'></td></tr><tr><td>Variable</td><td> SpC uScm(Raw Data) </td></tr></table><br>";
		var Tables_DO_mgL_Raw = "<table style='width:100%'><tr><td id='returnvalue_DO_mgL_Raw'></td><td id='returndate_DO_mgL_Raw' class='nutrient_tables'></td></tr><tr><td>Variable</td><td> Dissolved Oxygen(Raw Data) </td></tr></table><br>";
		var returnValueTables = Tables_NOx_mgL_Raw+Tables_Turb_NTU_Raw+Tables_Temp_C_Raw+Tables_pH_Raw+Tables_SpC_uScm_Raw+Tables_DO_mgL_Raw;

		var pop_up_control_obj={
			"IIHR_CZO":"<img src="+logo+" style='width:100px;'><br><br><table style='width:100%; '><tr><td> <b>Sensor:</b> </td><td> Nutrient </td></tr><tr><td> <b>Site:</b> </td><td> 701-723 Camp Cardinal Blvd, Coralville, IA </td></tr><tr><td> <b>Variables:</b> </td><td> NOx, PH, Turbidity, Temperature </td></tr><tr><td> <b>Interval:</b> </td><td id='returnInterval'></td></tr><tr><td> <b>Owner:</b> </td><td> Caroline A. Davis</td></tr></table><br> <b>Last Record</b>"+returnValueTables+"<input type='button' class='DataWindowButton' id='TimeSerise' value='Time Series'>",
			"USGS":"<img src="+logo+" style='width:100px;'><br><br><table style='width:100%; ' ><tr><td class='popup_tb'> <b>Sensor</b> </td><td class='popup_tb'>"+feature.properties.layer+"</td></tr><tr><td class='popup_tb'> <b>Site ID</b> </td><td class='popup_tb'>"+feature.properties.sitecode+"</td></tr><tr><td class='popup_tb'> <b>Site</b> </td><td class='popup_tb'>"+feature.properties.rev_addres+" ,"+feature.properties.rev_region+"</td></tr><tr><td class='popup_tb'> <b>Variables</b> </td><td class='popup_tb'>"+feature.properties.variable+"</td></tr><tr><td class='popup_tb'> <b>Interval</b> </td><td id='returnInterval' class='popup_tb'></td></tr><tr></tr></table><br> <b>Last Record</b> <table style='width:100%'><tr><td id='returnvalue' class='popup_tb'></td><td id='returndate' class='popup_tb'></td></tr><tr><td class='popup_tb'>Variable</td><td class='popup_tb'> Stage</td></tr></table><br><table style='width:100%'><tr><td id='returnvalue2' class='popup_tb'></td><td id='returndate2' class='popup_tb'></td></tr><tr><td class='popup_tb'>Variable</td><td class='popup_tb'> Discharge</td></tr></table><br><input type='button' class='DataWindowButton' id='TimeSerise' value='Time Series'>",
			"Precipitation":"<img src="+logo+" style='width:100px;'><br><br><table style='width:100%; ' ><tr><td class='popup_tb'> <b>Sensor</b> </td><td class='popup_tb'>"+feature.properties.layer+"</td></tr><tr><td class='popup_tb'> <b>Site ID</b> </td><td class='popup_tb'>"+feature.properties.sitecode+"</td></tr><tr><td class='popup_tb'> <b>Site</b> </td><td class='popup_tb'>"+feature.properties.rev_addres+" ,"+feature.properties.rev_region+"</td></tr><tr><td class='popup_tb'> <b>Variables</b> </td><td class='popup_tb'>"+feature.properties.variable+"</td></tr><tr><td class='popup_tb'> <b>Interval</b> </td><td id='returnInterval' class='popup_tb'></td></tr><tr></tr></table><br> <b>Last Record</b> <table style='width:100%'><tr><td id='returnvalue' class='popup_tb'></td><td id='returndate' class='popup_tb'></td></tr><tr><td class='popup_tb'>Variable</td><td class='popup_tb'> Bucket A</td></tr></table><br><table style='width:100%'><tr><td id='returnvalue2' class='popup_tb'></td><td id='returndate2' class='popup_tb'></td></tr><tr><td class='popup_tb'>Variable</td><td class='popup_tb'> Bucket B</td></tr></table><br><input type='button' class='DataWindowButton' id='TimeSerise' value='Time Series'>",
			"IFC":"<img src="+logo+" style='width:100px;'><br><br><table style='width:100%; ' ><tr><td class='popup_tb'> <b>Sensor</b> </td><td class='popup_tb'>"+feature.properties.layer+"</td></tr><tr><td class='popup_tb'> <b>Site</b> </td><td class='popup_tb'>"+feature.properties.rev_addres+" ,"+feature.properties.rev_region+"</td></tr><tr><td class='popup_tb'> <b>Variables</b> </td><td class='popup_tb'>"+feature.properties.variable+"</td></tr><tr><td class='popup_tb'> <b>Interval</b> </td><td id='returnInterval' class='popup_tb'></td></tr><tr></tr></table><br> <b>Last Record</b> <table style='width:100%'><tr><td id='returnvalue' class='popup_tb'></td><td id='returndate' class='popup_tb'></td></tr><tr><td class='popup_tb'>Site ID</td><td class='popup_tb'>"+feature.properties.sitecode+"</td></tr></table><br><input type='button' class='DataWindowButton' id='TimeSerise' value='Time Series'>",
			
		}
		layer.bindPopup(pop_up_control_obj[feature.properties.org]);


		/*<input type='button' class='DataWindowButton' id='TimeSlide' value='Timeline'>*/
	
	
}





function super_sub_array(sup, sub) {
    sup.sort();
    sub.sort();
    var i, j;
    for (i=0,j=0; i<sup.length && j<sub.length;) {
        if (sup[i] < sub[j]) {
            ++i;
        } else if (sup[i] == sub[j]) {
            ++i; ++j;
        } else {
            // sub[j] not in sup, so sub not subbag
            return false;
        }
    }
    // make sure there are no elements left in sub
    return j == sub.length;
}





function sensor_switch_on_off(layer,feature){
	
		$(document).on('switchChange.bootstrapSwitch','input[name="catagory-checkbox"]',function(event, state){
		//$('input[name="datasource-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) { 

							 var sensor_btn_id=$(this).attr("id");	
							 
							// alert($(this).attr("id"));
								var visible={
								stroke:true,
									fill:true	
			
										};
									 var invisible={
										stroke:false,
										fill:false	
									};
				//console.log(feature.properties.sensor_gro+" "+sensor_btn_id);						
				//console.log((feature.properties.sensor_gro).indexOf(sensor_btn_id));
				var feature_properties_array=(feature.properties.sensor_gro).split(",");
				var sensor_btn_id_array=sensor_btn_id.split(",");
				
					if(super_sub_array(feature_properties_array,sensor_btn_id_array)!=false &&state==true){
						//console.log(feature.properties.org);
						//counter++;
						//console.log(counter);
						//console.log(feature.properties.sensor_gro+" --- "+sensor_btn_id);		
						layer.setStyle(visible);
						//$("#"+feature.properties.catagory).bootstrapSwitch('toggleState', true); 
						
					}else if(super_sub_array(feature_properties_array,sensor_btn_id_array)!=false &&state==false){			
						
						layer.setStyle(invisible);
						//$("#"+feature.properties.catagory).bootstrapSwitch('toggleState', false); 
						
					}
					
							 
							});


						//gnis_id":"455459","gnis_name":"Clear Creek","lengthkm":
		
			
	
}






				
						
