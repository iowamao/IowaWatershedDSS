// JavaScript Document
// JavaScript Document

// JavaScript Document
// JavaScript Document  configure
console.log("idot-loaded");
window['idot']={};

 


//script_manager(["assets/js/functionality/ifis_watershed.js"]);


var oneach_function={
	"culvert_box_color_coding":function(feature,layer){
		
		layer.setStyle(		idot_color_coding["culvert_box_color_coding"](feature.properties.culv_box)
			
		);
	},
	"culvert_sed-current_status":function(feature,layer){
		    $("#culvert_sed-current_status").on("click",function() {
				
							layer.setStyle(idot_color_coding["culvert_sed-current_status"](feature.properties.culv_surv)			
							);
			});
		
	},
	"culvert_sed-sed_potential":function(feature,layer){
		    $("#culvert_sed-sed_potential").on("click",function() {
				            var value_type=$("#sed_potential_type").val();							
							layer.setStyle(idot_color_coding["culvert_sed-sed_potential_"+value_type](feature.properties[value_type])			
							);
			});
			
			$(document).on('change','#sed_potential_type',function(){
			//$("#sed_potential_type").on("change",function() {
				            var value_type=$("#sed_potential_type").val();
							//console.log(value_type);
							layer.setStyle(idot_color_coding["culvert_sed-sed_potential_"+value_type](feature.properties[value_type])			
							);
			});		
			//sed_potential_type		
	},	
	
};
var DSS_idot_layer_styles={	
"river":{
"default":{stroke: '#66FF66',weight: 1, opacity: 1,color: '#66CCFF'},
"highlight":{stroke: '#66FF66',weight: 1, opacity: 1,color: '#66CCFF'}
},
"watershed_mask":{
"default":{weight: 1,opacity: 0.5,fillColor: '#FFFFFF ',color: '#999999 ',fillOpacity: 0.6,stroke:true,fill:true},
},
"culvert":{
"default":{	radius: 5,	fillColor: "#ffff00",color: "#000 ",weight: 1,	opacity: 1,	fillOpacity: 1},
"default-mask":{	radius: 10,	weight: 2,	opacity: 0.01,	fillOpacity: 0.01},
"hover-mask":{	radius: 10,	weight: 1,	opacity: 1,	fillOpacity: 0.01,color: '#ff6600'},
"default_invisible":{	radius: 5,	fill: false , stroke:false , fillColor: "#FF99FF",color: "#000 ",weight: 1,	opacity: 1,	fillOpacity: 1},
"find_pond_highlight":{radius: 5,	fillColor: "#FFFF00 ",	color: "#FF0000 ",	weight: 2,	opacity: 1,	fillOpacity: 1         },
"visible":{	fill: true , stroke:true , },
"invisible":{	fill: false , stroke:false },
},
"sub_basin":{
"default":{	weight: 2, opacity: 1, color: 'white',  dashArray: '3',  fillOpacity: 0.3,stroke:true,	fill:true},	
"default_invisible":{		stroke:false,fill:false	},	
}
};
//var dss_data_path="dss/"+dss_project+"/"+dss_ws;
var dss_data_path="dss/"+dss_project;
//console.log(dss_data_path);

var IDOT_Aerial_Map=L.esri.dynamicMapLayer("https://geonexusr.iowadot.gov/arcgis/rest/services/AerialImagery/Aerial_Imagery/MapServer", {
opacity : 1, position:'back',format:'GIF',bboxSR:  102100  , imageSR: 102100  ,layers:[0]
});


var DSS_culvert_wms={
	

'SSURGO_HydroSoil':L.esri.dynamicMapLayer("http://dos.iihr.uiowa.edu:6080/arcgis/rest/services/SDE_Layers/Hydro_Soil_group/MapServer", {
opacity : 1, position:'back',format:"png8"
}),
'SSURGO_HydroSoil_D':L.esri.dynamicMapLayer("http://dos.iihr.uiowa.edu:6080/arcgis/rest/services/SDE_Layers/SSURGO_Drainage_Class/MapServer", {
opacity : 1, position:'back'
}),
'NHD_catchment':L.esri.dynamicMapLayer("http://dos.iihr.uiowa.edu:6080/arcgis/rest/services/SDE_Layers/catchment_black_WMS/MapServer", {
opacity : 0.5, position:'back'
}),/*
'RESUL':L.esri.dynamicMapLayer("http://dos.iihr.uiowa.edu:6080/arcgis/rest/services/SDE_Layers/RUSLE_WMS/MapServer", {
opacity : 1, position:'back'
}),
'HRLC':L.esri.dynamicMapLayer("http://dos.iihr.uiowa.edu:6080/arcgis/rest/services/Iowa_Watershed/IA_Forestry/MapServer", {
opacity : 0.5, position:'back'
}),*/
'HRLC':L.tileLayer.wms("http://s-iihr32.iihr.uiowa.edu:8080/geoserver/Iowa_Watershed/wms", 
						{layers: 'Iowa_Watershed:hrlc_2009_3m1', format: 'image/gif', version: '1.1.0', transparent: true, srs:32615, attribution: "", tiled:true, styles:"HRLC_landuse_forest" }),
'RESUL':L.tileLayer.wms("http://s-iihr32.iihr.uiowa.edu:8080/geoserver/Iowa_Watershed/wms", 
						{layers: 'Iowa_Watershed:rusle_i_101', format: 'image/png', version: '1.1.0', transparent: true, srs:32615, attribution: "", tiled:true, styles:"RUSLE" }),
}


var DSS_culvert_layer_features={
"culvert":{
"default_style":DSS_idot_layer_styles.culvert["default"],
"default_layer":"yes",
"geometery_type":"circular_marker",
"layer_group":"idot",
"url":"data/dss/IDOT/state_data/geo_json/IA_culvert.json",
"onEachFeature":function (feature, layer){
	oneach_function["culvert_box_color_coding"](feature,layer);
	oneach_function["culvert_sed-current_status"](feature,layer);
	oneach_function["culvert_sed-sed_potential"](feature,layer);


},
},

"culvert_mask":{
"default_style":DSS_idot_layer_styles.culvert["default-mask"],
"default_layer":"yes",
"geometery_type":"circular_marker",
"layer_group":"idot",
"bringtofront":"yes",
"url":"data/dss/IDOT/state_data/geo_json/IA_culvert_simple.json",
"onEachFeature":function (feature, layer){	

		leaflet_json.feature_highlight_lite(layer,feature,DSS_idot_layer_styles.culvert['hover-mask']);
		culvert_birdeye_window(feature,layer);
		//ifis_trace(layer,feature,DSS_idot_layer_styles.sub_basin["default"]);

		layer.on('mouseover', function (e) {		
				//console.log(feature);
				var lng = feature.geometry.coordinates[0];
				var lat = feature.geometry.coordinates[1];
				ifis_ws_search(map,DSS_idot_layer_styles.sub_basin["default"],lat, lng, 500,"fit","9*9");
				if($("#watershed_search").bootstrapSwitch('state')==true){
					iowa_culvert_cal_discharge({'layer':window["ifis_search_result"],'display_id':"discharge_result"});	
				}	
			});	
			layer.on('mouseout', function (e) {
				window["ifis_search_result"].clearLayers();
				window["idot"]["culvert_mask"].setStyle({radius: 8,	weight: 2,	opacity: 0.01,	fillOpacity: 0.01});

			});

},
},
};// end of feature layer object

//{"data_source_layer"      "structure_code" }




var idot_route_layer_styles={	
"routes":{
"route1":{weight: 3, opacity: 1,color: '#cc00ff', fill: false , stroke:false},
"route2":{weight: 3, opacity: 1,color: '#008cff', fill: false , stroke:false},
"route2_B":{weight: 3, opacity: 1,color: '#009900', fill: false , stroke:false},
"route3":{weight: 3, opacity: 1,color: '#6600cc', fill: false , stroke:false},
"route4":{weight: 3, opacity: 1,color: '#006666', fill: false , stroke:false},
"route5":{weight: 3, opacity: 1,color: '#6600cc', fill: false , stroke:false},
"route6":{weight: 3, opacity: 1,color: '#cc9900', fill: false , stroke:false},
"route7":{weight: 3, opacity: 1,color: '#cc9900', fill: false , stroke:false},
"highway":{weight: 3, opacity: 1,color: '#66FF66', fill: false , stroke:true},
"visible":{	fill: true , stroke:true },
"invisible":{	fill: false , stroke:false },
},
"waypoints":{
"city1":{	radius: 6,	weight: 9, fillColor: "#ffff00",color: "#cc00ff",opacity:0.4,fillOpacity: 0.7, fill: false , stroke:false},
"city2":{	radius: 6,	weight: 9, fillColor: "#ffff00",color: "#008cff",opacity:0.4,fillOpacity: 0.7, fill: false , stroke:false},
"hover":{	radius: 8,	weight: 12, },
"visible":{	fill: true , stroke:true , },
"invisible":{	fill: false , stroke:false },
},
"basin":{
"default":{	weight: 2, opacity: 1, color: '#FFCC66',  dashArray: '3',  fillOpacity: 0.3,stroke:true,	fill:false},	
"default_invisible":{		stroke:false,fill:false	},	
"mask":{weight: 1,opacity: 0.5,fillColor: '#FFFFFF ',color: '#999999 ',fillOpacity: 0.6,stroke:true,fill:true},
}
};

