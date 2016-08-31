// JavaScript Document




script_manager(["assets/js/utility/jquery-slider/jQAllRangeSliders-min.js","assets/js/utility/jquery-slider/jQDateRangeSlider-withRuler-min.js"]);  


$(document).ajaxStop(function(){
     $('#loading_screen').empty();
}); 





//Spinner for loading

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
var target;
var spinner = new Spinner(opts).spin(target);



$( document ).ready(function() {
target = document.getElementById('loading_screen');

});

//End of Spinner for loading






var clipTimeX;   //This entrey is used for selecting data with in time stamp
var clipDataY;	 //This entrey is used for selecting data with in time stamp

var initialDataset;
var clipDataset;  //This entrey is used for selecting data with in Nutrient data only

var siteID_global;

var global_time_slide_max;
var global_time_slide_min;

var  TS_control_table;

//----------------------------------------------------------------------------------


var app_data_single={};
var app_data_obj_sys={};
var app_data_obj_clip={};
var max_date;
var min_date;
var default_selected_color="#33cccc";

function display_time_serise_data(siteID,site_org,sensor_data_block){
	
	
		app_data_obj_sys={}; //initialize
		var sensor_meta=meta_data_mapping(sensor_data_block["meta"]);
		var default_var=sensor_meta["default"][1];
		var temp_sensor_data= jQuery.extend(true, {}, sensor_data_block);  // must copy like this
		
		
		
		//
				plot_multi_sensor_data_obj=[];	
				
				temp_sensor_data["time_serise"]=data_conversion.csvToJSON(temp_sensor_data["time_serise"]);
				for(var i in temp_sensor_data["time_serise"]){
					!function(i){
						temp_sensor_data["time_serise"][i]['date_time']=convert_to_date_obj_UTC(temp_sensor_data["time_serise"][i]['date'],temp_sensor_data["time_serise"][i]['time']);	
						
						delete temp_sensor_data["time_serise"][i].time;
						delete temp_sensor_data["time_serise"][i].date;
					}(i)	
				
				}/* End of consturct universal data object with date*/
				
				temp_sensor_data["selected"]="yes";	
				temp_sensor_data["meta"]["plot_color"]=default_selected_color;	
				
				
				
			add_new_sensor_to_plot(app_data_obj_sys,temp_sensor_data);
		
		 app_data_single=jQuery.extend(true, {},app_data_obj_sys);
		//}
		
		
		
		//console.log(app_data_obj_sys);
	



		app_data_obj_clip=jQuery.extend(true, {}, app_data_obj_sys);		
		construct_interface(siteID,site_org,temp_sensor_data,sensor_meta,app_data_obj_sys);
		find_site_from_variable();
		
		setTimeout(function(){	
						var var_initial=[$('#measuring_variable').val()];						
						var variable_list=variable_auto_correlation(var_initial);
		data_for_plotting(app_data_obj_clip,variable_list);		
		
		 }, 200);
	
}

function variable_auto_correlation(variable_list){
		correlation_data={
			"baseflow":['00060'],
		}
		var result=variable_list;
		for(var var_index in variable_list){
			if(correlation_data.hasOwnProperty(variable_list[var_index])){
			    console.log(correlation_data[variable_list[var_index]]);
				result = result.concat(correlation_data[variable_list[var_index]]); 
						}		
		}	
		return result;
}

	function add_new_sensor_to_plot(plotting_obj,sensor_data){
		var sensor_key= sensor_data["site_code"];
		plotting_obj[sensor_key]=sensor_data;
	}

//JSON.parse(JSON.stringify(json_original));





//gaga
//function construct_interface(sensorType,start_date,end_date,siteID,sensor_properties){
 function meta_data_mapping(sensor_meta){ 
				   var default_var=first_in_object(sensor_meta["variables"]);
				   var default_var_obj=sensor_meta["variables"][default_var];
				   var correlation=[];
				   var var_options;
					
					function first_in_object(ob) {
						for (var props in ob) {
							return props;
						}
					}
					
					for(var each in sensor_meta["variables"]){
						correlation.push(each);
						if(each!=default_var){
						var_options+="<option selected value='"+sensor_meta["variables"][each][1].replace(",","")+"'>"+sensor_meta["variables"][each][2]+"</option>";	
						}else{
						var_options+="<option value='"+sensor_meta["variables"][each][1].replace(",","")+"'>"+sensor_meta["variables"][each][2]+"</option>";	
						}
						
					}
								
					return {"default":default_var_obj,"options":var_options};
				
			   }
		   
function clip_data_group_from_time_slide(input_data,minDate,maxDate){	

			//var local_app_data_obj=JSON.parse(JSON.stringify(app_data_obj_sys));
			var local_app_data_obj=jQuery.extend(true, {},input_data);
			//jQuery.extend(true, {}, oldObject);
			
			for(var each_sensor in local_app_data_obj){
				var temp_array=[]
				var each_sensor_time_serise=local_app_data_obj[each_sensor]["time_serise"];
				for(var each_entry in each_sensor_time_serise){

					!function(each_entry){	
	

						if(each_sensor_time_serise[each_entry]['date_time']>minDate&&each_sensor_time_serise[each_entry]['date_time']<maxDate){	
										
							temp_array.push(each_sensor_time_serise[each_entry]);
							delete each_sensor_time_serise[each_entry];
						
						}					
					}(each_entry)
					}
					local_app_data_obj[each_sensor]["time_serise"]=temp_array;
			}
			return local_app_data_obj
	
}
	

