
var watershed_search={
	"NHD_search_point":function(lat,lng){	
				 window["file_name"]="nhd_point_trace-user_defined_point";
				 laoding_spinner("show");     
				 ws_pin.clearLayers(); //prepare watershed for display    
				  ws_pin.addLayer(L.marker(  [lat,lng],{icon: pushpin()}  ));
					
					
					$.ajax({
						  url : "php/NHD_trace/script.php?lat="+lat+"&lng="+lng,
						  //url : "php/NHD_trace/script_conn.php?lat="+lat+"&lng="+lng,
						  dataType : 'json',
						  jsonpCallback: 'getJson',
						  success: function(data){
							  
							  window["huc_storage"]=data.huc;
							  
										laoding_spinner("hide");
										var max_length=0;
										var max_array={};

									var remove_holes={};
									if(data['coordinates'].length>1){	
										for (var k=0; k<data['coordinates'].length;k++){
										
										
											if (data['coordinates'][k].length>max_length){
												max_length=data['coordinates'][k].length;
												max_array=data['coordinates'][k];
											}	
										} //end of fpr loop
										
										remove_holes = {"type":"Polygon","coordinates":[max_array]};
									}else{
										
										remove_holes=data;
									}
										var geojson_bordor={
										"type": "Feature",
										"properties": {"watershed": "1"},
										"geometry": remove_holes
										};
										
									console.log(geojson_bordor);
										
										ifis_search_result.clearLayers();
										//ifis_search_result.addLayer(L.marker(  [lat,lng],{icon: pushpin()}  ));
										draw_ifis_boundary(geojson_bordor,"fit");
						
					}
			});	
		},
	"NHD_search_huc":function(huc,feature){	
					window["poi"]=feature;
					console.log(window["poi"]);
					window["file_name"]="HUC"+huc.length+"-"+huc;	
					laoding_spinner("show");
							var result_display = L.geoJson(null, {
							  style:Huc_Highlight_style,onEachFeature: function (feature, layer) {
								
										}//end of oneach
									
								});
						ifis_search_result.clearLayers();
						result_display.addData(feature);
						
						result_display.addTo(ifis_search_result);
							
							$.ajax({
								  url : "php/NHD_trace/NHD_trace_huc.php?huc="+huc,
								  //url : "php/NHD_trace/script_conn.php?lat="+lat+"&lng="+lng,
								  dataType : 'json',
								  jsonpCallback: 'getJson',
								  success: function(data){
									  window["huc_storage"]=data.huc;
											laoding_spinner("hide");
											var max_length=0;
											var max_array={};

										var remove_holes={};
										if(data['coordinates'].length>1){	
											for (var k=0; k<data['coordinates'].length;k++){		
												if (data['coordinates'][k].length>max_length){
													max_length=data['coordinates'][k].length;
													max_array=data['coordinates'][k];
												}	
											} //end of fpr loop
											
											remove_holes = {"type":"Polygon","coordinates":[max_array]};
										}else{
											
											remove_holes=data;
										}
											var geojson_bordor={
											"type": "Feature",
											"properties": {"watershed": "1"},
											"geometry": remove_holes
											};
										console.log(geojson_bordor);
											draw_ifis_boundary(geojson_bordor,"fit");
							}
					});	

				 leaflet_layer_setstyle([HUC8_global,City_global,County_global],project_Default_style);
		},
	"NHD_search_city":function(feature){

					
					if(typeof(feature.properties.city_10)!="undefined"){		
						window["file_name"]="city-"+feature.properties.city_10;
					}else{
						window["file_name"]="county-"+feature.properties.county_10;
					}
						

						
						 laoding_spinner("show");

						var result_display = L.geoJson(null, {
						  style:	{
										fill:true,
										stroke:"#6600FF",
										weight: 5,
										opacity: 1,
										color: '#FF3399',
										fillOpacity: 0.1 							
										
									},onEachFeature: function (feature, layer) {
							
									}//end of oneach
							});
					ifis_search_result.clearLayers();
					result_display.addData(feature);
					window["poi"]=feature;					
					result_display.addTo(ifis_search_result);


				$.ajax({
							  url : "php/NHD_trace/script_city_county.php?",
							  //url : "php/NHD_trace/script_conn.php?lat="+lat+"&lng="+lng,
							  type: "post",
							   dataType : 'json',
							  jsonpCallback: 'getJson',
							  data: {geom:JSON.stringify(feature)},
							  success: function(data){
								  window["huc_storage"]=data.huc;
								  
								  laoding_spinner("hide");

										//console.log(data);	
										var max_length=0;
									var max_array={};

								var remove_holes={};
								if(data['coordinates'].length>1){	
									for (var k=0; k<data['coordinates'].length;k++){
									
									
										if (data['coordinates'][k].length>max_length){
											max_length=data['coordinates'][k].length;
											max_array=data['coordinates'][k];
										}	
									} //end of fpr loop
									
									remove_holes = {"type":"Polygon","coordinates":[max_array]};
							}else{
								
								remove_holes=data;
							}
					

					var geojson_bordor={
					"type": "Feature",
					"properties": {"watershed": "1"},
					"geometry": remove_holes
					};

				//console.log(geojson_bordor);		

					draw_ifis_boundary(geojson_bordor,"fit");
						}
				});	//end of ajax	
	}	
};