/*---------------------------------------------Route-Planner-------------------------------------*/
var idot_route_layer_features={	
	"route1":{
	"default_style":idot_route_layer_styles.routes["route1"],
	"default_layer":"yes",
	"geometery_type":"regular",
	"layer_group":"idot",
	"url":"data/dss/IDOT/state_data/geo_json/trip_planner/trip_route1.geojson",
	"onEachFeature":function (feature, layer){
		
		idot_route_switch(layer,feature,"#idot_route_route1");
	},
	},
	"route2":{
	"default_style":idot_route_layer_styles.routes["route2"],
	"default_layer":"yes",
	"geometery_type":"regular",
	"layer_group":"idot",
	"url":"data/dss/IDOT/state_data/geo_json/trip_planner/trip_route2.geojson",
	"onEachFeature":function (feature, layer){
		idot_route_switch(layer,feature,"#idot_route_route2");
	},
	},
	"route2_B":{
	"default_style":idot_route_layer_styles.routes["route2_B"],
	"default_layer":"yes",
	"geometery_type":"regular",
	"layer_group":"idot",
	"url":"data/dss/IDOT/state_data/geo_json/trip_planner/trip_route2_b.geojson",
	"onEachFeature":function (feature, layer){		
		idot_route_switch(layer,feature,"#idot_route_route2_B");
	},
	},
	"route3":{
	"default_style":idot_route_layer_styles.routes["route3"],
	"default_layer":"yes",
	"geometery_type":"regular",
	"layer_group":"idot",
	"url":"data/dss/IDOT/state_data/geo_json/trip_planner/trip_route3.geojson",
	"onEachFeature":function (feature, layer){		
		idot_route_switch(layer,feature,"#idot_route_route3");
	},
	},
	"route4":{
	"default_style":idot_route_layer_styles.routes["route4"],
	"default_layer":"yes",
	"geometery_type":"regular",
	"layer_group":"idot",
	"url":"data/dss/IDOT/state_data/geo_json/trip_planner/trip_route4.geojson",
	"onEachFeature":function (feature, layer){		
		idot_route_switch(layer,feature,"#idot_route_route4");
	},
	},
	"route5":{
	"default_style":idot_route_layer_styles.routes["route5"],
	"default_layer":"yes",
	"geometery_type":"regular",
	"layer_group":"idot",
	"url":"data/dss/IDOT/state_data/geo_json/trip_planner/trip_route5.geojson",
	"onEachFeature":function (feature, layer){		
		idot_route_switch(layer,feature,"#idot_route_route5");
	},
	},
	"route6":{
	"default_style":idot_route_layer_styles.routes["route6"],
	"default_layer":"yes",
	"geometery_type":"regular",
	"layer_group":"idot",
	"url":"data/dss/IDOT/state_data/geo_json/trip_planner/trip_route6.geojson",
	"onEachFeature":function (feature, layer){		
		idot_route_switch(layer,feature,"#idot_route_route6");
	},
	},
	"route7":{
	"default_style":idot_route_layer_styles.routes["route7"],
	"default_layer":"yes",
	"geometery_type":"regular",
	"layer_group":"idot",
	"url":"data/dss/IDOT/state_data/geo_json/trip_planner/trip_route7.geojson",
	"onEachFeature":function (feature, layer){		
		idot_route_switch(layer,feature,"#idot_route_route7");
	},
	},
};// end of feature layer object

leaflet_map_control.Layer_initialization(map,idot_route_layer_features);

function idot_bind_spot_popup(layer,feature){	
	layer.bindPopup("<p><b>City Name</b> :"+feature.properties.Name+"<br>");
}
function idot_route_switch(layer,feature,switch_id,type){
		
		$(document).on('switchChange.bootstrapSwitch',switch_id,function(event, state){
			console.log("tgg");			
				var visible={
						stroke:true,			
			
						};
						var visible_fill={
							fill:true,
						}
				var invisible={
						stroke:false,
						fill:false	
									};

				
					if(state==true){	
						layer.setStyle(visible);
						
						
					}else if(state==false){			
						
						layer.setStyle(invisible);
						//$("#"+feature.properties.catagory).bootstrapSwitch('toggleState', false); 
						
					}			
							 
		});
	
}

/*---------------------------------------------Route-Planner-------------------------------------*/

function idot_highway_feature(){
	var idot_highway_layer_features={	
	"highway":{
	"default_style":idot_route_layer_styles.routes["highway"],
	"default_layer":"yes",
	"geometery_type":"regular",
	"layer_group":"idot",
	"url":"data/dss/IDOT/state_data/geo_json/highway.json",
	"onEachFeature":function (feature, layer){		
		
	},
	},
};// end of feature layer object


$("#idot_route_highway").on('switchChange.bootstrapSwitch', function(event, state) { 	
		if(state==true){			
			if(typeof(window["idot"]["highway"])=="undefined"){
				console.log("lHW")
				leaflet_map_control.Layer_initialization(map,idot_highway_layer_features);
			}else{
				
				window["idot"]["highway"].addTo(map);
			}

			
		}else{
			map.removeLayer(window["idot"]["highway"]);
			
			
		}
		
		});
	
	
}













//sectiopn used for watershed search
var Huc_ws_trace_style={
	            fill:true,
				stroke:"#0066FF",
				weight: 1,
				opacity: 0.5,
				color: '#0066FF',
				fillOpacity: 0.02	
						};
window["ifis_search_result"]= new L.LayerGroup();
window["ifis_search_result"].addTo(map);



//layer:window["ifis_search_result"],display_id:
function iowa_culvert_cal_discharge(options){
	$("#"+result_box).html("");
	var result_ws_layer=options["layer"]
	var result_box=options["display_id"]
			 for(var each in result_ws_layer["_layers"]){
				 
				 
			 each_geom=result_ws_layer["_layers"][each]["_layers"];
			 
				var first_geom;
					for(var key in each_geom) {
						if(each_geom.hasOwnProperty(key)) {
							first_geom = each_geom[key];
							break;
						}
					}//end of inner for loop, identify only the first geom
					
			 //console.log(first_geom["feature"]);
			 $.ajax({
							  url : "assets/php/iowa_culvert/Eash_Lara.php?",							  
							  type: "post",
							  async: false,
							  dataType : 'json',
							  jsonpCallback: 'getJson',


							  data: {geom:JSON.stringify(first_geom["feature"])},
					success: function(data){
                               //console.log(data);							   
							   var result="Q2: "+data["Q2"].toFixed(2)+"<br>Q5: "+data["Q5"].toFixed(2)+"<br>Q10: "+data["Q10"].toFixed(2)+"<br>Q25: "+data["Q25"].toFixed(2)+"<br>Q50: "+data["Q50"].toFixed(2)+"<br>Q100: "+data["Q100"].toFixed(2)+"<br>Q200: "+data["Q200"].toFixed(2)+"<br>Q500: "+data["Q500"].toFixed(2);
						       $("#"+result_box).html(result);
						}
				});	//end of ajax	
		 }
}




leaflet_map_control.Layer_initialization(map,DSS_culvert_layer_features);


hide_leaflet_layer({"button_id":"culvert_info-remove_culvert","layer":[window["idot"]["culvert"],window["idot"]["culvert_mask"]],"new_btn_text":"&nbsp;&nbsp;Show Culverts"});
//culvert_legend({"turn":"on", "legend_type":"box_number"});  // soil_loss   sedimentation_survey   box_number


idot_feature_autocomplete({"drop_down_id":"search_method","search_box_id":"search_culvert","layer":window["idot"]["culvert"]});

