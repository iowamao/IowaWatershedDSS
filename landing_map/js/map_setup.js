// JavaScript Document
// Map setup

// create a map in the "map" div, set the view to a given place and zoom
// landing map set up

  
var auto_complete_list={};
	   $.ajax({
  url : 'data/HUC_autocomplete_limited.csv',
  dataType : 'text',
  jsonpCallback: 'getJson',
  success: function(data){
	  var json_data=GEN_csvToJSON(data);
	  var properties_list=["HUC_8","HUC_12","HU_8_NAME","HU_12_NAME","county_10","countylsad","city_10","citylsad"];
	  document.jsd=GEN_csvToJSON(data);
	  for (var k in properties_list){
		  var attribute_name=properties_list[k];
		  auto_complete_list[attribute_name]=[];
		  
		
		  for(var i=0;i<json_data.length;i++){
              if(typeof json_data[i][attribute_name]!='undefined'){
				   auto_complete_list[attribute_name].push(json_data[i][attribute_name]);
				 
			  } 
			}
		  
	  }
	   
  }
});//end of ajax
	//console.log(auto_complete_list);
  





//http://dos.iihr.uiowa.edu:6080/arcgis/rest/services/Iowa_Watershed/IA_DEM_8bit/MapServer
//http://dos.iihr.uiowa.edu:6080/arcgis/rest/services/Iowa_Watershed/IA_watershed_Basemap/MapServer



/*
var basemap_dem=L.esri.dynamicMapLayer("http://dos.iihr.uiowa.edu:6080/arcgis/rest/services/Iowa_Watershed/IA_watershed_Basemap/MapServer", {
opacity : 1, position:'back',layers:[1],format:'gif'
});
*/
//var basemap_dem_link="http://s-iihr32.iihr.uiowa.edu:8080/geoserver/Iowa_Watershed/wms";
//http://s-iihr32.iihr.uiowa.edu:8080/geoserver/Iowa_Watershed/wms?service=WMS&version=1.1.0&request=GetMap&layers=Iowa_Watershed:ned_ft1&styles=IowaWS_DEM&bbox=189970.0,4450180.0,745000.0,4840210.0&width=512&height=359&srs=EPSG:26915&format=application/openlayers
//http://s-iihr32.iihr.uiowa.edu:8080/geoserver/Iowa_Watershed/wms?styles=IowaWS_DEM


/*
var basemap_dem = L.tileLayer.wms("http://s-iihr32.iihr.uiowa.edu:8080/geoserver/Iowa_Watershed/wms", {
layers: 'Iowa_Watershed:ned_ft1_50', format: 'image/gif', version: '1.1.0', transparent: true, srs:32615, attribution: "", tiled:true, styles:"Iowa_WS_DEM_gen" })
*/
//basemap_dem.addTo(map);


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
	"custmized_wms":{
		"state_dem":L.tileLayer.wms("http://s-iihr32.iihr.uiowa.edu:8080/geoserver/Iowa_Watershed/wms", 
						{layers: 'Iowa_Watershed:ned_ft1_50', format: 'image/gif', version: '1.1.0', transparent: true, srs:32615, attribution: "", tiled:true, styles:"Iowa_WS_DEM_gen" }),
		/*"states_boundary":L.esri.dynamicMapLayer("http://dos.iihr.uiowa.edu:6080/arcgis/rest/services/Iowa_Watershed/US_states_names_wo_iowa/MapServer", 
						{opacity : 1, position:'back',layers:[0],format:'gif'}),	
		"state_dem":L.esri.dynamicMapLayer("http://dos.iihr.uiowa.edu:6080/arcgis/rest/services/Iowa_Watershed/IA_watershed_Basemap/MapServer", {
						opacity : 1, position:'back',layers:[1],format:'gif'
						}),*/
	}
}
window["basemap_by_search"] = { 
	"null":basemap["custmized_wms"]["state_dem"],
	"state":basemap["google"]["google_terrain"],
	"huc8":basemap["google"]["google_terrain"],
	"huc12":basemap["google"]["google_terrain"],
	"county":basemap["USGS"]["NHD_map"],
	"city":basemap["USGS"]["NHD_map"],
	"poi":basemap["esri"]["Road"],
	"project":basemap["google"]["google_terrain"],
};
$(document).on('change','#search_standard',function(){
	
		for(var each in window["basemap_by_search"]){	
		if(map.hasLayer(window["basemap_by_search"][each])){
			console.log(each);
			console.log(map.hasLayer(window["basemap_by_search"][each]));
			
			console.log(window["basemap_by_search"][each]);
			
			 map.removeLayer(window["basemap_by_search"][each]); 			
		}//test if map has layer
		
		}	
	  if(!map.hasLayer(window["basemap_by_search"][$("#search_standard").val()])){			
		map.addLayer(window["basemap_by_search"][$("#search_standard").val()]);
		//window["basemap_by_search"][$("#search_standard").val()].bringToBack();
		}
}); 