function construct_interface(siteID,site_org,sensor_data_block,default_var_obj,app_data_obj){		
	var sensor_meta=sensor_data_block["meta"];	
	var start_date=head_tail_record(sensor_data_block["time_serise"],"first")["date_time"];
	var end_date=head_tail_record(sensor_data_block["time_serise"],"last")["date_time"];
	
	var sensor_feature=window["main"]["sensor"]["_layers"];
	var dropdownOption=default_var_obj["options"];
	var units = default_var_obj["default"][3];
	
	
	
	
	$("#timeSerisetitle").html(sensor_meta["Sensor"]);          
    $("#timeSeriseModal").modal("show");	
	var plot=" <div id='ploting_area_ts'></div><div id='ploting_box_area'></div> "
	//TS_control_table ="<ul id='timeSerise_control' style='list-style-type:none'><li>Variable:</li><li><select id='measuring_variable'>"+dropdownOption+"</select></li><li><br><br><button type='button' class='TS_button_length TSButton_dl ' id='download_csv'>Download JSON</button></li><li><br><button type='button' class='TS_button_length TSButton_dl ' id='download_yaml'>Download YAML</button></li><li><br><button type='button' class='TSButton TS_button_length' id='plot_multi_data'>Compare Sensors</button></li><li><br><button type='button' class='TSButton TS_button_length' id='correlation_plot'>Correlate Variables</button></li></ul> ";
	TS_control_table ="<ul id='timeSerise_control' style='list-style-type:none'><li>Variable:</li><li><select id='measuring_variable'>"+dropdownOption+"</select></li><li><br><br><button type='button' class='TS_button_length TSButton_dl ' id='download_csv'>Download JSON</button></li><li><br></li><li><button type='button' class='TSButton TS_button_length' id='plot_multi_data'>Compare Sensors</button></li><li><br></li></ul> ";
	var min_map="<div id='min_map'></div><div id='min_sensor_info'></div>";
	var timeline = "<div id='timeSerise_slider_container'><div id='timeSerise_slider'></div></div>";
	
	$("#timeSerise-info").html(TS_control_table+plot+timeline+min_map);

	   setTimeout(function(){ 
	   set_min_map(siteID,site_org,"single");
		}, 300);
	
	
	digital_model_viewer(siteID);

	generate_ts_slide_bar(start_date,end_date);
	
	
	/*----------------------------------------------------------------------*/
		      

	/*----------------------------------------------------------------------*/		
	
	
	
	
	
	function digital_model_viewer(siteID){
		if(siteID=="WLLWCR-IC01"){
		 //console.log(siteID +" WLLWCR-IC01");
		// console.log(sensor_feature[index]['feature']['properties']["sitecode_3d"]);  //sitecode_3d
		 
		 var style="height:3%;position:absolute;right:38%;top:50%;width:4%;z-index:20;";
		//$("#timeSerise-info").append(" <button type='button' id='three_D_viewer_sensor_btn' style='position:absolute; z-index:999; right:2px; top:3px;'>3D</button>");
			$("#timeSerise-info").append(" <button type='button' id='three_D_viewer_sensor_btn' style=''>Local View</button>");	
		//$(document).on('click', $('#three_D_viewer_sensor_btn') , function() {
		$('#three_D_viewer_sensor_btn').click(function() {
		console.log("three_D_viewer_sensor_btn");
				$("#three_D_viewer_sensor_btn").remove();
		var ifram_style="position:absolute; height:100%;left:0%;top:0%;width:100%;z-index:25;";
	    $("#min_map").append(" <iframe id='threeD_scene_sensor'  src='src/3d_visual/scene/' style='"+ifram_style+"'></iframe>");
	
		});// end of 3d viewer click
		
	}//test first to see if 
		
		
	}

	
		//start of time slide delay
function generate_ts_slide_bar(start_date,end_date){

		max_date=end_date;
		min_date=start_date;
		
		var time_difference=(new Date(end_date)-new Date(start_date))/(1000*60*60*24);
		console.log(time_difference);
	
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
		setTimeout(function(units){ 

		$('#timeSerise_slider').dateRangeSlider(
		{ symmetricPositionning: true, range:{
		min: {days: 1},
		max: {days: 3600}
		},
		bounds: {min: start_date, max: end_date},
		defaultValues: {min:start_date, max: end_date},
		scales: [{
		first: function(value){ return value; },
		end: function(value) {return value; },
		next: function(value){
		var next = new Date(value);
		
			if(time_difference<365){
				return new Date(next.setMonth(value.getMonth() + 1));	
			}else{
				return new Date(next.setFullYear(value.getFullYear() + 1));	
				
			}		
		},
		
		label: function(value){
			if(time_difference<365){
				return months[value.getMonth()];
			}else{
				return value.getFullYear();
				
			}
		
		},
		format: function(tickContainer, tickStart, tickEnd){
		tickContainer.addClass("myCustomClass");
		}
		}]
		},{step: "days"});

		 }, 300); //end of time slide delay	
}
function re_append_interface(TS_control_table){
	
	$('#ploting_area_ts').empty();
	$('#ploting_box_area').empty();
	
	
	
	
}



$("#timeSerise_slider").bind("userValuesChanged", function(e, data,units){
		//re_append_interface()
		re_append_interface(TS_control_table);
		max_date=data.values.max;
		min_date=data.values.min;
		
		//var local_data=app_data_obj;
		app_data_obj_clip=clip_data_group_from_time_slide(app_data_obj_sys,min_date,max_date);		
						var var_initial=[$('#measuring_variable').val()];						
						var variable_list=variable_auto_correlation(var_initial);
		data_for_plotting(app_data_obj_clip,variable_list);
		

		 
	});//change of time bar*/

	
$("#measuring_variable").on("change", function(){
	
						var var_initial=[$('#measuring_variable').val()];						
						var variable_list=variable_auto_correlation(var_initial);
		data_for_plotting(app_data_obj_clip,variable_list);	
		find_site_from_variable();
		

		
    });
	
$('#plot_multi_data').click(function(e) {    
	
	if($('#plot_multi_data').html()=="Compare Sensors"){
	$("#min_sensor_info").css('color', '#000000')
    $("#min_map").remove();	
	var min_map="<div id='min_map'></div>";	
	$( "#timeSerise-info" ).append( min_map );
	
	set_min_map(siteID,site_org,'group');	
	$('#plot_multi_data').html("Individual Site");
	
	
	}else{
	// from multi to single
			$("#min_sensor_info").css('color', '#FFF');
			plot_multi_sensor_data_obj=[];
		
			$("#min_map").remove();	
			var min_map="<div id='min_map'></div>";	
			$( "#timeSerise-info" ).append( min_map );
				set_min_map(siteID,site_org,'single');	
			$('#plot_multi_data').html("Compare Sensors");	
			
			/*CHANGE CHART INTO SINGLE*/
			console.log(app_data_single);	
			app_data_obj_sys=jQuery.extend(true, {},app_data_single);
			console.log(app_data_obj_sys);
			app_data_obj_clip=clip_data_group_from_time_slide(app_data_single,min_date,max_date);		
			
						var var_initial=[$('#measuring_variable').val()];						
						var variable_list=variable_auto_correlation(var_initial);
			data_for_plotting(app_data_obj_clip,variable_list);
			/*	END OF CHANGE CHART INTO SINGLE*/
	}
	
});
	

	
$('#download_csv').click(function(e) {
    	   if(plot_multi_sensor_data_obj.length<2){
    	dataExport(app_data_obj_sys);
		   }else{
		dataExport(app_data_obj_sys);	   

		   }
});



function dataExport(cliped_data){             
       // JSONToCSVConvertor(cliped_data, title, true); 

   var ReportTitle = "Download";
  //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text;charset=utf-8,' + escape(JSON.stringify(cliped_data));
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

		
}
/*

$('#download_yaml').click(function(e) {
    	  
		  yamlExport(cliped_json_data_object,sensor_properties[sensorType][$('#measuring_variable').val()]['y_title']);
});



	
	
	
/*



$('#correlation_plot').click(function(e) {
    
	
	if($('#correlation_plot').html()=="Correlate Variables"){


    time_serise_ploting(cliped_json_data_object,$('#measuring_variable').val(),sensor_properties[sensorTypeGlobal],true);


	$('#correlation_plot').html("Single Variable");	
	
	}else{

	$('#correlation_plot').html("Correlate Variables");	
	time_serise_ploting(cliped_json_data_object,$('#measuring_variable').val(),sensor_properties[sensorTypeGlobal],false);
		
	}
	
});





	
	


	*/
	
	
	
}






