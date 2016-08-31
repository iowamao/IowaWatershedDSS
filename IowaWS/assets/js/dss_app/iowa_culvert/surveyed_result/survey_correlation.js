// JavaScript Document
// JavaScript Document
console.log("idot_correlation-loaded");

script_manager(["https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"]);
script_manager(["assets/js/utility/spin.min.js","assets/js/utility/simple_statics.js","assets/js/functionality/current_status_live_data.js"]);
window["idot_correlation_data"]={};


 var dss_app_settings_idot_correlation={
	 "sidebar_ui_html":"<div id='planningdss-idot_correlation_panel' class='panel-collapse collapse in'><div ><ul class='list-group'> <div><p style='color:#0493d3; font-weight: bold ' ><div class='panel panel-default'><div class='panel-heading'><h5 class='panel-title'>Matrix Criteria<button class='btn btn-xs btn-default pull-right' type='button' data-toggle='collapse' data-target='#idot_correlation_choose_scenario'><i class='glyphicon glyphicon-list'></i></button></h5 ></div> <div id='idot_correlation_choose_scenario' class='panel-collapse collapse'><div class='panel-body'> <form role='form' class='form'> <p><input id='idot_correlation_parameter' value='Blockage'  type='checkbox' name='idot-route-checkbox' data-size='mini' data-on-text='ON' data-off-text='OFF' > &nbsp; Show Blockage</p> <br> <p><input id='idot_correlation_para' 'disabled'='true' type='checkbox' name='idot-route-checkbox' data-size='mini' data-on-text='ON' data-off-text='OFF' > &nbsp; Show Data Correlation</p> <br> <p><input id='idot_correlation_gwr' value='StdResid'  type='checkbox' name='idot-route-checkbox' data-size='mini' data-on-text='ON' data-off-text='OFF' > &nbsp; Degree of Correlation</p> </form> </div></div></div></p></div> </ul></div></div>",
	 "sidebar_ui_title":"Sedimentation Matrix",
	 "app_btn_id":window["script_temp_data"],
	 "app_leaflet_layer":window["script_temp_data"]+"_leaflet_layers",
 }


var pcpdata = []; 


loading_sidebar( dss_app_settings_idot_correlation);
$("[name='idot-route-checkbox']").bootstrapSwitch(); 




var DSS_idot_correlation_styles ={	

"surveyed_culvert":{
"default":{	radius: 12,	fillColor: "#ff0000",color: "#ff0000 ",weight: 1,opacity: 0.01,	fillOpacity: 0.01},
"hover":{radius: 12,weight: 1,	opacity: 1,	fillOpacity: 0.01},
"default_invisible":{	radius: 4,	fill: false , stroke:false , fillColor: "#FF99FF",color: "#000 ",weight: 1,	opacity: 1,	fillOpacity: 1},
"find_usgs_streamflow_highlight":{radius: 5,	fillColor: "#FFFF00 ",	color: "#FF0000 ",	weight: 2,	opacity: 1,	fillOpacity: 1         },
"visible":{	fill: true , stroke:true , },
"invisible":{	fill: false , stroke:false, weight: 5,radius: 4,opacity: 1 },
},
"sub_basin":{
"default":{	weight: 2, opacity: 1, color: 'white',  dashArray: '3',  fillOpacity: 0.3,stroke:true,	fill:true},	
"default_invisible":{	stroke:false,fill:false	},	
},
};




var DSS_idot_correlation_layer_features={
"surveyed_culvert":{
"default_style":DSS_idot_correlation_styles.surveyed_culvert["invisible"],
"default_layer":"yes",
"geometery_type":"circular_marker",
"layer_group":dss_app_settings_idot_correlation["app_leaflet_layer"],
//"bringtofront":"yes",
"url":"data/dss/IDOT/state_data/geo_json/culvert_surveyed.json",
"onEachFeature":function (feature, layer){
leaflet_json.feature_highlight_lite(layer,feature,DSS_idot_correlation_styles.surveyed_culvert['hover']);
//idot_correlation_ifis_trace(layer,feature,DSS_idot_correlation_styles.sub_basin["default"]);
//idot_correlation_bind_usgs_streamflow_popup(layer,feature);

},
},
};// end of feature layer object