var map = L.map('map', {
    center: [42.000, -93.911],
    zoom: 9,
//crs: L.CRS.EPSG102100,
 continuousWorld: true,
 zoomControl:false,
layers: [/*basemap["custmized_wms"]["states_boundary"],*/basemap_by_search['null']],

});
map.fitBounds([
    [40.376, -96.639],
    [43.501, -90.141]
]);
setTimeout(function(){ map.setZoom(map.getZoom()+0.5); }, 500);


var zoomControl = L.control.zoom({
  position: "topright"
}).addTo(map);


var map_scale=L.control.scale({"position":"bottomleft","maxWidth":200});
map_scale.addTo(map);




$( document ).ready(function() {
    $("#search_standard").val("null");
	//lauch_state_app("show");
});








map_reset_button();
 

//watershed_search.NHD_search_point
//watershed_search.NHD_search_huc
//watershed_search.NHD_search_city




var ifis_search_result = new L.LayerGroup();
ifis_search_result.addTo(map)



// used to insert into DB
function auto_insert_huc(feature,huc){           
						
				
							
							$.ajax({
								  url : "php/NHD_insert/NHD_trace_huc_insert.php?huc="+huc,
								  dataType : 'json',
								  jsonpCallback: 'getJson',
								  success: function(data){
		                            console.log(data)
							}
							
					});	
			
				// leaflet_layer_setstyle([HUC8_global,City_global,County_global],project_Default_style);
	
	
}	
function auto_insert_huc12(feature,huc){           
						
				
							
							$.ajax({
								  url : "php/NHD_insert/NHD_trace_huc12_insert.php?huc="+huc,
								  dataType : 'json',
								  jsonpCallback: 'getJson',
								  success: function(data){
		                            console.log(data)
							}
							
					});	
			
				// leaflet_layer_setstyle([HUC8_global,City_global,County_global],project_Default_style);
	
	
}		
		