/*


//json_data_object cliped based on time
function clip_data_from_time_slide(dataObj,minDate,maxDate){
	var tempt_data_obj=[];
for(i=0;i<dataObj.length-2;i++){	
		if(dataObj[i]['date_time_obj']>minDate&&dataObj[i]['date_time_obj']<maxDate){									
		tempt_data_obj.push(dataObj[i]);
			}
}
	return tempt_data_obj
}

//json_data_object cliped based on time
function clip_data_group_from_time_slide(dataObj_group,minDate,maxDate){
	var tempt_data_obj=[];
	var final_group=[]
for(q=0;q<dataObj_group.length;q++){
	tempt_data_obj=[];		
for(i=0;i<dataObj_group[q].length-2;i++){	
		if(dataObj_group[q][i]['date_time_obj']>minDate&&dataObj_group[q][i]['date_time_obj']<maxDate){									
		tempt_data_obj.push(dataObj_group[q][i]);
			}			
}
final_group.push(tempt_data_obj);
			
}
	return final_group
}



//cliped_json_data_object,sensor_properties[sensorType][$('#measuring_variable').val()]['y_title']
function re_append_time_serise_control(clipTimeX,title,dropdownOption){
	//----------------------------------------------------------------------------------------------------------------------------------------------------------------	
    var old_variable_selected=$('#measuring_variable').val();
	var old_valuie_compare=$('#plot_multi_data').html();
	$("#timeSerise_control").remove();		

    $( "#timeSerise-info" ).append( TS_control_table );
	$('#measuring_variable').val(old_variable_selected);
	
	$('#plot_multi_data').html(old_valuie_compare);
	
	
	
	
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
$('#download_csv').click(function(e) {
	
    	   
    	//dataExport(clipTimeX,title);
		  if(plot_multi_sensor_data_obj.length<2){
    	dataExport(cliped_json_data_object,sensor_properties[sensorTypeGlobal][$('#measuring_variable').val()]['y_title']);
		   }else{
		dataExport(plot_multi_sensor_data_obj,sensor_properties[sensorTypeGlobal][$('#measuring_variable').val()]['y_title']);	   
		   }
		
		
});
$('#download_yaml').click(function(e) {
    	  
		  yamlExport(cliped_json_data_object,sensor_properties[sensorTypeGlobal][$('#measuring_variable').val()]['y_title']);
});


$('#correlation_plot').click(function(e) {
    
	
	if($('#correlation_plot').html()=="Correlate Variables"){


    time_serise_ploting(cliped_json_data_object,$('#measuring_variable').val(),sensor_properties[sensorTypeGlobal],true);


	$('#correlation_plot').html("Single Variable");	
	
	}else{

	$('#correlation_plot').html("Correlate Variables");	
	time_serise_ploting(cliped_json_data_object,$('#measuring_variable').val(),sensor_properties[sensorTypeGlobal],false);
		
	}
	
});




$('#plot_multi_data').click(function(e) {
    
	
	if($('#plot_multi_data').html()=="Compare Sensors"){
	$("#min_sensor_info").css('color', '#000000')
    $("#min_map").remove();	
	var min_map="<div id='min_map'></div>";	
    $( "#timeSerise-info" ).append( min_map );
	set_min_map(siteID_global,'group');	
	$('#plot_multi_data').html("Individual Site");
	
	
	}else{
	// from multi to single
			$("#min_sensor_info").css('color', '#FFF');
			plot_multi_sensor_data_obj=[];
		//boxplot(cliped_json_data_object,'',$('#measuring_variable').val(),sensorTypeGlobal);
		$("#min_map").remove();	
	var min_map="<div id='min_map'></div>";	
    $( "#timeSerise-info" ).append( min_map );
		set_min_map(siteID_global,'single');	
	$('#plot_multi_data').html("Compare Sensors");	
	
	cliped_json_data_object=clip_data_from_time_slide(json_data_object,global_time_slide_min,global_time_slide_max);
	time_serise_ploting(cliped_json_data_object,$('#measuring_variable').val(),sensor_properties[sensorTypeGlobal],false);
		plot_multi_sensor_data_obj=[];
	}
	
});


//$(document).on('change', $('#measuring_variable') , function() {
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
	
}






	


	function month_to_string(month){
		//console.log("direct input "+month);
	for(i=0;i<12;i++){
	var monthToString = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	if(month==monthToString[i]){
		//console.log("direct output "+parseInt(monthToString.indexOf(monthToString[i]))+1);
	return monthToString.indexOf(monthToString[i])+1;
	}
	}
	}//end of conveter month











function yamlExport(cliped_data,title){             
       
   JSONToYAMLConvertor(cliped_data, title, true);
    
}






*/

