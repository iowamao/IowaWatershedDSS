// JavaScript Document
// JavaScript Document
console.log("FSA-loaded");
script_manager(["https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js","assets/js/function_extensions/highcharts_3d.js"]);


 

 var dss_app_settings_FSA_indian={
	 "sidebar_ui_html":"<div id='planningdss-fsa_panel' class='panel-collapse collapse in'><div><ul class='list-group'> <div><p style='color:#0493d3; font-weight: bold ' > <div class='panel panel-default'> <div class='panel-heading'><h5 class='panel-title'>Scenario Visualization<button class='btn btn-xs btn-default pull-right' type='button' data-toggle='collapse' data-target='#choose_scenario'><i class='glyphicon glyphicon-list'></i></button></h5 ></div> <div id='choose_scenario' class='panel-collapse collapse'> <div class='panel-body'> <form role='form' class='form-inline'> <select id='landuse' class='form-control drop_down scenario_pond_info scenario_visualization_FSA' style='float:left; width:190px;'> <option value='null' selected='selected' >Choose Landuse</option> <option value='C'>Current</option> <option value='P'>Partial </option> <option value='N'>No CRP</option> <option value='R'>Riparian</option> <option value='W'>Wetland</option> <option value='RW'>RipWet</option></select> <select id='moisture_condition' class='form-control drop_down scenario_visualization_FSA' style='float:right; width:190px;'> <option value='null' selected='selected'>Choose Moisture</option> <option value='A' >Average</option> <option value='W' >Wet</option> </select> </form> <br style='margin: 17px 0'> <form role='form' class='form-inline'> <select id='weather' class='form-control drop_down scenario_visualization_FSA' style='float:left; width:190px;'> <option value='null'>Choose Precipitation</option> <option value='6_500'>6hr_500yr[7.7in]</option> <option value='6_100'>6hr_100yr [5.8in]</option> <option value='6_50'>6hr_50yr [5.0in]</option> <option value='6_25'>6hr_25yr [4.3in]</option> <option value='6_10'>6hr_10yr [3.4in]</option> <option value='24_500'>24hr_500yr [10.0in]</option> <option value='24_100'>24hr_100yr [7.5in]</option> <option value='24_50'>24hr_50yr [6.5in]</option> <option value='24_25'>24hr_25yr [5.6in]</option> <option value='24_10'>24hr_10yr [4.5in]</option> </select> <select id='parameter' class='form-control drop_down scenario_visualization_FSA' style='float:right; width:190px;'> <option value='null' selected='selected'>Choose Parameter </option> <option value='H' >Peak Reduction</option> <option value='E' >Economic Loss</option> </select> </form> <br style='margin: 17px 0; disply:block'> <form role='form' class='form-inline'> <button id='fsa_term_exp' class='form-control btn btn-primary form-control' type='button' style='float:left; width:190px;'>Term explanation</button> <button id='fsa_show_index' class='form-control btn btn-primary form-control' type='button' style='float:right; width:190px;'>Show index points</button> </form> <br style='margin: 17px 0; disply:block'> <div id='fsa_ploting_area_hydrology' class='fsa_plotting' style=' height:400px; background:url(data/dss/FSA/indian_creek/image/hydrography.png); background-repeat:no-repeat; background-size: 100% 100%;'> </div> <br style='margin: 17px 0; disply:block'> <center> <h4>Results at index point (IP)</h4> <table class='' style='font-size:11px;' > <tbody> <tr> <th style='text-align:center'>Index Point</th> <th> <select id='fsa_hydro_down' style='width:70px;text-align:center'> <option selected='selected' value='default'>Down</option> <option value='customized'> Custom Index</option> </select> </th> <th style='width:70px;text-align:center'>Current</th> <th> <select id='fsa_hydro_up' style='width:70px;text-align:center'> <option selected='selected' value='default'>Up</option> <option value='customized'> Custom Index</option> </select> </th> </tr> <tr> <td>Number</td> <td> <input id='fsa_hydro_down_dropdown' type='text' style='display:none; width:50px'> <input id='fsa_hydro_down_dropdown_ok' type='button' style='display:none; width:20px' value='OK'> <div id='fsa_hydro_down_index'></div> </td> <td id='fsa_hydro_sel_index'></td> <td> <input id='fsa_hydro_up_dropdown' type='text' style='display:none; width:50px'> <input id='fsa_hydro_up_dropdown_ok' type='button' style='display:none; width:20px' value='OK'> <div id='fsa_hydro_up_index'></div></td> </tr> <tr> <td>Stage [ft]</td> <td id='fsa_stage_down'></td> <td id='fsa_stage_sel'></td> <td id='fsa_stage_up'> </td> </tr> <tr> <td>Peak Change [ft]</td> <td id='fsa_change_down'></td> <td id='fsa_change_sel'> </td> <td id='fsa_change_up'> </td> </tr> <tr><td>Damage [$1000]</td> <td id='fsa_econ_down'> </td> <td id='fsa_econ_sel'> </td> <td id='fsa_econ_up'> </td> </tr> </tbody> </table> </center> <br> <p><br style=' display: block; margin: 5px 0;'> <br style=' display: block; margin: 5px 0;'> <button id='fsa_summaryBarTrigger' class='form-control btn btn-primary' type='button'>Compare damage for all scenarios</button> <br style=' display: block; margin: 5px 0;'> </div></div></div></p> </div> </ul></div></div>",
	 "sidebar_ui_title":"Flood Mitigation Analysis",
	 "app_btn_id":window["script_temp_data"],
	 "app_leaflet_layer":window["script_temp_data"]+"_leaflet_layers",
 }