var layer_style={
	"ws_highlisht":{        	
				weight: 2,
                opacity: 0.6,
                color: "#8C001A",
				stroke:"#FF3399",
                fillOpacity: 0.3,
				fill:true,
				stroke:true,
			},
	"project_highlight":{
				weight: 3,
                opacity: 0.6,
                color: "#8C001A",
				stroke:"#FF3399",
                fillOpacity: 0.3,
				fill:true,
				stroke:true,
						},
	"Huc_poi_style":{
	                    fill:true,
						dashArray: '3',
						stroke:"#FF3399",
						weight: 5,
						opacity: 1,
						color: '#FF3399',
						fillOpacity: 0.3 	
						},
	"project_default_style":{
		     fill:true,
				stroke:"#8C001A",
				weight: 1.5,
				opacity: 0.8,
				color: '#8C001A',
				fillOpacity: 0.01
	},
	'city_default_style':{
		     fill:true,
				stroke:"#8C001A",
				weight: 0.7,
				opacity: 0.9,
				color: '#8C001A',
				fillOpacity: 0.01	
				},
	'Huc_default_style':{
		     fill:true,
				stroke:"#8C001A",
				weight: 0.5,
				opacity: 0.5,
				color: '#8C001A',
				fillOpacity: 0.01	
				},
				
	'Huc_ws_trace_style':{
					fill:true,
					dashArray: '3',
						stroke:"#0066FF",
						weight: 5,
						opacity: 1,
						color: '#0066FF',
						fillOpacity: 0.02	
						},

	'mask_style':{
				weight: 1,
                opacity: 0.5,
                fillColor: '#FFFFFF ',
				color: '#999999 ',
                fillOpacity: 0.6,
				stroke:true,
				fill:true,
				   
			   },



	
}			   
			   
		
			   
			   
var Layer_features={
"Iowa_mask":{
"default_style":layer_style.mask_style,
"default_layer":"yes",
"url":"data/iowa_state_mask.json",
"onEachFeature":function (feature, layer) {
	
},
},
"Iowa_state_boundary":{
"default_style":layer_style.Huc_poi_style,
"url":"data/iowa_state_boundary.json",
"onEachFeature":function (feature, layer){
	
	var color_coding={
		"huc_boundary":layer_style.Huc_ws_trace_style,
		"state_boundary":layer_style.Huc_poi_style,		
	}
	layer.setStyle(color_coding[feature.properties.Id]);
	
	
	
},
},
"HUC12_global":{
"default_style":layer_style.Huc_default_style,
"special_format":"topojson",
"url":"data/HUC_12_topo.json",
"onEachFeature":function (layer){
     layer.on('mouseover', function (e) {  


	 });
	
},
},
"HUC8_global":{
"default_style":layer_style.Huc_default_style,
"url":"data/HUC8.json",
"onEachFeature":function (feature, layer) {
	leaflet_layer_highlight(feature, layer,layer_style.Huc_default_style,layer_style.ws_highlisht,"SUBBASIN");
	layer.on('click', function (e) {
	
	watershed_search.NHD_search_huc(feature.properties["HUC_8"],feature);
	pause_interaction(1000);	
	
	});
	$(document).on("click","#insert",function(){
		//this is used for automated the search
		console.log("tried insert");
		auto_insert_huc(feature,feature.properties["HUC_8"]);
	});
	
	

},
},
"County_global":{
"default_style":layer_style.Huc_default_style,
"url":"data/IA_county.json",
"onEachFeature":function (feature, layer) {
	leaflet_layer_highlight(feature, layer,layer_style.Huc_default_style,layer_style.ws_highlisht,"countylsad");	
    
	layer.on('click', function (e) {	
	watershed_search.NHD_search_city(feature);
	pause_interaction(1000);
	});

},    
},
"City_global":{
"default_style":layer_style.city_default_style,
"url":"data/IA_city.json",
"onEachFeature":function (feature, layer) {
leaflet_layer_highlight(feature, layer,layer_style.city_default_style,layer_style.ws_highlisht,"citylsad");
	
	layer.on('click', function (e) {	
	watershed_search.NHD_search_city(feature)
	pause_interaction(1000);
	});

},
},
"project_global":{
"default_style":layer_style.project_default_style,
"url":"data/HUC_project.json",
"onEachFeature":function (feature, layer) {	
leaflet_layer_highlight(feature, layer,layer_style.project_default_style,layer_style.project_highlight,"citylsad");
third_level_pj_boundary(feature,layer,{"original":layer_style.project_default_style,"poi":layer_style.Huc_poi_style});


layer.on('mouseover', function (e) {
	
	var text=ws_project_generate_project_prompt(feature.properties.watershed,watershed_projects,project_detail);
	//console.log(text);
	show_project_legend_from_text(text,"show");
	//show_project_legend(feature,layer,"prompt","show");
});
layer.on('mouseout', function (e) {
	show_project_legend_from_text("","hide");
});

project_layer_hidding(feature,layer,["turkey_river","clear_creek","indian_creek","soap_creek"],"watershed");


},
},
};// end of feature layer object



function project_layer_hidding(feature,layer,attribute_list,attrbute){
	if(attribute_list.indexOf(feature.properties[attrbute])<0){
	layer.setStyle({"fill":false,"stroke":false});
	
	}//end of hiding unwanted
	
}




