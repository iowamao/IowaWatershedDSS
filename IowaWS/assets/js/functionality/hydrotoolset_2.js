// JavaScript Document
//require script fist to load all app
//The nature of this script is "config", so all function are generated inside of it
script_manager(["assets/js/utility/plotting.js","assets/js/functionality/ifis_watershed.js"]);	


var streamCat_color_array = ['green', 'blue', 'orange', 'yellow',' #FF00FF ','#00FFFF ','#9933ff',' #FF6600' ,'#CC99CC',' #666600 ',' red ',' #660066 '];
 var stream_cat_available_variable=["COMID","CatAreaSqKm","WsAreaSqKm","WsPctFull","PctAg2006Slp10Cat","PctAg2006Slp10Ws","PctAg2006Slp20Cat","PctAg2006Slp20Ws","BFICat","BFIWs","CanalDensCat","CanalDensWs","DamNrmStorCat","DamNIDStorCat","DamDensCat","DamNrmStorWs","DamNIDStorWs","DamDensWs","NPDESDensCat","NPDESDensCatRp100","SuperfundDensCat","SuperfundDensCatRp100","TRIDensCat","TRIDensCatRp100","NPDESDensWs","NPDESDensWsRp100","SuperfundDensWs","SuperfundDensWsRp100","TRIDensWs","TRIDensWsRp100","ElevCat","ElevWs","PctImp2006Cat","PctImp2006CatRpBf100","PctImp2006CatSlp10","PctImp2006CatSlp20","PctImp2006Ws","PctImp2006WsRpBf100","PctImp2006WsSlp10","PctImp2006WsSlp20","KffactCat","KffactWs","PctCarbResidCat","PctNonCarbResidCat","PctAlkIntruVolCat","PctSilicicCat","PctExtruVolCat","PctColluvSedCat","PctGlacTilClayCat","PctGlacTilLoamCat","PctGlacTilCrsCat","PctGlacLakeCrsCat","PctGlacLakeFineCat","PctHydricCat","PctEolCrsCat","PctEolFineCat","PctSalLakeCat","PctAlluvCoastCat","PctCoastCrsCat","PctWaterCat","PctCarbResidWs","PctNonCarbResidWs","PctAlkIntruVolWs","PctSilicicWs","PctExtruVolWs","PctColluvSedWs","PctGlacTilClayWs","PctGlacTilLoamWs","PctGlacTilCrsWs","PctGlacLakeCrsWs","PctGlacLakeFineWs","PctHydricWs","PctEolCrsWs","PctEolFineWs","PctSalLakeWs","PctAlluvCoastWs","PctCoastCrsWs","PctWaterWs","MineDensCat","MineDensCatRp100","MineDensWs","MineDensWsRp100","SN_2008Cat","InorgNWetDep_2008Cat","NH4_2008Cat","NO3_2008Cat","SN_2008Ws","InorgNWetDep_2008Ws","NH4_2008Ws","NO3_2008Ws","PctOw2006CatRp100","PctIce2006CatRp100","PctUrbOp2006CatRp100","PctUrbLo2006CatRp100","PctUrbMd2006CatRp100","PctUrbHi2006CatRp100","PctBl2006CatRp100","PctDecid2006CatRp100","PctConif2006CatRp100","PctMxFst2006CatRp100","PctShrb2006CatRp100","PctGrs2006CatRp100","PctHay2006CatRp100","PctCrop2006CatRp100","PctWdWet2006CatRp100","PctHbWet2006CatRp100","PctOw2006WsRp100","PctIce2006WsRp100","PctUrbOp2006WsRp100","PctUrbLo2006WsRp100","PctUrbMd2006WsRp100","PctUrbHi2006WsRp100","PctBl2006WsRp100","PctDecid2006WsRp100","PctConif2006WsRp100","PctMxFst2006WsRp100","PctShrb2006WsRp100","PctGrs2006WsRp100","PctHay2006WsRp100","PctCrop2006WsRp100","PctWdWet2006WsRp100","PctHbWet2006WsRp100","PctOw2006Cat","PctIce2006Cat","PctUrbOp2006Cat","PctUrbLo2006Cat","PctUrbMd2006Cat","PctUrbHi2006Cat","PctBl2006Cat","PctDecid2006Cat","PctConif2006Cat","PctMxFst2006Cat","PctShrb2006Cat","PctGrs2006Cat","PctHay2006Cat","PctCrop2006Cat","PctWdWet2006Cat","PctHbWet2006Cat","PctOw2006Ws","PctIce2006Ws","PctUrbOp2006Ws","PctUrbLo2006Ws","PctUrbMd2006Ws","PctUrbHi2006Ws","PctBl2006Ws","PctDecid2006Ws","PctConif2006Ws","PctMxFst2006Ws","PctShrb2006Ws","PctGrs2006Ws","PctHay2006Ws","PctCrop2006Ws","PctWdWet2006Ws","PctHbWet2006Ws","PctOw2011Cat","PctIce2011Cat","PctUrbOp2011Cat","PctUrbLo2011Cat","PctUrbMd2011Cat","PctUrbHi2011Cat","PctBl2011Cat","PctDecid2011Cat","PctConif2011Cat","PctMxFst2011Cat","PctShrb2011Cat","PctGrs2011Cat","PctHay2011Cat","PctCrop2011Cat","PctWdWet2011Cat","PctHbWet2011Cat","PctOw2011Ws","PctIce2011Ws","PctUrbOp2011Ws","PctUrbLo2011Ws","PctUrbMd2011Ws","PctUrbHi2011Ws","PctBl2011Ws","PctDecid2011Ws","PctConif2011Ws","PctMxFst2011Ws","PctShrb2011Ws","PctGrs2011Ws","PctHay2011Ws","PctCrop2011Ws","PctWdWet2011Ws","PctHbWet2011Ws","PrecipCat","TmaxCat","TmeanCat","TminCat","PrecipWs","TmaxWs","TmeanWs","TminWs","Pestic97Cat","Pestic97Ws","RdDensCat","RdDensWs","RdCrsCat","RdCrsWs","RunoffCat","RunoffWs","ClayCat","SandCat","ClayWs","SandWs","OmCat","RckDepCat","WtDepCat","PermCat","PermCatBf600","OmWs","RckDepWs","WtDepWs","PermWs","HUDen2010Cat","PopDen2010Cat","PopDen2010CatRp100","HUDen2010Ws","PopDen2010Ws","PopDen2010WsRp100","stabb"];

 var dss_app_settings_hydro_tool2={
	 "resource_statistic":{
	 "sidebar_ui_html":'<div id="tools_search" class="panel-collapse collapse in"> <div class="panel-body"> <div class="form-group"> <label for="streamcat_datacat_selection" disabled>Data Catagory:</label> <select class="form-control" id="streamcat_datacat_selection"> <option value="cat">-Select catagory-</option> <option value="hydrology">Hydrology</option> <option value="landuse">Landuse</option> <option value="infrastracture">Infrastracture</option> <option value="hydrography">Hydrography</option> <option value="soil">Soil</option> <option value="social">Social</option> <option value="geology">Geology</option> <option value="water_quality">Water Quality</option> </select> </div> <label for="streamcat_datacat_selection">Data Catagory:</label> <ul class="list-group" id="streamcat_data_available" style="max-height: 300px;overflow: scroll;"> <li class="list-group-item" >Availble variables will be displayed here</li> </ul> <label for="streamcat_datacat_selected">Selected Variable:</label> <ul class="list-group" id="streamcat_datacat_selected" style="max-height: 250px; overflow: scroll;"> <li id="WsAreaSqKm_selected" class="list-group-item">Watershed area</li> <li id="ElevWs_selected" class="list-group-item">Mean catchment elevation</li> </ul> <hr><br> <p style="color:#0493d3; font-weight: bold" ><div class="panel panel-default"><div class="panel-heading"><h5 class="panel-title">Data Search<button class="btn btn-xs btn-default pull-right" type="button" data-toggle="collapse" data-target="#streamcat_simple_collapse"><i class="glyphicon glyphicon-list"></i></button></h5 ></div> <div id="streamcat_simple_collapse" class="panel-collapse collapse"> <br> <div role="form" class="form"> <label for="streamcat_search_engine" disabled>Search Engine:</label> <select class="form-control" id="streamcat_search_engine" disabled> <option value="nhd">NHD watershed search</option> <option value="ifis">IFIS watershed search (500m)</option> </select> <label for="streamcat_watershed_search_type" disabled>Search Type:</label> <select class="form-control" id="streamcat_watershed_search_type"> <option value="s">Single search</option> <option value="m">Multiple comparsion</option> </select> <hr> <p style="color:#0493d3; font-weight: bold"><input id="watershed_resource_search" type="checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" >&nbsp;Enable Search</p> <p style="color:#0493d3; font-weight: bold"><br> <label for="discharge_result">Landuse Statistic:</label> <div id="watershed_resource_search_result" style="height:250px;overflow:auto" class="form-control" rows="8"></div> <br> <p id="streamcat_multiv_btn_holder"></p> <button id="watershed_resource_search_clear_search" class="form-control btn btn-primary" > &nbsp;Clear Result&nbsp; </button> </p> </div> </div> </div></div></p></div> </div> </div> ',
	 "sidebar_ui_title":"EPA StreamCat",
	 "app_btn_id":"landuse_resource_statistic",
	 "app_leaflet_layer":"main",//window["script_temp_data"]+"_leaflet_layers",
	 "panel_id":"landuse_resource_statistic_panel", //this is for configure only
	 },
 };