loading_sidebar( dss_app_settings_FSA_indian );




var DSS_FSA_layer_styles={	
"river":{
"default":{stroke: true,weight: 2, opacity: 1,color: '#66CCFF'},
"highlight":{stroke: true,weight: 1, opacity: 1,color: '#66CCFF'},
"invisible":{fill:false,stroke:false,weight: 2, opacity: 1,color: '#66CCFF',fillColor:'#66CCFF' },
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
"default":{	weight: 2, opacity: 1, color: '#FFCC66', fillColor: "#ff9933", dashArray: '3',  fillOpacity: 0.5,stroke:true,	fill:true},
"untouch":{	weight: 2, opacity: 0.01, color: '#FFCC66', fillColor: "#ff9933", dashArray: '3',  fillOpacity: 0.01,stroke:true,	fill:true},
"default_invisible":{		stroke:true,fill:true,fillOpacity: 0.01,opacity: 0.01,},	
},
"basin":{
"default":{	weight: 2, opacity: 1, color: '#FFCC66',  dashArray: '3',  fillOpacity: 0.3,stroke:true,	fill:false},
"mask":{weight: 1,opacity: 0.5,fillColor: '#FFFFFF ',color: '#999999 ',fillOpacity: 0.6,stroke:true,fill:true},
"default_invisible":{		stroke:false,fill:false	},	
}
};




/* This part is to generate the data path for the application */
var dss_data_path,cross_section_link,hydrograph_link,index_point_link;
if(dss_ws!="default"){         
	
 dss_data_path="dss/FSA/"+dss_ws;
}
if(dss_ws=="default" && typeof(window["script_temp_ws"])!="undefined"){   //generated using spatial query
	
 dss_data_path="dss/FSA/"+window["script_temp_ws"]; 
		 var DSS_FSA_layer_boundary_features={
				"boundary":{
				"default_style":DSS_FSA_layer_styles.basin["mask"],
				"default_layer":"yes",
				"geometery_type":"regular",
				"layer_group":"FSA_leaflet_layers",//dss_app_settings_FSA_indian["app_leaflet_layer"],
				"bringtofront":"yes",
				"url":"data/"+dss_data_path+"/geo_json/ws_boundary_mask.geojson",
				//"fit_bound":"yes",
				"onEachFeature":function (feature, layer){

				},
				},
		}
		
		leaflet_map_control.Layer_initialization(map,DSS_FSA_layer_boundary_features);
}
cross_section_link="data/"+dss_data_path+"/tabular/cross_section.csv";
index_point_label_link="data/"+dss_data_path+"/image/index/";
index_point_link="data/"+dss_data_path+"/geo_json/index_point.geojson";