function leaflet_layer_initialize(Layer_features){
	
	
var layer_spatial_json_handeler={
	"topojson":function(key,Layer_features,style){
		leaflet_topojson_initilizer(key,Layer_features,style);
		
	}
	
}

//leaflet_topojson_initilizer(key,Layer_features)
//--------------------------------------------------------------------------------------------------------------
for ( var key in Layer_features){
	!function outer(key){ //for loop function call back
				
			var each_layer_data=Layer_features[key];
			var  layer_style= each_layer_data["default_style"];
					
			if (Layer_features[key].special_format){ // check to see if it is json
				
				var format=Layer_features[key].special_format;
				layer_spatial_json_handeler[format](key,Layer_features,layer_style );
				
				if (Layer_features[key].default_layer){
					
					$.getJSON(Layer_features[key]["url"], function (data) {
						  window[key].addData(data);
						  						  
						  
						});		
					map.addLayer(window[key]);
				}	
					
			}
			else{
				


					  window[key] = L.geoJson(null, {style:layer_style ,onEachFeature: function (feature, layer) {	
					  each_layer_data["onEachFeature"](feature, layer);					
						}//end of oneach				
						});//end of layer creation
						
						if (Layer_features[key].default_layer){  
						$.getJSON(Layer_features[key]["url"], function (data) {
						  window[key].addData(data);		  
						  
						});		
						   map.addLayer(window[key]);
						  } //end of adding default layer 
						  
			}	
					
				}(key)		
}//end of for loop

}




 leaflet_layer_initialize(Layer_features);


//------------------------------------start of HUC 12 ------------------------------------------//

function leaflet_topojson_initilizer(key,Layer_features,default_style){
	
    var layer_name=key;
	var url=Layer_features[layer_name]["url"];
	//var oneachfunction=Layer_features[layer_name]["onEachFeature"];
	window['global_topojson_default_style']=default_style; //assign the layer style to a global scope
	 
	 
	L.TopoJSON = L.GeoJSON.extend({  
	  addData: function(jsonData) {    
		if (jsonData.type === "Topology") {
		  for (key in jsonData.objects) {
			geojson = topojson.feature(jsonData, jsonData.objects[key]);
			L.GeoJSON.prototype.addData.call(this, geojson);
		  }
		}    
		else {
		  L.GeoJSON.prototype.addData.call(this, jsonData);
		}
	  }  
	});


window[layer_name]=new L.TopoJSON();
window[layer_name].eachLayer(console.log("a"));

var colorScale = chroma  
  .scale(['#D5E3FF', '#003171'])
  .domain([0,1]);
}//end of the function

function handleLayer_topojson(layer){  

//auto_insert_huc12
		
		

		 var default_style=window['global_topojson_default_style']; 
		 layer.setStyle(default_style);
		 
		 layer.on('click', function (e) {  
		       var value=this.feature.properties["HUC_12"]; 
			   watershed_search.NHD_search_huc(value,this.feature);	
               pause_interaction(2000); 
			   //console.log(layer);
			   //console.log(feature);
			   //get_huc_12_name(e);
			   //
			   
			   //search_box
		 });
		 layer.on('mouseout', function (e) {  
			   this.bringToFront();
			   this.setStyle(default_style);

			   // $tooltip.hide();  
		 });
		 
		 
		  layer.on('mouseover', function (e) { 
		  	   //console.log(this.feature.properties); 
				var attribute_type=$("#search_parameter").val();
				var value=this.feature.properties[attribute_type]; 
				$("#search_box").val(value);
				this.bringToFront();				
				this.setStyle(layer_style["ws_highlisht"]);
		 });
 
/*
  
    layer.on({
   // mouseover: enterLayer,
    mouseout: leaveLayer,
	mouseover:enterLayer,
	//click: get_huc_12_name,


  });*/
  
  function get_huc_12_name(e){
	var ylat=e.latlng.lat;
	var xlng=e.latlng.lng;	
	var url="../../../geoserver/Iowa_Watershed/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Iowa_Watershed:huc12&maxFeatures=2&PROPERTYNAME=geom,hu_12_name,huc_12&CQL_FILTER= CONTAINS(geom,POINT("+xlng+" "+ylat+"))&outputFormat=application/json"
	//var url="../../geoserver/Iowa_Watershed/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Iowa_Watershed:huc12&maxFeatures=50&PROPERTYNAME=hu_10_name,hu_12_name,hu_12_gnis,huc_12 &CQL_FILTER= CONTAINS(geom,POINT("+xlng+" "+ylat+"))&outputFormat=application/json"

    $.getJSON(url, function(result){
      // console.log(result);
	   var property=result.features[0]['properties'];
	 //  var text="HUC Number: "+property['huc_12']+" --- Watershed name: "+property['hu_10_name']+" --- GNIS name: "+property['hu_12_name'];
		var text=property['hu_12_name'];			  
	   $("#search_box").val(text);
       window["poi"]=result;	   
	   console.log(result);
	   //console.log(window["poi"]);
	   //console.log(this);
	   
	   for(var each in result["features"]){
		   watershed_search.NHD_search_huc(property['huc_12'],result["features"][each]);	
           pause_interaction(2000); 
		   
	   }
 
    });
}
  
  

}//end of handle topojson layer and data