var function_btn_event_list_hydro_tool2={
	"resource_statistic":{
			//the order of this does matters as it is referenced in the corresponding script
			"name":"EPA StreamCat",
			"btn_id":dss_app_settings_hydro_tool2["resource_statistic"]["app_btn_id"],
			"dss_script":[], 
			"event":function(){						
						loading_sidebar(dss_app_settings_hydro_tool2["resource_statistic"]);						
						$("#watershed_resource_search").bootstrapSwitch(); 
						
						watershed_resource_search_event();
	
				
			},			
			},//end of the first btn
	
	
}

var tool_set_plugin_spec2={
		"planning_category_Tool":[
			function_btn_event_list_hydro_tool2["resource_statistic"],
		],	
	};
	
	
parse_app_btn_event(tool_set_plugin_spec2);		
stream_cat_init(); 

var StreamCat_Huc_ws_trace_style={
	            fill:true,
				stroke:false,
				weight: 1,
				opacity: 0.15,
				color: '#ff0066',
				fillOpacity: 0.1	
						};

function stream_cat_init(){
	if(typeof(window["dss"])=="undefined"){
		window["dss"]={"dss_tool":{}};
	}
	console.log("ini");
	load_meta_data();
	$("#streamcat_datacat_selection").attr("disabled", true);
	
	function load_meta_data(){
		if(typeof(window["dss"]["dss_tool"]["streamcat_meta"])=="undefined"){
			
			if(typeof(window["dss"]["dss_tool"]["streamcat_selected"])=="undefined"){
						window["dss"]["dss_tool"]["streamcat_selected"]=["WsAreaSqKm", "ElevWs"];			
					}
			
			$.getJSON("data/dss_tool/streamcat/streamcat_meta.json", function(result){
				window["dss"]["dss_tool"]["streamcat_meta"]=result;	
				$("#streamcat_datacat_selection").removeAttr('disabled');
				
				$(document).on('change', '#streamcat_datacat_selection', function() {
					var initial_val=$("#streamcat_datacat_selection").val();				
					generate_available_parameter(result,initial_val);
				});
				
			});
			
		}
		
		
		
	}//end of load meta function
	
		
	function generate_available_parameter(streamcat_meta,datacat_value){
		if(typeof(window["dss"]["dss_tool"]["streamcat_selected"])=="undefined"){
			window["dss"]["dss_tool"]["streamcat_selected"]=["WsAreaSqKm", "ElevWs"];			
		}
		var final_html_result,popuover_val,pupover,check_box,display_title;
		final_html_result="";
		for(var each in streamcat_meta){
			
			var each_para=streamcat_meta[each];
			
			if(each_para["data_catagory"].indexOf(datacat_value)!=-1 && each_para["spatial_level"]!="catchment" && stream_cat_available_variable.indexOf(each)!=-1){				
				 popuover_val='Variable :'+each_para["description"];
				 pupover='data-toggle="popover" data-trigger="hover" title="" data-content="'+popuover_val+'" data-placement="bottom"';				 
				 if(each_para["buffer"]=="NA"){					 
					 var buffer_text="";
				 }else{
					 var buffer_text="("+each_para["buffer"]+")";
				 }
				 display_title=capitalizeFirstLetter(each_para["display_name"]+" "+buffer_text);
				 if(window["dss"]["dss_tool"]["streamcat_selected"].indexOf(each)==-1){
					 var check_box_input='<input type="checkbox" class="streamcat_para_sel" value="'+each+'">';
				 }else{
					 var check_box_input='<input type="checkbox" class="streamcat_para_sel" checked value="'+each+'">';
				 }					
				check_box='<div class="checkbox streamcat_para_li" '+pupover+'><label>'+check_box_input+display_title+'</label></div>'
				final_html_result+="<li class='list-group-item'>"+check_box+"</li>";
			}
		}//end of for loop
		if(datacat_value!="cat"){			 
			 $("#streamcat_data_available").empty();		
			 $("#streamcat_data_available").append(final_html_result);
		 }else{
			 $("#streamcat_data_available").html('<li class="list-group-item">Availble variables will be displayed here</li>');
		 }
		$('.streamcat_para_li').popover();
	}
	
	$(document).on('click', '.streamcat_para_sel', function(){		
		if(this.checked==true){
			window["dss"]["dss_tool"]["streamcat_selected"].push(this.value);
			var close_btn='<button class="btn btn-xs btn-default pull-right streamcat_close" name="'+this.value+'" type="button" style="float:right" >x</button>';
			var value=window["dss"]["dss_tool"]["streamcat_meta"][this.value]["display_name"];
			$("#streamcat_datacat_selected").append('<li class="list-group-item" id="'+this.value+'_selected">'+capitalizeFirstLetter(value)+close_btn+'</li>');
		}
		if(this.checked==false){
			remove_element_from_array(window["dss"]["dss_tool"]["streamcat_selected"],this.value);
			$("#"+this.value+"_selected").remove();
		}
	});
	$(document).on('click', '.streamcat_close', function(){
		var id="#"+this.name+"_selected";		
		$(id).remove();		
		$(".streamcat_para_sel[value='"+this.name+"']").prop( "checked", false );
		remove_element_from_array(window["dss"]["dss_tool"]["streamcat_selected"],this.value);
	})
	function remove_element_from_array(array,value){
		var remove_index=array.indexOf(this.value);
		array.splice(remove_index, 1);
	}
}



				
function watershed_resource_search_event(){
	
	//auto_select_para();
	

	if(typeof(window["dss"]["dss_tool"]["streamcat_multi_traced_ws"])=="undefined"){
		window["dss"]["dss_tool"]["streamcat_multi_traced_ws"]={"feature_colllection":[],"num_ws":0};		
	}
	$(document).on("change","#streamcat_watershed_search_type",function(){
		window["ifis_search_result"].clearLayers();	
		$("#watershed_resource_search_result").empty();
		$("#streamcat_multiv_btn_holder").empty();
        window["dss"]["dss_tool"]["streamcat_multi_traced_ws"]["num_ws"]=0;
		window["dss"]["dss_tool"]["streamcat_multi_traced_ws"]["feature_colllection"]=[];
		
	});

	
	var watershed_search_options={
		"nhd":function(lat,lng){
			stream_cat_NHD_search_point(lat,lng);
		},
		"ifis":function(lat,lng){
			ifis_ws_search(map,StreamCat_Huc_ws_trace_style,e.latlng.lat,e.latlng.lng,500,"fit","9x9"); 				
			watershed_resource_search({'lat':lat,'lng':lng,'display_id':"watershed_resource_search_result"});
		},
	}

		
	map.on('click', function(e) {
			
			if($("#watershed_resource_search").bootstrapSwitch('state')==true){
				var watershed_search_type=$("#streamcat_search_engine").val();
				
				watershed_search_options[watershed_search_type](e.latlng.lat,e.latlng.lng);
				
				//instant_watershed(map,StreamCat_Huc_ws_trace_style,e.latlng.lat,e.latlng.lng, 500,"fit");			    
				//layer:window["ifis_search_result"],display_id:
			}
		
	});	//end of map click
		
	 $(document).on("click","#watershed_resource_search_clear_search",function() {
		window["ifis_search_result"].clearLayers();	
        $("#watershed_resource_search_result").html("");
		window["dss"]["dss_tool"]["streamcat_multi_traced_ws"]={"feature_colllection":[],"num_ws":0};
		$(".StreamCat_correlation_panel").remove();
		$(".streamcat_d3").remove();			
		

	});
	
	$("#watershed_resource_search").on('switchChange.bootstrapSwitch', function(event, state) { 
	if(state==true){
		$('#map').css('cursor','crosshair');
	}else{
		
		$('#map').css('cursor','grab');
		$('#watershed_resource_search_result').html("");
		
	}	
	});	  
	function auto_select_para(){
			window["dss"]["dss_tool"]["streamcat_selected"]=["WsAreaSqKm", "ElevWs"];
			for(var each in window["dss"]["dss_tool"]["streamcat_selected"]){
				var close_btn='<button class="btn btn-xs btn-default pull-right streamcat_close" name="'+each+'" type="button" style="float:right" >x</button>';
				var value=window["dss"]["dss_tool"]["streamcat_meta"][each]["display_name"];
				$("#streamcat_datacat_selected").append('<li class="list-group-item" id="'+each+'_selected">'+value+close_btn+'</li>');
			}
		}//end of auto select
		
	function watershed_resource_search(options){
		$("#"+result_box).html("");
	
		var result_box=options["display_id"];
		var lat=options["lat"];		 
		var lng=options["lng"];			 
					 
				
				 //window["dss"]["dss_tool"]["streamcat_selected"]
					
				 //console.log(first_geom["feature"]);
				 $.ajax({
								  url : "../landing_map/php/NHD_trace/elite_search/point_aggregation_resource.php?lat="+lat+"&lng="+lng,							  
								  type: "get",
								  async: false,
								  dataType : 'json',
								  jsonpCallback: 'getJson',


								  
						success: function(data){
								   //console.log(data);							   
								   var result="Water: "+data["water"].toFixed(2)+"%<br>Wetland: "+data["wetland"].toFixed(2)+"%<br>Urban: "+data["structures"].toFixed(2)+"%<br>Corn: "+data["corn"].toFixed(2)+"%<br>Soybeans: "+data["soybeans"].toFixed(2)+"%<br>Coniferous Forest: "+data["coniferous_forest"].toFixed(2)+"%<br>Deciduous Short: "+data["deciduous_short"].toFixed(2)+"%<br>Deciduous Medium: "+data["deciduous_medium"].toFixed(2)+"%<br>Deciduous Tall: "+data["deciduous_tall"].toFixed(2)+"%<br>Grass: "+(data["grass_1"]+data["grass_2"]).toFixed(2)+"%<br>Cut Hay: "+data["cut_hay"].toFixed(2)+"%<br>Barren_ Fallow: "+data["barren__fallow"].toFixed(2)+"%";
								   $("#"+result_box).html(result);
							}
					});	//end of ajax	
			 
	}	
}




