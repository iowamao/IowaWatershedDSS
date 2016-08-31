
//This is just a not in use mock up

 var dss_app_settings_idot_route={
	 "sidebar_ui_html":'<div id="idot_route_panel" class="panel-collapse collapse in"><div class="panel-body"><p style="color:#0493d3; font-weight: bold" ><p><input id="idot_route_route1" type="checkbox" name="idot-route-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" > &nbsp; Route 1 (East)</p><p><input id="idot_route_route2" type="checkbox" name="idot-route-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" > &nbsp; Route 2 (West)</p></div></div>',
	 "sidebar_ui_title":"Flood Mitigation Analysis (actual ponds)",
	 "app_btn_id":window["script_temp_data"],
	 "app_leaflet_layer":window["script_temp_data"]+"_leaflet_layers",
 }



loading_sidebar( dss_app_settings_idot_route );

var idot_route_layer_styles={	
"routes":{
"route1":{stroke: '#66FF66',weight: 1, opacity: 1,color: '#00ff0d'},
"route2":{stroke: '#66FF66',weight: 1, opacity: 1,color: '#008cff'},
"visible":{	fill: true , stroke:true },
"invisible":{	fill: false , stroke:false },
},
"waypoints":{
"city1":{	radius: 3,	weight: 5, fillColor: "#00ff0d",color: "#00ff0d",opacity:0.4,fillOpacity: 0.7, fill: false , stroke:false},
"city2":{	radius: 3,	weight: 5, fillColor: "#008cff",color: "#008cff",opacity:0.4,fillOpacity: 0.7, fill: false , stroke:false},
"hover":{	radius: 7,	weight: 5, },
"visible":{	fill: true , stroke:true , },
"invisible":{	fill: false , stroke:false },
},
"basin":{
"default":{	weight: 2, opacity: 1, color: '#FFCC66',  dashArray: '3',  fillOpacity: 0.3,stroke:true,	fill:false},	
"default_invisible":{		stroke:false,fill:false	},	
"mask":{weight: 1,opacity: 0.5,fillColor: '#FFFFFF ',color: '#999999 ',fillOpacity: 0.6,stroke:true,fill:true},
}
};


var DSS_hud_layer_features={
	"waypoint1":{
	"default_style":idot_route_layer_styles.waypoints["city1"],
	"default_layer":"yes",
	"geometery_type":"circular_marker",
	"layer_group":dss_app_settings_hud_soap["app_leaflet_layer"],
	"bringtofront":"yes",
	"url":"data/dss/IDOT/state_data/geo_json/trip_planner/trip_spots1.json",
	"onEachFeature":function (feature, layer){
		idot_bind_spot_popup(layer,feature);

	},
	},
	"waypoint2":{
	"default_style":idot_route_layer_styles.waypoints["city2"],
	"default_layer":"yes",
	"geometery_type":"circular_marker",
	"layer_group":dss_app_settings_hud_soap["app_leaflet_layer"],
	"bringtofront":"yes",
	"url":"data/dss/IDOT/state_data/geo_json/trip_planner/trip_spots2.json",
	"onEachFeature":function (feature, layer){
		idot_bind_spot_popup(layer,feature);

	},
	},
	"route1":{
	"default_style":idot_route_layer_styles.routes["route1"],
	"default_layer":"yes",
	"geometery_type":"regular",
	"layer_group":dss_app_settings_hud_soap["app_leaflet_layer"],
	"url":"data/dss/IDOT/state_data/geo_json/trip_planner/trip_route1.geojson",
	"onEachFeature":function (feature, layer){
		

	},
	},
	"route2":{
	"default_style":idot_route_layer_styles.routes["route2"],
	"default_layer":"yes",
	"geometery_type":"regular",
	"layer_group":dss_app_settings_hud_soap["app_leaflet_layer"],
	"url":"data/dss/IDOT/state_data/geo_json/trip_planner/trip_route2.geojson",
	"onEachFeature":function (feature, layer){


	},
	},

};// end of feature layer object

function idot_bind_spot_popup(layer,feature){	
	layer.bindPopup("<p><b>City Name</b> :"+feature.properties.Name+"<br>");
}