/*----------------------------------------------------------------end of HUC12------------------------------------------------------------------------------*/


// layer addition
/*-------------------------------------------------------------map control and menu control-----------------------------------------------------------------*/
var overlay={  };
var menue_generation={
  'huc12': " <li class='dynamic_menu'><a > <select  id='search_parameter'><option value='HUC_12'> Hydrologic Unit Code </option><option value='HU_12_NAME' selected> Watershed Name </option></select></a></li><li class='dynamic_menu'><a ><input type='text' id='search_box' class='typeahead' placeholder='Specify...'> </a></li>",
  'huc8':" <li class='dynamic_menu'><a > <select  id='search_parameter'><option value='HUC_8'> Hydrologic Unit Code </option><option value='HU_8_NAME' selected> Watershed Name </option></select></a></li><li class='dynamic_menu'><a ><input type='text' id='search_box' class='typeahead' placeholder='Specify...'> </a></li>",
  'poi':"<li class='dynamic_menu'><a > <select  id='poi_search_parameter'><option value='street'> By street </option><option value='landmark'> By map location </option></select></a></li><li class='dynamic_menu' ><a id='geo_coding_bar'></a></li>", 
  'county':"<li class='dynamic_menu'><a > <select  id='search_parameter'><option value='countylsad'> County Name </option></select></a></li><li class='dynamic_menu'><a ><input type='text' id='search_box' placeholder='Specify...'> </a></li>",
  'city':"<li class='dynamic_menu'><a > <select  id='search_parameter'><option value='city_10'> City Name </option></select></a></li><li class='dynamic_menu'><a ><input type='text' id='search_box' placeholder='Specify...'> </a></li>",
//<option value='countylsad'> County Name </option>           used to be under city, but not in use now
  }




$( document ).ajaxStop(function() {
  overlay={
'huc12':'HUC12_global',
'huc8':'HUC8_global',	 
'county':'County_global',	
'city':'City_global',	   
'project':'project_global',
'state':'Iowa_state_boundary',


   };

 if(typeof layer_of_change!='undefined'){

layer_of_change=window[overlay[$("#search_standard").val()]];


	  //map.addLayer(layer_of_change);
	  layer_of_change.bringToFront();
 }

 
 if($("#search_parameter").length==0 && $("#poi_search_parameter").length==0){
	 
	 $(".dynamic_menu").remove();

	 
 } 
});





$(document).on('change','#search_standard',function(){
	
ws_pin.clearLayers();
lauch_state_app('hide');
ifis_search_result.clearLayers();
show_map_legend("hide");
show_launch_button("hide");

map.fitBounds([
    [40.37544, -96.639485],
    [43.501196, -90.140061]
]);
//setTimeout(function(){ map.setZoom(map.getZoom()+0.5); }, 500);
	
/* Firstly, remove all the layer*/
	for(var k in overlay){	
		 map.removeLayer(window[overlay[k]]); 
	}
/* End of removing all the layer*/
	var search_standard=$("#search_standard").val(); 
	
	var search_standard_event={
		'state':function(){
			lauch_state_app("show");
			show_map_legend("show");
		},	
		

		
		
	}
	if(search_standard_event.hasOwnProperty(search_standard)){
		search_standard_event[search_standard]();		
	}

     var layer_name=overlay[search_standard];
	 layer_of_change=window[layer_name];
	 
	 if(typeof layer_of_change!='undefined'){	 

		 if(typeof Layer_features[layer_name]["json"]=='undefined'){
			 
				laoding_spinner("show");
				


		 var local_url=Layer_features[layer_name]["url"];
		     
			$.getJSON(local_url, function (data) {
			Layer_features[layer_name]["json"]=data;
				laoding_spinner("hide");
			
		if (Layer_features[layer_name].special_format){ // check to see if it is json
		
		  layer_of_change.addData(data);         	  
		  layer_of_change.eachLayer(handleLayer_topojson ); //end of each layer 
		 // map.fitBounds(layer_of_change.getBounds()); 
		
         } 			
		else{	
			layer_of_change.addData(data);
		    // map.fitBounds(layer_of_change.getBounds()); 
		}
		}); //using ajax to load data
	

		
		 } //end of cheking if data is downloaded
		 
	  map.addLayer(layer_of_change);
	  
	 
	  
	 
 }
 
 //in the poi section, basemap dem will be remove, so this function will check if the dem is removed	
	

 //if the dem is removed, then if will add a basemap to it
 
 
 // start generation of menue

	 $(".dynamic_menu").remove();
	 

 $(".titlebar").append(menue_generation[$("#search_standard").val()]);
 
 $('#map').css( 'cursor', 'pointer' );
 if($("#search_standard").val()=="poi"  ){
	 $('#map').css( 'cursor', 'crosshair' );

	inilize_geocoding(); 
	map_dynamic_ws();
 
 		map.fitBounds([
    [40.376, -96.639],
    [43.501, -90.141]
		]);
	 
	 
	$(document).on('change','#poi_search_parameter',function(){	
	$(".geocoder-control").remove();
	inilize_geocoding();
	});	 
 }

 
 
 autocomplete();  
 
});



   function pushpin(){

   var pushpinL = L.icon({
    iconUrl: 'data/map_control/brown_marker.png', 
    iconSize:     [25, 41], // size of the icon  
    iconAnchor:   [12.5, 42], // point of the icon which will correspond to marker's location   
    popupAnchor:  [-10, -90] // point from which the popup should open relative to the iconAnchor
});
return pushpinL;


   }




