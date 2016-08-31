// JavaScript Document
// JavaScript Document
console.log("hud-loaded");
script_manager(["https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js","http://code.highcharts.com/highcharts-3d.js"]);




 var dss_app_settings_hud_tony={
	 "sidebar_ui_html":"  <div id='hud_t_panel' class='panel-collapse collapse in'><div ><ul class='list-group'> <div><p style='color:#0493d3; font-weight: bold ' ><div class='panel panel-default'> <div class='panel-heading'><h5 class='panel-title'>Pond Info<button class='btn btn-xs btn-default pull-right' type='button' data-toggle='collapse' data-target='#hud_t_pond_info'><i class='glyphicon glyphicon-list'></i></button></h5 ></div> <div id='hud_t_pond_info' class='panel-collapse collapse'><div class='panel-body'> <form role='form' class='form-inline'><button id='hud_t_show_basin_pond' style='float:right; width:190px;' class='form-control btn btn-primary hud_t_show_pond_btn' type='button'>Show subbasins w/ ponds </button> <button id='hud_t_show_basin_no_pond' style='float:left; width:190px;' class='form-control btn btn-primary hud_t_show_pond_btn' type='button'>Show subbasins w/o ponds </button> </form></div></div></div></p></div> <div><p style='color:#0493d3; font-weight: bold ' ><div class='panel panel-default'><div class='panel-heading'><h5 class='panel-title'>Scenario Visualization<button class='btn btn-xs btn-default pull-right' type='button' data-toggle='collapse' data-target='#choose_scenario'><i class='glyphicon glyphicon-list'></i></button></h5 ></div> <div id='choose_scenario' class='panel-collapse collapse'><div class='panel-body'> <form role='form' class='form-inline'> <select id='hud_t_scenario' class='form-control drop_down hud_t_scenario_visualization' style='float:right; width:190px;'> <option value='null' selected='selected'>Choose pond</option> <option value='SP' >Small ponds</option> <option value='LP' >Large ponds</option> </select> <button id='hud_t_show_index' style='float:left; width:190px;' class='form-control btn btn-primary ' type='button'>Show index points</button> </form> <br style='margin: 17px 0; disply:block'> <form role='form' class='form-inline'> <select id='hud_t_precip' class='form-control drop_down hud_t_scenario_visualization' style='float:left; width:190px;'> <option value='null' selected='selected'>Choose Precipitation</option> <option value='50' >50 year - 24 hours (5.67 inches)</option> <option value='2123' >May 21-23, 2004 Storm event</option> </select> <select id='hud_t_visualization' class='form-control drop_down hud_t_scenario_visualization' style='float:right; width:190px;'> <option value='null' selected='selected'>Choose Parameter</option> <option value='PD' >Peak Discharge (cfs)</option> <option value='PR' >Peak Discharge Reduction (%)</option> </select> </form> <br style='margin: 17px 0; disply:block'> <form role='form' class='form-inline'> <div id='hud_t_ploting_area' class='form-control' style=' height:460px; width:400px; background:url(data/dss/HUD/soap_creek/image/hydrograph_demo.png); background-repeat:no-repeat; background-size: 100% 100%; '></div> <br style='margin: 17px 0; disply:block'> </form> <form role='form' class='form-inline'> <br><center><h4>Results at index point (IP)</h4><table border='1' id='dispalyTable' style=' width:250px; border-collapse: collapse; font-size:15px; text-align: center; border: 2px solid black;'><tr><th colspan='3' style='text-align: center;'>Peak Discharge <br> (cfs)</th></tr><tr><td><b>IP</b></td><td><span style='color:#090acd;font-size:13px;'>Selected</span></td><td><span style=' color:#1b991b; font-size:13px;'>Reference</span></td></tr><tr><td><b>1</b></td><td id='hud_t_u1'></td><td id='hud_t_l1'></td></tr><tr><td><b>2</b></td><td id='hud_t_u2'></td><td id='hud_t_l2'></td></tr><tr><td><b>3</b></td><td id='hud_t_u3'></td><td id='hud_t_l3'></td></tr><tr><td><b>4</b></td><td id='hud_t_u4'></td><td id='hud_t_l4'></td></tr><tr><td><b>5</b></td><td id='hud_t_u5'></td><td id='hud_t_l5'></td></tr><tr><td><b>6</b></td><td id='hud_t_u6'></td><td id='hud_t_l6'></td></tr><tr><td><b>7</b></td><td id='hud_t_u7'></td><td id='hud_t_l7'></td></tr><tr><td><b>8</b></td><td id='hud_t_u8'></td><td id='hud_t_l8'></td></tr><tr><td><b>9</b></td><td id='hud_t_u9'></td><td id='hud_t_l9'></td></tr></table></center><br> </form> </div></div></div></p></div> </ul></div></div></div></p>  ",
	 "sidebar_ui_title":"Flood Mitigation Analysis (simulated ponds)",
	 "app_btn_id":window["script_temp_data"],
	 "app_leaflet_layer":window["script_temp_data"]+"_leaflet_layers",
 }





loading_sidebar( dss_app_settings_hud_tony );




