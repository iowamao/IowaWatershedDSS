// JavaScript Document
// JavaScript Document
// JavaScript Document
console.log("idot_sed_analysis-loaded");

script_manager(["http://leaflet.github.com/Leaflet.draw/leaflet.draw.js"]);

var dss_app_settings_idot_sed_analysis={  //must be the same with the
	 "sidebar_ui_html":"<div id='planningdss-idot_sedanalysis_panel' class='panel-collapse collapse in'><div ><ul class='list-group'> <div><p style='color:#0493d3; font-weight: bold ' ><div class='panel panel-default'><div class='panel-heading'><h5 class='panel-title'>Sedimentation At Culvert<button class='btn btn-xs btn-default pull-right' type='button' data-toggle='collapse' data-target='#idot_sedanalysis_draw'><i class='glyphicon glyphicon-list'></i></button></h5 ></div> <div id='idot_sedanalysis_draw' class='panel-collapse collapse'><div class='panel-body'> <form role='form' class='form'> <p><br style=' display: block; margin: 5px 0;'><select id='idot_sedanalysis_search_method' class='drop_down form-control'><option value='null' selected='selected'>Search by</option><option value='river' >River Name</option><option value='road'>Road Name</option><option value='stru_code' >Structure Code</option></select></p><p><br><input type='text' id='idot_sedanalysis_search_culvert' class='form-control typeahead' value=Specify...></p> <br> <p><button class='form-control btn btn-primary' type='button' data-toggle='collapse' id='idot_sedanalysis_cross_section' >Create Cross-Section Analysis</button></p> <br> <div id='idot_sedanalysis_each_culvert' style='height:300px;overflow:scroll' class='form-control'> </div> </form> </div></div> </div></p></div> </ul></div></div>",
	 "sidebar_ui_title":"Sedimentation Analysis", 
	 "app_btn_id":window["script_temp_data"],
	 "app_leaflet_layer":window["script_temp_data"]+"_leaflet_layers",
 }

window["idot"]['culvert_sed_ana']={};



loading_sidebar(dss_app_settings_idot_sed_analysis);



idot_feature_autocomplete({"drop_down_id":"idot_sedanalysis_search_method","search_box_id":"idot_sedanalysis_search_culvert","layer":window["idot"]["culvert"]});

idot_sed_analysis_cross_section({"search_box_id":"idot_sedanalysis_search_culvert"  ,"switch_tab_id":"idot_sedanalysis_cross_section" });
idot_sed_analysis_leaflet_draw({"search_box_id":"idot_sedanalysis_search_culvert" ,"switch_id":"idot_sedanalysis_leaflet_draw" });