leaflet_map_control.show_leaflet_layer({"button_id":"culvert_hydraulics-river_catchments","layer":[DSS_culvert_wms["NHD_catchment"]],"new_btn_text":"&nbsp;&nbsp;River Catchments (<b>Turn Off</b>)"});
leaflet_map_control.show_leaflet_layer({"button_id":"culvert_hydraulics-runoff_potential","layer":[DSS_culvert_wms["SSURGO_HydroSoil"]],"new_btn_text":"&nbsp;&nbsp;Runoff Potential (<b>Turn Off</b>)"});
leaflet_map_control.show_leaflet_layer({"button_id":"culvert_sed-rusle","layer":[DSS_culvert_wms["RESUL"]],"new_btn_text":"&nbsp;&nbsp;Erosion Potential (<b>Turn Off</b>)"});
leaflet_map_control.show_leaflet_layer({"button_id":"culvert_sed-forests","layer":[DSS_culvert_wms["HRLC"]],"new_btn_text":"&nbsp;&nbsp;Forestry (<b>Turn Off</b>)"});
//DSS_culvert_wms     RESUL      SSURGO_HydroSoil  NHD_catchment


var culvert_filter_info= "<div id='culvert_filter_panel' class='panel-collapse collapse in'><div class='panel-body'><p><br style=' display: block; margin: 5px 0;'><p>Select Culvert By</p><select id='culvert_filter_type' class='filter_culvert drop_down form-control'><option value='all-all' selected='selected' >Show All</option><option value='culv_box-3' >3-Box</option><option value='culv_box-4'>4-Box</option><option value='threeD-3d'>Special culvert</option></select></p></div></div>";
var culvert_search_info= "<div id='culvert_info' class='panel-collapse collapse in'><div class='panel-body'><p><br style=' display: block; margin: 5px 0;'><select id='search_method' class='drop_down form-control'><option value='null' selected='selected'>Search by</option><option value='river'  >River Name</option><option value='road'>Road Name</option><option value='stru_code'  >Structure Code</option></select></p><p><br><input type='text' id='search_culvert' class='form-control typeahead' value=Specify...></p></div></div>";
var culvert_erosion_potentation= "<div id='erosion_potentation' class='panel-collapse collapse in'><div class='panel-body'><p><br style=' display: block; margin: 5px 0;'><p>Sediment Statistic In Local Catchment</p><select id='sed_potential_type' class='drop_down form-control'><option value='sum' selected='selected' >Total Amounts</option><option value='mean'>Average Amounts</option></select></p></div></div>";
var culvert_hydro_discharge='<div id="tools_search" class="panel-collapse collapse in"><div class="panel-body"><p style="color:#0493d3; font-weight: bold" ><input id="watershed_search" type="checkbox" name="search-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" >&nbsp;Enable Search</p><p style="color:#0493d3; font-weight: bold"><br> <label for="discharge_result">Discharge Calculation (cfs):</label> <div id="discharge_result" style="height:200px;" class="form-control" rows="8"></div> <br><button id="culvert_hydro-clear_search" class="form-control btn btn-primary" > &nbsp;Clear Result&nbsp; </button></p></div></div>';
var culvert_route='<div id="idot_route" class="panel-collapse collapse in"> <div class="panel-body"> <div><p style="color:#0493d3; font-weight: bold " ><div class="panel panel-default"> <div class="panel-heading"><h5 class="panel-title">Route Planner<button class="btn btn-xs btn-default pull-right" type="button" data-toggle="collapse" data-target="#idot_two_routes"><i class="glyphicon glyphicon-list"></i></button></h5 ></div> <div id="idot_two_routes" class="panel-collapse collapse"><div class="panel-body"> <p style="color:#0493d3; font-weight: bold" > <p><input id="idot_route_route1" type="checkbox" name="idot-route-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" > &nbsp; Route 1 (East)</p> <p><input id="idot_route_route2" type="checkbox" name="idot-route-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" > &nbsp; Route 2 (West)</p> <p><input id="idot_route_route2_B" type="checkbox" name="idot-route-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" > &nbsp; Route 2-B (West)</p> <p><input id="idot_route_route3" type="checkbox" name="idot-route-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" > &nbsp; Route 3</p> <p><input id="idot_route_route4" type="checkbox" name="idot-route-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" > &nbsp; Route 4</p> <p><input id="idot_route_route5" type="checkbox" name="idot-route-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" > &nbsp; Route 5</p> <p><input id="idot_route_route6" type="checkbox" name="idot-route-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" > &nbsp; Route 6</p> <p><input id="idot_route_route7" type="checkbox" name="idot-route-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" > &nbsp; Route 7</p> <hr> <p><input id="idot_route_highway" type="checkbox" name="idot-route-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" > &nbsp; Iowa Highway</p> </p> </div></div></div></p></div> <div><p style="color:#0493d3; font-weight: bold " ><div class="panel panel-default"> <div class="panel-heading"><h5 class="panel-title">Navigation<button class="btn btn-xs btn-default pull-right" type="button" data-toggle="collapse" data-target="#idot_navigation"><i class="glyphicon glyphicon-list"></i></button></h5 ></div> <div id="idot_navigation" class="panel-collapse collapse "><div class="panel-body"> <p id="idot_route_machine"></p> <p><hr>--------------------------</p> <p id="idot_route_machine_control"> <p><input id="idot_route_navigation_interaction" type="checkbox" name="idot-route-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" > &nbsp; Drop Waypoints On Map</p> <p><input id="idot_route_navigation_gps" type="checkbox" name="idot-route-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" > &nbsp; HTML5 GPS</p> <p><input id="idot_route_navigation_gps_uplaod" type="checkbox" name="idot-route-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" > &nbsp; Enable GPS Transmission</p> <p id="idot_html_gps"></p> </p> </div></div></div></p></div> <div><p style="color:#0493d3; font-weight: bold " ><div class="panel panel-default"> <div class="panel-heading"><h5 class="panel-title">Current Weather<button class="btn btn-xs btn-default pull-right" type="button" data-toggle="collapse" data-target="#idot_weather"><i class="glyphicon glyphicon-list"></i></button></h5 ></div> <div id="idot_weather" class="panel-collapse collapse"><div class="panel-body"> <p style="color:#0493d3; font-weight: bold" > <p><input id="idot_weather_city" type="checkbox" name="idot-route-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" > &nbsp; City & Towns</p> <p><input id="idot_weather_precip" type="checkbox" name="idot-route-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" > &nbsp; Precipitation Map</p> </p> </div></div></div></p></div> <div><p style="color:#0493d3; font-weight: bold " ><div class="panel panel-default"> <div class="panel-heading"><h5 class="panel-title">Overwatch<button class="btn btn-xs btn-default pull-right" type="button" data-toggle="collapse" data-target="#idot_field_upload"><i class="glyphicon glyphicon-list"></i></button></h5 ></div> <div id="idot_field_upload" class="panel-collapse collapse "><div class="panel-body"> <p><input id="idot_route_overwatch" type="checkbox" name="idot-route-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" > &nbsp; Display Team Position</p> <p>Field team location is updated every 3 minutes, the last location time will be shown below<p> <p id="idot_overwatch_location_time"><p> <br> <p><input id="idot_inspect_data" type="checkbox" name="idot-route-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" > &nbsp; Surveyed Sites</p> <p>Surveyed site locations are updated every 3 minutes<p> <p id="idot_overwatch_num_survey_site"><p> </div></div></div></p></div> </div> </div> ';
    

var idot_dss_html={
"culvert_info-filter_culvert":"<div class='panel panel-default function_panel' id='culvert_info-filter_culvert_panel'><div class='panel-heading'><h4 >Filter Culvert<button class='btn btn-xs btn-default pull-right' type='button' data-toggle='collapse' data-target='#culvert_filter_panel'><i class='glyphicon glyphicon-list'></i></button></h4></div>"+culvert_filter_info+"</div>",
"culvert_info-search_culvert":"<div class='panel panel-default function_panel' id='culvert_info-search_culvert_panel'><div class='panel-heading'><h4 >Culvert Info<button class='btn btn-xs btn-default pull-right' type='button' data-toggle='collapse' data-target='#culvert_info'><i class='glyphicon glyphicon-list'></i></button></h4></div>"+culvert_search_info+"</div>",
"culvert_sed-sed_potential":"<div class='panel panel-default function_panel' id='culvert_sed-search_culvert_panel'><div class='panel-heading'><h4 >Sedimentation Potential<button class='btn btn-xs btn-default pull-right' type='button' data-toggle='collapse' data-target='#erosion_potentation'><i class='glyphicon glyphicon-list'></i></button></h4></div>"+culvert_erosion_potentation+"</div>",
"culvert_hydraulics-calculate_discharge":"<div class='panel panel-default function_panel' id='culvert_hydraulics-calculate_discharge_panel'><div class='panel-heading'><h4 >Calculate Discharge<button class='btn btn-xs btn-default pull-right' type='button' data-toggle='collapse' data-target='#tools_search'><i class='glyphicon glyphicon-list'></i></button></h4></div>"+culvert_hydro_discharge+"</div>",
"culvert_sed-site_inspection":"<div class='panel panel-default function_panel' id='culvert_sed-site_inspection_panel'><div class='panel-heading'><h4 >Site Inspection<button class='btn btn-xs btn-default pull-right' type='button' data-toggle='collapse' data-target='#idot_route'><i class='glyphicon glyphicon-list'></i></button></h4></div>"+culvert_route+"</div>",
};


