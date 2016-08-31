// JavaScript Document
console.log("hud-loaded");
script_manager(["https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js","http://code.highcharts.com/highcharts-3d.js"]);




 var dss_app_settings_hud_soap={
	 "sidebar_ui_html":"<div id='planningdss-hud_panel' class='panel-collapse collapse in'><div ><ul class='list-group'><div><p style='color:#0493d3; font-weight: bold ' ><div class='panel panel-default'><div class='panel-heading'><h5 class='panel-title'>Pond Info<button class='btn btn-xs btn-default pull-right' type='button' data-toggle='collapse' data-target='#pond_info'><i class='glyphicon glyphicon-list'></i></button></h5 ></div> <div id='pond_info' class='panel-collapse collapse'><div class='panel-body'> <p><form role='form' class='form-inline'> <select id='show_pond' style='float:left; width:190px;' class='drop_down form-control scenario_pond_info conflict_toggle_scenario_visualization'><option value='null' selected='selected'>Show ponds</option><option value='1993' >Before 1993(12 ponds)</option><option value='1999' >Before 1999(45 ponds)</option><option value='2005' >Before 2005 (88 ponds)</option><option value='2008' >Before 2008 (110 ponds)</option><option value='2012' >Before 2013 (132 ponds)</option></select> </form> </p> <br style='margin: 17px 0; disply:block'> <p><form role='form' class='form-inline'> <select id='search_method' style='float:left; width:190px;' class='drop_down form-control'><option value='null' selected='selected'>Search By...</option><option value='other_name' >Pond Name</option><option value='former_nam' >Pond ID</option><option value='owner_name' >Owner</option></select><input type='text' id='search_ponds' style='float:right; width:190px;' class='form-control typeahead' value=Specify...> </form> </p></div></div></div></p></div> <div><p style='color:#0493d3; font-weight: bold ' ><div class='panel panel-default'><div class='panel-heading'><h5 class='panel-title'>Visualization Scenario<button class='btn btn-xs btn-default pull-right' type='button' data-toggle='collapse' data-target='#choose_scenario'><i class='glyphicon glyphicon-list'></i></button></h5 ></div><div id='choose_scenario' class='panel-collapse collapse'><div class='panel-body'> <form role='form' class='form-inline'> <button id='hud_show_index' style='float:left; width:190px;' class='form-control btn btn-primary' type='button'>Show index point</button> <select id='time_serise' class='form-control drop_down scenario_pond_info scenario_visualization' style='float:right; width:190px;'><option value='null' selected='selected'>Choose ponds</option><option value='1993' >Before 1993(12 ponds)</option><option value='1999' >Before 1999(45 ponds)</option><option value='2005' >Before 2005 (88 ponds)</option><option value='2008' >Before 2008 (110 ponds)</option><option value='2012' >Before 2013 (132 ponds)</option></select> </form> <br style='margin: 17px 0; disply:block'> <form role='form' class='form-inline'> <select id='precipitation' class='form-control drop_down scenario_visualization' style='float:left; width:190px;'><option value='null' selected='selected'>Choose Precipitation</option><option value='10' >10 year-24 hours</option><option value='25' >25 year-24 hours</option><option value='50' >50 year - 24 hours</option><option value='100' >100 year - 24 hours</option></select> <select id='varible_choose' class='form-control drop_down scenario_visualization' style='float:right; width:190px;'><option value='null' selected='selected'>Parameter</option><option value='pu' >pond usage</option><option value='pe' >pond retention</option></select> </form> <br style='margin: 25px 0; disply:block'> <form role='form' class='form-inline'> <div id='ploting_area' class='form-control' style=' height:460px; width:400px; background:url(data/dss/HUD/soap_creek/image/hydrograph_demo.png); background-repeat:no-repeat; background-size: 100% 100%; ' ></div> </form> <form role='form' class='form-inline'> <br style='margin: 7px 0; disply:block'> <button id='summaryBarTrigger' class='form-control btn btn-primary' style='float:left; width:190px;' type='button'>Data summary </button> </form> <br style='margin: 15px 0; disply:block'> <p> </p> <form role='form' class='form-inline'> <center> <h5>Results at index point (IP)</h5> <table border='1' id='dispalyTable' style=' width:250px; border-collapse: collapse; font-size:15px; text-align: center; border: 2px solid black;'><tr><th colspan='3' style='text-align: center;'>Peak Discharge <br> (cfs)</th></tr><tr><td><b>IP</b></td><td><span style='color:#090acd;font-size:13px;'>Selected</span></td><td><span style=' color:#1b991b; font-size:13px;'>Reference</span></td></tr><tr><td><b>1</b></td><td id='u1'></td><td id='l1'></td></tr><tr><td><b>2</b></td><td id='u2'></td><td id='l2'></td></tr><tr><td><b>3</b></td><td id='u3'></td><td id='l3'></td></tr><tr><td><b>4</b></td><td id='u4'></td><td id='l4'></td></tr><tr><td><b>5</b></td><td id='u5'></td><td id='l5'></td></tr><tr><td><b>6</b></td><td id='u6'></td><td id='l6'></td></tr><tr><td><b>7</b></td><td id='u7'></td><td id='l7'></td></tr><tr><td><b>8</b></td><td id='u8'></td><td id='l8'></td></tr></table><br> </center> </form> </div></div></div></p></div> </ul></div></div></div></p>",
	 "sidebar_ui_title":"Flood Mitigation Analysis (actual ponds)",
	 "app_btn_id":window["script_temp_data"],
	 "app_leaflet_layer":window["script_temp_data"]+"_leaflet_layers",
 }