var DSS_FSA_layer_features={

"sub_basin":{
"default_style":DSS_FSA_layer_styles.sub_basin["untouch"],
"default_layer":"yes",
"geometery_type":"regular",
"layer_group":dss_app_settings_FSA_indian["app_leaflet_layer"],
"url":"data/"+dss_data_path+"/geo_json/subbasin.geojson",
"bringtofront":"yes",
"onEachFeature":function (feature, layer){

leaflet_json.feature_highlight_lite_manual(layer,feature,DSS_FSA_layer_styles.sub_basin["default"],DSS_FSA_layer_styles.sub_basin["untouch"]);
fsa_table_plot_constructor(layer,feature);



},
},
"river":{
"default_style":DSS_FSA_layer_styles.river["invisible"],
"default_layer":"yes",
"geometery_type":"regular",
"layer_group":dss_app_settings_FSA_indian["app_leaflet_layer"],
"url":"data/"+dss_data_path+"/geo_json/river.geojson",
"onEachFeature":function (feature, layer){





},
},

};// end of feature layer object




leaflet_map_control.Layer_initialization(map,DSS_FSA_layer_features);








function handle_index(data){
	
	window[dss_app_settings_FSA_indian["app_leaflet_layer"]]['index_point']=L.geoJson(data, {style:  function (feature) {return feature.properties && feature.properties.style;},pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {	icon: FSA_label_icon(feature.properties.IndexPoint,index_point_label_link),title: 'Index Number: ' + feature.properties.IndexPoint+'.  Click to show the basin area'})}
	,onEachFeature:function (feature, layer){
	FSA_show_basin_by_index(feature, layer, window[dss_app_settings_FSA_indian["app_leaflet_layer"]].sub_basin);
	fsa_table_plot_constructor(layer,feature);
		},
	
	});     

}
$.getJSON(index_point_link,function(data){     handle_index(data);    /* window[dss_app_settings_FSA_indian["app_leaflet_layer"]]['index_point'].addTo(map); */        window[dss_app_settings_FSA_indian["app_leaflet_layer"]]['index_point'].bringToBack()  

leaflet_map_control.show_leaflet_layer({"button_id":"fsa_show_index","layer":[window[dss_app_settings_FSA_indian["app_leaflet_layer"]]['index_point']],"new_btn_text":"Hide index points"});

    });


function FSA_label_icon(d,data_cat){
	
	  //var new_link='data/dss/FSA/soap_creek/image/'+d+'.png';
	  var new_link=data_cat+d+'.png';
  var myIcon = L.icon({
    iconUrl: new_link,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    labelAnchor: [6, 0] // as I want the label to appear 2px past the icon (10 + 2 - 6)
});

return myIcon;

  }





function fsa_show_leaflet_layer(options){		  //leaflet_map_control.show_leaflet_layer
		var button_id=options["button_id"];
		var layer=options["layer"];
		var changed_value=options["new_btn_text"];
		var default_val=$("#"+button_id).html();
		
		
		$("#"+button_id).click(function(e) {			
			
			//console.log($("#"+button_id).html()+"    "+default_val);
		if($("#"+button_id).html()==default_val){
			//remove_all_wms(DSS_culvert_wms,"wms_trigger");
			$("#"+button_id).html(changed_value);
			map.addLayer(layer);
			
		}else{
			//console.log(layer);
			map.removeLayer(layer);
			$("#"+button_id).html(default_val);
		}		
	
	});
		
	}

  


window["combine_scenario_name_for_table"]="";
$(document).on('change','.scenario_visualization_FSA',function(){// scenario combination changes
//FSA_scenario_name_control_by_combine_field({'class_name':'','control_field':'','filter':'','input_combination':[]});

		var combine_scenario_name=FSA_scenario_name_control_by_combine_field({'class_name':this.class,'control_field':'','filter':'','input_combination':["landuse","moisture_condition","weather","parameter"]});  // THis function uses parallel structure to visualize pond by the year of built
		window["combine_scenario_name_for_table"]=combine_scenario_name.substring(0, combine_scenario_name.length - 2);
		var combine_scenario_name_array=window["combine_scenario_name_for_table"].split("_");
		combine_scenario_name_array.shift();
		window["refenece_combine_scenario_name_for_table"]="C_"+combine_scenario_name_array.join('_');	
			
			if($("#parameter").val()=="H"){
				//{"color":color_function(coding_value),"stroke":true}
			leaflet_external_color_coding({"layer":window[dss_app_settings_FSA_indian["app_leaflet_layer"]]["river"],"scenario_name":combine_scenario_name,"color_function":fsa_color_coding["river_hydrology_color"]});
			leaflet_legend([[-1.73,"#03a7fc"],[-0.5,"#52dacf"],[-0.1,"#a5fc33"],[0.1,"#ffff00"],[0.3,"#ff6600"],[0.5,"#ff0000"]],'<h5>Flood Peak Change</h5><h6>(Feet)</h6>','','FSA_panel function_panel');
			}
			if($("#parameter").val()=="E"){
			leaflet_external_color_coding({"layer":window[dss_app_settings_FSA_indian["app_leaflet_layer"]]["river"],"scenario_name":combine_scenario_name,"color_function":fsa_color_coding["river_economics_color"]});
			leaflet_legend([["0k","#ffd9d8"],["500k","#ffb6b3"],["1000k","#ff8e89"],["1600k","#ff6963"],["2200k","#ff473f"],["2700k","#fd281e"]],'<h5>Economic Damage</h5><h6>($*1000)</h6>','','FSA_panel function_panel');
			}
			
		
		var index=$("#fsa_hydro_sel_index").html();
		if(typeof(index)!="undefined" && index.length!=0 ){
		get_data_for_table_plot(index);
		}
		

	});// end of on change event
	