var culvert_filter_data={
	"threeD":["000000000031711"],
	"sensor_culvert":["05455010","05412020","05412020","05484500","05484500","06809500","06809500","CLRCRK03","WLLWCR-IC01","CLRCRKW01","DEERCR01","NWLNTCR01","CLRCRKS02","BIGCRK07","RCCNRV01","WBFLOYDRV01","RGS0013"],
 
};


var idot_dss_functions={
"culvert_info-filter_culvert":function(){


 $(document).on("change",".filter_culvert",function() {
	var array_file_plus_value= $(".filter_culvert").val().split("-");
	var field = array_file_plus_value[0];
	var value = array_file_plus_value[1];
	console.log(field+"  "+value);
	culvert_filter_style_control_by_filter_class({'extra_data':culvert_filter_data,'class_name':'filter_culvert','match_value':value,'control_field':field,'filter':'==','layer_group':[window["idot"]["culvert"]]},{'pass_filter':DSS_idot_layer_styles.culvert['visible'],'not_pass_filter':DSS_idot_layer_styles.culvert['invisible']});
 //filter_json
	  
 });

	 
},
"culvert_sed-site_inspection":function(){
	$("[name='idot-route-checkbox']").bootstrapSwitch(); 
	idot_navigation();
	idot_weather_control();
	idot_file_submit();
	idot_gps_html();
	idot_highway_feature();
	idot_overwatch();
	idot_surveyed_culverts(window["idot"]["culvert"]);
	
	
},
"culvert_info-search_culvert":function(){},
"culvert_sed-sed_potential":function(){},
"culvert_hydraulics-calculate_discharge":function(){
	$("#watershed_search").bootstrapSwitch(); 
	culvert_hydraulic_discharge();
	}
};

	
	/*
	HUD_scenario_style_control_by_filter_class(event_option_obj,leaflet_layer,style_obj)
	
	var class_name=event_option_obj['class_name'];
var control_field=event_option_obj['control_field'];
var filter=event_option_obj['filter'];

var pass_filter=style_obj['pass_filter'];
var un_pass_filter=style_obj['not_pass_filter'];

*/

$(".idot_menu").on("click",function() {
       var menu_click_id=this.id;
	  $(".function_panel").hide();
	  
	  console.log($('#'+menu_click_id+"_panel").length+" - "+menu_click_id+"_panel");
		if($('#'+menu_click_id+"_panel").length == 0) {
			
			$("#utility_panel").append(idot_dss_html[menu_click_id]);
			idot_dss_functions[menu_click_id]();
			console.log("first_time");
			
			
		}else{
			$('#'+menu_click_id+"_panel").show();
			console.log("second_time");
		}
	   
	   
});


//idot_surveyed_culverts(window["idot"]["culvert"]);

function idot_surveyed_culverts(input_layer){
			
	$("#idot_inspect_data").on('switchChange.bootstrapSwitch', function(event, state) { 	
		if(state==true){	

				idot_surveyed_site_overwatch_action();
				window["idot_surveyed_site_overwatch"]=setInterval(function(){

				idot_surveyed_site_overwatch_action();
				
				
				}, 30000);
			
			
						
		}else{
			clearInterval(window["idot_surveyed_site_overwatch"]);
			remark_surveyed_culvert(input_layer,{"color":'#000000','radius':5,'weight':1});			
			
		}
		
		});
	function idot_surveyed_site_overwatch_action(){
				$.get( "assets/php/iowa_culvert/access_survey_data.php?db=cfs_v1&query=select-site_id-From-survey_note", function( data ) {
					//window['surveyed_culvert']=data;						
					mark_surveyed_culvert(input_layer,{"color":'#ff0000','radius': 4,'weight':3},data);				
				});
			}
	function mark_surveyed_culvert(input_layer,style,filter_data){
			    var obj=input_layer["_layers"];
				var counts=0;
				var total=0;
				for(var key in obj) {
			
				  if(filter_data.indexOf(obj[key].feature.properties["stru_code"])!=-1){
					 obj[key].setStyle(style); 
						counts++;
				  }
						total++;				  
				  }
				  $("#idot_overwatch_num_survey_site").html("Inspected culverts: "+counts+"/"+total);
				
		}
		function remark_surveyed_culvert(input_layer,style){
			    var obj=input_layer["_layers"];
				for(var key in obj) {				 
					 obj[key].setStyle(style); 	  				  			
				  }	
				$("#idot_overwatch_num_survey_site").html("");				  
		}
}

/*
if(filter_struct_code.indexOf(featureid)!=-1){
						//console.log(featureid);
						
						layer_mask[each_element2].setStyle(pass_filter);
					}
*/


function culvert_hydraulic_discharge(){	
		
	map.on('click', function(e) {		
		
			if($("#watershed_search").bootstrapSwitch('state')==true){
	
			 console.log($("#watershed_search").val());
			 
				ifis_search_result.clearLayers();		 
		
				//instant_watershed(map,Huc_ws_trace_style,e.latlng.lat,e.latlng.lng, 500,"fit");
			    ifis_ws_search(map,Huc_ws_trace_style,e.latlng.lat,e.latlng.lng, 500,"fit","single_search"); 
				iowa_culvert_cal_discharge({'layer':window["ifis_search_result"],'display_id':"discharge_result"});
				
				//layer:window["ifis_search_result"],display_id:
			}
		
	});	//end of map click
		
	 $(document).on("click","#culvert_hydro-clear_search",function() {
		window["ifis_search_result"].clearLayers();	
        $("#discharge_result").html("");	

	});
	

	
	$("#watershed_search").on('switchChange.bootstrapSwitch', function(event, state) { 
	if(state==true){
		$('#map').css('cursor','crosshair');
	}else{
		
		$('#map').css('cursor','grab');
		$('#discharge_result').html("");
		
	}
	
	
	
	});
		
   
}








function hide_leaflet_layer(options){
		
		var button_id=options["button_id"];
		var layer=options["layer"];
		var changed_value=options["new_btn_text"];
		var default_val=$("#"+button_id).html();
		
		
		$("#"+button_id).click(function(e) {
		if($("#"+button_id).html()==default_val){
			$("#"+button_id).html(changed_value);
			for(var each in layer){
				//console.log(layer[each]);
				map.removeLayer(layer[each]);				
			}
			
		}else{
		 for(var each in layer){
				console.log(layer[each]);
				map.addLayer(layer[each]);				
			}
			
			$("#"+button_id).html(default_val);
		}
	});		
}


function ifis_trace(layer,feature,style){
	//console.log("over");
	
	
//instant_watershed(e.latlng.lat,e.latlng.lng,500,"");
}
/**/
	map.on('click', function (e) {
		window["ifis_search_result"].clearLayers();

	});
function culvert_birdeye_window(feature,layer){
	
  
	
		layer.on('click', function (e) {		
			//console.log(feature);			
			var lat=feature.geometry.coordinates[1];
			var lng=feature.geometry.coordinates[0];
			var stru_code=feature.properties.stru_code;
			
			zoomtoculvert(lng,lat);		
		  if(map.getZoom()<13){
			 setTimeout(function(){
			
			$("#birdeyeModal").modal("show");		 
					 },2000);
			}else{	
			
			$("#birdeyeModal").modal("show");
			}
			
			map.setView([lat,lng],15);			
			var return_culvert_info_from_laelet_layer=info_from_leaflet_layer({"data_source_layer":window.idot.culvert,"structure_code":stru_code});
			culvert_birdeye_window_info_fill({"data":return_culvert_info_from_laelet_layer  });
		
		
	
		
		threeD_culvert_viewer(feature);
		
		
		
		
		
		});

        
		/*
		$("#timeSerisetitle").html(sensor_properties[sensorType]['title']);   
		var dropdownOption=sensor_properties[sensorType]['variable_option'];
		var input_unit = sensor_properties[sensorType]['default_unit'];
	*/
	
}
function threeD_culvert_viewer(feature){
	
	var culvert_with_3D=["000000000031711"];
		
			 if(culvert_with_3D.indexOf(feature['properties']["stru_code"])!=-1){
					 console.log("yes")
					 var style="height:3%;position:absolute;right:38%;top:50%;width:4%;z-index:20;";
					 var btn_style="position:absolute;right:1%;top:1%;width:10%;z-index:20;z-index:9999;";
					$("#bingmap_div").append(" <button type='button' id='three_D_viewer' style="+btn_style+">Local View</button>");
							
					$(document).on('click', '#three_D_viewer' , function() {
					//$('#three_D_viewer').click(function() {
						
								if($('#three_D_viewer').html()=="Local View"){
									$('#three_D_viewer').html("Bird's Eye");
									console.log("three_D_viewer");									
									var ifram_style="position:absolute; height:100%;left:0%;top:0%;width:100%;z-index:25;";
									$("#bingmap_div").append(" <iframe id='threeD_scene' src='src/3d_visual/scene/' style='"+ifram_style+"'></iframe>");
									
								}else{
									$('#three_D_viewer').html("Local View");
									$("#threeD_scene").remove();					
								}
				
					});// end of 3d viewer click
					
				  $('.bing_map_close').click(function() {
					  $("#threeD_scene").remove();
					  $("#three_D_viewer").remove();
				  });
			
		 }// sensor has the properties "sitecode_3d"
	
	
}