loading_sidebar( dss_app_settings_hud_soap );




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
},
"sub_basin":{
"default":{	weight: 2, opacity: 1, color: 'white',  dashArray: '3',  fillOpacity: 0.3,stroke:true,	fill:true},	
"default_invisible":{		stroke:false,fill:false	},	
},
"basin":{
"default":{	weight: 2, opacity: 1, color: '#FFCC66',  dashArray: '3',  fillOpacity: 0.3,stroke:true,	fill:false},	
"default_invisible":{		stroke:false,fill:false	},	
"mask":{weight: 1,opacity: 0.5,fillColor: '#FFFFFF ',color: '#999999 ',fillOpacity: 0.6,stroke:true,fill:true},
}
};



/* This part is to generate the data path for the application */
var dss_data_path,peak_discharge_link,hydrograph_link,index_point_link;
if(dss_ws!="default"){         
	
 dss_data_path="dss/HUD/"+dss_ws;
}
if(dss_ws=="default" && typeof(window["script_temp_ws"])!="undefined"){   //generated using spatial query
	
 dss_data_path="dss/HUD/"+window["script_temp_ws"];
 
		 var DSS_hud_layer_boundary_features={
				"boundary":{
				"default_style":DSS_hud_layer_styles.basin["mask"],
				"default_layer":"yes",
				"geometery_type":"regular",
				"layer_group":dss_app_settings_hud_soap["app_leaflet_layer"],
				"bringtofront":"yes",
				"url":"data/"+dss_data_path+"/geo_json/ws_boundary_mask.geojson",
				//"fit_bound":"yes",
				"onEachFeature":function (feature, layer){

				},
				},
		}
		
		leaflet_map_control.Layer_initialization(map,DSS_hud_layer_boundary_features);
}


 peak_discharge_link="data/"+dss_data_path+"/tabular/peak_discharge.txt";
 hydrograph_link="data/"+dss_data_path+"/tabular/hydrograph.txt";
 index_point_link="data/"+dss_data_path+"/geo_json/index_point_soap_creek.geojson";

/* End of generat the data path for the application */

var DSS_hud_layer_features={
"pond":{
"default_style":DSS_hud_layer_styles.pond["default_invisible"],
"default_layer":"yes",
"geometery_type":"circular_marker",
"layer_group":dss_app_settings_hud_soap["app_leaflet_layer"],
"bringtofront":"yes",
"url":"data/"+dss_data_path+"/geo_json/ponds.geojson",
"onEachFeature":function (feature, layer){
	
leaflet_json.feature_highlight_lite(layer,feature,DSS_hud_layer_styles.pond['hover']);
HUD_bind_pond_popup(layer,feature);
},
},
"sub_basin":{
"default_style":DSS_hud_layer_styles.sub_basin["default_invisible"],
"default_layer":"yes",
"geometery_type":"regular",
"layer_group":dss_app_settings_hud_soap["app_leaflet_layer"],
"url":"data/"+dss_data_path+"/geo_json/index_area_soap_creek.geojson",
"onEachFeature":function (feature, layer){
leaflet_json.feature_highlight_lite(layer,feature,DSS_hud_layer_styles.pond['hover']);
},
},


};// end of feature layer object