function inilize_geocoding(){
	
	//map.removeLayer(esri_Road);	
   // basemap_dem.setOpacity(1);	
	 $(".geocoder-control").remove();
	
	
	if($("#poi_search_parameter").val()== "street" ){
			
		//map.addLayer(esri_Road);  //add road map to the map
		//esri_Road.bringToFront();
		//basemap_dem.setOpacity(0.3);

		
		
	
		$.getScript( "//cdn.jsdelivr.net/leaflet.esri/1.0.0/esri-leaflet.js", function( data, textStatus, jqxhr ) {
		$.getScript( "//cdn.jsdelivr.net/leaflet.esri.geocoder/1.0.2/esri-leaflet-geocoder.js", function( data, textStatus, jqxhr ) {
				
	
		//var results = L.layerGroup().addTo(map);
			if($(".geocoder-control-input").length==0){
				var searchControl = L.esri.Geocoding.Controls.geosearch(
					 {useMapBounds:true}
					 
					 ).addTo(map);
				
			}
			 
			 
			searchControl.on('results', function(data){
    
	ifis_search_result.clearLayers(); //prepare watershed for display
	ws_pin.clearLayers(); //prepare watershed for display
    for (var i = data.results.length - 1; i >= 0; i--) {

	  
	  var lat=data.results[i].latlng.lat;
	  var lng=data.results[i].latlng.lng;
	 
	 watershed_search.NHD_search_point(lat,lng);


	  
    }
  }); //end of on search function   
  
  
  
		jQuery(".geocoder-control").detach().appendTo('#geo_coding_bar');	
		$( ".geocoder-control-input" ).removeClass( "leaflet-bar" );
		
		
	
		
		
		
		$(document).on('mouseover','.geocoder-control-input',function(){
		map.fitBounds([
    [40.376, -96.639],
    [43.501, -90.141]
		]);
		

	//setTimeout(function(){ map.setZoom(7.6); }, 200);
		});
			
		});});//end of getting script
}
	
}//end of geocoding function






var ws_pin = L.layerGroup().addTo(map);
function map_dynamic_ws(){	
		//generate the event first, then test if needs to be fires
		
/*		
map.on('mousemove', function(e) {
if($("#poi_search_parameter").val()== "landmark" ){	


	//ws_pin.clearLayers();
   // ws_pin.addLayer(L.marker(  [e.latlng.lat,e.latlng.lng],{icon: pushpin()}  ));
}//end of if
	});	*/	
map.on('click', function(e) {
	if($("#poi_search_parameter").val()== "landmark" ){
   // console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
   
     
      ifis_search_result.clearLayers();
 
  
	//instant_watershed(e.latlng.lat,e.latlng.lng,500,"");
	watershed_search.NHD_search_point(e.latlng.lat,e.latlng.lng);
	
	// nhd_ws_trace(e.latlng.lat,e.latlng.lng);


	}

		
});	
}