function info_from_leaflet_layer(options){
	var data_source=options["data_source_layer"];
	var structure_code=options["structure_code"];
	var layer_obj=data_source["_layers"];
	for(var each_point in layer_obj){		
		if(layer_obj[each_point]["feature"]["properties"]["stru_code"]==structure_code){			
			return layer_obj[each_point]["feature"];
		}
	}
}
function culvert_birdeye_window_info_fill(options){
	var data_obj=options["data"]["properties"];
	var window_title=options["data"]["properties"]["culv_box"]+" Boxes culvert on "+options["data"]["properties"]["river"].toLowerCase();;
	$("#birdeyeModal-title").html(window_title);
	
	var stru_num=data_obj["stru_code"];
	var year=data_obj["year_built"];
	var place_code=data_obj["place_code"];
	var suffic_rate=data_obj["sufficienc"];
	var maintenance_responsibility=data_obj["maintenanc"];
	var box_number=data_obj["culv_surv"];
	var owner=data_obj["owner"];
	var information_list="<ul style='list-style-type:none'><li>FHWA Number: "+stru_num+"</li><li>Place Code: "+place_code+"</li><li>Owner Code: "+owner+"</li><li>Year Built: "+year+"</li><li> Structure Type:"+box_number+" Barrels Culvert</li><li> Maintenance Responsibility: "+maintenance_responsibility+"</li><li> Sufficiency Rate: "+suffic_rate+"</li>    <li>   </li> -- <li> <button type='button' class='btn btn-default' id='idot_inspection_at_site' >Inspection Data</button> </li><li>--</li><li><button type='button' class='btn btn-default' id='idot_uplaod_at_site' >Uplaod Survey</button> </li><li>--</li> <li><button type='button' class='btn btn-default' id='idot_nav_to_site' >Navigate To Site</button> </li>   </ul>  "
	$("#culvert_text_content").empty();
	$("#culvert_text_content").append(information_list);
	console.log(stru_num);
	idot__site_file_submit(stru_num);
	
	$("#idot_inspection_at_site").click(function(){
		
		window.open("http://s-iihr32.iihr.uiowa.edu/pro/cfs/index.php","_blank");
	});
	$("#idot_uplaod_at_site").click(function(){
		window.open(" http://s-iihr32.iihr.uiowa.edu/pro/cfs/index.php?r=note/create&site_id="+stru_num,"_blank");
		//window.open("http://s-iihr32.iihr.uiowa.edu/pro/cfs/index.php","_blank");
	});
	$("#idot_nav_to_site").click(function(){
		//https://www.google.com/maps/place/41°29'47.4"N+94°34'54.2"W
		var location=options["data"]["geometry"]["coordinates"];
		var lat=Math.abs(location[0]);
		var lng=location[1];
		//console.log("https://www.google.com/maps/place/"+lng+"°N+"+lat+"°W");
		window.open("https://www.google.com/maps/place/"+lng+"°N+"+lat+"°W","_blank");
		
	});
	
	
	
	
}




function remove_all_wms(layer_data_json,wms_btn_class){
	for(var each in layer_data_json){
		
		 if(map.hasLayer(layer_data_json[each])==true){
				map.removeLayer(layer_data_json[each]);

			}	
	}
	$('.'+wms_btn_class).each(function(i, obj) {

	var temp_value=$("#"+obj.id).html();
	var new_value=temp_value.replace(" (<b>Turn Off</b>)", "");
	$("#"+obj.id).html(new_value);
	});


}



















	
function culvert_filter_style_control_by_filter_class(event_option_obj,style_obj){  // THis function uses parallel structure to visualize pond by the year of built
			//HUD_pond_scenario_bar_visualization(input_json,scenario_name,display_setting);
			var layer_group= event_option_obj['layer_group'];
			var filter_value=event_option_obj['match_value'];
			var class_name=event_option_obj['class_name'];
			var control_field=event_option_obj['control_field'];
			var filter=event_option_obj['filter'];
			var filter_json=event_option_obj['extra_data'];
			var pass_filter=style_obj['pass_filter'];
			var un_pass_filter=style_obj['not_pass_filter'];



			for(var each in layer_group){
			var layer=layer_group[each]["_layers"];
			var layer_mask=window["idot"]["culvert_mask"]["_layers"];
			var filter_struct_code=[];
			for(var each_element in layer) {
					var feature=layer[each_element]['feature'];
					if(filter_value=="all"){
							layer[each_element].setStyle(pass_filter);
						}
					if(feature.properties.hasOwnProperty(control_field) ){
						var operator_table = {
							'>=': function(feature,filter_value) { return feature.properties[control_field] >= Number(filter_value); },
							'<=': function(feature,filter_value) { return feature.properties[control_field] <= Number(filter_value); },
							'>': function(feature,filter_value) { return feature.properties[control_field] > Number(filter_value); },
							'<': function(feature,filter_value) { return feature.properties[control_field] < Number(filter_value); },
							'==': function(feature,filter_value) { return String(feature.properties[control_field]) == String(filter_value); },
							'!=': function(feature,filter_value) { return String(feature.properties[control_field]) != String(filter_value); },
							// ...
						};
						if(operator_table[filter](feature,filter_value)){

								layer[each_element].setStyle(pass_filter);
								filter_struct_code.push(feature.properties["stru_code"]);

						}else{
								layer[each_element].setStyle(un_pass_filter);
						}						
				}else{//start of non_properties filter   					
						if(filter_json.hasOwnProperty(control_field)){
							if( filter_value=="3d" ){//start of the 3d viewer
								layer[each_element].setStyle(un_pass_filter);
	                            //the sensor layer should goes here								
													
	
							}//end of filter that is 3d
						if( filter_value!="3d" ){ 	
						if(filter_json[control_field].indexOf(feature.properties["stru_code"])!=-1){
									layer[each_element].setStyle(pass_filter);
									filter_struct_code.push(feature.properties["stru_code"]);
									
								}else{
									layer[each_element].setStyle(un_pass_filter);
							}
						}//end of filter not 3d
						}//end of filter_json data obj			
				}

			} // for loop element in in obj
			//start of the 3d viewer
			
				for(var each_sensor in window["main"]["sensor"]["_layers"]){
					   window["main"]["sensor"]["_layers"][each_sensor].setStyle(un_pass_filter);	
					   if( filter_value=="3d" ){
						   var sitecode=window["main"]["sensor"]["_layers"][each_sensor]["feature"]["properties"]["site_code"];
						   if(filter_json["sensor_culvert"].indexOf(sitecode)!=-1){
						   //if(window["main"]["sensor"]["_layers"][each_sensor]["feature"]["properties"]["sitecode"]=="WLLWCR-IC01"){
							   window["main"]["sensor"]["_layers"][each_sensor].setStyle(pass_filter);						
							 }		
					   }
				}//end of filter that is 3d
			
			
			
			
			
			
			
			
			
			for(var each_element2 in layer_mask) {	
				if(filter_value=="all"){
					
					layer_mask[each_element2].setStyle(pass_filter);
				}else{
					
							//console.log(layer_mask[each_element2]);
					var featureid=layer_mask[each_element2]['feature']['properties']["stru_code"];
					//console.log(featureid);
					//console.log(filter_struct_code);
					if(filter_struct_code.indexOf(featureid)!=-1){
						//console.log(featureid);
						
						layer_mask[each_element2].setStyle(pass_filter);
					}else{
						layer_mask[each_element2].setStyle(un_pass_filter);
					}
				}
			}//end of handling mask




			//});// end of on change
			}
}
/*-----------------------------------------------------------HUD_Functions-------------------------------------------------*/