leaflet_map_control.Layer_initialization(map,DSS_hud_layer_features);
















function handle_index(data){
	
	window[dss_app_settings_hud_soap["app_leaflet_layer"]]['index_point']=L.geoJson(data, {style:  function (feature) {return feature.properties && feature.properties.style;},pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {	icon: HUD_label_icon(feature.properties.index),title: 'Index Number: ' + feature.properties.index+'.  Click to show the basin area'})}
	,onEachFeature:function (feature, layer){
	HUD_show_basin_by_index(feature, layer,window[dss_app_settings_hud_soap["app_leaflet_layer"]].sub_basin,hydrograph_link);
	
		},
	
	});     

}
$.getJSON(index_point_link,function(data){     handle_index(data);   /*  window[dss_app_settings_hud_soap["app_leaflet_layer"]]['index_point'].addTo(map);     */ 
leaflet_map_control.show_leaflet_layer({"button_id":"hud_show_index","layer":[window[dss_app_settings_hud_soap["app_leaflet_layer"]]['index_point']],"new_btn_text":"Hide index points"});         });











//DSS_hud_layer_features["pond"]["json"]=DSS_hud_layer_features["pond"]["json"]


HUD_scenario_style_control_by_filter_class({'class_name':'scenario_pond_info','control_field':'year_cat','filter':'<='},window[dss_app_settings_hud_soap["app_leaflet_layer"]].pond,{'pass_filter':DSS_hud_layer_styles.pond['visible'],'not_pass_filter':DSS_hud_layer_styles.pond['invisible']});
HUD_interface_conflict_control(['conflict_toggle_scenario_visualization','scenario_visualization'],"change");
$(document).on('click','#summaryBarTrigger',function(){
HUD_summary3Dcharts(1);
	});//end of click event


$(document).on('change','.scenario_visualization',function(){// scenario combination changes
//HUD_scenario_name_control_by_combine_field({'class_name':'','control_field':'','filter':'','input_combination':[]});
var combine_scenario_name=HUD_scenario_name_control_by_combine_field({'class_name':this.class,'control_field':'','filter':'','input_combination':["time_serise","varible_choose","precipitation"]});  // THis function uses parallel structure to visualize pond by the year of built
	HUD_pond_scenario_bar_visualization(DSS_hud_layer_features["pond"]["json"],combine_scenario_name,"display_baes"); //temperately put in here

	HUD_peak_discharge_display(combine_scenario_name,peak_discharge_link);

	});// end of on change event
	