function map_reset_button(){
var full_ext="<button  class='map_btn' id='reset_map' style='top:8px; right:45px; width:90px; font-color:black;'>Full Extent</button>";
var reset_map="<button  class='map_btn' id='reset_app' style='top:39px; right:45px; width:90px; font-color:black;'>Reset App</button>";
var reset_bars=full_ext+reset_map;
//$('.leaflet-top.leaflet-right').append(reset_bars);
$('.leaflet-control-container').append(reset_bars);

$(document).on("click", "#reset_map", function(e) {
//$("#reset_map").click(function(e) {
 map.fitBounds([
    [40.37544, -96.639485],
    [43.501196, -90.140061]
]);
/*
setTimeout(function(){ map.setZoom(7.6); }, 1000);*/
});
$(document).on("click", "#reset_app", function(e) {
//$("#reset_app").click(function(e) {
	$("#search_standard").val("null");
	location.reload(); 
});
}//end of map reset buttons




function draw_ifis_boundary(json_data,fit){
	//console.log(json_data);
	
var result_display = L.geoJson(json_data, {
  style:Huc_ws_trace_style,onEachFeature: function (feature, layer) {
				
			third_level_ws_boundary(feature,layer);
				
	
			}//end of oneach
				
			});


//http://s-iihr32.iihr.uiowa.edu:8080/geoserver/Iowa_Watershed/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Iowa_Watershed:huc12&maxFeatures=50&CQL_FILTER=huc_8%20IN%20%28%2707060005%27%29&outputFormat=application/json		
  result_display.addData(json_data);
 ifis_search_result_extend=result_display.getBounds();
window["third_level_boundary"]=ifis_search_result_extend;
 if(fit=="fit"){
	 var ifis_search_result_extend=result_display.getBounds();
	  map.fitBounds(ifis_search_result_extend);
	 
 }
//result_display.bringToFront();
result_display.addTo(ifis_search_result);


for(var each in ifis_search_result["_layers"]){
	//console.log(each);
	ifis_search_result["_layers"][each].bringToBack();
}

show_map_legend("show");

}
function lauch_state_app(show){
	if(show=="show"){
		var style="style='position:absolute; bottom:30px; right:20px; width:250px;background:#336600 linear-gradient(to bottom, #33cc33 5%, #009900 100%) repeat scroll 0 0; border:1px solid #006600;box-shadow:0 1px 0 0 #003300 inset'";
	var state_button="<button id='the_statelaunchButton' class='launchButton' "+style+"><b>Launch DSS for <span style='font-size:22px'>Iowa</span></b></button>"
	$("#map").append(state_button);
	$("#the_statelaunchButton").click(function(e){
		window.open("../IowaWS/?ws_route=state&project=state","_parent");
		
			})
		
	}else{
		if($("#the_statelaunchButton").length>0){
			$("#the_statelaunchButton").remove()
		}
	}
	
	
	
}

	
function show_launch_button(show_button){
	var style="style='position:absolute; bottom:30px; right:20px; width:250px' ";
	var button="<button id='the_launchButton' class='launchButton' "+style+"><b>Launch DSS</b></button>"
	
	if(show_button=="show"){		
		if($("#the_launchButton").length==0){			
			$("#map").append(button);
		}		
	}
	if(show_button=="hide"){		
					
			$("#the_launchButton").remove();
			
	}
}