function idot_sed_analysis_cross_section(options){
		var search_box_id=options["search_box_id"];
		var switch_tab_id=options["switch_tab_id"];
		
		$(document).on('click','#'+switch_tab_id,function(){
						
					    remove_all_draw();					
						var culvert_id=$("#"+search_box_id).val();
						if(typeof(culvert_id)!='undefined'|| culvert_id!='Specify...'){						
							leaflet_draw_interface({'culvert_id':culvert_id});	
							leaflet_map_switch_layer(baseMapsControl,basemap["esri"]["imagery"]);
														
							
						}else{
							alert("undefined culvert");
						}
					});	
		
		
		
		function leaflet_draw_interface(options){
			var culvert_id=options["culvert_id"];	

				
			var leaflet_draw_switch_html="<p><input id='idot_sedanalysis_leaflet_draw' value='StdResid' type='checkbox' name='idot-route-checkbox' data-size='mini' data-on-text='ON' data-off-text='OFF' > &nbsp; Delinate on Map</p>";
			var dropdown="<p><select id='idot_sedanalysis_leaflet_draw_culvert_location'><option value='upstream' selected>Upstream</option><option value='culvert'>Culvert</option><option value='downstream'>Downstream</option><option value='upstream_expansion'>Upstream Expansion</option><option value='upstream_sedimentation'>Upstream Sediments Area</option><option value='special'>Exceptions</option></select></p>";
			var description="<p><input type='text' name='fname' value='' id='idot_sedanalysis_leaflet_draw_culvert_description'></p>";
			var dir_mean_img="<p>Flow Direction: <img src=''  id='idot_sedanalysis_dir_img' height='22' width='22'> </p>";
			
			var leaflet_line_area_length_btn="<p><button class='form-control btn btn-primary' type='button' data-toggle='collapse' id='cal_geometry' >Show Measures</button></p>"+dropdown+dir_mean_img;//+description; 
			var sub_html="<ul id='idot_sed_analysis_"+culvert_id+"' class='idot_sed_analysis_each_culvert' style='list-style-type:none'><li id='each_culvert_id'>"+culvert_id+"</li><li>"+leaflet_draw_switch_html+"</li><li>"+leaflet_line_area_length_btn+"</li><li id='idot_sed_analysis_result'></li></ul>";
			
			
			$(".idot_sed_analysis_each_culvert").remove();
			$("#idot_sedanalysis_each_culvert").append(sub_html);
			$("[name='idot-route-checkbox']").bootstrapSwitch(); 
			cal_lengeh_property_action(culvert_id);
			
			
			idot_get_culvert_direction({'culvert_data':window['DSS_culvert_layer_features']['culvert']["json"],"culvert_id":culvert_id,"icon_id":'idot_sedanalysis_dir_img'}); 
			/*
			var data=DSS_culvert_layer_features[culvert]["json"];
			function show_culvert_dir(){
				
			}*/
			map.setZoom(19);
			
			
			
			
			
			
		}//end of leaflet draw function	
		function idot_get_culvert_direction(options){
			var dir_data=options["culvert_data"];
			var img_id=options["icon_id"];
			var culvert_id=options["culvert_id"];
			var correct_culvert_dir_data;
			
			if(dir_data.hasOwnProperty("features")){
				
				for(var each_record in dir_data["features"]){
					
					
					//console.log(dir_data["features"][each_record]['stru_code']+" "+culvert_id);
					
					if(dir_data["features"][each_record]["properties"]['stru_code']==culvert_id){
						correct_culvert_dir_data=dir_data["features"][each_record]["properties"]["dirmean"]
					}
				}//end of for loop
			}//check if the data is correct
			var link=dirction_icon(correct_culvert_dir_data);
			$("#"+img_id).attr("src",link);
			console.log("#"+img_id);
			
					function dirction_icon(d){					
						  var pic=0;
								d >= 345  ? pic=0 :
								d >= 315  ? pic=330 :
							   d >= 285   ? pic=300 :
								d >= 255  ? pic=270   :           
							   d >= 225  ? pic=240 :	  
							   d >= 195  ? pic=210   :           
							   d >= 165  ? pic=180 :
							   d >= 135   ? pic=150 :
							   d >= 105  ? pic=120   :           
							   d >= 75  ? pic=90 :
							   d >= 45   ? pic=60 :
							   d >= 15   ? pic=30 :
							   d > 0   ? pic=0 :
										  pic='n'; 
						if(pic=='n'){					
						}
						console.log('data/dss/IDOT/state_data/direction_lable_s/A'+pic+'.png');
						return 'data/dss/IDOT/state_data/direction_lable_s/A'+pic+'.png';						
						 }
		}//end of culvert direction
		
		
		
		
		
		
		
		
		function cal_lengeh_property_action(culvert_id){
			var btn_id="cal_geometry";
			console.log(btn_id);
			$(document).on('click','#'+btn_id,function(){
				if(window["idot"]['culvert_sed_ana'].hasOwnProperty(culvert_id)){
					if(window["idot"]['culvert_sed_ana'][culvert_id]["drawnItems"].hasOwnProperty("_layers")){
						var layer=window["idot"]['culvert_sed_ana'][culvert_id]["drawnItems"]["_layers"];
						var temp_result={};
						var cum_upstream=0;
						var num_upstream=0;
						var cum_downstream=0;
						var num_downstream=0;
						var cum_culvert=0;
						var result_feature_collection={"type": "FeatureCollection","features": [],"culvert_id":culvert_id.toString()};
						for(var each_layer in layer){							
							var shape_type=layer[each_layer]["properties"]["shape_type"];							  
							coord_to_json(layer[each_layer],result_feature_collection);	
							
							var data_actions={
								"polyline":function(each_layer){
								temp_result[each_layer]={"geom":"polyline","Location":layer[each_layer]["properties"]["location"],"line_length":leaflet_polyline_cal_distance(layer[each_layer]).toFixed(2)+"m","latlngs":layer[each_layer]['_latlngs'],"SRID":"4326"};	
								if(layer[each_layer]["properties"]["location"]=="culvert"){
									cum_culvert+=Number(leaflet_polyline_cal_distance(layer[each_layer]));
								}
								if(layer[each_layer]["properties"]["location"]=="upstream"){
									cum_upstream+=Number(leaflet_polyline_cal_distance(layer[each_layer]));
									num_upstream++;
								}
								if(layer[each_layer]["properties"]["location"]=="downstream"){
									cum_downstream+=Number(leaflet_polyline_cal_distance(layer[each_layer]));
									num_downstream++;
								}
								},
								"polygon":function(each_layer){
									temp_result[each_layer]={"geom":"polygon","Location":layer[each_layer]["properties"]["location"],"shape_area":leaflet_polyline_cal_distance(layer[each_layer]).toFixed(2)+"m","latlngs":layer[each_layer]['_latlngs'],"SRID":"4326"};	
									},	
							};
							data_actions[shape_type](each_layer);
													
						}//end of for loop	
						//console.log(result_feature_collection);
						    var culvert_length=idot_get_culvert_properties_from_json({'culvert_data':window['DSS_culvert_layer_features']['culvert']["json"],"culvert_id":culvert_id,"pk":"stru_code"}); 
							console.log(culvert_length);
													
								cum_culvert=culvert_length["structure_length"]/10;	
							
							var result;
							if(cum_upstream!=0){
								result=((cum_upstream/num_upstream)/cum_culvert).toFixed(3);
							}else{
								result=((cum_downstream/num_downstream)/cum_culvert).toFixed(3);
							}
							console.log("culvert width  "+culvert_length["structure_length"]/10);
						    
							temp_result["STC"]={"avg_stc":result};
							result_feature_collection["stc"]=temp_result["STC"];
							result_feature_collection["culvert_width"]=culvert_length["structure_length"]/10;
					}} 
					
					//console.log(temp_result);
					result_display(temp_result,result_feature_collection);
					
			});	//end of click event
			
			
			
			
			
								
			function coord_to_json(layer,result_json){
				var geom_type=layer["properties"]["shape_type"];
				var properties=layer["properties"];
				var coordinates=layer["_latlngs"];

				
				
				parsed_coord={
					"polyline":[],
					"polygon":[[]],
				};
				
				for(var each_coord in coordinates){
					
					var parsed_coord_action={
					"polyline":function(coordinates){
						
						parsed_coord[geom_type].push([coordinates[each_coord]["lng"],coordinates[each_coord]["lat"]]);
						
					},
					"polygon":function(coordinates){
						
						parsed_coord[geom_type][0].push([coordinates[each_coord]["lng"],coordinates[each_coord]["lat"]]);
						
						
						
					},
					
					};
					parsed_coord_action[geom_type](coordinates);
				}//end of for loop
				if(geom_type=="polygon"){ 
					parsed_coord[geom_type][0].push(parsed_coord[geom_type][0][0]);
				
				}
				
				var geom_types={
					"polyline":"LineString",					
					"polygon":"Polygon",					
				};
				var json_struction={
						  "type": "Feature",
						  "geometry": {
							"type": geom_types[geom_type],
							"coordinates": parsed_coord[geom_type],
						  },
						  "properties": properties
						}
				json_struction["properties"]["line_length_meter"]=leaflet_polyline_cal_distance(layer).toFixed(2);
				
				
				result_json["features"].push(json_struction);
				//console.log(json_struction);
				//console.log(JSON.stringify(json_struction));
				
				
			}//end of json function
			 
		}

		function result_display(result_json,export_json){
			var html_text='';
			$("#idot_sed_analysis_result").html("");
			for(var each in result_json){
				
				if(each!="STC"){
					if(result_json[each]['geom']=="polyline"){
						html_text+=result_json[each]['Location']+" - Width: "+result_json[each]['line_length']+"<br>";	
					}
					
					if(result_json[each]['geom']=="polygon"){
						html_text+=result_json[each]['Location']+" - Sediment Area<br>";	
					}
				}
				if(each=="STC"){
					html_text+="Average Stream-To-Culvert (STC) ratio: "+result_json[each]['avg_stc'];	
				}
							
			}
			var idot_export_sediment_analysis="<p><button class='form-control btn btn-primary' type='button' data-toggle='collapse' id='idot_sed_analysis' >Save Record</button></p>";//+description; 
			html_text+=idot_export_sediment_analysis;
			$("#idot_sed_analysis_result").html(html_text);
			
			
			$("#idot_sed_analysis").click(function(e){	
					var r = confirm("Are u sure to post the data to server?");
					if (r == true) {
						export_sed_analysis_geojson(export_json,"post");	
					}		
			});
			
			function export_sed_analysis_geojson(json_data,action){
					
					 
				var action_list={
					"export":function(){
							var url = 'data:text/json;charset=utf8,' + encodeURIComponent(JSON.stringify(json_data));
							window.open(url, '_blank');
							window.focus();			
					},
					"post":function(){
						$.post("assets/php/iowa_culvert/post_sed_analysis.php",{
								json_data: JSON.stringify(json_data),
								culvert_id:json_data["culvert_id"],
								stc:json_data["stc"],
							},
							function(data, status){
								alert("The file is posted to the survey");
								console.log(data);
							});
						
					},	
				};
				action_list[action]();

					
				}// end of exporting routing machine
			
		}
		
		function leaflet_polyline_cal_distance(layer){
			var tempLatLng = null;
			var totalDistance = 0.00000;
			$.each(layer._latlngs, function(i, latlng){
				if(tempLatLng == null){
					tempLatLng = latlng;
					return;
				}

				totalDistance += tempLatLng.distanceTo(latlng);
				tempLatLng = latlng;
			});
		return totalDistance;
		//result is in meter
		}
		
}
function remove_all_draw(){
	for(var culvert_id in window["idot"]['culvert_sed_ana']){
		try {
					window["idot"]['culvert_sed_ana'][culvert_id]["drawControl"].removeFrom(map);
					map.removeLayer(window["idot"]['culvert_sed_ana'][culvert_id]["drawnItems"]);
		}
		catch(err) {
					console.log(err.message);
		}		
	}	
}