function stream_cat_pushpin(search_type){	
	
		
	if(typeof(window["dss"]["dss_tool"]["streamcat_multi_traced_ws"])=="undefined"){
		window["dss"]["dss_tool"]["streamcat_multi_traced_ws"]={"feature_colllection":[],"num_ws":0};	
		
	}    
	var search_actions={
		"s":function(){
			StreamCat_Huc_ws_trace_style.color='#ff0066'; //change color to default
			window["ifis_search_result"].clearLayers();
			return 'data/dss_tool/streamcat/markers/brown_marker.png';
		},
		"m":function(){	
			StreamCat_Huc_ws_trace_style.color=streamCat_color_array[window["dss"]["dss_tool"]["streamcat_multi_traced_ws"]["num_ws"]]; //change color
			window["dss"]["dss_tool"]["streamcat_multi_traced_ws"]["num_ws"]+=1;
			var num=window["dss"]["dss_tool"]["streamcat_multi_traced_ws"]["num_ws"];
			
			return 'data/dss_tool/streamcat/markers/index/'+num+'.png';
		},
		
	};
	var iconUrl_link=search_actions[search_type]();
	console.log(iconUrl_link);
	console.log(search_type);
   var pushpinL = L.icon({
    iconUrl: iconUrl_link, 
    iconSize:     [25, 41], // size of the icon  
    iconAnchor:   [12.5, 42], // point of the icon which will correspond to marker's location   
    popupAnchor:  [-10, -90] // point from which the popup should open relative to the iconAnchor
});
return pushpinL;
   }