var fsa_color_coding={

		"river_hydrology_color":function(feature_properties_value){
       
		var color = feature_properties_value > 0.5  ? '#ff0000' :
			   feature_properties_value > 0.3   ? '#ff6600' :
			   feature_properties_value > 0.1   ? '#ffff00' :
			   feature_properties_value > -0.1   ? '#a5fc33' :
			   feature_properties_value > -0.5   ? '#52dacf' :
			   feature_properties_value > -1.73   ? '#03a7fc' :   
						  false;
		

		return {"color":color,"stroke":true}
			
	},
	"river_economics_color":function(feature_properties_value){
		console.log(feature_properties_value);
		var color = feature_properties_value > 2700000  ? '#fd281e' :
			   feature_properties_value > 2200000   ? '#ff473f' :
			   feature_properties_value > 1600000   ? '#ff6963' :
			   feature_properties_value > 1000000   ? '#ff8e89' :
			   feature_properties_value > 500000   ? '#ffb6b3' :
			   feature_properties_value >= 0   ? '#ffd9d8' :   
						  false;
		//
		return {"color":color,"stroke":true}
		
		
	}	
};	
 
	
	$(document).on('click','#fsa_term_exp',function(){
		if($("#fsa_term_exp_window").length==0){	
	create_modal_window ("fsa_term_exp_window",{"title":"Term Explanation","style":"position:absolute; width:50%; height:70%; left:30%"});
	
	$("#fsa_term_exp_window_content").append("<img src='data/dss/FSA/indian_creek/image/hydrography.png' alt='Hydrograph' style='width:50%;'><img src='data/dss/FSA/indian_creek/image/hydrography2.png' alt='Hydrograph2' style='width:50%;'>")
		}else{
			
			$("#fsa_term_exp_window").modal("show");
		}
	});
	
	$(document).on('click','#fsa_summaryBarTrigger',function(){
		if($("#fsa_summary_window").length==0){	
	create_modal_window ("fsa_summary_window",{"title":"Scenario Summary","style":"position:absolute; width:50%; height:70%; left:30%"});
	
	$("#fsa_summary_window_content").append("<img src='data/dss/FSA/indian_creek/image/fsa_summary.png' alt='Hydrograph' style='width:90%;'>")
		}else{
			
			$("#fsa_summary_window").modal("show");
		}
	});

	$(document).on('click','#fsa_landuse',function(){
		alert("Data not available");
	});
 

		$("#fsa_hydro_down").change(function(){
			if($("#fsa_hydro_down").val()=="customized"){
				$("#fsa_hydro_down_dropdown").css("display", "inline");
				$("#fsa_hydro_down_dropdown_ok").css("display", "inline");
				$("#fsa_hydro_down_index").css("display", "none");
			}else{
				$("#fsa_hydro_down_dropdown").css("display", "none");
				$("#fsa_hydro_down_dropdown_ok").css("display", "none");	
				$("#fsa_hydro_down_index").css("display", "inline");
			}			
		})
		$("#fsa_hydro_up").change(function(){
			if($("#fsa_hydro_up").val()=="customized"){
				$("#fsa_hydro_up_dropdown").css("display", "inline");
				$("#fsa_hydro_up_dropdown_ok").css("display", "inline");
				$("#fsa_hydro_up_index").css("display", "none");
			}else{
				$("#fsa_hydro_up_dropdown").css("display", "none");
				$("#fsa_hydro_up_dropdown_ok").css("display", "none");	
				$("#fsa_hydro_up_index").css("display", "inline");
			}			
		})
		
		
		$("#fsa_hydro_up_dropdown_ok").click(function(){			
			var current_index=$("#fsa_hydro_sel_index").html();
			var down_index=get_up_down_index(current_index,"down");
			var up_index=get_up_down_index(current_index,"up");
			get_data_for_table_plot(current_index,down_index,up_index);
		});
		$("#fsa_hydro_down_dropdown_ok").click(function(){			
			var current_index=$("#fsa_hydro_sel_index").html();
			var down_index=get_up_down_index(current_index,"down");
			var up_index=get_up_down_index(current_index,"up");
			get_data_for_table_plot(current_index,down_index,up_index);
		});
		
		
		
		
		
	function get_up_down_index(current_index,stream){
		var up_down_stream =[[0,0],["null",2],[1,3], [2,4], [3,5], [4,6], [5,7], [6,8], [7,9],[8,10], [9,11], [10,12], [11,13], [12,14], [13,15], [14,16], [15,17], [16,18], [17,19], [18,"null"], [21,12], [22,20], [23,21], [24,22], [25,23], [26,24], [27,25], [28,26], ["null",27]];
	    if(stream=="down"){
			if( $("#fsa_hydro_down").val()=="default"){
						
							return up_down_stream[current_index][1]
							
					}
					if( $("#fsa_hydro_down").val()=="customized"){
						return $("#fsa_hydro_down_dropdown").val();			
					}		
			}
	    if(stream=="up"){
			if( $("#fsa_hydro_up").val()=="default"){
							return up_down_stream[current_index][0]		
					}
					if( $("#fsa_hydro_up").val()=="customized"){
						return $("#fsa_hydro_up_dropdown").val();			
					}		
			}
	}	
	


				
		
		