//Plotting functions


/*
function leaflet_external_color_coding_tool(input_obj,siteid){
	
	var layer=input_obj["layer"]["_layers"];

	//onsole.log(scenario_name);
	
			for(var each_element in layer) {
				!function outer(each_element){
				var feature=layer[each_element]['feature'];
				
				
				//{"color":color_function(coding_value),"stroke":true}
				//console.log(coding_value);
				layer[each_element].setStyle(vis_mini_group(feature.properties.site_code,"no_color_change"));
			
				
				 }(each_element)
			} // for loop element in in obj
}*/

////
//////
////// -----------------------------------------Set-up_min_map---------------------------------------------------------------------------------------------
//////
////

var color_array = [ 'green', 'blue', 'orange', 'yellow',' #FF00FF ','#00FFFF ',' #6600FF  ',' #FF6600 ' ,'#CC99CC',' #666600 ',' red ',' #660066 '];
//var color_array = [ 'green', 'blue', 'orange', 'yellow',' #FF00FF ',' #33FFFF ',' #6600FF  ',' #FF6600 ' ,' #CCCCFF ',' #666600 ',' #CCCCCC ',' red '];
color_iterator=0;
window["selected_sensor_array_ID"]=[];
window["selected_sensor_array_Type"]=[];
window["selected_sensor_array_Color"]=[];




function set_min_map(siteID,sensor_type,mode){
	var minimap;
	var minmap_site_type;
	
	selected_sensor_array_ID=[];
	selected_sensor_array_Type=[];
	selected_sensor_array_Color=[];
	
	
var ost_map=L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
})







if(mode=='single'){
	
	minimap = L.map("min_map", {
  zoom: 7,
  center: [42.000, -93.911],
  layers: [basemap["esri"]["imagery"]],
  zoomControl: false,
/*crs: L.CRS.EPSG102100,*/
  attributionControl: true
});


leaflet_wms.nhd_dynamic_river_layer(minimap,"wms_nhd_river_min",3);
 
basemap["esri"]["imagery"].bringToBack();
wms_nhd_river_min.bringToFront();
}