function stream_cat_NHD_search_point(lat,lng){	
				 //window["file_name"]="nhd_point_trace-user_defined_point";
				 //laoding_spinner("show");     
				 //ws_pin.clearLayers(); //prepare watershed for display    
				 // ws_pin.addLayer(L.marker(  [lat,lng],{icon: pushpin()}  ));
				var search_type=$('#streamcat_watershed_search_type').val();
				ifis_search_result.addLayer(L.marker( [lat,lng],{icon: stream_cat_pushpin(search_type)}));
				
					
					$.ajax({
						//assets/php/streamcat/ws_search.php?input=41.600537758000485,-93.6091058889997&location_type=poi&catPara=PctUrbHi2006Ws,PctUrbLo2006Ws
						  //
						  //
						  url : "assets/php/streamcat/ws_search.php?input="+lat+","+lng+"&location_type=poi&catPara="+window["dss"]["dss_tool"]["streamcat_selected"].join(','),
						  /*test [[[[]]]] special case*/ //url : "http://s-iihr32.iihr.uiowa.edu/dev/dss_alpha/IowaWS/assets/php/streamcat/ws_search.php?input=42.833303732700706,-94.94522094726562&location_type=poi&catPara=PctWdWet2006WsRp100,PctUrbLo2006WsRp100",
						  /*test [[[[]]]] special case*/ //url : "http://s-iihr32.iihr.uiowa.edu/dev/dss_alpha/IowaWS/assets/php/streamcat/ws_search.php?input=42.65012181368022,-94.53907012939453&location_type=poi&catPara=PctWdWet2006WsRp100,PctUrbLo2006WsRp100",
						  
						  dataType : 'json',
						  jsonpCallback: 'getJson',
						  success: function(data){
							  
							    var property=data.properties;
							  	var max_length=0;
								var max_array={};
								var remove_holes={};
								
								
								if(data["geometry"]['coordinates'].length>1){
									for (var k=0; k<data["geometry"]['coordinates'].length;k++){										
										if(data["geometry"]['coordinates'][k].length!=1){
											
											
										if (data["geometry"]['coordinates'][k].length>max_length){
												max_length=data["geometry"]['coordinates'][k].length;
												max_array=data["geometry"]['coordinates'][k];
											}//compate max length
										
										
										}//test if not the "coordinates":[[[[]]]] situation
										if(data["geometry"]['coordinates'][k].length==1){											
										for (var j=0; j<data["geometry"]['coordinates'][k].length;j++){
											console.log("specital_case");
											if (data["geometry"]['coordinates'][k][j].length>max_length){
												max_length=data["geometry"]['coordinates'][k][j].length;
												max_array=data["geometry"]['coordinates'][k][j];
											}//compate max length
										}
										}//end of length==1
										
										
										} //end of fpr loop
										
									remove_holes = {"type":"Polygon","coordinates":[max_array]};
									remove_holes=data.geometry;
									}else{										
										remove_holes=data.geometry;
									}
										var geojson_bordor={
										"type": "Feature",
										"properties": property,
										"geometry": remove_holes
										};										
									console.log(geojson_bordor);									
									//ifis_search_result.addLayer(L.marker(  [lat,lng],{icon: pushpin()}  ));
									stream_cat_draw_ifis_boundary(geojson_bordor,StreamCat_Huc_ws_trace_style,"fit");
									stream_cat_display_tabular_result(property);
									streamCat_multivariant_data(geojson_bordor);
									
									
						
					}
			});	
		};