function show_map_legend(show_map_legend){
	
		var legend_text="<p ><b style='font-size:16px; color:#0066FF;'>|&nbsp;</b><b  style='font-size:16px; color:#0D0D0D;'>POI drainage area </b></p ><p ><b  style='font-size:16px; color:#FF3399;'>|&nbsp;</b><b style='font-size:16px; color:#0D0D0D;'>Selected POI </b></p>";
		var style="style='position: absolute; bottom: 3%; left: 1%; border-style: solid; padding: 5px 10px; background-color: rgba(255, 255, 255, 0.5); border-color: rgba(255, 255, 255, 0.9);'";
		var control={
			"show":function(){
				if($("#map_legend").length <= 0){
				
				$("#map").append("<div id='map_legend' "+style+">"+legend_text+"</div>");
			
				}else{
					$("#map_legend").remove();					
				$("#map").append("<div id='map_legend' "+style+">"+legend_text+"</div>");
				}

			},
			"hide":function(){
				$("#map_legend").remove();
			},
		};
		control[show_map_legend]();

	
}
//--------------------------------------------------------------------------------------------------------------
function show_project_legend(feature,layer,prop_nam,show_pj_legend){
	
			var control={
			"show":function(){
					if($("#map_legend").length <= 0){

							var legend_text="<p style='font-size:15px;'><b>"+feature.properties[prop_nam]+"</b></p>";
							$("#map").append("<div id='map_legend' style='position:absolute; top:2%; left:1%;width:640px;height:80px;'>"+legend_text+"</div>");
						
							}else{
								$("#map_legend").remove();
								$("#map").append("<div id='map_legend' style='position:absolute; top:2%; left:1%;width:500px;height:80px;'>"+legend_text+"</div>");
							}

			},
			"hide":function(){
				$("#map_legend").remove();
			},
		};	
			control[show_pj_legend]();	
}
//--------------------------------------------------------------------------------------------------------------
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




 






//--------------------------------------------------------------------------------------------------------------








function leaflet_layer_setstyle(layer_group,default_style){
	
	for (var each_layer in layer_group){
		var layer=each_layer;
		for(var each in layer["_layers"]){
		
		//layer["_layers"][each].setStyle(default_style);
		//layer["_layers"][each].bringToBack();
	}		
	}
	
	//layer["_layers"].setStyle(default_style);
	
}





//--------------------------------------------------------------------------------------------------------------
function leaflet_layer_highlight(feature, layer,defualt_style,highlight_style,properties_name){	
layer.on('mouseout', function (e) {		
layer.setStyle(defualt_style);	

});
	
	 layer.on('mouseover', function (e) {
 //this.bringToBack();

 
 //console.log($('#search_parameter').val()+"  "+properties_name);
var properties_name=$('#search_parameter').val();
$('#search_box').val(feature.properties[properties_name]);	
	 layer.setStyle(highlight_style);
					});
	
}
//-------------------------------------------------------------------------------------------------------------
function format_boundary_for_export(feature){
	console.log(feature);
	console.log(feature.geometry);
	console.log(feature.geometry.type);
	if(feature.geometry.type=="MultiPolygon"){		
	var parsed_feature={"type":"Feature","properties":{"watershed":"1"},"geometry":{"type":"Polygon","coordinates":[]}};
	console.log(feature.geometry.coordinates);
	var largest_coord={
		"length":0,
		"coord":[],
	};
	for(var each_shape in feature.geometry.coordinates){
		var length=feature.geometry.coordinates[each_shape].length;
		if (length>=largest_coord["length"]){
			largest_coord["length"]=length;
			largest_coord["coord"]=feature.geometry.coordinates[each_shape];
		}
	}
	parsed_feature.geometry.coordinates=largest_coord.coord;
	console.log(parsed_feature);
	
	parsed_feature.properties.huc=window["huc_storage"];
	return parsed_feature;
	

	}else{
		
		parsed_feature=feature;
		parsed_feature.properties.huc=window["huc_storage"];
		return parsed_feature;
		
	}
	
}
//--------------------------------------------------------------------------------------------------------------
function third_level_ws_boundary(feature,layer){
	
		function polygon_add_outer_boundary(feature,outer_boundary_mask, callback) {	
	      if(feature.geometry.coordinates.length==1){
		  feature.geometry.coordinates.unshift(outer_boundary_mask);
		  }
		  callback();
		} 
	
	
	
		show_launch_button("show");
	  $("#the_launchButton").on("click",function() {
		 
					  
				var map_fit_bound=[[window["third_level_boundary"]["_southWest"]["lat"],window["third_level_boundary"]["_southWest"]["lng"]],[window["third_level_boundary"]["_northEast"]["lat"],window["third_level_boundary"]["_northEast"]["lng"]]];

				var lv3_bound=JSON.stringify(map_fit_bound);
				var outer_boundary_mask=[[174.257, 82.535], [174.127, -78.861], [-177.496, -78.579], [-177.366, 82.818], [174.257, 82.535]];	
				
				//console.log(feature.geometry.MultiPolygon);
				var parsed_feature=format_boundary_for_export(feature);
				parsed_feature.properties["path_name"]=window["file_name"];
				
				
				//parsed_feature.properties["poi"]=;				
				
				var parsed_poi_feature="{}";
				//console.log("wrong");
				//console.log(window["poi"]);
				if(typeof(window["poi"])!='undefined'){
					parsed_poi_feature=format_boundary_for_export(window["poi"]);
				}
				polygon_add_outer_boundary(parsed_feature,outer_boundary_mask, function() {

						$.post("php/watershed.php",{	feature_geom: JSON.stringify(parsed_feature),poi_geom:JSON.stringify(parsed_poi_feature),},
							function(data, status){
								 window.open("../IowaWS/?ws_route="+window["file_name"]+"&wbd="+lv3_bound,"_parent");
								
								//window.open("../IowaWS/?ws_route="+window["file_name"]+"&wbd="+lv3_bound,"_parent");			
							});	
					
					
					});
				
		});
		
	
	layer.on('click', function (e) {	
	

	});//end of on layer click
	
}

