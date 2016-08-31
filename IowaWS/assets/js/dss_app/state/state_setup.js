console.log("state_loaded");
script_manager(["assets/js/dss_core/landing_map_utilities_for_DSS.js"]);
if ($('#the_watershed_category').length > 0) {
 $('#the_watershed_category').html('Watersheds');
  
}

if ($('.forecast_category').length > 0) {
  $(".forecast_category").parent().remove();
}
if ($('.generic_question_category').length > 0) {
  $(".generic_question_category").parent().remove();
}
if ($('.planning_category_SA').length > 0) {
  $(".planning_category_SA").parent().remove();
}
if ($('.planning_category_Process').length > 0) {
  $(".planning_category_Process").parent().remove();
}
if ($('.planning_category_Tool').length > 0) {
  $(".planning_category_Tool").parent().remove();
}
/*
	if ($('.current_status_category').length > 0 && $('.planning_category_more_data_btn').length == 0) {
		var state_more_data_btn='<li><a class="planning_category_more_data_btn" data-target=".navbar-collapse.in" data-toggle="more_data_popover" data-content="Coming Soon!" > More data</a></li>';
    $('.current_status_category').append(state_more_data_btn);
   $('[data-toggle="more_data_popover"]').popover(); 
	}
*/
ui_element_control["window_resize_nav_map_css"]();
$(document).ready(function(){
	append_new_btn();

     
});

/*-----------------------------------------------------------------------------------------*/
function append_new_btn(){
  if ($('.planning_category_no_data_btn').length > 0) {
  $(".planning_category_no_data_btn").remove();
   }
     var new_model_by_ws_btn='<li><a id="model_by_ws_btn" data-target=".navbar-collapse.in" data-toggle="collapse" data-content="" >Modeling by Watershed</a></li>';
  $(".planning_category").append(new_model_by_ws_btn);
	
	
}
states_layer_style={
	"Huc_ws_trace_style":{
	            fill:true,
				stroke:"#8C001A",
				weight: 2,
				opacity: 1,
				color: '#8C001A',
				fillOpacity: 0.02	
						},
	"Huc_highlight":{
	            fill:true,
				stroke:"#FF3399",
				weight: 5,
				opacity: 1,
				color: '#FF3399',
				fillOpacity: 0.02	
						},
	
};

var states_layer_features={
"watershed_by_model":{
"layer_group":"main",
"geometery_type":"regular",
"default_style":states_layer_style.Huc_ws_trace_style,
"default_layer":"load_not_add",
"url":"data/dss/state/model_by_watershed.geojson",
"onEachFeature":function (feature, layer){

			project_legend_control(feature, layer);
			leaflet_json.feature_highlight_lite(layer,feature,states_layer_style.Huc_highlight);
			//leaflet_layer_highlight(feature,layer,states_layer_style.Huc_ws_trace_style,states_layer_style.Huc_highlight);	
			
			third_level_pj_boundary(feature,layer)



},
}
};// end of feature layer object

leaflet_map_control.Layer_initialization(map,states_layer_features);



leaflet_map_control.show_leaflet_layer({"button_id":"model_by_ws_btn","layer": [window["main"]["watershed_by_model"] ] ,"new_btn_text":"Modeling by watershed (turn off)"});

function project_legend_control(feature, layer){
	
		layer.on('mouseover', function (e) {
				
			var text=ws_project_generate_project_prompt(feature.properties.watershed,watershed_projects,project_detail);
				//console.log(text);
				show_project_legend_from_text(text,"show");
				//show_project_legend(feature,layer,"prompt","show");
			});
			layer.on('mouseout', function (e) {
				show_project_legend_from_text("","hide");
			});
			
	

	function show_project_legend_from_text(html,show_pj_legend){	
			var control={
			"show":function(){
					if($("#map_legend").length <= 0){
							//var legend_text="<p style='font-size:15px;'><b>"+text+"</b></p>";
							// it has to use append methd, otherwise the lengend div will block the map interaction
							$("#map").append("<div id='map_legend' style='position:absolute; top:2%; left:1%;width:700px;height:80px; font-size:15px; '>"+html+"</div>");
						
							}else{
								$("#map_legend").remove();
								$("#map").append("<div id='map_legend' style='position:absolute; top:2%; left:1%;width:700px;height:80px; font-size:15px;'>"+html+"</div>");
							}
			},
			"hide":function(){
				$("#map_legend").remove();
			},
		};
			control[show_pj_legend]();
}
	
}