var DSS_hud_layer_styles={	
"river":{
"default":{stroke: '#66FF66',weight: 1, opacity: 1,color: '#66CCFF'},
"highlight":{stroke: '#66FF66',weight: 1, opacity: 1,color: '#66CCFF'}
},
"watershed_mask":{
"default":{weight: 1,opacity: 0.5,fillColor: '#FFFFFF ',color: '#999999 ',fillOpacity: 0.6,stroke:true,fill:true},
},
"pond":{
"default":{	radius: 4,	fillColor: "#FF99FF",color: "#000 ",weight: 1,	opacity: 1,	fillOpacity: 1},
"hover":{	radius: 6,	weight: 2,	opacity: 1,	fillOpacity: 1},
"default_invisible":{	radius: 4,	fill: false , stroke:false , fillColor: "#FF99FF",color: "#000 ",weight: 1,	opacity: 1,	fillOpacity: 1},
"find_pond_highlight":{radius: 5,	fillColor: "#FFFF00 ",	color: "#FF0000 ",	weight: 2,	opacity: 1,	fillOpacity: 1         },
"visible":{	fill: true , stroke:true , },
"invisible":{	fill: false , stroke:false },
"fake_invisible":{	fill: false , stroke:false },
},
"sub_basin":{
"default":{	weight: 2, opacity: 1, color: 'white',  dashArray: '3',  fillOpacity: 0.3,stroke:true,	fill:true},	
"default_invisible":{		stroke:false,fill:false	},	
"show_basin":{	weight: 2, opacity: 1, color: '#cc99ff', fillColor:"#cc99ff", dashArray: '3',  fillOpacity: 0.03,stroke:true,	fill:true},	
"not_selected_show_basin":{	weight: 2, opacity: 1, color: '#cc99ff', fillColor:"#cc99ff", dashArray: '3',  fillOpacity: 0.03},	
"selected_show_basin":{weight: 4, opacity: 1, color: '#cc99ff', fillColor:"#cc99ff", dashArray: '3',  fillOpacity: 0.03,  	fillColor: "#FFFF00 ",	color: "#FF0000 ",	  },
},


"basin":{
"default":{	weight: 2, opacity: 1, color: '#FFCC66',  dashArray: '3',  fillOpacity: 0.3,stroke:true,	fill:false},	
"default_invisible":{		stroke:false,fill:false	},	
"mask":{weight: 1,opacity: 0.5,fillColor: '#FFFFFF ',color: '#999999 ',fillOpacity: 0.6,stroke:true,fill:true},

},
"index_pond_basin":{
	"default":{	fillColor: " #CCCCCC ",		color: "#696969",		radius: 9,	weight: 13,	opacity: 0.01,	fillOpacity: 0.01,},	
	//"default":{	radius: 4,	fillColor: "#FF99FF",color: "#000 ",weight: 1,	opacity: 0.01,	fillOpacity: 0.01},
}
};



/* This part is to generate the data path for the application */
var dss_data_path,peak_discharge_link,hydrograph_link,index_point_link;
if(dss_ws!="default"){         
	
 dss_data_path="dss/HUD_tony/"+dss_ws;
}
if(dss_ws=="default" && typeof(window["script_temp_ws"])!="undefined"){   //generated using spatial query
	
 dss_data_path="dss/HUD_tony/"+window["script_temp_ws"];
 
		 var DSS_hud_layer_boundary_features={
				"boundary":{
				"default_style":DSS_hud_layer_styles.basin["mask"],
				"default_layer":"yes",
				"geometery_type":"regular",
				"layer_group":dss_app_settings_hud_tony["app_leaflet_layer"],
				"bringtofront":"yes",
				"url":"data/"+dss_data_path+"/geo_json/ws_boundary_mask.geojson",
				//"fit_bound":"yes",
				"onEachFeature":function (feature, layer){

				},
				},
		}

		
		leaflet_map_control.Layer_initialization(map,DSS_hud_layer_boundary_features);
}


 index_point_link="data/"+dss_data_path+"/geo_json/index_point.geojson";
 hydrograph_link="data/"+dss_data_path+"/tabular/hydrography.csv";
 
 
 
 
/* End of generat the data path for the application */

			var DSS_hud_tony_layer_features={
					"sub_basin":{
					"default_style":DSS_hud_layer_styles.sub_basin["default_invisible"],
					"default_layer":"yes",
					"geometery_type":"regular",
					"layer_group":dss_app_settings_hud_tony["app_leaflet_layer"],
					"url":"data/"+dss_data_path+"/geo_json/index_area.geojson",
					"onEachFeature":function (feature, layer){
					//leaflet_json.feature_highlight_lite(layer,feature,DSS_hud_layer_styles.pond['hover']);
					},
					},
					"pond_sub_basin":{
					"default_style":DSS_hud_layer_styles.sub_basin["default_invisible"],
					"default_layer":"yes",
					"geometery_type":"regular",
					"layer_group":dss_app_settings_hud_tony["app_leaflet_layer"],
					"url":"data/"+dss_data_path+"/geo_json/pond_basin.geojson",
					"onEachFeature":function (feature, layer){

					HUD_t_bind_basin_popup(layer,feature);


					},
					},
					"pond":{
					"default_style":DSS_hud_layer_styles.index_pond_basin["default"],
					"default_layer":"yes",
					"geometery_type":"circular_marker",
					"layer_group":dss_app_settings_hud_tony["app_leaflet_layer"],
					"bringtofront":"yes",
					"url":"data/"+dss_data_path+"/geo_json/index_point.geojson",
					"onEachFeature":function (feature, layer){
						
					//leaflet_json.feature_highlight_lite(layer,feature,DSS_hud_layer_styles.pond['hover']);
					HUD_t_bind_pond_popup(layer,feature);
					//HUD_t_show_basin_by_index(feature, layer,"mouseover",dss_app_settings_hud_tony.sub_basin,hydrograph_link);	

					},
					},

			};// end of feature layer object




leaflet_map_control.Layer_initialization(map,DSS_hud_tony_layer_features);
















function handle_index(data){
	
	window[dss_app_settings_hud_tony["app_leaflet_layer"]]['index_point']=L.geoJson(data, {style:  function (feature) {return feature.properties && feature.properties.style;},pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {	icon: HUD_t_label_icon(feature.properties.index),title: 'Index Number: ' + feature.properties.index+'.  Click to show the basin area'})}
	,onEachFeature:function (feature, layer){
		
	HUD_t_show_basin_by_index(feature, layer,"mouseover",window[dss_app_settings_hud_tony["app_leaflet_layer"]].sub_basin,hydrograph_link);	
		},	
	});     

}
$.getJSON(index_point_link,function(data){     handle_index(data);   // window[dss_app_settings_hud_tony["app_leaflet_layer"]]['index_point'].addTo(map);     
//leaflet_map_control.hide_leaflet_layer({"button_id":"hud_t_show_index","layer":window[dss_app_settings_hud_tony["app_leaflet_layer"]]['index_point'],"new_btn_text":"Show index points"});         
//leaflet_map_control.hide_leaflet_layer({"button_id":"hud_t_show_index","layer":[window[dss_app_settings_hud_tony["app_leaflet_layer"]]['pond'],window[dss_app_settings_hud_tony["app_leaflet_layer"]]['index_point']],"new_btn_text":"Show index points"});  
leaflet_map_control.show_leaflet_layer({"button_id":"hud_t_show_index","layer":[window[dss_app_settings_hud_tony["app_leaflet_layer"]]['index_point']],"new_btn_text":"Hide index points"});    
//leaflet_map_control.show_leaflet_layer({"button_id":"hud_t_show_index","layer":window[dss_app_settings_hud_tony["app_leaflet_layer"]]['pond'],"new_btn_text":"Hide index points"});  
});











