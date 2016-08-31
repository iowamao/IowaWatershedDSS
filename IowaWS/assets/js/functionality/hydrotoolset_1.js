// JavaScript Document
//require script fist to load all app
//The nature of this script is "config", so all function are generated inside of it
script_manager(["assets/js/utility/plotting.js","assets/js/functionality/ifis_watershed.js"]);	



 

 var dss_app_settings_hydro_tool={
	 "calculate_discharge":{
	 "sidebar_ui_html":'<div id="tools_search" class="panel-collapse collapse in"><div class="panel-body"><p style="color:#0493d3; font-weight: bold" ><input id="eash_watershed_search" type="checkbox" name="search-checkbox" data-size="mini" data-on-text="ON" data-off-text="OFF" >&nbsp;Enable Search</p><p style="color:#0493d3; font-weight: bold"><br> <label for="discharge_result">Discharge Calculation (cfs):</label> <div id="discharge_result" style="height:200px;" class="form-control" rows="8"></div> <br><button id="culvert_hydro-clear_search" class="form-control btn btn-primary" > &nbsp;Clear Result&nbsp; </button></p></div></div>',
	 "sidebar_ui_title":"Discharge Estimation",
	 "app_btn_id":"culvert_hydraulics-calculate_discharge",
	 "app_leaflet_layer":"main",//window["script_temp_data"]+"_leaflet_layers",
	 "panel_id":"culvert_hydraulics-calculate_discharge_panel", //this is for configure only
	 },
 };
var function_btn_event_list={	
	"calculate_discharge":{
			//the order of this does matters as it is referenced in the corresponding script
			"name":"Estimate Discharge",
			"btn_id":dss_app_settings_hydro_tool["calculate_discharge"]["app_btn_id"],
			"dss_script":[], 
			"event":function(){
						
						loading_sidebar(dss_app_settings_hydro_tool["calculate_discharge"]);
						
						$("#eash_watershed_search").bootstrapSwitch(); 
						
						culvert_hydraulic_discharge_event();
	
				
			},			
			},//end of the first btn
	
	
}

var tool_set_plugin_spec={
		"planning_category_Tool":[
			function_btn_event_list["calculate_discharge"],
		],	
	};
	
	
parse_app_btn_event(tool_set_plugin_spec);		


var Huc_ws_trace_style={
	            fill:true,
				stroke:"#0066FF",
				weight: 1,
				opacity: 0.5,
				color: '#0066FF',
				fillOpacity: 0.02	
						};

function culvert_hydraulic_discharge_event(){	
		
	map.on('click', function(e) {		
		
			if($("#eash_watershed_search").bootstrapSwitch('state')==true){
	
			 console.log($("#eash_watershed_search").val());
			 
				window["ifis_search_result"].clearLayers();	


				
		
				//instant_watershed(map,Huc_ws_trace_style,e.latlng.lat,e.latlng.lng, 500,"fit");
			    ifis_ws_search(map,Huc_ws_trace_style,e.latlng.lat,e.latlng.lng,500,"fit","single_search"); 
				
				iowa_culvert_cal_discharge({'layer':window["ifis_search_result"],'display_id':"discharge_result"});
				
				//layer:window["ifis_search_result"],display_id:
			}
		
	});	//end of map click
		
	 $(document).on("click","#culvert_hydro-clear_search",function() {
		window["ifis_search_result"].clearLayers();	
        $("#discharge_result").html("");	

	});
	
	$("#eash_watershed_search").on('switchChange.bootstrapSwitch', function(event, state) { 
	if(state==true){
		$('#map').css('cursor','crosshair');
	}else{
		
		$('#map').css('cursor','grab');
		$('#discharge_result').html("");
		
	}	
	});	  

	function iowa_culvert_cal_discharge(options){
		$("#"+result_box).html("");
		var result_ws_layer=options["layer"]
		var result_box=options["display_id"]
				 for(var each in result_ws_layer["_layers"]){
					 
					 
				 each_geom=result_ws_layer["_layers"][each]["_layers"];
				 
					var first_geom;
						for(var key in each_geom) {
							if(each_geom.hasOwnProperty(key)) {
								first_geom = each_geom[key];
								break;
							}
						}//end of inner for loop, identify only the first geom
						
				 //console.log(first_geom["feature"]);
				 $.ajax({
								  url : "assets/php/iowa_culvert/Eash_Lara.php?",							  
								  type: "post",
								  async: false,
								  dataType : 'json',
								  jsonpCallback: 'getJson',


								  data: {geom:JSON.stringify(first_geom["feature"])},
						success: function(data){
								   //console.log(data);							   
								   var result="Q2: "+data["Q2"].toFixed(2)+"<br>Q5: "+data["Q5"].toFixed(2)+"<br>Q10: "+data["Q10"].toFixed(2)+"<br>Q25: "+data["Q25"].toFixed(2)+"<br>Q50: "+data["Q50"].toFixed(2)+"<br>Q100: "+data["Q100"].toFixed(2)+"<br>Q200: "+data["Q200"].toFixed(2)+"<br>Q500: "+data["Q500"].toFixed(2);
								   $("#"+result_box).html(result);
							}
					});	//end of ajax	
			 }
	}	
}





						
						

/*

$(".planning_no_data_btn").remove();
var discharge_btn='<li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="culvert_hydraulics-calculate_discharge" class="sidebar-control generic_planning">&nbsp;&nbsp;Estimate Discharge</a></li>';
$(".planning_tab").append(discharge_btn);

$(".generic_planning").on("click",function() {
	
       var menu_click_id=this.id;
	  $(".function_panel").hide();
		if($('#'+menu_click_id+"_panel").length == 0) {
			
			$("#utility_panel").append(idot_dss_html[menu_click_id]);
			idot_dss_functions[menu_click_id]();
		}else{
			$('#'+menu_click_id+"_panel").remove();
		}
});


*/