//culvert_legend({turn:    legend_type:})   soil_loss   sedimentation_survey   box_number
function culvert_legend(options){
	
	var on_off=options["turn"];
	var legend_type=options["legend_type"];
	
	var link_list={
		"soil_loss":"data/dss/IDOT/img/legend/soil_loss.png",
		"sedimentation_survey":"data/dss/IDOT/img/legend/sedimentation_survey.png",
		"box_number":"data/dss/IDOT/img/legend/box_number.png",
	}
	var link=link_list[legend_type];
	var img="<img id='idot_legend' class='ui-widget-content' src="+link+" height='80px' style='z-index:99;  position: absolute; right:10px; bottom:20px;' > ";
	
        if(on_off="on"){
					if (!document.getElementById("idot_legend")) {
							
							$("body").append(img);
							$( "#idot_legend" ).draggable();	
						//It does not exist
						}else{
							$("#idot_legend").remove();
							$("body").append(img);	
							$( "#idot_legend" ).draggable();							
						}
		}else{
			if (document.getElementById("idot_legend")) {
				$("#idot_legend").remove();
			}
			
		}
}









//	culvert_zoom_by_matching_ppt({matching_value,matching_field,layer},function_action_obj)
function culvert_zoom_by_matching_ppt(event_option_obj,function_action_obj){  // THis function uses parallel structure to visualize pond by the year of built
//API:HUD_scenario_style_control_by_matching_ppt({"class_id":"","matching_value":"","matching_field":"","layer":""})
		
		var matching_value=event_option_obj['matching_value'];
		var matching_field=event_option_obj['matching_field'];
	    var leaflet_layer=event_option_obj['layer'];
		var layer=leaflet_layer["_layers"];
		for(var each_element in layer) {
		var feature=layer[each_element]['feature'];


		if(feature.properties[matching_field] == matching_value){

			//layer[each_element].setStyle(pass_filter);
			
			var lat=layer[each_element]["_latlng"]["lat"];
			var lng=layer[each_element]["_latlng"]["lng"];
            map.setView([lat,lng],15);
		}else{
			//layer[each_element].setStyle( un_pass_filter);
		}

		} // for loop element in in obj

}

/*-----------------------------------------------------------HUD_Functions-------------------------------------------------*/
/*-----------------------------------------------------------HUD_Functions-------------------------------------------------*/


  