//DSS_hud_tony_layer_features["pond"]["json"]=DSS_hud_tony_layer_features["pond"]["json"]

HUD_t_scenario_style_control_by_filter_class({'class_name':'hud_t_scenario_pond_info','control_field':'pk','filter':'contains'},window[dss_app_settings_hud_tony["app_leaflet_layer"]].pond_sub_basin,{'pass_filter':DSS_hud_layer_styles.sub_basin['show_basin'],'not_pass_filter':DSS_hud_layer_styles.sub_basin['default_invisible']});
HUD_interface_conflict_control(['conflict_toggle_scenario_visualization','scenario_visualization'],"change");



$(document).on('click','#summaryBarTrigger',function(){
HUD_summary3Dcharts(1);
	});//end of click event


$(document).on('change','.hud_t_scenario_visualization',function(){// scenario combination changes
//HUD_scenario_name_control_by_combine_field({'class_name':'','control_field':'','filter':'','input_combination':[]});
	var combine_scenario_name=HUD_scenario_name_control_by_combine_field({'class_name':this.class,'control_field':'','filter':'','input_combination':["hud_t_scenario","hud_t_precip","hud_t_visualization"]});  // THis function uses parallel structure to visualize pond by the year of built
	//HUD_pond_scenario_bar_visualization(DSS_hud_tony_layer_features["pond"]["json"],combine_scenario_name,"display_baes"); //temperately put in here
  //console.log(combine_scenario_name);
	HUD_t_peak_discharge_display(combine_scenario_name);
	if(combine_scenario_name.indexOf("PD")!=-1){
			leaflet_external_color_coding({"layer":window[dss_app_settings_hud_tony["app_leaflet_layer"]]["pond"],"scenario_name":combine_scenario_name,"color_function":hud_t_color_coding["pond_discharge"]});
			leaflet_legend([[0000,"#0033cc"],[5000,"#03a7fc"],[10000,"#52dacf"],[20000,"#a5fc33"],[30000,"#ffff00"],[40000,"#ff6600"],[50000,"#ff0000"],[60000,"#cc0000"]],'<h5>Peak Discharge</h5><h6>(cfs)</h6>','','hud_t_panel function_panel');
	}
	if(combine_scenario_name.indexOf("PR")!=-1){
			leaflet_external_color_coding({"layer":window[dss_app_settings_hud_tony["app_leaflet_layer"]]["pond"],"scenario_name":combine_scenario_name,"color_function":hud_t_color_coding["pond_peak_reduction_precentage"]});
			leaflet_legend([[0,"#ffd9d8"],[5,"#ffb6b3"],[10,"#ff8e89"],[15,"#ff6963"],[20,"#ff473f"],[25,"#fd281e"]],'<h5>Peak Discharge Reduction</h5><h6>(%)</h6>','','hud_t_panel');
	}
	if(combine_scenario_name.indexOf("null")!=-1){
		leaflet_external_color_coding({"layer":window[dss_app_settings_hud_tony["app_leaflet_layer"]]["pond"],"scenario_name":combine_scenario_name,"color_function":hud_t_color_coding["no"]});
	}

	});// end of on change event
	
HUD_t_feature_autocomplete(window[dss_app_settings_hud_tony["app_leaflet_layer"]]["pond_sub_basin"],{"drop_down_id":"hud_t_search_method","search_box_id":"hud_t_search_ponds function_panel",});




var hud_t_color_coding={

		"pond_discharge":function(feature_properties_value){
        var value=parseInt(feature_properties_value);
		//console.log(value);
		var color= value > 60000  ? '#cc0000' :
			   value > 50000  ? '#ff0000' :
			   value > 40000   ? '#ff6600' :
			   value > 30000   ? '#ffff00' :
			   value > 20000   ? '#a5fc33' :
			   value > 10000   ? '#52dacf' :
			   value > 5000   ? '#03a7fc' :
			   value > 0000   ? '#0033cc' :   			   
						  false;
		
		return {"color":color,"stroke":true, 'opacity': 0.6,	'fillOpacity': 0.8}
		
			
	},
	"pond_peak_reduction_precentage":function(feature_properties_value){
		
		var value=feature_properties_value;		
		var color= value > 25   ? '#fd281e' :
			   value > 20   ? '#ff473f' :
			   value > 15   ? '#ff6963' :
			   value > 10   ? '#ff8e89' :
			   value > 5   ? '#ffb6b3' :
			   value > 0   ? '#ffd9d8' :   			   
						  false;
		
		return {"color":color,"stroke":true,'opacity': 0.6,	'fillOpacity': 0.8}
		

		
	},	
	"no":function(){
				
		return {'opacity': 0.01,	'fillOpacity': 0.01}
		

		
	}
};







function HUD_t_scenario_style_control_by_filter_class(event_option_obj,leaflet_layer,style_obj){  // THis function uses parallel structure to visualize pond by the year of built
			//HUD_pond_scenario_bar_visualization(input_json,scenario_name,display_setting);

		
			var class_name=event_option_obj['class_name'];

			var control_field=event_option_obj['control_field'];
			var filter=event_option_obj['filter'];

			var pass_filter=style_obj['pass_filter'];
			var un_pass_filter=style_obj['not_pass_filter'];

			$(document).on('change','.'+class_name,function(){
				if(this.id=="show_pond"){
					$( ".frame_bar" ).remove();
					$( ".value_bar" ).remove();
					
				}

			var filter_value=$("#"+this.id).val();

			var layer=leaflet_layer["_layers"];
			//console.log(layer);

			for(var each_element in layer) {
			var feature=layer[each_element]['feature'];
			var operator_table = {
				'>=': function(feature,filter_value) { return feature.properties[control_field] >= Number(filter_value); },
				'<=': function(feature,filter_value) { return feature.properties[control_field] <= Number(filter_value); },
				'>': function(feature,filter_value) { return feature.properties[control_field] > Number(filter_value); },
				'<': function(feature,filter_value) { return feature.properties[control_field] < Number(filter_value); },
				'==': function(feature,filter_value) { return String(feature.properties[control_field]) == String(filter_value); },
				'!=': function(feature,filter_value) { return String(feature.properties[control_field]) != String(filter_value); },
				'contains': function(feature,filter_value) { 
				//console.log(filter_value+"    "+feature.properties[control_field]);
				if(String(feature.properties[control_field]).indexOf(String(filter_value))!=-1){
					return true;
					}else{
						return false;
						}

				},
				// ...
			};

			if(operator_table[filter](feature,filter_value)){

					layer[each_element].setStyle(pass_filter);

			}else{

					layer[each_element].setStyle(un_pass_filter);

			}

			} // for loop element in in obj
			});// end of on change
}