leaflet_map_control.Layer_initialization(map,DSS_idot_correlation_layer_features);



/*
$( document ).ajaxComplete(function( event, xhr, settings ) {  
	
  if ( settings.url == DSS_idot_correlation_layer_features.surveyed_culvert.url ) {	
  var combine_scenario_name=idot_correlation_scenario_name_control_by_combine_field({'class_name':this.class,'control_field':'','filter':'','input_combination':["idot_correlation_parameter"]});  // THis function uses parallel structure to visualize usgs_streamflow by the year of built
  point_bar_visualization(DSS_idot_correlation_layer_features["surveyed_culvert"]["json"],combine_scenario_name,"display_bars"); //temperately put in here
  

  }  
  
  
});

*/
$("#idot_correlation_para").bootstrapSwitch('disabled',true);   //original should be disabled
$("#idot_correlation_parameter").on('switchChange.bootstrapSwitch', function(event, state) { 

var visualization_parapmeter_upstream=$("#idot_correlation_parameter").val();
if(state==true){  
point_bar_visualization(DSS_idot_correlation_layer_features["surveyed_culvert"]["json"],visualization_parapmeter_upstream,"display_bars"); //temperately put in here	
$("#idot_correlation_para").bootstrapSwitch('disabled',false);

 }else{point_bar_visualization(DSS_idot_correlation_layer_features["surveyed_culvert"]["json"],visualization_parapmeter_upstream,"hide_bars"); //temperately put in here	
$("#idot_correlation_para").bootstrapSwitch('disabled',true); 
	 
 }
});
/*
$(document).on('change','#idot_correlation_parameter',function(){// scenario combination changes
var visualization_parapmeter_upstream=$("#idot_correlation_parameter").val();
if(visualization_parapmeter_upstream!="null"){
point_bar_visualization(DSS_idot_correlation_layer_features["surveyed_culvert"]["json"],visualization_parapmeter_upstream,"display_bars"); //temperately put in here	
$("#idot_correlation_para").bootstrapSwitch('disabled',false);
}else{
	point_bar_visualization(DSS_idot_correlation_layer_features["surveyed_culvert"]["json"],visualization_parapmeter_upstream,"hide_bars"); //temperately put in here	
$("#idot_correlation_para").bootstrapSwitch('disabled',true);
}

	
});// end of on change event
*/	
$("#idot_correlation_gwr").on('switchChange.bootstrapSwitch', function(event, state) { 
var culvert_gwr_color_coding={
		"standard_error":function(feature_properties_value){
       
		var color = feature_properties_value > 2.5  ? '#ff0302' :
			   feature_properties_value > 1.2   ? '#ff3b00' :
			   feature_properties_value > 0.5   ? '#ff8600' :
			   feature_properties_value > 0.1   ? '#ffbb00' :
			   feature_properties_value > -0.1   ? '#fcff00' :
			   feature_properties_value > -0.5   ? '#8dcf72' :
			   feature_properties_value > -1.5   ? '#51a5ad' :
			   feature_properties_value > -2.5   ? '#0084ff' :   
						  false;		

		return {"color":color,"stroke":true}
			
	},
	"null":function(feature_properties_value){  
		return {"stroke":false}
			
	},
};
var visualization_parapmeter=$("#idot_correlation_gwr").val();

if(state==true){  
leaflet_external_color_coding({"layer":window[dss_app_settings_idot_correlation["app_leaflet_layer"]]["surveyed_culvert"],"scenario_name":visualization_parapmeter,"color_function":culvert_gwr_color_coding["standard_error"]});
		leaflet_legend([[-2.5,"#0084ff"],[-1.5,"#51a5ad"],[-0.5,"#8dcf72"],[-0.1,"#fcff00"],[0.1,"#ffbb00"],[0.5,"#ff8600"],[1.5,"#ff3b00"],[2.5,"#ff0302"]],'<h5>Standard Error</h5>','',dss_app_settings_idot_correlation["app_btn_id"]+' function_panel');

 }else{
	 
leaflet_external_color_coding({"layer":window[dss_app_settings_idot_correlation["app_leaflet_layer"]]["surveyed_culvert"],"scenario_name":visualization_parapmeter,"color_function":culvert_gwr_color_coding["null"]});
		//$(".surveyed_culvert_baseflow_panel").remove();
		leaflet_legend([],'<h5>Standard Error</h5>','',dss_app_settings_idot_correlation["app_btn_id"]+' function_panel');
	 
 }
});


 