/*-----------------------------------------------------------HUD_Functions-------------------------------------------------*/

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function HUD_interface_conflict_control(list_of_class,event_type){
	var all_class_in_input="";
	for (var i in list_of_class){ //start of for loop
		all_class_in_input+=list_of_class[i];
	
	
	
	$(document).on(event_type,'.'+list_of_class[i],function(){
		
	var event_class_list=this.className;
	var array_of_class = event_class_list.split(" "); 
	var event_class="";
	for(var f in array_of_class){
		for(var l in list_of_class){
			if(list_of_class[l]==array_of_class[f])	{
				
				event_class=array_of_class[f];
			}
		}
	}
	

	for (var j in list_of_class){
		if(list_of_class[j]!=event_class){
			
		$("."+list_of_class[j]).val("null");
		}

	}// set all other elements which conflicts the selecting to default value, which is null
		
		
	})//end of event
		}// end of the for loop
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//this function visualize the pond usage or pond efficiency using d3js bar chart


/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/




var idot_color_coding={

	"culvert_box_color_coding":function(feature_properties_value){
		//culvert_legend({"turn":"on", "legend_type":"box_number"});  // soil_loss   sedimentation_survey   box_number
		var legend_grade_3='<div class="round-html-div" style="width:20px;height:20px;background:#ffff00;"><a class="round-div" ></a></div>3 barrels\n';
		var legend_grade_4='<div class="round-html-div" style="width:20px;height:20px;background:#ff6600;"><a class="round-div"></a></div>4 barrels\n';
		leaflet_legend(legend_grade_3+legend_grade_4,"Number of box",'','');
			if(feature_properties_value==4){
			return {'fillColor':'#FF9900','fill':true}
			}
			if(feature_properties_value==3){
			return {'fillColor':'#FFFF00','fill':true}
			}		
	},
	"culvert_sed-current_status":function(feature_properties_value){	
        //culvert_legend({"turn":"on", "legend_type":"sedimentation_survey"});  // soil_loss   sedimentation_survey   box_number	
		leaflet_legend([["0",'#F9F9F9'],["20",'#EBA59A'],["40",'#D07060'],["60",'#B04130'],["80",'#900A0B']],"<p>Sedimentation Percentage</p><p>%</p>",'','');
    color = feature_properties_value > 80  ? '#900A0B'   :           
           feature_properties_value > 60  ? '#B04130' :
           feature_properties_value > 40   ? '#D07060' :
           feature_properties_value > 20   ? '#EBA59A' :
           feature_properties_value > 0   ? '#F9F9F9' :
                      false;
	fill =  feature_properties_value > 0   ? true :
                      false;
					  
	return {"fillColor":color,'fill':fill}
	},
	"culvert_sed-sed_potential_sum":function(feature_properties_value){
		//culvert_legend({"turn":"on", "legend_type":"soil_loss"});  // soil_loss   sedimentation_survey   box_number	
		leaflet_legend([["0",'#4F71BD'],["500000",'#5DA3B9'],["1000000",'#EDF26D'],["1500000",'#FCB143'],["2000000",'#F56827'],["2500000",'#FF0000']],"<p>Sediment Potential (sum)</p><p>(tons/year)</p>",'','');
	color =  feature_properties_value > 2500000  ? '#FF0000' :
           feature_properties_value > 2000000   ? '#F56827' :
           feature_properties_value > 1500000   ? '#FCB143' :
		   feature_properties_value > 1000000   ? '#EDF26D' :
           feature_properties_value > 500000   ? '#5DA3B9' :
           feature_properties_value > 0   ? '#4F71BD' :   
                      '#FFFFFF';
	return {"fillColor":color,'fill':true}
	},
	"culvert_sed-sed_potential_mean":function(feature_properties_value){
		//culvert_legend({"turn":"on", "legend_type":"soil_loss"});  // soil_loss   sedimentation_survey   box_number	
		
		leaflet_legend([["0",'#4F71BD'],["50",'#5DA3B9'],["100",'#EDF26D'],["250",'#FCB143'],["300",'#F56827'],["400",'#FF0000']],"<p>Sediment Potential (mean)</p><p>(tons/year)</p>",'','');
		//
	color =   feature_properties_value > 400  ? '#FF0000' :
           feature_properties_value > 300   ? '#F56827' :
           feature_properties_value > 250   ? '#FCB143' :
		   feature_properties_value > 100   ? '#EDF26D' :
           feature_properties_value > 50   ? '#5DA3B9' :
           feature_properties_value > 0   ? '#4F71BD' :   
                      '#FFFFFF';
	return {"fillColor":color,'fill':true}
			
	}
	
};









 
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/




function GEN_change_layer_style_externally(input_layer,style_obj){
var obj=input_layer["_layers"];
for(var key in obj) {
   
  obj[key].setStyle(style_obj);
}
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//HUD_scenario_name_control_by_combine_field({'class_name':'','control_field':'','filter':'','input_combination':[]});
function HUD_scenario_name_control_by_combine_field(event_option_obj){  // THis function uses parallel structure to visualize pond by the year of built

var class_name=event_option_obj['class_name'];

var control_field=event_option_obj['control_field'];
var filter=event_option_obj['filter'];
var input_combination=event_option_obj['input_combination'];

var final_combined_scenario_name;


final_combined_scenario_name="";
for(var ic=0;ic<input_combination.length;ic++){
if(ic==input_combination.length-1){
final_combined_scenario_name+=$("#"+input_combination[ic]).val();
}else{
final_combined_scenario_name+=$("#"+input_combination[ic]).val()+"_";
}//end of if_statment
}//end of for loop


return final_combined_scenario_name;


}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//idot_feature_autocomplete({"drop_down_id"  ,  "search_box_id"   ,   "layer"})
	function idot_feature_autocomplete(options){
		
		$('.typeahead').unbind( "click" );


					var drop_down_id=options["drop_down_id"];
					var search_box_id=options["search_box_id"];
					var leaflet_layer=options["layer"];
                   // console.log(options);
				$(document).on('change','#'+drop_down_id,function(){
					
					var auto_complete_list={};
					var option_array= new Array();
				var drop_down = document.getElementById(drop_down_id);
				for (i = 0; i < drop_down.options.length; i++) {
					  !function outer(i){
							option_array[i] = drop_down.options[i].value;							   
							if(drop_down.options[i].value!="null"){
								  auto_complete_list[drop_down.options[i].value]=[];
							}

				      }(i)
				}
					
					var layer=leaflet_layer["_layers"];
					for(var k in option_array){
						!function outer(i){
								var properties_name = option_array[k];
								var properties_name = option_array[k];
								for(var a in leaflet_layer["_layers"]) {
										if(typeof layer[a]['feature']['properties'][properties_name]!="undefined" && layer[a]['feature']['properties'][properties_name]!=null){
											
												auto_complete_list[properties_name].push(layer[a]['feature']['properties'][properties_name]);
											/*
											
											if(Number($("#show_pond").val())>=Number(layer[a]['feature']['properties']["year_cat"])){
												
												auto_complete_list[properties_name].push(layer[a]['feature']['properties'][properties_name]);
											}else{
												
												
											}*/
											
										}
							 // obj[key].setStyle(style_obj);
							}
						}(i)
				}// end of for loop in option array

				  var search_method=$("#"+drop_down_id).val();
				  

				//#search_ponds 

				var parent_node=$("#"+search_box_id).parent();
				$('#'+search_box_id).remove();
				parent_node.append('<input id="'+search_box_id+'" class="form-control typeahead" type="text" value="Specify..." style="width:295px;">');
				
				
				
				$('#'+search_box_id).typeahead({
				hint: true,
				highlight: true,
				minLength: 1
				},
				{
				name: 'states',
				displayKey: 'value',
				source: GEN_substringMatcher(auto_complete_list[search_method])
				});


				});//end of on change


				
				$(document).on('click','.typeahead',function(){
					if($("#show_pond").val()!="null"&&$("#search_method").val()!="null"){
						
						if($("#"+search_box_id).val()=="Specify..."){

							$("#"+search_box_id).val("");
						}
						
					}else{
						alert("Please specify pond scenario and search method");
					}
					
				});
				
				$(document).on('click','.idot_menu',function(){
					$("#"+search_box_id).val('Specify...');
				});
				$(document).on('click','.tt-dropdown-menu',function(){		
						
						//|| $("#"+search_box_id).val()!='Specify...'
						if(typeof($("#"+search_box_id).val())!='undefined' ){
						console.log("outer");	
						culvert_zoom_by_matching_ppt({"matching_value":$("#"+search_box_id).val(),"matching_field":$("#"+drop_down_id).val(),"layer":window["idot"]["culvert"]},{});
						}
						//
					//HUD_scenario_style_control_by_matching_ppt({"matching_value":$("#"+search_box_id).val(),"matching_field":$("#"+drop_down_id).val()},leaflet_layer,{"pass_filter":DSS_hud_layer_styles.pond["find_pond_highlight"]});
					//HUD_scenario_style_control_by_matching_ppt({"matching_value":$("#"+search_box_id).val(),"matching_field":$("#"+drop_down_id).val()},leaflet_layer,{"pass_filter":DSS_hud_layer_styles.pond["find_pond_highlight"],"un_pass_filter":DSS_hud_layer_styles.pond["default"]});
					 
				});	
				
		}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

var GEN_substringMatcher = function(strs) {

return function findMatches(q, cb) {
var matches, substrRegex;
 
// an array that will be populated with substring matches
matches = [];
 
// regex used to determine if a string contains the substring `q`
substrRegex = new RegExp(q, 'i');
 
// iterate through the pool of strings and for any string that
// contains the substring `q`, add it to the `matches` array
$.each(strs, function(i, str) {
if (substrRegex.test(str)) {
// the typeahead jQuery plugin expects suggestions to a
// JavaScript object, refer to typeahead docs for more info
matches.push({ value: str });
}
});
 
cb(matches);
};
};
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/





function GEN_numberFormatter(num){
	

	
	if(isNaN(num)==false){
	var tempString=num.toString();
	return tempString.substr(0, parseInt(tempString.length-3)) + ',' + tempString.substr(parseInt(tempString.length-3))
	}else{
	return " ? "
	}
	
	
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/




/*--------------------------------------------------------------------------------------------------------------*/
function idot_create_modal_window (modal_id,options){

	
	if($( "body" ).has( "#"+modal_id ).length==0){
		console.log("KH2");
		var modal_title=options['title'];
		var style_window=options['style'];
		var style_window=options['style'];
	var append_model='<div id="'+modal_id+'"  class="modal fade"><div class="modal-dialog"  style="'+style_window+'"><div class="modal-content" ><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">'+modal_title+'</h4></div><div class="modal-body" id="'+modal_id+'_content"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>';
	$("body").append(append_model);
		
		  $("#"+modal_id).draggable({
      handle: ".modal-header"
          });
		   $("#"+modal_id).modal("show");
		  
	}else{
		 $("#"+modal_id).modal("show");
	}
	
}

/*--------------------------------------------------------------------------------------------------------------*/


$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $("#about_tab").tab('show');
  return false;
});

$("#contact-btn").click(function() {
  $("#aboutModal").modal("show");
   $("#contact_tab").tab('show');
  return false;
});




/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "fa fa-location-arrow",
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

// JavaScript Document


function idot_navigation(){
	window["idot_route"]=L.Routing.control({
		waypoints: [
			/*
			L.latLng(41.6667, -91.5333),
			L.latLng(41.5908, -93.6208)*/
		],
		routeWhileDragging: true,
		geocoder: L.Control.Geocoder.nominatim()
	});
	
	
	function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
		}

	map.on('click', function(e) {
		if($("#idot_route_navigation_interaction").bootstrapSwitch('state')==true){
			var container = L.DomUtil.create('div'),
				startBtn = createButton('Start from this location', container),
				destBtn = createButton('Go to this location', container);

			L.popup()
				.setContent(container)
				.setLatLng(e.latlng)
				.openOn(map);
			L.DomEvent.on(startBtn, 'click', function() {
			window["idot_route"].spliceWaypoints(0, 1, e.latlng);
				map.closePopup();
			});
			L.DomEvent.on(destBtn, 'click', function() {
				window["idot_route"].spliceWaypoints(window["idot_route"].getWaypoints().length - 1, 1, e.latlng);
				map.closePopup();
			});
				
		}//test if it is enabled			
		});
		
	
	window["idot_route"].addTo(map);
	
	
	
	
	// JavaScript Document
	jQuery(".leaflet-routing-container").detach().appendTo('#idot_route_machine');	
	$(".leaflet-routing-container").width( "270px" );	
	
	
	var export_route=" <button type='button' class='form-control btn btn-primary idot_export_route'>Export Route</button>";
	var post_route=" <button type='button' class='form-control btn btn-primary idot_post_route'>Post Route</button>";
	
	$("#idot_route_machine_control").append(export_route);
	$("#idot_route_machine_control").append(post_route);	
	
		
	
	
	$(".idot_export_route").click(function(e){		
		export_route_geojson(window["idot_route"],"export");		
	});
	
	$(".idot_post_route").click(function(e){	
		var r = confirm("This will overwrite server's route 4 file, are you sure");
		if (r == true) {
			export_route_geojson(window["idot_route"],"post");	
		}		
	});
	
	
	
	function export_route_geojson(routing_machine,action){
		console.log("trigger");
		var json_feature=[];
		for(var each_route in routing_machine["_routes"]){			
		!function(each_route){
			var single_route={ "type": "Feature",
		  "geometry": {
			"type": "LineString",
			"coordinates": [],
			},
		  "properties": {
			"route": "modified_2",			
			}
			};
			
			for(var each_coord in routing_machine["_routes"][each_route]["coordinates"]){
			!function(each_coord){
				
				single_route["geometry"]["coordinates"].push([routing_machine["_routes"][each_route]["coordinates"][each_coord]["lng"],routing_machine["_routes"][each_route]["coordinates"][each_coord]["lat"]]);				
			}(each_coord)
			}	
			
			json_feature.push(single_route);
			
		}(each_route)
		}
	
	var json_route={
	"type": "FeatureCollection",
	"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
	"features": json_feature
	 
	};
	
	 console.log(json_route);
	 var export_route = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
	};
	// window["test_route"]=L.geoJson(json_route,{ style: export_route}).addTo(map);	 
	 
	var action_list={
		"export":function(){
				var url = 'data:text/json;charset=utf8,' + encodeURIComponent(JSON.stringify(json_route));
				window.open(url, '_blank');
				window.focus();			
		},
		"post":function(){
			$.post("assets/php/iowa_culvert/Post_Route.php",{
					route: JSON.stringify(json_route)				
				},
				function(data, status){
					alert("the file is post, route 4 is changed");
				});
			
		},	
	};
	action_list[action]();

		
	}// end of exporting routing machine
	
	
}
//.leaflet-routing-container