/*-----------------------------------------------------------HUD_Functions-------------------------------------------------*/

	
	function HUD_scenario_style_control_by_matching_ppt(event_option_obj,leaflet_layer,style_obj){  // THis function uses parallel structure to visualize pond by the year of built
//API:HUD_scenario_style_control_by_matching_ppt({"class_id":"","matching_value":"","matching_field":""},leaflet_layer,{"pass_filter":""})



var matching_value=event_option_obj['matching_value'];
var matching_field=event_option_obj['matching_field'];



var pass_filter=style_obj['pass_filter'];
var un_pass_filter=style_obj['un_pass_filter'];





var filter_value=$("#"+this.id).val();

var layer=leaflet_layer["_layers"];


for(var each_element in layer) {
var feature=layer[each_element]['feature'];


if(feature.properties[matching_field] == matching_value){

		layer[each_element].setStyle(pass_filter);
		
		

}else{
	layer[each_element].setStyle( un_pass_filter);
}

} // for loop element in in obj

}

/*-----------------------------------------------------------HUD_Functions-------------------------------------------------*/
/*-----------------------------------------------------------HUD_Functions-------------------------------------------------*/

//HUD_scenario_style_control_by_filter_class({'class_name':'','control_field':'','filter':'','input_combination':[]},feature,layer,{'pass_filter':'','not_pass_filter':''});
function HUD_t_label_icon(d){
	
	  var new_link='data/dss/HUD_tony/turkey_river/image/index/'+d+'.png';
	  
  var myIcon = L.icon({
    iconUrl: new_link,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    labelAnchor: [6, 0] // as I want the label to appear 2px past the icon (10 + 2 - 6)
});

return myIcon;

  }

  
  



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
	
//console.log(typeof($("#"+input_combination[ic]).val())+"   "+$("#"+input_combination[ic]).val());

if($("#"+input_combination[ic]).val()!='no_effect'){
if(ic==input_combination.length-1){
final_combined_scenario_name+=$("#"+input_combination[ic]).val();
}else{
final_combined_scenario_name+=$("#"+input_combination[ic]).val()+"_";
}//end of if_statment, test if it is the last combination element	
	
}


if($("#"+input_combination[ic]).val()=="null"){
	$("#"+input_combination[ic]).addClass( "invalid_scenario" );
	
}else{
	$("#"+input_combination[ic]).removeClass( "invalid_scenario" );
}

}//end of for loop