function third_level_pj_boundary(feature,layer){
	
	//console.log("new pj json");
	//console.log(feature);
		layer.on('click', function (e) {

		

		//var project_info=ws_project_generate_project_prompt(ws_name,watershed_projects,project_detail,"info");			
		//var project_name=project_info["project_key"];  // in future, when planned for multiple project, use "+" in between projects
	

	var ws_name=feature.properties.watershed;       //this parameter tells the third level where to find watershed boundary
	window["file_name"]="special_pj-"+ws_name;
	//var map_fit_bound=[[window["third_level_boundary"]["_southWest"]["lat"],window["third_level_boundary"]["_southWest"]["lng"]],[window["third_level_boundary"]["_northEast"]["lat"],window["third_level_boundary"]["_northEast"]["lng"]]];
 //console.log(feature.geometry);
	var lv3_bound=JSON.stringify(find_bound_box(feature.geometry.coordinates[0]));
	
	//console.log(find_bound_box(feature.geometry.coordinates[0]));
	var outer_boundary_mask=[[174.257, 82.535], [174.127, -78.861], [-177.496, -78.579], [-177.366, 82.818], [174.257, 82.535]];	
	
	//var parsed_feature={"crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:EPSG::3395"}}, "type": "FeatureCollection", "features": [{"geometry": {"type": "Polygon", "coordinates": []}, "type": "Feature", "properties": {"Id": 0}}]};
	var parsed_feature={"type":"Feature","properties":{"watershed":"1"},"geometry":{"type":"Polygon","coordinates":[]}};
	
	parsed_feature.geometry.coordinates[0]=feature.geometry.coordinates[0];
	function add_outer_boundary(outer_boundary_mask, callback) {	
	      if(parsed_feature.geometry.coordinates.length==1){
		  parsed_feature.geometry.coordinates.unshift(outer_boundary_mask);
		 // console.log(parsed_feature);
		  }
		  callback();
		} 
		parsed_feature.properties["path_name"]=window["file_name"];	
	   add_outer_boundary(outer_boundary_mask, function() {
		   
			
         
				$.post("../landing_map/php/watershed.php",{
							
					feature_geom: JSON.stringify(parsed_feature),  
					//file_name_path:String(window["file_name"])
				},
				function(data, status){
					 //console.log(parsed_feature);
					 //window.open("../IowaWS/?project="+project_name+"&dss-ws="+ws_name+"&wbd="+lv3_bound,"_parent");
					 
					 window.parent.location.href = "../IowaWS/?ws_route="+window["file_name"]+"&project=yes&dss-ws="+ws_name+"&wbd="+lv3_bound;
					 //window.parent.location.reload();



	


				});	
        
		
		});
	
	

	});//end of on layer click

	
function find_bound_box(coordinate_group){
	var lat=[];
	var lng=[];
	
	for(var each_cord in coordinate_group){		
		lat.push(coordinate_group[each_cord][0]);
		lng.push(coordinate_group[each_cord][1]);
	}
	
	lat.sort(function(a, b){return a-b});
	lng.sort(function(a, b){return a-b});

	return [[lng[0],lat[lng.length-1]],[lng[lat.length-1],lat[0]]]
	
	
}
	
	
}