function stream_cat_display_tabular_result(data_property_input){
	var streamCat_data=data_property_input["streamCat"][0];
	var streamCat_meta=generate_lower_case_meta();
	var html_result="";
	for(var each in streamCat_data){
		var variable_title,unit,value;		 
		 variable_title=streamCat_meta[each]["display_name"];
		 unit=streamCat_meta[each]["unit"];
		 value=streamCat_data[each];
		 html_result+="<div class='list-group-item'>"+capitalizeFirstLetter(variable_title)+": "+value+" "+unit+"</div>";
	}
	console.log(html_result);
	var action_list={
		"s":function(html_result){
			html_result="<li class='list-group-item'>"+html_result+"</li>";
			$("#watershed_resource_search_result").empty();
			$("#watershed_resource_search_result").append(html_result);
		},
		"m":function(html_result){			
			var ws_title="<p>Watershed: "+window["dss"]["dss_tool"]["streamcat_multi_traced_ws"]["num_ws"]+"</p>";
			html_result="<li class='list-group-item'>"+ws_title+html_result+"</li>";
			$("#watershed_resource_search_result").append(html_result);
		},
	};
	var type=$("#streamcat_watershed_search_type").val();
	action_list[type](html_result);
	
	/*<div class="panel panel-default" style="margin-top: 5px;"><div class="panel-heading" ><h4 class="panel-title"><a data-toggle="collapse" href="#streamcat_simple_collapse">Simple</a></h4></div><div id="streamcat_simple_collapse" class="panel-collapse collapse">

    </div></div>*/
	function generate_lower_case_meta(){
		if(typeof(window["dss"]["dss_tool"]["streamcat_meta_lower"])=="undefined"){
		window["dss"]["dss_tool"]["streamcat_meta_lower"]={};
		for(var each in window["dss"]["dss_tool"]["streamcat_meta"]){
			window["dss"]["dss_tool"]["streamcat_meta_lower"][each.toLowerCase()]=window["dss"]["dss_tool"]["streamcat_meta"][each];
		}
		return window["dss"]["dss_tool"]["streamcat_meta_lower"];
		}else{
		return window["dss"]["dss_tool"]["streamcat_meta_lower"];	
		}
		
	}//end of function
}
						