$(document).on('change','#search_parameter',function(){	
autocomplete();

});//end of on change event

function autocomplete(){
	
	
var parent_node=$("#search_box").parent();
$('#search_box').remove();
parent_node.append('<input id="search_box" class="typeahead" type="text" placeholder="Specify...">');
	
$('#search_box').typeahead({
hint: true,
highlight: true,
minLength: 1
},

{
name: 'states',
displayKey: 'value',
source: GEN_substringMatcher(auto_complete_list[$("#search_parameter").val()])
});


	/*console.log(auto_complete_list);
	console.log(auto_complete_list[$("#search_parameter").val()]);
	console.log($("#search_parameter").val());*/

}



/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


//----------------------------------------------------------setting up auto complete---------------------------------------------------
$(document).on('click','.tt-dropdown-menu',function(){

var search_level=$("#search_standard").val();
var search_parameter=$("#search_parameter").val();


var layer_autocomplete_controller={
	
	"huc8":function(){		
		var filter_feature=LG_scenario_style_control_by_matching_ppt({"matching_value":$("#search_box").val(),"matching_field":$("#search_parameter").val()},HUC8_global,{"pass_filter":{weight: 5,color: '#FF3399',fill:false },"un_pass_filter":layer_style["Huc_default_style"]});
	    //console.log(filter_feature);
		watershed_search.NHD_search_huc(filter_feature.properties["HUC_8"],filter_feature);
	},
	"huc12":function(){		
		var filter_feature=LG_scenario_style_control_by_matching_ppt({"matching_value":$("#search_box").val(),"matching_field":$("#search_parameter").val()},HUC12_global,{"pass_filter":{weight: 5,color: '#FF3399',fill:false },"un_pass_filter":layer_style["Huc_default_style"]});
		//console.log(filter_feature);
		watershed_search.NHD_search_huc(filter_feature.properties["HUC_12"],filter_feature);	
		//huc12_find_watershed_boundary(search_parameter,$("#search_box").val());
		
 	},
	"county":function(){
		var filter_feature=LG_scenario_style_control_by_matching_ppt({"matching_value":$("#search_box").val(),"matching_field":$("#search_parameter").val()},County_global,{"pass_filter":{weight: 5,color: '#FF3399', fill:false},"un_pass_filter":layer_style["Huc_default_style"]});
		watershed_search.NHD_search_city(filter_feature);
	},
	"city":function(){
		 var filter_feature=LG_scenario_style_control_by_matching_ppt({"matching_value":$("#search_box").val(),"matching_field":$("#search_parameter").val()},City_global,{"pass_filter":{weight: 5,color: '#FF3399', fill:false},"un_pass_filter":layer_style["city_default_style"]});
		 watershed_search.NHD_search_city(filter_feature);
		
	},
	
	
}
layer_autocomplete_controller[search_level]();

var left=$(".tt-dropdown-menu").css("left");
var width=$(".tt-dropdown-menu").css("width");
console.log($(".tt-dropdown-menu").css("left"));

// border-style:solid;
pause_interaction(3500);


});	//end of clike


var dynamic_search_result = new L.LayerGroup();
dynamic_search_result.addTo(map)

function pause_interaction(time){
	$("#map").append("<div class='temp_map_block' style='position:absolute; top:0%; left:0%; height:100%; width:100%; '></div>");
setTimeout(function(){ 
$(".temp_map_block").remove();
}, time);
	
}