function fsa_table_plot_constructor(layer,feature){
	

			
			layer.on('click', function(e) {
				
				
				get_data_for_table_plot(feature.properties.IndexPoint);				
				
				
				
			});
			
	
	
}

function get_data_for_table_plot(current_index){
			var combine_scenario_name=window["combine_scenario_name_for_table"];
			
				
			var down_index=get_up_down_index(current_index,"down");
			var up_index=get_up_down_index(current_index,"up");
			console.log(current_index+"   "+up_index+"   "+down_index+"  ");
			
			
			
			refenece_scenario=window["refenece_combine_scenario_name_for_table"];
			console.log(refenece_scenario);
			
				var combine_scenario_name=FSA_scenario_name_control_by_combine_field({'class_name':this.class,'control_field':'','filter':'','input_combination':["landuse","moisture_condition","weather"]});
			var data=DSS_FSA_layer_features["river"]["json"]["features"];
			
			var table_data={
				"current":{"stage":"","change":"","econ":"","index":""},
				"up":{"stage":"","change":"","econ":"","index":""},
				"down":{"stage":"","change":"","econ":"","index":""},	
				"current_ref":{"stage":"","change":"","econ":"","index":""},		
			}
			var data_id_reference={
				"current":{"stage":"fsa_stage_sel","change":"fsa_change_sel","econ":"fsa_econ_sel","index":"fsa_hydro_sel_index"},
				"up":{"stage":"fsa_stage_up","change":"fsa_change_up","econ":"fsa_econ_up","index":"fsa_hydro_up_index"},
				"down":{"stage":"fsa_stage_down","change":"fsa_change_down","econ":"fsa_econ_down","index":"fsa_hydro_down_index"},				
			}
			for(each_index in data){			
				if(data[each_index]["properties"]["index"]==current_index && current_index!="null"){
						table_data["current"]["change"]=data[each_index]["properties"][combine_scenario_name+"_H"];
						table_data["current"]["econ"]=data[each_index]["properties"][combine_scenario_name+"_E"];
						table_data["current"]["stage"]=data[each_index]["properties"][combine_scenario_name+"_S"];	
						table_data["current"]["index"]=current_index;
						
						table_data["current_ref"]["change"]=data[each_index]["properties"][refenece_scenario+"_H"];
						table_data["current_ref"]["econ"]=data[each_index]["properties"][refenece_scenario+"_E"];
						table_data["current_ref"]["stage"]=data[each_index]["properties"][refenece_scenario+"_S"];	
						table_data["current_ref"]["index"]=current_index;
				}
				if(data[each_index]["properties"]["index"]==down_index && down_index!="null"){
						table_data["down"]["change"]=data[each_index]["properties"][combine_scenario_name+"_H"];
						table_data["down"]["econ"]=data[each_index]["properties"][combine_scenario_name+"_E"];
						table_data["down"]["stage"]=data[each_index]["properties"][combine_scenario_name+"_S"];
						table_data["down"]["index"]=down_index;
				}
				if(data[each_index]["properties"]["index"]==up_index && up_index!="null"){
						table_data["up"]["change"]=data[each_index]["properties"][combine_scenario_name+"_H"];
						table_data["up"]["econ"]=data[each_index]["properties"][combine_scenario_name+"_E"];
						table_data["up"]["stage"]=data[each_index]["properties"][combine_scenario_name+"_S"];
						table_data["up"]["index"]=up_index;						
				}
				/*
				if(data[each_index]["properties"]["index"]==up_index && up_index!="null"){
						table_data["up"]["change"]=data[each_index]["properties"][combine_scenario_name+"_H"];
						table_data["up"]["econ"]=data[each_index]["properties"][combine_scenario_name+"_E"];
						table_data["up"]["stage"]=data[each_index]["properties"][combine_scenario_name+"_S"];
						table_data["up"]["index"]=up_index;						
				}
				*/
			}
			console.log(table_data);
			document["fsa_data_table"]=table_data;
			
			for(var each_cat in table_data){
				if(each_cat!="current_ref"){
				for(var each_cell in table_data[each_cat]){
					
						$("#"+data_id_reference[each_cat][each_cell]).html(table_data[each_cat][each_cell]);
					}				
					
				}
			}
			FSA_plot_cross_section(current_index,cross_section_link,document["fsa_data_table"]);
			
			
		}













	
	
	
	
	