function stream_cat_draw_ifis_boundary(json_data,style_input,fit){
	
		console.log(style_input);
		var result_display = L.geoJson(json_data, {
		  style:style_input,onEachFeature: function (feature, layer) {
					
					}//end of oneach						
					});

		//http://s-iihr32.iihr.uiowa.edu:8080/geoserver/Iowa_Watershed/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Iowa_Watershed:huc12&maxFeatures=50&CQL_FILTER=huc_8%20IN%20%28%2707060005%27%29&outputFormat=application/json		
		  result_display.addData(json_data);
		 ifis_search_result_extend=result_display.getBounds();
		
		 if(fit=="fit"){
			 var ifis_search_result_extend=result_display.getBounds();
			  map.fitBounds(ifis_search_result_extend);
			 
		 }
		//result_display.bringToFront();
		result_display.addTo(ifis_search_result);
		
		if(!map.hasLayer(ifis_search_result)){
			ifis_search_result.addTo(map);
		}

		

}	
function streamCat_multivariant_data(geojson_bordor){
	if($("#streamcat_watershed_search_type").val()=="m"){
		geojson_bordor.properties["watershed_id"]="w_"+window["dss"]["dss_tool"]["streamcat_multi_traced_ws"]["num_ws"];
		geojson_bordor.properties["ws_id"]=window["dss"]["dss_tool"]["streamcat_multi_traced_ws"]["num_ws"];
		window["dss"]["dss_tool"]["streamcat_multi_traced_ws"]["feature_colllection"].push(geojson_bordor);
		
	
	var result={"type": "FeatureCollection","crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3395" } },"features":window["dss"]["dss_tool"]["streamcat_multi_traced_ws"]["feature_colllection"]};
	if(window["dss"]["dss_tool"]["streamcat_multi_traced_ws"]["num_ws"]>1){
		$("#streamcat_multiv_btn_holder").empty();
		$("#streamcat_multiv_btn_holder").append('<button id="streamcat_multiv_btn" class="form-control btn btn-warning">Multi-criteria Analysis</button>');
		$("#streamcat_multiv_btn").unbind();
		$("#streamcat_multiv_btn").on("click",function() {	
			console.log(result);
			d3_setMap(result);
			window["ifis_search_result"].clearLayers();
		});//end of click
	}else{
		$("#streamcat_multiv_btn_holder").empty();
	}//end of >1
	}
		
}
				