function idot_correlation_ifis_trace(layer,feature,style){
	layer.on('mouseover', function (e) {

		var lng = feature.geometry.coordinates[0];
		var lat = feature.geometry.coordinates[1];
	  ifis_ws_search(map,style,lat, lng, 500,"fix","9x9"); 

	});
	
	layer.on('mouseout', function (e) {
		window["ifis_search_result"].clearLayers();

	});
	
	
//instant_watershed(e.latlng.lat,e.latlng.lng,500,"");
}









	

/*-----------------------------------------------------------idot_correlation_Functions-------------------------------------------------*/

	
function usgs_streamflow_scenario_style_control_by_matching_ppt(event_option_obj,leaflet_layer,style_obj){  // THis function uses parallel structure to visualize usgs_streamflow by the year of built
//API:usgs_streamflow_scenario_style_control_by_matching_ppt({"class_id":"","matching_value":"","matching_field":""},leaflet_layer,{"pass_filter":""})

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
//idot_correlation_scenario_name_control_by_combine_field({'class_name':'','control_field':'','filter':'','input_combination':[]});
function idot_correlation_scenario_name_control_by_combine_field(event_option_obj){  // THis function uses parallel structure to visualize usgs_streamflow by the year of built

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

		function idot_correlation_feature_autocomplete(leaflet_layer,dom_element){

					var drop_down_id=dom_element["drop_down_id"];
					var search_box_id=dom_element["search_box_id"];							

					$(document).on('change','#'+drop_down_id,function(){
						
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
								

								
									
									auto_complete_list[properties_name].push(layer[a]['feature']['properties'][properties_name]);
								
								
							}
					 // obj[key].setStyle(style_obj);
					}	
					}// end of for loop in option array

					  var search_method=$("#"+drop_down_id).val();
					  

					//#search_usgs_streamflows 

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
						if($("#show_usgs_streamflow").val()!="null"&&$("#search_method").val()!="null"){
							
							if($("#"+search_box_id).val()=="Specify..."){

								$("#"+search_box_id).val("");
							}
							
						}else{
							alert("Please specify usgs_streamflow scenario and search method");
						}
						
					});
					$(document).on('click','.tt-dropdown-menu',function(){

						
						//usgs_streamflow_scenario_style_control_by_matching_ppt({"matching_value":$("#"+search_box_id).val(),"matching_field":$("#"+drop_down_id).val()},leaflet_layer,{"pass_filter":DSS_idot_correlation_styles .usgs_streamflow["find_usgs_streamflow_highlight"]});
						
						usgs_streamflow_scenario_style_control_by_matching_ppt({"matching_value":$("#"+search_box_id).val(),"matching_field":$("#"+drop_down_id).val()},leaflet_layer,{"pass_filter":DSS_idot_correlation_styles .usgs_streamflow["find_usgs_streamflow_highlight"],"un_pass_filter":DSS_idot_correlation_styles .usgs_streamflow["default"]});
						
					});	
		}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/






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