function FSA_scenario_style_control_by_matching_ppt(event_option_obj,leaflet_layer,style_obj){  // THis function uses parallel structure to visualize pond by the year of built
//API:FSA_scenario_style_control_by_matching_ppt({"class_id":"","matching_value":"","matching_field":""},leaflet_layer,{"pass_filter":""})



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

/*-----------------------------------------------------------FSA_Functions-------------------------------------------------*/
/*-----------------------------------------------------------FSA_Functions-------------------------------------------------*/

//FSA_scenario_style_control_by_filter_class({'class_name':'','control_field':'','filter':'','input_combination':[]},feature,layer,{'pass_filter':'','not_pass_filter':''});


  
 /*-----------------------------------------------------------------------------------------------------------------------*/
 
 function FSA_plot_cross_section(index,data_url,data_table){
					
				if(typeof document.load_cross_section_data=='undefined'){
					console.log("load hydg da")	
						 $.ajax({
				  url : data_url,
				  dataType : 'text',
				  //jsonpCallback: 'getJson',
				  success: function(data){
					 /*console.log(data);
					  var load_data_string="var "+variable_name+"=data_conversion.csvToJSON("+data+");";
					  eval.apply(window,[load_data_string]);*/
					
					 document.load_cross_section_data=data_conversion.csvToJSON(data);
					 fsa_plot_cross_section(index,document.load_cross_section_data,data_table);
					
				  }
				});
						
					}else{
						fsa_plot_cross_section(index,document.load_cross_section_data,data_table);	
						
					}
	

	function fsa_plot_cross_section(index,data,data_table){
				// Make sure the code plot zero value when the 'index' is "null"
				if(index.length==0){
					index='Not selected';
				}			

	            var csvArray = data;
				var Xdata = new Array();
				var Ydata = new Array();
				var XIndex="X"+index;
				var YIndex="Y"+index;
				var Ymax=0;
				var Ymin=2000;
				
				var Water_Surface = new Array();
				
			/*	
			var table_data={
				"current":{"stage":"","change":"","econ":"","index":""},
				"up":{"stage":"","change":"","econ":"","index":""},
				"down":{"stage":"","change":"","econ":"","index":""},	
				"current_ref":{"stage":"","change":"","econ":"","index":""},					
			}
			var data_id_reference={
				"current":{"stage":"fsa_stage_sel","change":"fsa_change_sel","econ":"fsa_econ_sel","index":"fsa_hydro_sel_index"},
				"up":{"stage":"fsa_stage_up","change":"fsa_change_up","econ":"fsa_econ_up","index":"fsa_hydro_up_index"},
				"down":{"stage":"fsa_stage_down","change":"fsa_change_down","econ":"fsa_econ_down","index":"fsa_hydro_down_index"},				
			}*/
				

    
				var Search_Index=data_table["current_ref"]["index"];
				var Ref_Stage=data_table["current_ref"]["stage"];
				var Water_Stage=data_table["current"]["stage"];
				
				if(typeof(Ref_Stage)=="undefined"){		
					Ref_Stage=0;
				}
				if(typeof(Water_Stage)=="undefined"){		
					Water_Stage=0;
				}


						
			//get river cross section information from CSV dataset		
							for(var i = 0; i < csvArray.length; ++i){
							
							  var row = csvArray[i];
							  
							 if(row[XIndex].length!=0){
								 
							  
							  Ydata[i]=Number(row[YIndex]);
							  Xdata[i]=Number(row[XIndex]);	
							/*  alert(Xdata+"     "+Ydata+"   "+Ymax+"   "+Ymin);*/
							  
							  if(Ymax<=Number(row[YIndex])){
								  Ymax=Number(row[YIndex]);
							  }
								if(Ymin>=Number(row[YIndex])&&Number(row[YIndex])!=0){
								  Ymin=Number(row[YIndex]);
							  }	
							  if(Water_Stage>Number(row[YIndex])){
								  Water_Surface[i]=Water_Stage-Number(row[YIndex]);
								  
								  
							  }else{
								  Water_Surface[i]=0;
								 
							  }
									  
							  
							 }else{ 
							 break;
							 
							 }
											 
							}
										
					

			//Highchars plot coding
					 
						var chart = new Highcharts.Chart({
						chart: {

							zoomType: 'xy',
							type: 'area',
							renderTo: document.getElementById('fsa_ploting_area_hydrology')
						},
						legend: {
						enabled: false
											  },     
						
					
					
						title: {
							text: 'Index point '+index,
							 style: {
								fontWeight: 'normal',
								
								color:'black',
								fontFamily:'Dosis',
								fontSize:'18px'
							
							}
						},
						xAxis: {
							categories: Xdata,
							tickmarkPlacement: 'on',
							tickInterval: 10000,
							title: {
								enabled: true,
								text: 'Distance (ft)'+'<br/><div style="font-size:13px">[hover over the figure for actual distance and stages]</div>',
								
								
						 style: {
								fontWeight: 'normal',
								color:'black',
								fontFamily:'Dosis',
								fontSize:'16px'
							}
								
							},
						
						},
						yAxis: {
							
							plotLines: [{
							color: 'green',
							width: 3,
							value: Ref_Stage,
							zIndex: 5,
							label : {
									text : 'Reference Scenario',
										align: 'left',
									   x: 10,
									   style: {
									color: 'green',
									fontWeight: 'bold',
									fontSize: '15px',
									fontFamily:'Dosis'
								}

						
								}
							
						},{
							color: '#1A6CE7',
							width: 3,
							value: Water_Stage,
							zIndex: 6,
							label : {
									text : 'Selected Scenario',
										align: 'right',
									   x: -10,
									   style: {
									color: '#1A6CE7',
									fontWeight: 'bold',
									fontSize: '15px',
									fontFamily:'Dosis'
								}

						
								}
							
						}
						
						
						],title: {
								enabled: true,
								text: 'Stage (ft)',
								 style: {
								fontWeight: 'normal',
								color:'black',
								fontFamily:'Dosis',
								fontSize:'16px'
							}
							},
							
							min:Ymin,
							max:Ymax,
												
						},
						
						tooltip: {
							
							
							valueSuffix: ' feet',
							
					formatter: function() {
							return 'Distance: <b>'+ this.x +
								'</b> ft <br/> Selected Scenario <b>'+ Water_Stage +'</b> ft <br/> Reference Scenario <b>'+Ref_Stage+"</b> ft";
						}
							
							  /* formatter: function() {
							var s = 'Distance: '+ this.x +' feet';
							
							$.each(this.points, function(i, point) {
								s += '<br/>'+ point.series.name +': '+
									point.y.toFixed(2) +' feet';
							});
							
							return s;
						},
						shared: true,
						valueDecimals: 2,
						*/

						
						},
						plotOptions: {
							area: {
								stacking: 'normal',
								lineColor: '#666666',
								lineWidth: 1,
								marker: {
									enabled:false,
									lineWidth: 1,
									lineColor: '#666666'
								}
							}
						},
						series: [{
						   
							name: 'Selected Scenario ',
							color: '#1A6CE7',
							data: Water_Surface,
					
						}, {
							 name: 'River bed',
							color: '#E0B475',
							data: Ydata
							
						}]
					});
						
			//Plot the damage curve		
					
					
					
				}
			
		
}

  
  
  
  
  
  
  
  
  
  


/*-----------------------------------------------------------FSA_Functions-------------------------------------------------*/

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function FSA_interface_conflict_control(list_of_class,event_type){
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
//FSA_scenario_name_control_by_combine_field({'class_name':'','control_field':'','filter':'','input_combination':[]});
function FSA_scenario_name_control_by_combine_field(event_option_obj){  // THis function uses parallel structure to visualize pond by the year of built

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

function FSA_feature_autocomplete(leaflet_layer,dom_element){

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

	
	//FSA_scenario_style_control_by_matching_ppt({"matching_value":$("#"+search_box_id).val(),"matching_field":$("#"+drop_down_id).val()},leaflet_layer,{"pass_filter":DSS_FSA_layer_styles.pond["find_pond_highlight"]});
	FSA_scenario_style_control_by_matching_ppt({"matching_value":$("#"+search_box_id).val(),"matching_field":$("#"+drop_down_id).val()},leaflet_layer,{"pass_filter":DSS_FSA_layer_styles.pond["find_pond_highlight"],"un_pass_filter":DSS_FSA_layer_styles.pond["default"]});
	 
});	
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


function FSA_bind_pond_popup(layer,feature){
	
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


 function FSA_show_basin_by_index(feature, layer,other_layer_obj) {	


subbasin=other_layer_obj;
					
layer.on('click', function (e) {




for (var name in subbasin['_layers']) {



 	if(feature.properties.IndexPoint==subbasin['_layers'][name].feature.properties.IndexPoint){
			subbasin['_layers'][name].setStyle({
				weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.3,
				stroke:true,
		       fill:true	
			});			
	}else{
		subbasin['_layers'][name].setStyle({
		stroke:true,
		fill:true,	
		opacity: 0.01,
		fillOpacity: 0.01,

			});	
			
	}




 
}

	
//console.log(i);
//console.log(subbasin['_layers'][i].feature.properties.index_area+"    "+feature.properties.index);


	



layer.on('mouseout', function (e) {
	
	subbasin.setStyle({
		stroke:true,
		fill:true,	
		opacity: 0.01,
		fillOpacity: 0.01,
});		
	
	
	});	





   });//end of on layer
   
     }//end of oneach feature function




	 
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/











/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

















function FSA_summary3Dcharts(data_link){	

	var dataset;
	if(typeof document.load_peak_data=='undefined'){
		
		 $.ajax({
  url : data_link,
  dataType : 'text',
  jsonpCallback: 'getJson',
  success: function(data){
	 /*console.log(data);
	  var load_data_string="var "+variable_name+"=data_conversion.csvToJSON("+data+");";
	  eval.apply(window,[load_data_string]);*/
	document.load_peak_data=data_conversion.csvToJSON(data);
	dataset=document.load_peak_data;
	console.log(dataset);
	//FSA_summary3Dcharts(1);
	
  }
});
		
	}else{
		dataset=document.load_peak_data;
		console.log(dataset);

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
		//bar_plotting(indexInput);	
		
	


  } //end of testing if data exist
 

$('#index_select_plot').change(function(e) {
		
		$("#summary_bar_chart_area").remove();
		//console.log("append2");
		$("#summary_3d_window_content").append("<div id ='summary_bar_chart_area'></div>");
		//console.log($('#index_select_plot').val());
		//FSA_summary3Dcharts($('#index_select_plot').val());

		//bar_plotting($('#index_select_plot').val());
        
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
            data: [retriveExactData('np',10,dataset,indexInput), retriveExactData(1993,10,dataset,indexInput), retriveExactData(1993,10,dataset,indexInput), retriveExactData(2005,10,dataset,indexInput), retriveExactData(2008,10,dataset,indexInput), retriveExactData('2012',10,dataset,indexInput), retriveExactData('LU',10,dataset,indexInput), retriveExactData('SQ',10,dataset,indexInput)],
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


	


function retriveExactData(scenario,moisture,rain,index){
		$( document ).ajaxStop(function() {
			console.log(DSS_FSA_layer_features["river"]["json"]["features"]);
		});
		
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