function huc12_find_watershed_boundary(field_name,search_value){
	
	dynamic_search_result.clearLayers();
	ifis_search_result.clearLayers();
var result_display = L.geoJson(null, {
  style:	{
				fill:false,
				stroke:"#6600FF",
                weight: 5,
                opacity: 1,
                color: '#FF3399',
                fillOpacity: 0.1 							
				
            },onEachFeature: function (feature, layer) {
	
			}//end of oneach
				
			});
var conversion={
	"HUC_8":"huc_8",
	"HUC_12":"huc_12",
	"HU_12_NAME":"hu_12_name",
	
}
//&PROPERTYNAME=geom,hu_12_name,huc_12&
//http://s-iihr32.iihr.uiowa.edu:8080/geoserver/Iowa_Watershed/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Iowa_Watershed:huc12&maxFeatures=50&CQL_FILTER=huc_8%20IN%20%28%2707060005%27%29&outputFormat=application/json		
var query="../../../geoserver/Iowa_Watershed/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Iowa_Watershed:huc12&maxFeatures=50&CQL_FILTER="+conversion[field_name]+" IN ('"+search_value+"')&outputFormat=application/json"		
   $.getJSON(query, function (data) {
	   

  result_display.addData(data);
result_display.addTo(ifis_search_result);
 
 //return result_display;
var watershed_extent=result_display.getBounds();
 map.fitBounds(watershed_extent);	
 

 //console.log(data["features"]);
 
 
 for(var each in data["features"]){
	
  console.log(data["features"][each]["properties"]);
watershed_search.NHD_search_huc(data["features"][each].properties["huc_12"],data["features"][each]);	 
	 
 }
 
});	
	
}





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




function LG_scenario_style_control_by_matching_ppt(event_option_obj,leaflet_layer,style_obj){  // THis function uses parallel structure to visualize pond by the year of built
//API:HUD_scenario_style_control_by_matching_ppt({"class_id":"","matching_value":"","matching_field":""},leaflet_layer,{"pass_filter":""})
ifis_search_result.clearLayers();


var matching_value=event_option_obj['matching_value'];
var matching_field=event_option_obj['matching_field'];
var pass_filter=style_obj['pass_filter'];
var un_pass_filter=style_obj['un_pass_filter'];
var filter_value=$("#"+this.id).val();

var layer=leaflet_layer["_layers"];
var final_result;

for(var each_element in layer) {
var feature=layer[each_element]['feature'];

//console.log(feature.properties[matching_field] +"    "+ matching_value);


if(feature.properties[matching_field] == matching_value){

		layer[each_element].setStyle(pass_filter);
		console.log(feature.properties[matching_field]);		

		//watershed_search.NHD_search_city(feature);
		console.log(feature);
		final_result=feature;

}else{
	console.log("no");	
	layer[each_element].setStyle( un_pass_filter);
}

} // for loop element in in obj
return final_result;
}




function laoding_spinner(show_map_legend){
	
	
var opts = {
  lines: 13, // The number of lines to draw
  length: 20, // The length of each line
  width: 10, // The line thickness
  radius: 30, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb or array of colors
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};
		if($("#spinner_box").length<=0){
			
				$('#map').append("<div id='spinner_box' style='position:absolute;left:50%;top:50%;height:1px;width:1px;'></div>");
				
			
			}else{
				
		}
		
var target= document.getElementById('spinner_box');
var spinner = new Spinner(opts).spin(target);


var control={
	"show":function(){

	
	target.appendChild(spinner.el);
	$("body").append("<div class='temp_map_block_2' style='position:absolute; top:0%; left:0%; height:100%; width:100%; z-index:99; background-color:rgba(0, 0, 0, 0.1);  '></div>");	
	
	},
	"hide":function(){
		
		 $('#spinner_box').empty();
		
		setTimeout(function(){
		$(".temp_map_block_2").remove();
		
		}, 1000);
	},
	
};//end of control obj

control[show_map_legend]();
	
	
}








  function GEN_csvToJSON(csvString){

  // The array we're going to build
  
  var csvArray   = [];
  // Break it into rows to start
  var csvRows=csvString.split(/\n/);
  // Take off the first line to get the headers, then split that into an array
  var csvHeaders = csvRows.shift().split(',');

  // Loop through remaining rows
  for(var rowIndex = 0; rowIndex < csvRows.length; ++rowIndex){
    var rowArray  = csvRows[rowIndex].split(',');

    // Create a new row object to store our data.
    var rowObject = csvArray[rowIndex] = {};
    
    // Then iterate through the remaining properties and use the headers as keys
    for(var propIndex = 0; propIndex < rowArray.length; ++propIndex){
      // Grab the value from the row array we're looping through...
      var propValue =   rowArray[propIndex].replace(/^"|"$/g,'');
      // ...also grab the relevant header (the RegExp in both of these removes quotes)
      var propLabel = csvHeaders[propIndex].replace(/^"|"$/g,'');;
      rowObject[propLabel] = propValue;
    }
  }
  return csvArray;
	
  }