if(mode=='group'){
	
	minimap = L.map("min_map", {
  zoom: 7,
  center: [42.000, -93.911],
  layers: [ost_map],
  zoomControl: false,
/*crs: L.CRS.EPSG102100,*/
  attributionControl: true
});
leaflet_wms.nhd_dynamic_river_layer(minimap,"wms_nhd_river_min",3);

ost_map.bringToBack();
wms_nhd_river_min.bringToFront();
}

	//ckc
	
function onMapClick(e) {
   // console.log(e.latlng);
}

minimap.on('click', onMapClick);






var min_mask = L.geoJson(null,{
               style: {
                weight: 3,
                opacity: 1,
                color: '#8F8F8F',
                fillOpacity: 0.6           
            }
 });
//console.log(Main_layer_features["WBD"]["json"]);
if(typeof(Main_layer_features["WBD"]["json"])!="undefined"){
min_mask.addData(Main_layer_features["WBD"]["json"]);
}else{
	if(typeof(Main_layer_features["HUC8_mask"])!="undefined"){		
		min_mask.addData(Main_layer_features["HUC8_mask"]["json"]);
	}
	
	
}



min_mask.addTo(minimap);




minmap_site_type=sensor_grouping["datasource-checkbox"][sensor_type]


var min_map_sensor = L.geoJson(null, {style: function (feature) 
{return feature.properties && feature.properties.style;},
pointToLayer: function (feature, latlng) {return L.circleMarker(latlng,vis_mini_snesor(feature.properties.site_code));								
									//L.circleMarker(points[i],{title: 'unselected'}).bindLabel('Destination').addTo(map);
														},	
onEachFeature: function (feature, layer) {
	layer.on('mouseover', function (e) {
		$("#min_sensor_info").html('<b>SiteID: </b>'+feature.properties.site_code+'       <b>Owner:</b> '+feature.properties.org);
		});
	layer.on('mouseout', function (e) {
		$("#min_sensor_info").html(' ');
		});
	
	//min_sensor_info
	
if(feature.properties.site_code==siteID){

selected_sensor_array_ID.push(feature.properties.site_code);
selected_sensor_array_Type.push(feature.properties.org);
}


$(document).on('change', $('#measuring_variable') , function() {

		if($('#plot_multi_data').html()=="Individual Site"	){	
        	$( document ).ajaxStop(function() {
				layer.setStyle(vis_mini_group(feature.properties.site_code,"no_color_change"));
			});
		
		
		}
});

if(mode=="single"){
	//console.log(mode);
	if(feature.properties.site_code==siteID){		
         var x = feature.geometry.coordinates[0];
	     var y = feature.geometry.coordinates[1];
	     minimap.setView([y,x], 18);
		 selected_sensor_array_Color.push(layer['options']['fillColor']);
	
	}
}
if(mode=="group"){		
			if(feature.properties.site_code!=siteID){
		 	layer.setStyle(vis_mini_group(feature.properties.site_code));
			}			
			if(feature.properties.site_code==siteID){
				sensorblinking_group(layer,feature.properties.site_code,true,0);
				layer.setStyle({"color":default_selected_color,"fillColor":default_selected_color});
				 
				var x = feature.geometry.coordinates[0];
				var y = feature.geometry.coordinates[1];
				minimap.setView([y,x], 8);
				//minimap.fitBounds(map_boundary["customized_boundary"]);		
			}
	
}	

		
layer.on('click', function (e) {
	
	if(siteID!=feature.properties.site_code){
		//console.log("clicker2");
		
		if(!app_data_obj_sys.hasOwnProperty(feature.properties.site_code)){
			sensorblinking_group(layer,feature.properties.site_code,true,0);
			
			//console.log(layer);
			//alert(layer.options);
			console.log(layer.options);
			download_site_data_for_plot(feature.properties.site_code,layer.options.fillColor);
			/*
			$( document ).ajaxStop(function() {
			  			add_new_sensor_to_plot(app_data_obj_sys,new_data_obj);
						app_data_obj_clip=add_new_sensor_to_plot;		
						var variable_list=variable_auto_correlation([$('#measuring_variable').val()]);
						data_for_plotting(app_data_obj_clip,variable);
			  
			});		*/	

			
		}else{
			sensorblinking_group(layer,feature.properties.site_code,false,0);
			delete app_data_obj_sys[feature.properties.site_code];
			//console.log(app_data_obj_sys);
			//app_data_obj_clip=app_data_obj_sys;
			app_data_obj_clip=clip_data_group_from_time_slide(app_data_obj_sys,min_date,max_date);			
						var var_initial=[$('#measuring_variable').val()];						
						var variable_list=variable_auto_correlation(var_initial);
			data_for_plotting(app_data_obj_clip,variable_list);
		}
		
		
	}//end of selecting sensor graphic 

	 
 });		 
	
     }				
});	


//end of sensor
//console.log(Sensor_layer_features["sensor"]["json"]);
try {
    min_map_sensor.addData(Sensor_layer_features["sensor"]["json"]);
		min_map_sensor.addTo(minimap);  
}
catch(err) {
	console.log(err.message);
    
}
//sensor_variables






function vis_mini_snesor(id){	
	var visible={
	stroke:true,
	fill:true,
	radius: 5,					
	fillColor: "#FF6600 ",
	color: "#FFFF00 ",
	weight: 8,
	opacity: 0.5,
	fillOpacity: 0.8,
	};
		var invisible={stroke:false,fill:false};
	if(id==siteID){
		
		return visible
	}else{
		return invisible
	}
	
}