function point_bar_visualization(input_json,scenario_name,display_setting){
	
		var dss_panel_holder_id= dss_app_settings_idot_correlation["app_btn_id"]+"_panel";
		
		var frame_class=dss_panel_holder_id+"frame_bar";
		var value_class=dss_panel_holder_id+"value_bar"; 
		
		if(display_setting=="hide_bars"){
				$( "."+frame_class ).remove();
				$( "."+value_class ).remove();
				return false;				
		}
		/*
		var scenario_name_null_check= scenario_name.split("_");
		for(var sc=0;sc<scenario_name_null_check.length;sc++){
		if(scenario_name_null_check[sc]=='null'){

		return false;
		 }
		}*/

		//layer.setstyle(DSS_idot_correlation_styles .usgs_streamflow['default_invisible']); //map.removeLayer(usgs_streamflow_loaction);

		$( "."+frame_class ).remove();
		$( "."+value_class ).remove();	
		var value_percentage_name=scenario_name;
		var total_bar_height=30;
		// d3.json(datalink, function(collection) {  //import data from other sources
		  // Add a LatLng object to each item in the dataset
		  

		var collection=input_json;
		var recolorMap = colorScale(collection.features,value_percentage_name);
		var key = "upstream_area"; //used for each geom id
		    
			//add Iowa regions geometry to map
			var transform = d3.geo.transform({point: projectPoint}),
			path = d3.geo.path().projection(transform);

			
		
		attNames=["Blockage","rusle_mean","Urban","Forest","Farm","Group_A","STC","upstream_area"];
		paracor_title={		
			"Blockage":"Percentage of Blockage",
			"rusle_mean":"Upstream Soil Loss",
			"Urban":"Percentage of Upstream Urban",
			"Forest":"Percentage of Upstream Forest",
			"Farm":"Percentage of Upstream Farm",
			"Group_A":"Percentage of Good Drainage Soil",
			"STC":"Stream to Culvert Ratio",
			"upstream_area":"Upstream Area (Counts)",
			};
		
		
		collection.features.forEach(function(d) {	
		      d.LatLng = new L.LatLng(d.geometry.coordinates[1],
			  d.geometry.coordinates[0])		  
		  })
		  
		  
		
		
		
		var collection2= jQuery.extend(true, {}, collection);  // must copy like this
		paracoord(collection2,paracor_title);	
		
		var svg = d3.select("#map").select("svg");		
		 var g_frame = svg.append("g").attr("class", frame_class+" function_panel leaflet-zoom-hide "+dss_panel_holder_id);
		 var g_value = svg.append("g").attr("class", value_class+" function_panel leaflet-zoom-hide "+dss_panel_holder_id);		
		  
			var bar = g_frame.selectAll("rect")
		   .data(collection.features)
		   .enter().append("rect")
		   .attr("id", function(d) {
			return "frame_"+d.properties[key]})			
		   .attr("width",5)
		   .attr("height",total_bar_height)		  
		   .attr("fill","white")	   
		   .attr("stroke-width", 1);
		   

		  

		   
			var value = g_value.selectAll("rect")
		   .data(collection.features)
		   .enter().append("rect")
		   .attr("id", function(d) {
			return "id"+d.properties[key]})
		   .attr("width",3)
		   .attr("d", path) //project data as geometry in svg 
		   .attr("height",function(d) { 
					//console.log(total_bar_height*d.properties[value_percentage_name]);
					
				if(d.properties[value_percentage_name]<1){
					return total_bar_height*d.properties[value_percentage_name];
				}else{
					return total_bar_height*d.properties[value_percentage_name]/100;
				}
				   
			
			   })			   
			.attr("fill", function(d) { //color enumeration units
				
			  return choropleth(d, recolorMap,value_percentage_name);
			});
			//.on("mouseover", test)
			//.on("mouseout", dehighlight);
			 /*  
		   .attr("fill",function(d) { 		   
		  return getColor_double_variables(d.properties[value_percentage_name],visualization_variable);   
		   });*/
		   function test(){
			   console.log(this);
			   
		   }
		   
		   function highlight_trace(){		
				//console.log(feature);
				var lng = feature.geometry.coordinates[0];
				var lat = feature.geometry.coordinates[1];
				ifis_ws_search(map,DSS_idot_layer_styles.sub_basin["default"],lat, lng, 500,"fit","9*9");
				if($("#watershed_search").bootstrapSwitch('state')==true){
					iowa_culvert_cal_discharge({'layer':window["ifis_search_result"],'display_id':"discharge_result"});	
				}	
			}
			 function de_highlight_trace(){
				window["ifis_search_result"].clearLayers();
				window["idot"]["culvert_mask"].setStyle({radius: 8,	weight: 2,	opacity: 0.01,	fillOpacity: 0.01});
			}
		   
	 
	 
		  
		  map.on("viewreset", update);
		  update();
		  
		  
		  
		  //var recolorMap = colorScale(jsonData.features);
		 
		 var format = d3.format(".4n"), scale = d3.scale.linear().domain(
        [ -10, 20, 1000 ]).range([ 0, 800, 1000 ]);		
		
		 
	
		
		
		
		function paracoord(paracor_data,paracor_title){
					$("#idot_correlation_para").unbind('switchChange.bootstrapSwitch');
					var pcpdata=[];
					paracor_data.features.forEach(function(d){
					  //attribute names are derived from properties of the first json object
					  // so that the dropdown list could be populated
					  for (var k in d.properties){						  
						  if(attNames.indexOf(k) == -1){
							 delete d.properties[k] 
						  }
						  k=paracor_title[k];
					 
						  
							}						
						 
					  tempProperties = d.properties;
					  pcpdata.push(d.properties);
					});
					
					expressed = attNames[0];
		$("#idot_correlation_para").on('switchChange.bootstrapSwitch', function(event, state) { 	
		if(state==true){			
					leaflet_l("<div id='paracoord'  class='parcoords' style='500px;height:220px'></div>","","idot_correlation_panel");
					
					$.getScript( "assets/js/leaflet_extension/d3.parcoords.js", function( data, textStatus, jqxhr ) {
									var pcp = d3.parcoords()("#paracoord").data(pcpdata).color(function(d) {
								  //if value exists, assign it a color; otherwise assign gray
								  if (d[expressed]) {
									return recolorMap(d[expressed]); //recolorMap holds the colorScale generator
								  } else {
									return "#ccc";
								  };
								}).render().brushable().on("brush", function(items) {
								  var selected = items.map(function(d) {
									
									return d[key];
								  });
								  value.style("opacity", 0.05).filter(function(d) {
									
									return selected.indexOf(d.properties[key]) > -1;
								  }).style("opacity", 1);
							   
								
								bar.style("opacity", 0.05).filter(function(d) {
									
									return selected.indexOf(d.properties[key]) > -1;
								  }).style("opacity", 1);
								});	
					});
						
		}else{
			$(".idot_correlation_panel").remove();					
		}		
		});		
		}
		
		
		
       
		  
		  
		function reset() {
        var bounds = path.bounds(jsonData),
        topLeft = bounds[0],
        bottomRight = bounds[1];

        svg.attr("width", bottomRight[0] - topLeft[0])
        .attr("height", bottomRight[1] - topLeft[1])
        .style("left", topLeft[0] + "px")
        .style("top", topLeft[1] + "px");

        g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

       
      }

      // Use Leaflet to implement a D3 geometric transformation.
      function projectPoint(x, y) {
        var point = map.latLngToLayerPoint(new L.LatLng(y, x));
        this.stream.point(point.x, point.y);
      }
	 

    function colorScale(features){

      //create quantile classes with color scale
      var color = d3.scale.quantile() //designate quantile scale generator
      .range(initialColors);

      //build array of all currently expressed values for input domain
      var domainArray = [];

      for (var a=0; a<features.length; a++){
        domainArray.push(Number(features[a].properties[expressed]));
      }

      //pass array of expressed values as domain
      color.domain(domainArray);

      return color;	 //return the color scale generator
    };

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

    function changeAttribute(attribute, jsonData){
      //change the expressed attribute
      expressed = attribute;
      var recolorMap = colorScale(jsonData.features);

      //recolor the map
      d3.selectAll(".regions")//select every region
      .style("fill", function(d) { //color enumeration units
        return choropleth(d, recolorMap); //->
      }).style("opacity", 1)
      .select("desc") //replace the color text in each region's desc element
      .text(function(d) {
        return choropleth(d, recolorMap); //->
      });

      //remove the previous pcp so that they are not drawn on top of each other
      d3.select("#paracoord").selectAll("*").remove();
      var pcp = d3.parcoords()("#paracoord").data(pcpdata).color(function(d) {
        //if value exists, assign it a color; otherwise assign gray
        if (d[expressed]) {
          return recolorMap(d[expressed]); //recolorMap holds the colorScale generator
        } else {
          return "#ccc";
        };
      }).render().brushable().on("brush", function(items) {
        var selected = items.map(function(d) {
          return d[key];
        });
        value.style("opacity", 0.2).filter(function(d) {
          return selected.indexOf(d.properties[key]) > -1;
        }).style("opacity", 1);
      });

    };

    function format(value){

      //format the value's display according to the attribute
      if (expressed != "Population"){
        value = "$"+roundRight(value);
      } else {
        value = roundRight(value);
      };

      return value;
    };

    function roundRight(number){

      if (number>=100){
        var num = Math.round(number);
        return num.toLocaleString();
      } else if (number<100 && number>=10){
        return number.toPrecision(4);
      } else if (number<10 && number>=1){
        return number.toPrecision(3);
      } else if (number<1){
        return number.toPrecision(2);
      };
    };

    function highlight(data){

      var props = data.properties; //json properties
      // d3.selectAll("#id"+props[key]) //select the current region in the DOM
      // .style("fill", "#000"); //set the enumeration unit fill to black
	  var value = parseFloat(Math.round(props[expressed] * 1000) / 1000).toFixed(3)
      var labelAttribute = "<h1>"+value+
      "</h1><br><b>"+expressed+"</b>"; //label content
      var labelName = props[key] //html string for name to go in child div

      // d3.select("#info-label").selectAll("*").remove();
      //create info label div
	  /*
      var infolabel = d3.select("#info-label")
      .append("div") //create the label div
      .attr("class", "infolabel")
      .attr("id", props[key]+"label") //for styling label
      .html(labelAttribute) //add text
      .append("div") //add child div for feature name
      .attr("class", "labelname") //for styling name
      .html(labelName); //add feature name to label*/
    };

    function dehighlight(data){

      var props = data.properties; //json properties
      //var region = d3.selectAll("#id"+props[key]); //select the current region
      // var fillcolor = region.select("desc").text(); //access original color from desc
      // region.style("fill", fillcolor); //reset enumeration unit to orginal color

      d3.select("#id"+props[key]+"label").remove(); //remove info label
      d3.select("#info-label").selectAll("*").remove();
    };

    function moveLabel() {

      var x = d3.event.clientX+10; //horizontal label coordinate based mouse position stored in d3.event
      var y = d3.event.clientY-75; //vertical label coordinate
      d3.select(".infolabel") //select the label div for moving
      .style("margin-left", x+"px") //reposition label horizontal
      .style("margin-top", y+"px"); //reposition label vertical
    };
		  
		  
		  
		  function update(){
			
					// zoom: 11,
					var scale = 2*(map.getZoom()/11);
					if(map.getZoom()<=12){
						scale = 1;
					}
					//console.log(1.5*map.getZoom());
				//	console.log(scale);
					  
				bar.attr("transform", function(d) { 
					   return "translate("+ 
					map.latLngToLayerPoint(d.LatLng).x +","+ 
					(map.latLngToLayerPoint(d.LatLng).y-Number(scale*total_bar_height)) +")";
					   }
				   )
				   
				bar.attr("height",total_bar_height*scale);
				value.attr("height",function(d) {	
					 if(d.properties[value_percentage_name]<1){
							return total_bar_height*d.properties[value_percentage_name]*scale;
						}else{
							return total_bar_height*d.properties[value_percentage_name]*scale/100;
						}
					   
					   })
				   
				value.attr("transform", 
				function(d) {    
				   var value_bar_height_offset;
						
					// value_percentage_name=precipitation+'_e';
					 
					 if(d.properties[value_percentage_name]<1){
							value_bar_height_offset= total_bar_height*d.properties[value_percentage_name]*scale;
						}else{
							value_bar_height_offset= total_bar_height*d.properties[value_percentage_name]*scale/100;
						}

					 return "translate("+ 
					(map.latLngToLayerPoint(d.LatLng).x+1) +","+ 
					(map.latLngToLayerPoint(d.LatLng).y-Number(value_bar_height_offset)) +")";
				})
				  
		   
		  }		  
			
		
			//setTimeout(function(){ GEN_change_layer_style_externally(window[dss_app_settings_idot_correlation["app_leaflet_layer"]].usgs_streamflow,{fill:false,stroke:false});}, 100);
					
			
			
		function colorScale(features,expressed){	
			  var keyArrayToColor={
				"Urban":[
					"#F203FF",
					"#C323FF",
					"#8051FF",
					"#4778FF",
					"#0D9FFF"
			  ],
				"Forest":[
					"#66ff99",
					"#1aff66",
					"#00cc44",
					"#00802b",
					"#003311"
				  ],
			    "Farm":[
					"#fffae6",
					"#fff0b3",
					"#ffe680",
					"#ffdb4d",
					"#ffcc00"
				  ],
				 "Group_A":[
					"#F203FF",
					"#C323FF",
					"#8051FF",
					"#4778FF",
					"#0D9FFF"
				  ],	
				  "Blockage":[
					"#ffe6e6",
					"#ff9999",
					"#ff4d4d",
					"#ff0000",
					"#b30000"
				  ],
				  "rusle_mean":[
					"#ffe6cc",
					"#ffc180",
					"#ff901a",
					"#b35c00",
					"#4d2800"
				  ],
				  "upstream_area":[
					"#ffe6e6",
					"#ff9999",
					"#ff4d4d",
					"#ff0000",
					"#b30000"
				  ],
				   "STC":[
					"#ffe6e6",
					"#ff9999",
					"#ff4d4d",
					"#ff0000",
					"#b30000"
				  ]
				  
				  
			}
			  //create quantile classes with color scale
			  var color = d3.scale.quantile() //designate quantile scale generator
			  .range(keyArrayToColor[expressed]);
			  
			  //build array of all currently expressed values for input domain
			  var domainArray = [];

			  for (var a=0; a<features.length; a++){
				domainArray.push(Number(features[a].properties[expressed]));
								
			  }

			  //pass array of expressed values as domain
			  color.domain(domainArray);
		
	
			  
			   
			   var legend_data=[];
			
			   var color_ramp_num=[]
			   for(var a in color.quantiles()){
				   color_ramp_num.push(color.quantiles()[a].toFixed(2));
			   }
			   
			   
			   var max = Math.max(...keyArrayToColor[expressed]);
			   console.log(color_ramp_num);
			   color_ramp_num.push(max.toFixed(2));			   
			   for(var each_color_index in color_ramp_num){
				   legend_data.push([color_ramp_num[each_color_index],keyArrayToColor[expressed][each_color_index]]);
			   }
			   
			   leaflet_legend(legend_data,'<h5>Percentage of Blockage</h5><h6></h6>','',dss_panel_holder_id+' function_panel');
			   
			  
			  return color;	 //return the color scale generator
			};	
		function choropleth(d, recolorMap,expressed){

		  //get data value
		  
		  var value = d.properties[expressed];
		  //if value exists, assign it a color; otherwise assign gray
		  if (value) {
			return recolorMap(value); //recolorMap holds the colorScale generator
		  } else {
			return "#ccc";
		  };
		};			
	}// end of the 3D plotting