HUD_feature_autocomplete(window[dss_app_settings_hud_soap["app_leaflet_layer"]].pond,{"drop_down_id":"search_method","search_box_id":"search_ponds",});












	
function HUD_scenario_style_control_by_filter_class(event_option_obj,leaflet_layer,style_obj){  // THis function uses parallel structure to visualize pond by the year of built
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


			for(var each_element in layer) {
			var feature=layer[each_element]['feature'];
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
function HUD_label_icon(d){
	
	  var new_link='data/dss/HUD/soap_creek/image/'+d+'.png';
	  
  var myIcon = L.icon({
    iconUrl: new_link,
    iconSize: [25, 25],
    iconAnchor: [10, 10],
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

function getColor_double_variables(value,varipale_type) {
			
var style_object={
"pu":function(input){
	 return input > 100  ? '#cc0000'   :           
           input > 75  ? '#ff0000' :
           input > 50   ? '#ff3333' :
           input > 25   ? '#ff6666' :
           input > 0   ? '#ff9999' :
                      '#FF99FF';
		},			  
"pe":function(input){					  
	    return input > 90  ? '#F203FF'   :           
           input > 80  ? '#C323FF' :
           input > 70   ? '#8051FF' :
           input > 60   ? '#4778FF' :
           input > 0   ? '#0D9FFF ' :
                      '#FF99FF';
	 },
};


return style_object[varipale_type](value);

}// end of color coding




 
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

function HUD_feature_autocomplete(leaflet_layer,dom_element){

	var drop_down_id=dom_element["drop_down_id"];
	var search_box_id=dom_element["search_box_id"];
	
	
	

$(document).on('change','#'+drop_down_id+',#show_pond',function(){
	
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
	

	
	
	if(Number($("#show_pond").val())>=Number(layer[a]['feature']['properties']["year_cat"])){
		
		auto_complete_list[properties_name].push(layer[a]['feature']['properties'][properties_name]);
	}else{
		
		
	}
	
}
 // obj[key].setStyle(style_obj);
}	
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
	HUD_scenario_style_control_by_matching_ppt({"matching_value":$("#"+search_box_id).val(),"matching_field":$("#"+drop_down_id).val()},leaflet_layer,{"pass_filter":DSS_hud_layer_styles.pond["find_pond_highlight"],"un_pass_filter":DSS_hud_layer_styles.pond["default"]});
	 
});	
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


function HUD_bind_pond_popup(layer,feature){
	
	layer.bindPopup("<p><b>Pond name</b> :"+feature.properties.former_nam+"<br><b>Build year</b> :"+feature.properties.year_cat+"<br><b>Owner</b> :"+feature.properties.owner_name+"<br><b>Drainage area</b> :"+(feature.properties.drainage_a*247.105).toFixed(3)+" Acre"+"<br><b>Area</b> :"+(feature.properties.area_acres).toFixed(3)+" Acre"+"<br><b>Flood storage</b> :"+feature.properties.flood_stor.toFixed(3)+" ac-ft");
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
var dss_panel_holder_id= dss_app_settings_hud_soap["app_btn_id"]+"_panel";
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
   
   var color_lengend={
	   "pu":function(){
		   leaflet_legend([[0,"#ff9999"],[25,"#ff6666"],[50,"#ff3333"],[75,"#ff0000"],[100,"#cc0000"]],'<h5>Pond Usage</h5><h6>(%)</h6>','','HUD_panel function_panel');
	   },	   
	   "pe":function(){
		   leaflet_legend([[0,"#0D9FFF"],[60,"#4778FF"],[70,"#8051FF"],[80,"#C323FF"],[90,"#F203FF"]],'<h5>Pond Retention</h5><h6>(%)</h6>','','HUD_panel function_panel');
	   },
	   "null":function(){
		   
	   }
	   
   }
   color_lengend[visualization_variable]();
   
   

					  
   
  
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
console.log(window[dss_app_settings_hud_soap["app_leaflet_layer"]])
	setTimeout(function(){ GEN_change_layer_style_externally(window[dss_app_settings_hud_soap["app_leaflet_layer"]].pond,{fill:false,stroke:false});	 }, 100);
 }// end of the 3D plotting



/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/



function HUD_peak_discharge_display(scenarios_combine_raw,data_url){
	
	
	if(typeof document.load_peak_data=='undefined'){
		
		 $.ajax({
  url : data_url ,
  dataType : 'text',
  jsonpCallback: 'getJson',
  success: function(data){
	 /*console.log(data);
	  var load_data_string="var "+variable_name+"=data_conversion.csvToJSON("+data+");";
	  eval.apply(window,[load_data_string]);*/
	 	 document.load_peak_data=data_conversion.csvToJSON(data);
	 
	
  }
});
		
	}else{


	JSON_input_data=document.load_peak_data;
	

var re_arrange_scenario = scenarios_combine_raw.split("_");
 var scenarios_combine=re_arrange_scenario[0]+"_"+re_arrange_scenario[2];
console.log(scenarios_combine);
	
	for(var i = 0; i < JSON_input_data.length; ++i){		  
        var row = JSON_input_data[i];
			
			
			
		var current_index1,current_index2,current_index3,current_index4,current_index5,current_index6,current_index7,current_index8;
		var ref_index1,ref_index2,ref_index3,ref_index4,ref_index5,ref_index6,ref_index7,ref_index8;
		
        if(row.Scenarios === scenarios_combine){					              				
	
		current_index1=row.index1_cf;
		current_index2=row.index2_cf;
		current_index3=row.index3_cf;
		current_index4=row.index4_cf;
		current_index5=row.index5_cf;
		current_index6=row.index6_cf;
		current_index7=row.index7_cf;
		current_index8=row.index8_cf;	
	
			
	//	
        }
		if(row.Scenarios === "np_"+$("#precipitation").val()){					              				
	
		ref_index1=row.index1_cf;
		ref_index2=row.index2_cf;
		ref_index3=row.index3_cf;
		ref_index4=row.index4_cf;
		ref_index5=row.index5_cf;
		ref_index6=row.index6_cf;
		ref_index7=row.index7_cf;
		ref_index8=row.index8_cf;			
	//	
        }
		

	//	if($('#precipitation').val()!='0'){
		$("#u1").html(GEN_numberFormatter(Math.round(current_index1/100)*100));
		$("#u2").html(GEN_numberFormatter(Math.round(current_index2/100)*100));
		$("#u3").html(GEN_numberFormatter(Math.round(current_index3/100)*100));
		$("#u4").html(GEN_numberFormatter(Math.round(current_index4/100)*100));			
		$("#u5").html(GEN_numberFormatter(Math.round(current_index5/100)*100));
		$("#u6").html(GEN_numberFormatter(Math.round(current_index6/100)*100));
		$("#u7").html(GEN_numberFormatter(Math.round(current_index7/100)*100));
		$("#u8").html(GEN_numberFormatter(Math.round(current_index8/100)*100));
	
	//	}
	
		$("#l1").html(GEN_numberFormatter(Math.round(ref_index1/100)*100));
		$("#l2").html(GEN_numberFormatter(Math.round(ref_index2/100)*100));
		$("#l3").html(GEN_numberFormatter(Math.round(ref_index3/100)*100));
		$("#l4").html(GEN_numberFormatter(Math.round(ref_index4/100)*100));
		$("#l5").html(GEN_numberFormatter(Math.round(ref_index5/100)*100));
		$("#l6").html(GEN_numberFormatter(Math.round(ref_index6/100)*100));
		$("#l7").html(GEN_numberFormatter(Math.round(ref_index7/100)*100));
		$("#l8").html(GEN_numberFormatter(Math.round(ref_index8/100)*100));
		
		//Math.ceil(number/100)*100
		
    }
	}//end of else	
}
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


 function HUD_show_basin_by_index(feature, layer,other_layer_obj,data_url) {	


subbasin=other_layer_obj;
					
layer.on('click', function (e) {

var hud_combine_scenario_plotting=HUD_scenario_name_control_by_combine_field({'class_name':this.class,'control_field':'','filter':'','input_combination':["time_serise","precipitation"]});
if(hud_combine_scenario_plotting.indexOf("null")==-1){
	
	
	
if(typeof document.load_hydrography_data=='undefined'){
	console.log("load hydg da")	
		 $.ajax({
  url : data_url,
  dataType : 'text',
  //jsonpCallback: 'getJson',
  success: function(data){
	 /*console.log(data);
	  var load_data_string="var "+variable_name+"=data_conversion.csvToJSON("+data+");";
	  eval.apply(window,[load_data_string]);*/
	
	 document.load_hydrography_data=data_conversion.csvToJSON(data);
	 HUD_plot_hydrograph(feature.properties.index);
	
  }
});
		
	}else{
		HUD_plot_hydrograph(feature.properties.index);	
		
	}
	
	
	
	
	
	

	
}


for (var name in subbasin['_layers']) {



 	if(feature.properties.index==subbasin['_layers'][name].feature.properties.index_area){
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
function HUD_plot_hydrograph(index){
	
	


				if(index.length==0){
					index='Not selected';
				}
				

	            
				var Xdata = new Array();
				var Ydata = new Array();
				
				var Ydata_r = new Array();
				
				var YIndex=$("#time_serise").val()+"_"+$("#precipitation").val()+"_"+index;
				var YIndex_r="np"+"_"+$("#precipitation").val()+"_"+index;

				var Ymax=0;
				var Ymin=2000;
				var Water_Stage= 0;
				var Water_Surface = new Array();

var selectedPeak = "#u"+index;
var referencePeak = "#l"+index;
var selectedPeakNum = Number($(selectedPeak).html().replace(",", ""));
var referencePeak = Number($(referencePeak).html().replace(",", ""));
var peakReduction = (((referencePeak-selectedPeakNum)/referencePeak)*100).toFixed(1);



				
				


var csvArray2=document.load_hydrography_data;	
				for(var i = 0; i <  csvArray2.length; ++i){
				
                  var row = csvArray2[i];
				 
			
					 
				 
				  Ydata[i]=Number(row[YIndex])/1000;
				  Ydata_r[i]=Number(row[YIndex_r])/1000-Ydata[i];
				  Xdata[i]=row.date_time2;	
				 
				 
				/*  alert(Xdata+"     "+Ydata+"   "+Ymax+"   "+Ymin);*/
				  
				  
				  				 
				}
				// console.log(Ydata_r);
				//  console.log(Ydata);
			
		

//Highchars plot coding
         
            var chart = new Highcharts.Chart({
            chart: {

				zoomType: 'xy',
                type: 'line',
				renderTo: document.getElementById('ploting_area')
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
				max:60,
									
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