/*================================================================*/
  var streamCat_color = {
	"w_1":'green',
	"w_2":'blue',
	"w_3":'orange',
	"w_4":'yellow',
	"w_5":'#FF00FF',
	"w_6":'#00FFFF',
	"w_7":'#9933ff',
	"w_8":'#FF6600',
	"w_9":'#CC99CC',
	"w_10":'#666600',
	"w_11":'red',
	"w_12":'#660066',
}
function d3_setMap(jsonData){
  
  var class_name=dss_app_settings_hydro_tool2["app_btn_id"]+"_panel";
  var svg = d3.select(map.getPanes().overlayPane).append("svg"),
  g = svg.append("g").attr("class", "leaflet-zoom-hide streamcat_d3 "+class_name);


  //d3.json("data/culvert_simp.geojson", function(error, jsonData) {
    

    //add Iowa counties geometry to map
    var transform = d3.geo.transform({point: projectPoint}),
    path = d3.geo.path().projection(transform);

	var jsonData_para= jQuery.extend(true, {}, jsonData);  // must copy like this
	
	var jsonData_para_merge=[];
	jsonData_para.features.forEach(function(d){		
		jsonData_para_merge.push(d.properties=$.extend({}, d.properties.streamCat[0],d.properties));
	});
	console.log(jsonData_para_merge);
	
		
    //var recolorMap = colorScale(jsonData.features);

    var counties = g.selectAll("path")
    .data(jsonData.features)
    .enter().append("path").attr("class", "counties") //assign class for styling
    .attr("id", function(d) {
      return (d.properties.watershed_id).replace(" ", "_") })
    .attr("d", path) //project data as geometry in svg
    .style("fill", function(d) { //color enumeration units	
      return streamCat_color[d.properties.watershed_id];
    }).style("opacity", 0.3)

    // .on("mouseover", highlight)
     //.on("mouseout", dehighlight)
    // .on("mousemove", moveLabel)
     //.append("desc") //append the current color
     .text(function(d) {
       return streamCat_color[d.properties.watershed_id];
     });
	paracoord(jsonData_para_merge,window["dss"]["dss_tool"]["streamcat_meta"],counties);
    map.on("viewreset", reset);
    reset();

    //createDropdown(jsonData); //create the dropdown menu

    // Reposition the SVG to cover the features.
    function reset() {
      var bounds = path.bounds(jsonData),
      topLeft = bounds[0],
      bottomRight = bounds[1];

      svg.attr("width", bottomRight[0] - topLeft[0])
      .attr("height", bottomRight[1] - topLeft[1])
      .style("left", topLeft[0] + "px")
      .style("top", topLeft[1] + "px");
		
      g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

      counties.attr("d", path);
    }

    // Use Leaflet to implement a D3 geometric transformation.
    function projectPoint(x, y) {
      var point = map.latLngToLayerPoint(new L.LatLng(y, x));
      this.stream.point(point.x, point.y);
    }

  //});
}