//sensor_gro 
$("#measuring_variable").val();

var variable_grouping={
	"stage+00065":"stream_stages",
	"00060+Flow":"stage_discharge",
	"72019":"Groundwater",
	"00021+00020":"temp_air",
	"00045+BucketA+BucketB+00193":"precipitation_point",
	"99133+Inorganic nitrogen (nitrate and nitrite)+Nitrite":"nitrate_nitrite",
	"00400+pH":"ph",
	"00301+00300+Dissolved oxygen (DO)":"dissolved_oxygen",
	"00095":"specific_conductance",
	"63680+NTU":"turbidity",
}






function vis_mini_group(site_code,options){
	
	var color=random_color();
	var visible={
		stroke:true,
		fill:true,
		radius: 6,
		weight: 1,
		opacity: 0.7,
		fillOpacity: 0.95,
	};
	//console.log(options); 
	if(typeof(options)!="undefined"){
		if(options=="no_color_change"){
			//console.log("yes");
				visible={
						stroke:true,
						fill:true,
						radius: 6,
						weight: 1,
						opacity: 0.7,
						fillOpacity: 0.95,
					};
			
		}
	}else{
		
				visible={
						stroke:true,
						fill:true,
						radius: 6,					
						fillColor: color,
						color: "#000000",
						weight: 1,
						opacity: 0.7,
						fillOpacity: 0.95,
					};		
	}
	
	
	
	
	
	
	var invisible={
		stroke:false,
		fill:false,
	
	};
	//console.log(document.siteID_with_variable);
	if(document.siteID_with_variable.length!=0){		
		if(document.siteID_with_variable.indexOf(site_code)!=-1){
			//color code if has
			
			return visible;
			
		}else{
			
			return invisible;
		}		
	}
	
	
	

	
	
	
	
}
}
	function random_color(){
		var color_array = [ 'green', 'blue', 'orange', 'yellow',' #FF00FF ','#00FFFF ',' #6600FF  ',' #FF6600 ' ,'#CC99CC',' #666600 ',' red ',' #660066 '];
		var random=Math.floor(Math.random() * 11);  
		var color_result=color_array[random];
		return color_result;
	}
	
function find_site_from_variable(){
	
	var variable_value=$("#measuring_variable").val();
	var site_url="../../../pro/ds/index.php?r=ws/var_info&var="+variable_value;
	document.siteID_with_variable=[];
	//variable_plot
	$.ajax({	
				dataType: 'text',
				  type : 'GET', 
				  async: true,
				url : site_url,
				success:function(data){
					
					document.siteID_with_variable=data.split(",");
					//console.log(document.siteID_with_variable);

					
					
				}
	});
}


function data_for_plotting(app_data_input,variable_list){	
console.log(variable_list);
	var app_data = jQuery.extend(true, {}, app_data_input);
	var final_data_serise=[];
		
	var boxplot_data={ 
		"final_boxplot_data":[],
		"final_boxplot_outliner":[],
		"final_boxplot_sensor":[],
	};
	var sensor_index=0;
	var plotting_meta;
	

	for(var each_sensor in app_data){		
		!function(each_sensor){
			for(var variable_index in variable_list){
				!function(variable_index){
		//----generating meta----//
		var variable=variable_list[variable_index];
		if(app_data[each_sensor].hasOwnProperty("selected")){
			
			var sensor_meta_var=app_data[each_sensor]["meta"]["variables"][variable];

			
			plotting_meta={
				"variable":sensor_meta_var[4],
				"unit":sensor_meta_var[5],
				"y_title":sensor_meta_var[2],
				"title":sensor_meta_var[3],
				"subtitle":app_data[each_sensor]["meta"]["Sensor"]+" - "+each_sensor,
			}
		}//end of generating meta	
		//console.log
		var each_sensor_data=app_data[each_sensor]["time_serise"];
		var each_sensor_data_parsed=[];
		var each_sensor_variable_statistic=[];
		for(var each_entry in each_sensor_data){
			
			!function(each_entry){				
				var time=each_sensor_data[each_entry]["date_time"];
				var y_data=Number(each_sensor_data[each_entry][variable]);
				if(y_data=="NaN"){
					y_data=0;
				}
				each_sensor_data_parsed.push([time,y_data]);
				each_sensor_variable_statistic.push(y_data);
			}(each_entry)			
		}//end of for loop
	
	
		var stats_result=statictic_calculation_refine_array(each_sensor,each_sensor_variable_statistic,sensor_index);
		boxplot_data['final_boxplot_data'].push(stats_result["statistics"]);
		boxplot_data['final_boxplot_outliner']=boxplot_data['final_boxplot_outliner'].concat(stats_result["outliner"])
		boxplot_data['final_boxplot_sensor'].push(each_sensor);
		
		
		var color_array = [ 'orange','green', 'blue', 'yellow',' #FF00FF ','#00FFFF ',' #6600FF  ',' #FF6600 ' ,'#CC99CC',' #666600 ',' red ',' #660066 '];
		if(sensor_meta_var=app_data[each_sensor]["meta"].hasOwnProperty("plot_color")){
			color_array.unshift(app_data[each_sensor]["meta"]["plot_color"]);
		}else{
			
			color_array.unshift("#3399ff");
		}
	
		
		//console.log(each_sensor_data_parsed);
		var temp_serse_format_xy={			
            name:each_sensor+" "+plotting_meta.variable,
			color:color_array[variable_index],       
            data:each_sensor_data_parsed			
			};
		final_data_serise.push(temp_serse_format_xy);

			
		
			}(variable_index)
			}
		sensor_index++;		
	}(each_sensor)
	}//end of iterate all sensors
	//console.log(temp_serse_format_xy);
	
	if(typeof(plotting_meta)!="undefined"){
	console.log(plotting_meta);
	highchart_xy_plotting(plotting_meta,final_data_serise);	
	boxplot_group(plotting_meta,boxplot_data);
	
	}
	
	

	
	function generate_random_color(){
		var key=parseInt(Math.random()*10);
		
	}
	function statictic_calculation_refine_array(sensor,data_array,sensor_index){
		
			var outlier_array=[];
			var data_array_no_outlier=[];
			
			
			var quantile25=ss.quantile(data_array , 0.25);
			var quantile75=ss.quantile(data_array , 0.75);
		    var interquartile_ranges=quantile75-quantile25;	
			var lowerbound=quantile25-1.5*interquartile_ranges;
			var upperbound=quantile75+1.5*interquartile_ranges;	
			
			for(var each in data_array){				
				if(data_array[each]>=lowerbound&&data_array[each]<=upperbound){			
					data_array_no_outlier.push(data_array[each]);
				}else{
					outlier_array.push([0,data_array[each]]);
				}				
			}
			
			try {
				var stas_result=[ss.min(data_array_no_outlier),ss.quantile(data_array_no_outlier, 0.25),ss.median(data_array_no_outlier),ss.quantile(data_array_no_outlier, 0.75),ss.max(data_array_no_outlier)];
				
				}
			catch(err) {
				var stas_result=[0,0,0,0,0];
				}
				
			
			
			return {"sensor:":sensor,"statistics":stas_result ,"outliner":outlier_array};
					
	}
	
}
	