return final_combined_scenario_name;

}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function HUD_t_feature_autocomplete(leaflet_layer,dom_element){

	var drop_down_id=dom_element["drop_down_id"];
	var search_box_id=dom_element["search_box_id"];
	
	
	

$(document).on('change','#'+drop_down_id,function(){
					//console.log('change');
					var auto_complete_list={};
					var option_array= new Array();
				var drop_down = document.getElementById(drop_down_id);
				for (i = 0; i < drop_down.options.length; i++) {
				   option_array[i] = drop_down.options[i].value;
				   
				if(drop_down.options[i].value!="null"){
					  auto_complete_list[drop_down.options[i].value]=[];
				}				  
				}
				
					
					var layer=leaflet_layer["_layers"];				
					
					
					for(var k in option_array){
					
					var properties_name = option_array[k];

					
					
					
					for(var a in leaflet_layer["_layers"]) {
						if(typeof layer[a]['feature']['properties'][properties_name]!="undefined" && layer[a]['feature']['properties'][properties_name]!=null){
							//contains
							//console.log(layer[a]['feature'].properties["pk"]+"  "+$("#hud_t_show_basin").val());
							if(String(layer[a]['feature'].properties["pk"]).indexOf(String($("#hud_t_show_basin").val()))!=-1){
								//String(feature.properties["pk"]).indexOf(String($("#hud_t_show_basin").val()))!=-1
								//String(feature.properties[control_field]).indexOf(String($("#hud_t_show_basin").val()))!=-1
								auto_complete_list[properties_name].push(layer[a]['feature']['properties'][properties_name]);
							}else{
								
							}
							
						}
				 // obj[key].setStyle(style_obj);
				}	
				
				//console.log(auto_complete_list);
				}// end of for loop in option array

				  var search_method=$("#"+drop_down_id).val();
				  

				//#search_ponds 

				var parent_node=$("#"+search_box_id).parent();
				$('#'+search_box_id).remove();
				parent_node.append('<input id="'+search_box_id+'" class="form-control typeahead" type="text" value="Specify...">');

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
$(document).on('click','.tt-dropdown-menu',function(){

	
	//HUD_scenario_style_control_by_matching_ppt({"matching_value":$("#"+search_box_id).val(),"matching_field":$("#"+drop_down_id).val()},leaflet_layer,{"pass_filter":DSS_hud_layer_styles.pond["find_pond_highlight"]});
	HUD_scenario_style_control_by_matching_ppt({"matching_value":$("#"+search_box_id).val(),"matching_field":$("#"+drop_down_id).val()},leaflet_layer,{"pass_filter":DSS_hud_layer_styles.sub_basin["selected_show_basin"],"un_pass_filter":DSS_hud_layer_styles.sub_basin['not_selected_show_basin']});
	 
});	
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


function HUD_t_bind_pond_popup(layer,feature){	
	//layer.bindPopup("<p><b>Index</b> :"+feature.properties.index+"<br><b>Basin name</b> :"+feature.properties.Location+"<br><b>Number of subbasin</b> :"+feature.properties.num_subbasin+"<br><b>Drainage area</b> :"+(feature.properties.drainage_Area).toFixed(3)+" Acre"+"<br>");
}
function HUD_t_bind_basin_popup(layer,feature){	
	//layer.bindPopup("<p><b>Hydro ID</b> :"+feature.properties.HydroID+"<br><b>Drainage ID</b> :"+feature.properties.DrainID+"<br><b>Drainage Area</b> :"+feature.properties.DA_sqmi+" sq mi<br><b>Simulated ponds (small pond)</b> :"+feature.properties.pond_num+"<br><b>Simulated ponds (large pond)</b> :"+feature.properties.pond_num2+"<br>");
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



$(document).on('click','.hud_t_show_pond_btn',function(){
	
	var show_pond_btn_id=this.id;
	hud_t_basin_wms(map,"hud_t_subbasins",show_pond_btn_id);
});


function hud_t_basin_wms(map,layer_name,show_pond_btn_id){
	
			var basin_display_control={
				'hud_t_show_basin_all_pond':"http://s-iihr32.iihr.uiowa.edu/geoserver/Iowa_Watershed/wms",
				'hud_t_show_basin_pond':"http://s-iihr32.iihr.uiowa.edu/geoserver/Iowa_Watershed/wms?CQL_FILTER=has_pond IN ('yes')",
				'hud_t_show_basin_no_pond':"http://s-iihr32.iihr.uiowa.edu/geoserver/Iowa_Watershed/wms?CQL_FILTER=has_pond IN ('no')",	
			};
			if(typeof(window[dss_app_settings_hud_tony["app_leaflet_layer"]][layer_name])!="undefined"){
				map.removeLayer(window[dss_app_settings_hud_tony["app_leaflet_layer"]][layer_name]);
			}
			river_wms_display();
			/*
			map.on('zoomend', function(e) {
			var stream_order=zoom_to_streamord(map.getZoom());
				
			//console.log(map.getZoom());
			map.removeLayer(window[dss_app_settings_hud_tony["app_leaflet_layer"]][layer_name]);
			river_wms_display(stream_order);
			});
			function zoom_to_streamord(zoom){ 
				 return zoom > 12  ? 0   :           
						   zoom > 11  ? 0 :
						   zoom > 9   ? 2 :
						   zoom > 7   ? 4 :
						   zoom > 5   ? 5 :
						   zoom > 0   ? 6 :
									  6;
				}*/
			function river_wms_display(){
			streamorder_wms_url_new= basin_display_control[show_pond_btn_id];
			window[dss_app_settings_hud_tony["app_leaflet_layer"]][layer_name] = L.tileLayer.wms(streamorder_wms_url_new, {
			layers: 'Iowa_Watershed:hud_t_turkey_subbasins_utm',
			format: 'image/png8',
			version: '1.1.0',
			transparent: true,
			srs:32615,
			attribution: "",
			tiled:true,
			opacity:0.4,
			styles:"dss_hud_tony_subbasin",
			})
			window[dss_app_settings_hud_tony["app_leaflet_layer"]][layer_name].addTo(map);
			window[dss_app_settings_hud_tony["app_leaflet_layer"]][layer_name].bringToFront();	
			}
			
			/*-------the code below will fix the z-index problem when layer changed ---*/
			map.on('baselayerchange', function(e) {      // this was a bug, now fixed, this piece is important
				window[dss_app_settings_hud_tony["app_leaflet_layer"]][layer_name].bringToFront();	
			});
			/*-------end of fixing the z-index problem when layer changed ---*/
	
}	 







function HUD_pond_scenario_bar_visualization(input_json,scenario_name,display_setting){
	
	if(display_setting=="hide_bars"){
		$( ".frame_bar" ).remove();
		$( ".value_bar" ).remove();
		return false;
		
	}

var scenario_name_null_check= scenario_name.split("_");
for(var sc=0;sc<scenario_name_null_check.length;sc++){
if(scenario_name_null_check[sc]=='null'){

return false;
 }
}

//layer.setstyle(DSS_hud_layer_styles.pond['default_invisible']); //map.removeLayer(pond_loaction);

var visualization_year=scenario_name_null_check[0];
var visualization_variable=scenario_name_null_check[1];
var value_percentage_name=scenario_name_null_check[1]+"_"+scenario_name_null_check[2];
var total_bar_height=30;


$( ".frame_bar" ).remove();
$( ".value_bar" ).remove();


 var svg = d3.select("#map").select("svg");
// g = svg.append("g");
var dss_panel_holder_id= dss_app_settings_hud_tony["app_btn_id"]+"_panel";
 var g_frame = svg.append("g").attr("class", "frame_bar function_panel leaflet-zoom-hide "+dss_panel_holder_id);
 var g_value = svg.append("g").attr("class", "value_bar function_panel leaflet-zoom-hide "+dss_panel_holder_id);

	 
// d3.json(datalink, function(collection) {  //import data from other sources
  // Add a LatLng object to each item in the dataset
  

var json2=input_json['features'];
 var collection = json2;
collection['features']=[];


 //time_filtered_json['features']=[];
 
 //

 for(var jk=0;jk<json2.length;jk++){
 var each_year_of_built = json2[jk].properties["year_cat"];
 

if(Number(each_year_of_built)<=Number(visualization_year)){

collection['features'].push(json2[jk]);
}
 }


collection.features.forEach(function(d) {
	  


// console.log(d.geometry.coordinates[1]+","+d.geometry.coordinates[0]);
  
   d.LatLng = new L.LatLng(d.geometry.coordinates[1],
      d.geometry.coordinates[0])
	
	 // console.log(d.LatLng);	 
  })

  
  
    var bar = g_frame.selectAll("rect")
   .data(collection.features)
   .enter().append("rect")
   .attr("width",5)
   .attr("height",total_bar_height)
   .attr("fill","white")
   .attr("stroke", "black")
   .attr("stroke-width", 1); 

  

   
       var value = g_value.selectAll("rect")
   .data(collection.features)
   .enter().append("rect")
   .attr("width",3)
    
    .attr("height",function(d) { 
	       return total_bar_height*d.properties[value_percentage_name]/100;
	
       })
	   

	   
   .attr("fill",function(d) { 
  return getColor_double_variables(d.properties[value_percentage_name],visualization_variable);

   
   });
  
    map.on("viewreset", update);
  update();
  
  function update() {
	
	// zoom: 11,
		var scale = 2*(map.getZoom()/11);
	if(map.getZoom()<=12){
		scale = 1;
	}
	//console.log(1.5*map.getZoom());
//	console.log(scale);
	  
bar.attr("transform", 
   function(d) { 
       return "translate("+ 
    map.latLngToLayerPoint(d.LatLng).x +","+ 
    (map.latLngToLayerPoint(d.LatLng).y-Number(scale*total_bar_height)) +")";
       }
   )
   
bar.attr("height",total_bar_height*scale);

value.attr("height",function(d) {	
	 return Number(scale*total_bar_height*d.properties[value_percentage_name]/100)
	   
       })
   
   value.attr("transform", 
   function(d) {    
   var value_bar_height_offset;
		
	// value_percentage_name=precipitation+'_e';
	 value_bar_height_offset = total_bar_height*d.properties[value_percentage_name]/100;

          return "translate("+ 
    (map.latLngToLayerPoint(d.LatLng).x+1) +","+ 
    (map.latLngToLayerPoint(d.LatLng).y-Number(scale*value_bar_height_offset)) +")";
       } //
	      )
   
  }
  
  	//  });//get json
//console.log(window[dss_app_settings_hud_tony["app_leaflet_layer"]])
	setTimeout(function(){ GEN_change_layer_style_externally(window[dss_app_settings_hud_tony["app_leaflet_layer"]].pond,{fill:false,stroke:false});	 }, 100);
 }// end of the 3D plotting



/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/



function HUD_t_peak_discharge_display(scenarios_combine_raw){
	
	//console.log(DSS_hud_tony_layer_features["pond"]["json"]["features"]);
	
		
	JSON_input_data=DSS_hud_tony_layer_features["pond"]["json"]["features"];
	

 
 var scenarios_combine=scenarios_combine_raw;
//console.log(scenarios_combine);
			var current_index = [];
		var ref_index = [];	
		
	for(var i = 0; i < JSON_input_data.length; ++i){		  
        var row = JSON_input_data[i]["properties"];
			

		var current_index1,current_index2,current_index3,current_index4,current_index5,current_index6,current_index7,current_index8,current_scenarios_combine;
		var ref_index1,ref_index2,ref_index3,ref_index4,ref_index5,ref_index6,ref_index7,ref_index8;
		
        if(row.index === (i+1)){					              				
			
			if(scenarios_combine.indexOf('PR') > -1){
				scenarios_combine = scenarios_combine.replace("PR", "PD"); 				
			} // make sure if it visualize correct parameter
			if(scenarios_combine.indexOf('C') == -1){
				
				//current_scenarios_combine = scenarios_combine.replace("SP", "C");
				//current_scenarios_combine = scenarios_combine.replace("LP", "C");
				current_scenarios_combine = scenarios_combine.replace(/LP|SP/gi, "C"); //has to replace 
				/blue|house|car/gi
						//console.log(current_scenarios_combine);
			} // make sure if it visualize correct parameter
			current_index.push(parseInt(row[scenarios_combine]));
			ref_index.push(parseInt(row[current_scenarios_combine]));
			
        }
		
    }
		$("#hud_t_u1").html(GEN_numberFormatter(Math.round(current_index[0]/100)*100));
		$("#hud_t_u2").html(GEN_numberFormatter(Math.round(current_index[1]/100)*100));
		$("#hud_t_u3").html(GEN_numberFormatter(Math.round(current_index[2]/100)*100));
		$("#hud_t_u4").html(GEN_numberFormatter(Math.round(current_index[3]/100)*100));			
		$("#hud_t_u5").html(GEN_numberFormatter(Math.round(current_index[4]/100)*100));
		$("#hud_t_u6").html(GEN_numberFormatter(Math.round(current_index[5]/100)*100));
		$("#hud_t_u7").html(GEN_numberFormatter(Math.round(current_index[6]/100)*100));
		$("#hud_t_u8").html(GEN_numberFormatter(Math.round(current_index[7]/100)*100));
		$("#hud_t_u9").html(GEN_numberFormatter(Math.round(current_index[8]/100)*100));
	
	//	}
	
		$("#hud_t_l1").html(GEN_numberFormatter(Math.round(ref_index[0]/100)*100));
		$("#hud_t_l2").html(GEN_numberFormatter(Math.round(ref_index[1]/100)*100));
		$("#hud_t_l3").html(GEN_numberFormatter(Math.round(ref_index[2]/100)*100));
		$("#hud_t_l4").html(GEN_numberFormatter(Math.round(ref_index[3]/100)*100));
		$("#hud_t_l5").html(GEN_numberFormatter(Math.round(ref_index[4]/100)*100));
		$("#hud_t_l6").html(GEN_numberFormatter(Math.round(ref_index[5]/100)*100));
		$("#hud_t_l7").html(GEN_numberFormatter(Math.round(ref_index[6]/100)*100));
		$("#hud_t_l8").html(GEN_numberFormatter(Math.round(ref_index[7]/100)*100));
		$("#hud_t_l9").html(GEN_numberFormatter(Math.round(ref_index[8]/100)*100));
	//end of else	
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/





function GEN_numberFormatter(num){
	

	
	if(isNaN(num)==false){
	var tempString=num.toString();
	return tempString.substr(0, parseInt(tempString.length-3)) + ',' + tempString.substr(parseInt(tempString.length-3))
	}else{
	return "   "
	}
	
	
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/




//testing
function scenario_control_panel(panel_class){
var elements = $("."+panel_class);
for(var i = 0; i < elements.length; i++)
{
	

   

}

}


/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


 function HUD_t_show_basin_by_index(feature, layer,event,other_layer_obj,data_url) {	


subbasin=other_layer_obj;





layer.on("click", function (e) {
	
var hud_t_scenario_for_plotting=HUD_scenario_name_control_by_combine_field({'class_name':this.class,'control_field':'','filter':'','input_combination':["hud_t_scenario","hud_t_precip","hud_t_visualization"]}); 
if(hud_t_scenario_for_plotting.indexOf("null")==-1){	//check is all manadtory fields are selected
	hud_t_scenario_for_plotting=hud_t_scenario_for_plotting.slice(0,-3); //must earse the parameter code
	
if(typeof document.hud_t_load_hydrography_data=='undefined'){
	console.log("load hydg da")	
		 $.ajax({
  url : data_url,
  dataType : 'text',
  //jsonpCallback: 'getJson',
  success: function(data){
	 
	
	 document.hud_t_load_hydrography_data=data_conversion.csvToJSON(data);
	 HUD_t_plot_hydrograph(feature.properties.index,hud_t_scenario_for_plotting);
	
  }
});
		
	}else{
		HUD_t_plot_hydrograph(feature.properties.index,hud_t_scenario_for_plotting);	
		
	}
	
	

	
}
	
});






layer.on(event, function (e) {
	



for (var name in subbasin['_layers']) {

 	if(feature.properties.index==subbasin['_layers'][name].feature.properties.index){

			subbasin['_layers'][name].setStyle({
				weight: 2,
                opacity: 1,
                color: '#ff6600',
                dashArray: '3',
                fillOpacity: 0.3,
				stroke:true,
		fill:true	
});			
	}else{
		subbasin['_layers'][name].setStyle({
		stroke:false,
		fill:false	
		});	
			
	}




 
}

	
//console.log(i);
//console.log(subbasin['_layers'][i].feature.properties.index_area+"    "+feature.properties.index);


	



layer.on('mouseout', function (e) {
	
	subbasin.setStyle({
			stroke:false,
			fill:false
});		
	
	
	});	





   });//end of on layer
   
     }//end of oneach feature function



/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function HUD_t_plot_hydrograph(index,scenario){
	
	


				if(index.length==0){
					index='Not selected';
				}
				

	            
				var Xdata = new Array();
				var Ydata = new Array();
				
				var Ydata_r = new Array();
				
				var YIndex=scenario+"_"+index;
				var YIndex_r=scenario.replace(/LP|SP/gi, "C")+"_"+index;
				var XIndex="date_"+(scenario.split("_"))[1];
				
				var Ymax=0;
				var Ymin=2000;
				var Water_Stage= 0;
				var Water_Surface = new Array();

				var selectedPeak = "#hud_t_u"+index;
				var referencePeak = "#hud_t_l"+index;
				var selectedPeakNum = Number($(selectedPeak).html().replace(",", ""));
				var referencePeak = Number($(referencePeak).html().replace(",", ""));
				var peakReduction = (((referencePeak-selectedPeakNum)/referencePeak)*100).toFixed(1);



				
				


				var csvArray2=document.hud_t_load_hydrography_data;	
				
				for(var i = 0; i <  csvArray2.length; ++i){
				
                  var row = csvArray2[i];
				 
			
					 
				 
				  Ydata[i]=Number(row[YIndex])/1000;
				  Ydata_r[i]=Number(row[YIndex_r])/1000-Ydata[i];
				  Xdata[i]=row[XIndex];	
				 //console.log(XIndex+"  "+YIndex+"   "+YIndex_r);
				// console.log(Xdata[i]+"  "+Ydata_r[i]+"   "+Ydata[i]);
				/*  alert(Xdata+"     "+Ydata+"   "+Ymax+"   "+Ymin);*/
				  
				  
				  				 
				}
				// console.log(Ydata_r);
				//  console.log(Ydata);
			
		

//Highchars plot coding
         
            var chart = new Highcharts.Chart({
            chart: {

				zoomType: 'xy',
                type: 'line',
				renderTo: document.getElementById('hud_t_ploting_area')
            },
		    legend: {
            enabled: true,
			style: {
                    fontWeight: 'normal',					
					color:'black',
					fontFamily:'Calibri',
					fontSize:'10px'
                
                }
                                  },     
			
		
		
            title: {
                text: '<b>Peak discharge reduction (cfs)</b><br> Site'+index+': <span style="color:#FF0000;">'+peakReduction+' %</span>',
				 style: {
                    fontWeight: 'normal',					
					color:'black',
					fontFamily:'Calibri',
					fontSize:'13px'
                
                }
            },
            xAxis: {
                categories: Xdata,
                tickmarkPlacement: 'on',
				tickInterval: 1500,
                title: {
                    enabled: true,
					text: 'Date (M/D/YYYY  H:MM)'+'<br/>',
					
					
			 style: {
                    fontWeight: 'normal',
					color:'black',
					fontFamily:'Calibri',
					fontSize:'12px'
                }
					
                },
			
            },
            yAxis: {
				
				title: {
                    enabled: true,
					text: 'Discharge x1000(cfs)',
					 style: {
                    fontWeight: 'normal',
					color:'black',
					fontFamily:'Calibri',
					fontSize:'12px'
                }
                },
				labels:{
				format: '{value}'	
				},
				
				min:0,
				max:70,
									
            },
			
            tooltip: {
                
				
                valueSuffix: ' Discharge (cfs)',
				
		formatter: function() {
                return 'Peak Discharge <b>'+ this.y.toFixed(2)+'</b> (x1000 cfs)'+'<br> on <b>'+ this.x+'<br/>';
            }
				
				

			
            },
            plotOptions: {
				
				series: {
					stacking:'normal'
               
            },
               line: {
                    lineWidth: 2,
                    marker: {
						enabled:false,
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                },showInLegend: true
            },
            series: [ 
			{
				 name: 'Reference (No Pond)',

				color: 'green',
                data: Ydata_r
                
            },{				
				 name: 'Selected',
				color: 'blue',
                data: Ydata
                
            },
			
			
			
			
			
			]
        });
	//	 });
			
	

	
	
}


/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


function HUD_summary3Dcharts(indexInput){
	

						var dataset;
						if(typeof document.load_peak_data=='undefined'){
							
							 $.ajax({
					  url : peak_discharge_link,
					  dataType : 'text',
					  jsonpCallback: 'getJson',
					  success: function(data){
						 /*console.log(data);
						  var load_data_string="var "+variable_name+"=data_conversion.csvToJSON("+data+");";
						  eval.apply(window,[load_data_string]);*/
							 document.load_peak_data=data_conversion.csvToJSON(data);
						dataset=document.load_peak_data;
						HUD_summary3Dcharts(1);
						
					  }
					});
							
						}else{
							dataset=document.load_peak_data;
							

								if($("#summary_3d_window").length==0){	
						create_modal_window ("summary_3d_window",{"title":"Data Summary","style":"position:absolute; width:50%; height:70%; left:30%"});
						
							
					var index_select_plot3d="<select id='index_select_plot' class='panelControl' ><option value='1' >Index point 1</option><option value='2'>Index point 2</option><option value='3'>Index point 3</option><option value='4'>Index point 4</option><option value='5'>Index point 5</option><option value='6'>Index point 6</option><option value='7'>Index point 7</option><option value='8'>Index point 8</option></select>"
					var ranges = "<table id='summaryBarChartsControl' align='left|right|center' style='border-collapse: collapse;    '><tr><td >&nbsp<b>Change Plot View</b>&nbsp        </td><td style='width:100px;'>&nbsp Flip up/down &nbsp <input id='R0' type='range' min='0' max='90' value='15'/> <span id='R0-value' class='value'></span><br> &nbsp Rotate left/right<input id='R1' type='range' min='0' max='90' value='15'/> <span id='R1-value' class='value'></span></td></tr></table>";
					var plotting_area="<div id ='summary_bar_chart_area'></div>"

					$("#summary_3d_window_content").append(index_select_plot3d+ranges+plotting_area);
						//console.log("append");
						//console.log($("#summary_3d_window_content"));
					if($("#summary_bar_chart_area").length==0)  {
					}
						
						
						}else{
							$("#summary_3d_window").modal("show");
						}//end of testing window exist
					bar_plotting(indexInput);	
							
						


					  } //end of testing if data exist
					 

					$('#index_select_plot').change(function(e) {
							
							$("#summary_bar_chart_area").remove();
							//console.log("append2");
							$("#summary_3d_window_content").append("<div id ='summary_bar_chart_area'></div>");
							//console.log($('#index_select_plot').val());
							//HUD_summary3Dcharts($('#index_select_plot').val());

							bar_plotting($('#index_select_plot').val());
							
						});  
 
 

  


				function bar_plotting(indexInput){	
					
					setTimeout(function(){ 
					var chart = new Highcharts.Chart({
						chart: {
							renderTo: 'summary_bar_chart_area',
							type: 'column',
							margin: 75,
							options3d: {
								enabled: true,
								alpha:  $('#R0').val(),
								beta: $('#R1').val(),
								depth: 50,
								viewDistance: 25
							}
						},
						title: {
							text: 'Peak discharge of index points(cfs)'
						},        xAxis: {
							categories: ['no_pond', 'Before 1993', 'Before 1999', 'Before 2005', 'Before 2008','Before 2013','Change landuse','Improve soil quality']
							//no_pond  Before 1993 (12 ponds)  Before 1999 (45 ponds)  Before 2005 (88 ponds)  Before 2008 (110 ponds)  Before 2013 (132 ponds)
						},yAxis: {
								
								title: {
									enabled: true,
									text: 'Peak discharge (cfs)',
									 style: {
									fontWeight: 'normal',
									color:'black',
									fontFamily:'Calibri',
									fontSize:'18px'
								}}
								},
						subtitle: {
							text: ''
						},
						plotOptions: {
							column: {
								depth: 50,
								stacking: 'normal',
								grouping: false,
								groupZPadding: 20
							}
						},
						series: [{
							name: '10 year-24 hours',
							color: '#FFCC00 ',			
							data: [retriveExactData('np',10,dataset,indexInput), retriveExactData('1993',10,dataset,indexInput), retriveExactData('1999',10,dataset,indexInput), retriveExactData('2005',10,dataset,indexInput), retriveExactData('2008',10,dataset,indexInput), retriveExactData('2012',10,dataset,indexInput), retriveExactData('LU',10,dataset,indexInput), retriveExactData('SQ',10,dataset,indexInput)],
							stack: 0
						},{
							name: '25 year-24 hours',
							color: '#FF9900 ',
							data: [retriveExactData('np',25,dataset,indexInput), retriveExactData('1993',25,dataset,indexInput), retriveExactData('1999',25,dataset,indexInput), retriveExactData('2005',25,dataset,indexInput), retriveExactData('2008',25,dataset,indexInput), retriveExactData('2012',25,dataset,indexInput), retriveExactData('LU',25,dataset,indexInput), retriveExactData('SQ',25,dataset,indexInput)],
							stack: 1
						},{
							name: '50 year - 24 hours',
							color: '#FF6600 ',
							data: [retriveExactData('np',50,dataset,indexInput), retriveExactData('1993',50,dataset,indexInput), retriveExactData('1999',50,dataset,indexInput), retriveExactData('2005',50,dataset,indexInput), retriveExactData('2008',50,dataset,indexInput), retriveExactData('2012',50,dataset,indexInput), retriveExactData('LU',50,dataset,indexInput), retriveExactData('SQ',50,dataset,indexInput)],
							stack: 2
						},{
							name: '100 year - 24 hours',
							color: '#FF3300 ',
							data: [retriveExactData('np',100,dataset,indexInput), retriveExactData('1993',100,dataset,indexInput), retriveExactData('1999',100,dataset,indexInput), retriveExactData('2005',100,dataset,indexInput), retriveExactData('2008',100,dataset,indexInput), retriveExactData('2012',100,dataset,indexInput), retriveExactData('LU',100,dataset,indexInput), retriveExactData('SQ',100,dataset,indexInput)],
							stack: 3
						}
						
						
						]
						

					});
					
					 $('#R0').on('change', function () {
						chart.options.chart.options3d.alpha = this.value;
						showValues();
						chart.redraw(false);
					});
					$('#R1').on('change', function () {
						chart.options.chart.options3d.beta = this.value;
						showValues();
						chart.redraw(false);
					});
					  
					//console.log(chart.options.chart.options3d.beta);
					//console.log(chart.options.chart.options3d.alpha);

					function showValues() {
				/*        $('#R0-value').html(chart.options.chart.options3d.alpha);
						$('#R1-value').html(chart.options.chart.options3d.beta);*/
					}

					// Activate the sliders
				  


					}, 300);//end of generating plot
					
				}


	  

function retriveExactData(year,rain,dataset,index){
	
	var scenario=year+"_"+rain;
	var index_point="index"+index+"_cf";
	var result;
	

	for(g=0;g<dataset.length;g++){
	//	console.log(g+"  "+dataset.length);
		//console.log(scenario+"  "+dataset[i]["Scenarios"]);
		if(dataset[g]["Scenarios"]==scenario){
			
	
			result=	Number(Number(dataset[g][index_point]).toFixed(2));
			
			
            	
		}
	}	
	
	return result;
	
	
}


}






/*--------------------------------------------------------------------------------------------------------------*/
function create_modal_window (modal_id,options){
	console.log("KH");
	
	if($( "body" ).has( "#"+modal_id ).length==0){
		console.log("KH2");
		var modal_title=options['title'];
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