function idot_sed_analysis_leaflet_draw(options){ 
		var switch_id=options['switch_id'];
		
		$(document).on('switchChange.bootstrapSwitch','#'+switch_id,function(event, state){			
		var search_box_id=options['search_box_id'];
		
		var culvert_id=$("#each_culvert_id").html();		
			//console.log(culvert_id);		
		if(typeof(window["idot"]['culvert_sed_ana'][culvert_id])=='undefined'){
			window["idot"]['culvert_sed_ana'][culvert_id]={};	
			window["idot"]['culvert_sed_ana'][culvert_id]["drawnItems"]= new L.FeatureGroup();	
			console.log(window["idot"]['culvert_sed_ana'][culvert_id]);			
		
		
		window["idot"]['culvert_sed_ana'][culvert_id]["drawControl"] = new L.Control.Draw({				 
				draw: {
				position: 'topleft',
				marker:false,
				polygon: {
					title: 'Draw a polygon!',
					allowIntersection: false,
					showArea:true,
					drawError: {
						color: '#b00b00',
						timeout: 1000
					},
					shapeOptions: {
						color: '#ff9933'
					},
					showArea: true
				},
				polyline: {
					metric: true,
					zIndexOffset:2000,
				},
				circle: false,
				rectangle:false,
			},
			edit: {
					featureGroup: window["idot"]['culvert_sed_ana'][culvert_id]["drawnItems"]
				}				
				});		
				//console.log(L.drawLocal.draw.handlers.polyline.tooltip);
			
		}//end of contructing obj
		
		
					if(state==true){	
						map.addLayer(window["idot"]['culvert_sed_ana'][culvert_id]["drawnItems"]);					
						map.addControl(window["idot"]['culvert_sed_ana'][culvert_id]["drawControl"]);
						console.log(culvert_id);
						
						map.on('draw:created', function (e) {
							var type = e.layerType,
								layer = e.layer;
							
							layer["properties"]={"location":$("#idot_sedanalysis_leaflet_draw_culvert_location").val(),"description":$("#idot_sedanalysis_leaflet_draw_culvert_html").val()};
							layer["properties"]["culvert_id"]=culvert_id;
							get_satelite_imagery_name_time(layer["properties"]); 
							if (type === 'marker') {
								layer.bindPopup('A popup!');
							}
							if (type === 'polyline') {
								layer["properties"]["shape_type"]="polyline";
																
							}
							if (type === 'polygon') {
								layer["properties"]["shape_type"]="polygon";
								
							}
							
							window["idot"]['culvert_sed_ana'][culvert_id]["drawnItems"].addLayer(layer);
							
							//idot_sedanalysis_leaflet_draw_culvert_location
						});
						
					}
					if(state==false){			
						window["idot"]['culvert_sed_ana'][culvert_id]["drawControl"].removeFrom(map);
						map.removeLayer(window["idot"]['culvert_sed_ana'][culvert_id]["drawnItems"]);						
					}						 
		});
		
		function get_satelite_imagery_name_time(properties_obj){
			var satemap=[
				{"layer":baseMapsControl["Imagery Map 2011"],"name":"esri2011" },
				{"layer":baseMapsControl["Imagery Map 2013"],"name":"esri2013" },
			];
			
			for(var each_layer in satemap){
				if(map.hasLayer(satemap[each_layer]["layer"])){
					properties_obj["sate_map_src"]=satemap[each_layer]["name"];
				}				
			}

			
		}
		
	}
	
	function idot_get_culvert_properties_from_json(options){
			var dir_data=options["culvert_data"];			
			var culvert_id=options["culvert_id"];
			var match_field=options["pk"];
			var correct_culvert_data;			
			if(dir_data.hasOwnProperty("features")){				
				for(var each_record in dir_data["features"]){		
					
					//console.log(dir_data["features"][each_record]['stru_code']+" "+culvert_id);
					
					if(dir_data["features"][each_record]["properties"][match_field]==culvert_id){
						correct_culvert_data=dir_data["features"][each_record]["properties"]
					}
				}//end of for loop
			}//check if the data is correct
			return correct_culvert_data;
		}//end of culvert direction
	