function highchart_xy_plotting(plotting_meta,final_data_serise){
	console.log(final_data_serise);
	var variable=plotting_meta["variable"];
	var title=plotting_meta["title"];
	var subtitle=plotting_meta["subtitle"];
	var siteID=plotting_meta["siteID"];
	var y_title=plotting_meta["y_title"];
	var unit=plotting_meta["unit"];
	

	 $('#ploting_area_ts').highcharts({
        chart: {
		     zoomType: 'xy',
            type: 'line'//'spline'
        },
        title: {
            text: title,
        },
        subtitle: {
            text: subtitle,
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: y_title,
            },
           
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} '+unit,
        },

        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            },
			 series: {
                cursor: 'pointer',
                point: {
                    events: {
                        mouseOver: function () {
							if ($('#min_map').find('#threeD_scene_sensor').length) {
								document.getElementById("threeD_scene_sensor").contentWindow.change_water_elevation(this.y)
                 //console.log();
								}
                            
							
                        }
                    }
                }
            }
        },

        series: final_data_serise
    });
}//end of plotting





function boxplot_group(plotting_meta,final_boxplot_data){

	var variable=plotting_meta["variable"];
	var title=plotting_meta["title"];
	var subtitle=plotting_meta["subtitle"];
	var siteID=plotting_meta["siteID"];
	var y_title=plotting_meta["y_title"];
	var unit=plotting_meta["unit"];

	
	
	
	
	
	
	
	for(var each in final_boxplot_data["final_boxplot_data"]){
		
		var min=final_boxplot_data["final_boxplot_data"][each][0];
		var max=final_boxplot_data["final_boxplot_data"][each][4];
		
	}


	


	$('#ploting_box_area').highcharts({

        chart: {
            type: 'boxplot'
        },

        title: {
            text: title
        },

        legend: {
            enabled: false
        },

        xAxis: {
            categories: final_boxplot_data["final_boxplot_sensor"],

        },

        yAxis: {
            title: {
                text: y_title
            },/*min:min,
				max:max,
           plotLines: [{
                value: ss.mean(datainput_refined),
                color: 'red',
                width: 1,
                label: {
                    text: 'arithmetics mean: '+ss.mean(datainput_refined).toFixed(2),
                    align: 'center',
                    style: {
                        color: 'gray'
                    }
                }
            }]*/
        },

        series: [{
            name: title,
            data: final_boxplot_data["final_boxplot_data"],
            tooltip: {
                headerFormat: '<em>'+' {point.key}</em><br/>'
            }
        }, {
            name: 'Outlier',
            color: Highcharts.getOptions().colors[0],
            type: 'scatter',
            data: final_boxplot_data["final_boxplot_outliner"],
            marker: {
                fillColor: 'white',
                lineWidth: 1,
                lineColor: Highcharts.getOptions().colors[0]
            },
            tooltip: {
                pointFormat: 'Observation: {point.y}'
            }
        }]
    });	
}








function arr_diff(a1, a2)
{
  var a=[], diff=[];
  for(var i=0;i<a1.length;i++)
    a[a1[i]]=true;
  for(var i=0;i<a2.length;i++)
    if(a[a2[i]]) delete a[a2[i]];
    else a[a2[i]]=true;
  for(var k in a)
    diff.push(k);
  return diff;
}