function idot_file_submit(){	
	
	 $("#idot_file_submit").click(function () {
			$('#idor_file_form').submit(function(e){ 
			var formData = new FormData($(this)[0]);
			console.log(formData);
			//e.preventDefault(); 
			$.ajax({ 
			url:'assets/php/iowa_culvert/Field_Upload.php',
			type:'post', 
			data:formData, 
			async: false,
			success:function(){ 
                console.log("post3");
			//whatever you wanna do after the form is successfully submitted

			 },
			cache: false,
			contentType: false,
			processData: false		 
			 
			 }); 
		return false; 
			 });
 
	 }); 
}

function idot__site_file_submit(site){	
	console.log(site);
	 $("#idot_site_file_submit").click(function () {
			$('#idor_site_file_form').submit(function(e){ 
			var formData = new FormData($(this)[0]);
			console.log(formData);
			//e.preventDefault(); 
			$.ajax({ 
			url:'assets/php/iowa_culvert/Site_Field_Upload.php?target_title='+site,
			type:'post', 
			data:formData, 
			async: false,
			success:function(data){ 
                //alert(data);
			//whatever you wanna do after the form is successfully submitted

			 },
			cache: false,
			contentType: false,
			processData: false		 
			 
			 }); 
		return false; 
			 });
 
	 });
 
 
}
// 
//L.tileLayer('http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png', {
/*L.tileLayer('http://{s}.tile.openweathermap.org/map/rain_cls/{z}/{x}/{y}.png', {
    attribution: 'Map data ? OpenWeatherMap',
    maxZoom: 18
}).addTo(map);*/

//var clouds = L.OWM.clouds({showLegend: false, opacity: 0.5});


function idot_gps_html(){
	var x = document.getElementById("idot_html_gps");
	
	$("#idot_route_navigation_gps").on('switchChange.bootstrapSwitch', function(event, state) { 	
		if(state==true){
			getLocation();
			
		}else{
			
			stopWatch();
			x.innerHTML = "";
			if(map.hasLayer(window["idot_html_gps_marker"])){			
			map.removeLayer(window["idot_html_gps_marker"]);
			
			}
		}

		
		});
	
	
	function getLocation() {
		if (typeof(navigator.geolocation)!='undefined') {
			window["idot_gps_watch"]=navigator.geolocation.watchPosition(showPosition,geolocationError,
     {
		 // timeout at 10000 milliseconds (6 seconds)
         timeout: 1000,
         enableHighAccuracy: true,
         maximumAge: Infinity
     });
		} else {
			x.innerHTML = "Geolocation is not supported by this browser.";
		}
	}
	function showPosition(position) {
		
		x.innerHTML = "Latitude: " + position.coords.latitude + 
		"<br>Longitude: " + position.coords.longitude; 
		showleaflet(position);

	}
	
	function geolocationError(err){
		
		if(err.code == 1) {
               alert("Error: Access is denied!");
            }
            
            else if( err.code == 2) {
               alert("Error: Position is unavailable!");
            }
		
	}
	function stopWatch(){
            navigator.geolocation.clearWatch(window["idot_gps_watch"]);
         }
	function showleaflet(position){
		
		window["temp_geo_location_json"]= {
			"type": "Feature",
			"properties": {
				"name": "Field Team",
				"timestamp":position.timestamp,
			},
			"geometry": {
				"type": "Point",
				"coordinates": [position.coords.longitude, position.coords.latitude]
			}
		};
		
		if(map.hasLayer(window["idot_html_gps_marker"])){			
			map.removeLayer(window["idot_html_gps_marker"]);					
		}
			window["idot_html_gps_marker"]=L.geoJson(window["temp_geo_location_json"]);
			window["idot_html_gps_marker"].addTo(map);
			map.setView([position.coords.latitude,position.coords.longitude]);
			
		
	}
	
	$("#idot_route_navigation_gps_uplaod").on('switchChange.bootstrapSwitch', function(event, state) { 	
	    
		if(state==true){			
			post_idot_position();
				window["idot_gps_post"]=setInterval(function(){
					post_idot_position();
				
				}, 300000);
			//300000			
		}else{
			clearInterval(window["idot_gps_post"]);
			$("#idot_html_gps").css('color', 'rgb(51, 51, 51)');
		}	
		});	
	function post_idot_position(){
		$.post("assets/php/iowa_culvert/field_team_location.php",{
					position: JSON.stringify(window["temp_geo_location_json"])				
				},
				function(data, status){
					if($('#idot_html_gps').css("color")!="rgb(255, 0, 0)"){
					$("#idot_html_gps").css('color', 'rgb(255, 0, 0)');	
					}else{
					$("#idot_html_gps").css('color', 'rgb(51, 204, 51)');	
					}
					
				});
	}
}

function idot_overwatch(){
	$("#idot_route_overwatch").on('switchChange.bootstrapSwitch', function(event, state) { 		    
		if(state==true){
				idot_get_team_location();			
				window["idot_gps_overwatch"]=setInterval(function(){

				idot_get_team_location();
				
				
				}, 30000);
			//300000
		
			
			
			
		}else{
			clearInterval(window["idot_gps_overwatch"]);
			$("#idot_overwatch_location_time").css('color', 'rgb(51, 51, 51)');
		}	
		});	
		function idot_get_team_location(){
			$.getJSON( "data/dss/IDOT/state_data/geo_json/trip_planner/field_location.geojson", function( data ) {
						if(map.hasLayer(window["idot_team_location"])){			
									map.removeLayer(window["idot_team_location"]);					
								}
					
						window["idot_team_location"]=L.geoJson(data);
						window["idot_team_location"].addTo(map);
						map.setView([data["geometry"]["coordinates"][1],data["geometry"]["coordinates"][0]]);
						$("#idot_overwatch_location_time").html(new Date(data["properties"]["timestamp"]));						
						$("#idot_overwatch_location_time").css('color', 'rgb(255, 0, 0)');	
					
				});
		}
	
	
	
}

	
	

function idot_weather_control(){
	
		$("#idot_weather_city").on('switchChange.bootstrapSwitch', function(event, state) { 	
		idot_weather_city_map(state);		
		});
		
		$("#idot_weather_precip").on('switchChange.bootstrapSwitch', function(event, state) { 	
			idot_weather_cloud_map(state);	
		});
		function idot_weather_cloud_map(switch_parameter){
			
			if(switch_parameter==true){
				if(typeof(window["idot_precipitation"])=="undefined"){
					window["idot_precipitation"] = L.OWM.precipitation();
					map.addLayer(window["idot_precipitation"]);
				}else{
					map.addLayer(window["idot_precipitation"]);
				}			
				}
			if(switch_parameter==false){
				map.removeLayer(window["idot_precipitation"]);  
			}
			
		}
		function idot_weather_city_map(switch_parameter){			
			
			if(switch_parameter==true){
				if(typeof(window["idot_city"])=="undefined"){
					window["idot_city"] = L.OWM.current({intervall: 15, lang: 'en', appId:'dae6bd5360ca85c2ded9b11bb257d20d',imageLoadingUrl:'assets/js/dss_app/iowa_culvert/weather/owmloading.gif', imageUrlCity:"http://openweathermap.org/img/w/{icon}.png",
						markerFunction: myOwmMarker, popupFunction: myOwmPopup});
						//map.addLayer(clouds);
						map.addLayer(window["idot_city"]);
					
				}else{
					map.addLayer(window["idot_city"]);					
				}					
			}
			if(switch_parameter==false){
				map.removeLayer(window["idot_city"]);  
			}

			
				
						
				function myOwmMarker(data) {
					// just a Leaflet default marker
					//return L.marker([data.coord.lat, data.coord.lon]);
					//L.marker([51.5, -0.09], {icon: greenIcon})
					return L.marker([data.coord.lat, data.coord.lon], {icon: weather_icon(data.weather[0]["icon"])});
				}
				function myOwmPopup(data) {
					// just a Leaflet default popup with name as content
					return L.popup().setContent('Location: '+data.name+'<br> Weather:'+data.weather[0]["main"]+'<br> Temperature: '+data.main["temp"]+'<br> Min Temp: '+data.main["temp_min"]+'<br> Max Temp: '+data.main["temp_max"]+'<br>Humidity: '+data.main["humidity"]);
			
					}	
				
				function weather_icon(icon_id){
					
					var LeafIcon = L.Icon.extend({
						options: {
							//shadowUrl: 'leaf-shadow.png',
							iconSize:     [50, 50],
							//shadowSize:   [30, 30],
							iconAnchor:   [25, 50],
							//shadowAnchor: [4, 62],
							popupAnchor:  [25, 50]
						}
					});
								
					var icons_link = "http://openweathermap.org/img/w/"+icon_id+".png";
					var icon = new LeafIcon({iconUrl: icons_link});
					return icon
				}
			
		}	
}