function choropleth(d, recolorMap){

  //get data value
  var value = d.properties[expressed];
  //if value exists, assign it a color; otherwise assign gray
  if (value) {
    return recolorMap(value); //recolorMap holds the colorScale generator
  } else {
    return "#ccc";
  };
};


function paracoord(pcpdata ,paracor_title,map_features ){
		var attNames=jQuery.extend(true,[], window["dss"]["dss_tool"]["streamcat_selected"]);
		console.log(attNames);
		attNames.push("watershed_id");		
		
		for(var each in attNames){
		  attNames[each]=attNames[each].toLowerCase(); 
		  
		}
		console.log(attNames); 
		pcpdata.forEach(function(d){
					  //attribute names are derived from properties of the first json object
					  // so that the dropdown list could be populated
					 
					  for (var k in d){						  
							//console.log(k);					  
						  if(attNames.indexOf(k) == -1){
							 delete d[k] 
						  }else{
							  console.log(k);
						  }
						  //k=paracor_title[k]["display_name"];					 
							}						
						 
					  //tempProperties = d.properties;
					  //pcpdata.push(d.properties);
					  
					});					
					expressed = "watershed_id";
		console.log(pcpdata);
		var key="watershed_id";
					var class_name=dss_app_settings_hydro_tool2["app_btn_id"]+"_panel";
					leaflet_l("<div id='streamcat_paracoord'  class='parcoords' style='500px;height:220px'></div>","","StreamCat_correlation_panel "+class_name);					
					$.getScript( "assets/js/leaflet_extension/d3.parcoords.js", function( data, textStatus, jqxhr ) {
									var pcp = d3.parcoords()("#streamcat_paracoord").data(pcpdata).color(function(d) {
								  //if value exists, assign it a color; otherwise assign gray
								  if (d[expressed]) {
									return streamCat_color[d.watershed_id]; //recolorMap holds the colorScale generator
								  } else {
									return "#ccc";
								  };
								}).render().brushable().on("brush", function(items) {
								  var selected = items.map(function(d) {
									
									return d[key];
								  });
								  map_features.style("opacity", 0.05).filter(function(d) {
									
									return selected.indexOf(d.properties[key]) > -1;
								  }).style("opacity", 0.3);
							   
								
								
								});	
					});
						
			
			
		}