function convert_to_date_obj(date,time){
	
	//if(typeof(time)!="undefined"){
		
	var year=parseInt(date.substring(0, 4));
	var month=parseInt(date.substring(5, 7));
	var day=parseInt(date.substring(8, 10));
	var hour=parseInt(time.substring(0, 2));
	var minute=parseInt(time.substring(3, 5));
	if(time.length<=5){
	var second=00;
	}else{
	var second=parseInt(time.substring(6, 8));	
	}
/*	console.log(date+"  "+time);
	console.log(year+" "+month+" "+day+" "+hour+" "+minute+" "+second);	
	console.log(new Date(year,month-1,day,hour,minute,second));	*/
	return new Date(year,month-1,day,hour,minute,second)
	
	}
	
	
function convert_to_date_obj_UTC(date,time){
//if(typeof(time)!="undefined"){	
	var year=parseInt(date.substring(0, 4));
	var month=parseInt(date.substring(5, 7));
	var day=parseInt(date.substring(8, 10));
	var hour=parseInt(time.substring(0, 2));
	var minute=parseInt(time.substring(3, 5));
	if(time.length<=5){
	var second=00;
	}else{
	var second=parseInt(time.substring(6, 8));	
	}
/*	console.log(date+"  "+time);
	console.log(year+" "+month+" "+day+" "+hour+" "+minute+" "+second);	
	console.log(new Date(year,month-1,day,hour,minute,second));	*/
	return Date.UTC(year,month-1,day,hour,minute,second)
	
//}
}


/*Find object of last record*/ // for CZO only, not for the DSS
function head_tail_record(json_data_object,type){	
var result_record;
result_record=json_data_object[0];
if(type=="last"){
	result_record=json_data_object[json_data_object.length-1];
}
if(type=="first"){
	result_record=json_data_object[0];
}

return result_record
}/* End of  Find object of last record*/  // for CZO only, not for the DSS






//---------------------------------------------------------------------------------------------------------------------

function download_site_data_for_plot(site_code,plot_color){
	var site_url='../../../pro/ds/index.php?r=ws&site_code='+site_code;
	var sensor_data_obj={"time_serise":{},"meta":{},"site_code":site_code};
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
						sensor_data_obj["time_serise"]=time_serise;
						
						var meta_code={
							"O":function(data_array){
								if(data_array.length>1){
								sensor_data_obj["meta"]["Owner"]=data_array[1];	
								}
								
							},			
							"ST":function(data_array){
								if(data_array.length>1){
								sensor_data_obj["meta"]["Sensor"]=data_array[1];	
								}
							},	
							"AD":function(data_array){
								if(data_array.length>1){
								sensor_data_obj["meta"]["Site"]=data_array[1];	
								}
							},
							"V":function(data_array){
								if(data_array.length>1){
								var variable_attribute_list=data_array;
								/*below assign meta to variable meta obj*/
								if(!sensor_data_obj["meta"].hasOwnProperty("variables")){
									sensor_data_obj["meta"]["variables"]={};
									sensor_data_obj["meta"]["variables"][variable_attribute_list[1]]=variable_attribute_list;
								}else{
									sensor_data_obj["meta"]["variables"][variable_attribute_list[1]]=variable_attribute_list;
								}
								//sensor_data_obj[site_code]["meta"]["variables"]=data_array[1];	
								}//end of testing array length
								
							},
							"TI":function(data_array){
								if(data_array.length>1){
								sensor_data_obj["meta"]["Interval"]=data_array[1];	
								}
							}			
						}//end of meta code
						
						if(typeof(plot_color)!="undefined"){
							sensor_data_obj["meta"]["plot_color"]=plot_color;
						}
						
						
						for(var meta_data_each_line in meta_data){
							!function(meta_data_each_line){
							var meta_data_entry=meta_data[meta_data_each_line].split("	");
							if(meta_code.hasOwnProperty(meta_data_entry[0])){
								meta_code[meta_data_entry[0]](meta_data_entry);
								
							}			
						}(meta_data_each_line)	
						}//end of for
						sensor_data_obj["time_serise"]=data_conversion.csvToJSON(sensor_data_obj["time_serise"]);
						for(var i in sensor_data_obj["time_serise"]){
							!function(i){
								
								sensor_data_obj["time_serise"][i]['date_time']=convert_to_date_obj_UTC(sensor_data_obj["time_serise"][i]['date'],sensor_data_obj["time_serise"][i]['time']);								
								delete sensor_data_obj["time_serise"][i].time;
								delete sensor_data_obj["time_serise"][i].date;
							}(i)	
						
						}/* End of consturct universal data object with date*/
						
						
						//console.log(sensor_data_obj);
						add_new_sensor_to_plot(app_data_obj_sys,sensor_data_obj);
						app_data_obj_clip=clip_data_group_from_time_slide(app_data_obj_sys,min_date,max_date);	
						var var_initial=[$('#measuring_variable').val()];						
						var variable_list=variable_auto_correlation(var_initial);
						data_for_plotting(app_data_obj_clip,variable_list);
						
						//return sensor_data_obj
						//data_conversion.csvToJSON

					}//end of testing data validation
				}//end of success
			});//end of ajax		
	}






