// JavaScript Document
console.log("usgs_baseflow-loaded");

script_manager(["https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"]);
script_manager(["assets/js/utility/spin.min.js","assets/js/utility/simple_statics.js","assets/js/functionality/current_status_live_data.js"]);
window["usgs_baseflow_data"]={};


 var dss_app_settings_usgs_baseflow={
	 "sidebar_ui_html":"<div id='planningdss-usgs_baseflow_panel' class='panel-collapse collapse in'><div ><ul class='list-group'> <div><p style='color:#0493d3; font-weight: bold ' ><div class='panel panel-default'><div class='panel-heading'><h5 class='panel-title'>usgs_streamflow Info<button class='btn btn-xs btn-default pull-right' type='button' data-toggle='collapse' data-target='#usgs_streamflow_info'><i class='glyphicon glyphicon-list'></i></button></h5 ></div> <div id='usgs_streamflow_info' class='panel-collapse collapse'><div class='panel-body'> <p> <form role='form' class='form'> <select id='usgs_baseflow_search_method' style='width:190px;' class='drop_down form-control'> <option value='null' selected='selected'>Search By...</option> <option value='site_code' >USGS Site Code</option> </select> <input type='text' id='usgs_baseflow_search_sensor' style='width:190px;' class='form-control typeahead' value=Specify...> </form> </p> </div></div></div></p></div> <div><p style='color:#0493d3; font-weight: bold ' ><div class='panel panel-default'><div class='panel-heading'><h5 class='panel-title'>Visualization Scenario<button class='btn btn-xs btn-default pull-right' type='button' data-toggle='collapse' data-target='#usgs_baseflow_choose_scenario'><i class='glyphicon glyphicon-list'></i></button></h5 ></div> <div id='usgs_baseflow_choose_scenario' class='panel-collapse collapse'><div class='panel-body'> <form role='form' class='form'> <select id='baseflow_seperation_method' class='form-control drop_down usgs_baseflow_scenario_visualization' style='width:190px;'> <option value='dfsp' selected='selected'>Digital Filter</option> </select> <select id='period' class='form-control drop_down usgs_baseflow_scenario_visualization' style='width:190px;'> <option value='10_p' selected='selected'>Past 10 years</option> <option value='20_p' >Past 20 years</option> </select> </form> <br style='margin: 25px 0; disply:block'> </div></div></div></p></div> </ul></div></div>",
	 "sidebar_ui_title":"Historic baseflow data",
	 "app_btn_id":window["script_temp_data"],
	 "app_leaflet_layer":window["script_temp_data"]+"_leaflet_layers",
 }


var pcpdata = [];


loading_sidebar( dss_app_settings_usgs_baseflow);




var DSS_usgs_baseflow_styles ={	

"usgs_streamflow":{
"default":{	radius: 12,	fillColor: "#ff0000",color: "#ff0000 ",weight: 1,opacity: 0.01,	fillOpacity: 0.01},
"hover":{radius: 12,weight: 1,	opacity: 1,	fillOpacity: 0.01},
"default_invisible":{	radius: 4,	fill: false , stroke:false , fillColor: "#FF99FF",color: "#000 ",weight: 1,	opacity: 1,	fillOpacity: 1},
"find_usgs_streamflow_highlight":{radius: 5,	fillColor: "#FFFF00 ",	color: "#FF0000 ",	weight: 2,	opacity: 1,	fillOpacity: 1         },
"visible":{	fill: true , stroke:true , },
"invisible":{	fill: false , stroke:false },
},
"sub_basin":{
"default":{	weight: 2, opacity: 1, color: 'white',  dashArray: '3',  fillOpacity: 0.3,stroke:true,	fill:true},	
"default_invisible":{	stroke:false,fill:false	},	
},
};




var DSS_usgs_baseflow_layer_features={
"usgs_streamflow":{
"default_style":DSS_usgs_baseflow_styles.usgs_streamflow["default"],
"default_layer":"yes",
"geometery_type":"circular_marker",
"layer_group":dss_app_settings_usgs_baseflow["app_leaflet_layer"],
//"bringtofront":"yes",
"url":"data/dss_tool/baseflow_speration/usgs_baseflow_sp.json",
"onEachFeature":function (feature, layer){
usgs_baseflow_sensor_popup_generation(feature,layer);
leaflet_json.feature_highlight_lite(layer,feature,DSS_usgs_baseflow_styles.usgs_streamflow['hover']);
usgs_baseflow_ifis_trace(layer,feature,DSS_usgs_baseflow_styles.sub_basin["default"]);
//usgs_baseflow_bind_usgs_streamflow_popup(layer,feature);
},
},
};// end of feature layer object




leaflet_map_control.Layer_initialization(map,DSS_usgs_baseflow_layer_features);




$( document ).ajaxComplete(function( event, xhr, settings ) {
	

	
  if ( settings.url == DSS_usgs_baseflow_layer_features.usgs_streamflow.url ) {
	
	
  var combine_scenario_name=usgs_baseflow_scenario_name_control_by_combine_field({'class_name':this.class,'control_field':'','filter':'','input_combination':["baseflow_seperation_method","period"]});  // THis function uses parallel structure to visualize usgs_streamflow by the year of built
  point_bar_visualization(DSS_usgs_baseflow_layer_features["usgs_streamflow"]["json"],combine_scenario_name,"display_bars"); //temperately put in here
  usgs_baseflow_feature_autocomplete(window[dss_app_settings_usgs_baseflow["app_leaflet_layer"]].usgs_streamflow,{"drop_down_id":"usgs_baseflow_search_method","search_box_id":"usgs_baseflow_search_sensor",});

  }
});





$(document).on('change','.usgs_baseflow_scenario_visualization',function(){// scenario combination changes
//usgs_baseflow_scenario_name_control_by_combine_field({'class_name':'','control_field':'','filter':'','input_combination':[]});
combine_scenario_name=usgs_baseflow_scenario_name_control_by_combine_field({'class_name':this.class,'control_field':'','filter':'','input_combination':["baseflow_seperation_method","period"]});  // THis function uses parallel structure to visualize usgs_streamflow by the year of built
point_bar_visualization(DSS_usgs_baseflow_layer_features["usgs_streamflow"]["json"],combine_scenario_name,"display_bars"); //temperately put in here

	
	});// end of on change event
	





function usgs_baseflow_ifis_trace(layer,feature,style){
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









	

/*-----------------------------------------------------------usgs_baseflow_Functions-------------------------------------------------*/

	
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
//usgs_baseflow_scenario_name_control_by_combine_field({'class_name':'','control_field':'','filter':'','input_combination':[]});
function usgs_baseflow_scenario_name_control_by_combine_field(event_option_obj){  // THis function uses parallel structure to visualize usgs_streamflow by the year of built

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

		function usgs_baseflow_feature_autocomplete(leaflet_layer,dom_element){

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

						
						//usgs_streamflow_scenario_style_control_by_matching_ppt({"matching_value":$("#"+search_box_id).val(),"matching_field":$("#"+drop_down_id).val()},leaflet_layer,{"pass_filter":DSS_usgs_baseflow_styles .usgs_streamflow["find_usgs_streamflow_highlight"]});
						
						usgs_streamflow_scenario_style_control_by_matching_ppt({"matching_value":$("#"+search_box_id).val(),"matching_field":$("#"+drop_down_id).val()},leaflet_layer,{"pass_filter":DSS_usgs_baseflow_styles .usgs_streamflow["find_usgs_streamflow_highlight"],"un_pass_filter":DSS_usgs_baseflow_styles .usgs_streamflow["default"]});
						
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
	
		var dss_panel_holder_id= dss_app_settings_usgs_baseflow["app_btn_id"]+"_panel";
		
		var frame_class=dss_panel_holder_id+"frame_bar";
		var value_class=dss_panel_holder_id+"value_bar"; 
		
		if(display_setting=="hide_bars"){
				$( "."+frame_class ).remove();
				$( "."+value_class ).remove();
				return false;				
		}
		
		var scenario_name_null_check= scenario_name.split("_");
		for(var sc=0;sc<scenario_name_null_check.length;sc++){
		if(scenario_name_null_check[sc]=='null'){

		return false;
		 }
		}

		//layer.setstyle(DSS_usgs_baseflow_styles .usgs_streamflow['default_invisible']); //map.removeLayer(usgs_streamflow_loaction);

		var visualization_year=scenario_name_null_check[0];
		var visualization_variable=scenario_name_null_check[2];
		var value_percentage_name=scenario_name;
		
		

		
		
		var total_bar_height=30;
		$( "."+frame_class ).remove();
		$( "."+value_class ).remove();
		var svg = d3.select("#map").select("svg");
		// g = svg.append("g");
		
		 var g_frame = svg.append("g").attr("class", frame_class+" function_panel leaflet-zoom-hide "+dss_panel_holder_id);
		 var g_value = svg.append("g").attr("class", value_class+" function_panel leaflet-zoom-hide "+dss_panel_holder_id);

			 
		// d3.json(datalink, function(collection) {  //import data from other sources
		  // Add a LatLng object to each item in the dataset
		  

		var collection=input_json;
		var recolorMap = colorScale(collection.features,value_percentage_name);
		var key = "dfsp_10_p"; //used for each geom id
		    
			//add Iowa regions geometry to map
			var transform = d3.geo.transform({point: projectPoint}),
			path = d3.geo.path().projection(transform);

			
		
		
		
		collection.features.forEach(function(d) {	
		      d.LatLng = new L.LatLng(d.geometry.coordinates[1],
			  d.geometry.coordinates[0])

		   
			  if(d.properties.dfsp_10_p == 0.000000 || d.properties.dfsp_20_p == 0.000000){
				  console.log("de");
				  delete d;
			  }
				  
		  
			 // console.log(d.LatLng);	 
		  })
		 
		  
	
	   //create an attribute array (pcpdata) an populate the array using the attributes in json
		//to plug into the parallel coordinates
		attNames=["dfsp_10_p","corn","area","soybeans"];
		var collection2= jQuery.extend(true, {}, collection);  // must copy like this
		collection2.features.forEach(function(d){
		  //attribute names are derived from properties of the first json object
		  // so that the dropdown list could be populated
		  for (var k in d.properties){
			  if(attNames.indexOf(k) == -1)
				  delete d.properties[k]
		  }
		  tempProperties = d.properties;
		  pcpdata.push(d.properties);
		});
		expressed = attNames[0];
		  
		  
			var bar = g_frame.selectAll("rect")
		   .data(collection.features)
		   .enter().append("rect")
		   .attr("id", function(d) {
			return "frame_"+d.properties[key]})			
		   .attr("width",5)
		   .attr("height",total_bar_height)
		   .attr("fill","white")
		   .attr("stroke", function(d) { //color enumeration units
			  return choropleth(d, recolorMap,value_percentage_name);
			})		   
		   .attr("stroke-width", 1); 

		  

		   
			var value = g_value.selectAll("rect")
		   .data(collection.features)
		   .enter().append("rect")
		   .attr("id", function(d) {
			return "id"+d.properties[key]})
		   .attr("width",3)
			.attr("d", path) //project data as geometry in svg		   
		   .attr("height",function(d) { 				
				   return total_bar_height*d.properties[value_percentage_name]/100;
			
			   })
			   
			.attr("fill", function(d) { //color enumeration units
			  return choropleth(d, recolorMap,value_percentage_name);
			}).on("mouseover", highlight)
			.on("mouseout", dehighlight);
			 /*  
		   .attr("fill",function(d) { 		   
		  return getColor_double_variables(d.properties[value_percentage_name],visualization_variable);   
		   });*/
		   
	 
		  
		  map.on("viewreset", update);
		  update();
		  leaflet_l("<div id='paracoord'  class='parcoords' style='500px;height:200px'></div>","","usgs_baseflow_panel");
		  //var recolorMap = colorScale(jsonData.features);
		 
		 var format = d3.format(".4n"), scale = d3.scale.linear().domain(
        [ -10, 20, 1000 ]).range([ 0, 800, 1000 ]);		
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
		  /*
		  var pc = d3.parcoords()(".parcoords")
			  .data(pcpdata)
			  .render()
			  .createAxes();
		  */
		  
		  
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
			   }
				  )
				  
		   
		  }		  
			
		
			//setTimeout(function(){ GEN_change_layer_style_externally(window[dss_app_settings_usgs_baseflow["app_leaflet_layer"]].usgs_streamflow,{fill:false,stroke:false});}, 100);
					
			
			
		function colorScale(features,expressed){	
			  var keyArrayToColor={
				"dfsp_10_p":[
					"#F203FF",
					"#C323FF",
					"#8051FF",
					"#4778FF",
					"#0D9FFF"
			  ],
				"dfsp_20_p":[
					"#F203FF",
					"#C323FF",
					"#8051FF",
					"#4778FF",
					"#0D9FFF"
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
			   
			   leaflet_legend(legend_data,'<h5>Percentage of baseflow</h5><h6>(%)</h6>','',dss_panel_holder_id+' function_panel');
			   
			  
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



function usgs_baseflow_sensor_popup_generation(feature,layer){
	
	var site_code=feature.properties.site_code;	
	var site_org=feature.properties.org;	
	
	if(feature.properties["dfsp_10_p"]==0){
		layer.bindPopup("<p><b>Site code</b> :"+feature.properties.site_code+"<br><b>Owner</b> :"+feature.properties.org+"<br><b>Location</b> :"+feature.properties.address+"<br><br><b>Baseflow percentage</b><br>(Single Parameter Digital Filter)<br><b>Past 10 years</b> :"+feature.properties.dfsp_10_p.toFixed(2)+"%<br><b>Past 20 years</b> :"+feature.properties.dfsp_20_p.toFixed(2)+"%");
    	return false;
	}else{
		var ts_btn="<br><input type='button' class='DataWindowButton' id='usgs_baseflow_timeserise' value='Time Series' disabled>";
		
	
		var sensor_logo="<img src='assets/img/sensor_logos/usgs.jpg' style='width:100px;'>";		
		// JavaScript Document
layer.bindPopup(sensor_logo+"<p><b>Site code</b> :"+feature.properties.site_code+"<br><b>Owner</b> :"+feature.properties.org+"<br><b>Location</b> :"+feature.properties.address+"<br><br><b>Baseflow percentage</b><br>(Single Parameter Digital Filter)<br><b>Past 10 years</b> :"+feature.properties.dfsp_10_p.toFixed(2)+"%<br><b>Past 20 years</b> :"+feature.properties.dfsp_20_p.toFixed(2)+"%<br><br> Upstream Properties<br>Percentage of corn:"+feature.properties.corn+"%<br>Percentage of soybeans:"+feature.properties.soybeans+"%<br>Drainage district area:"+feature.properties.area+"acres<br>"+ts_btn);
	}
		
	
	
	//http://s-iihr32.iihr.uiowa.edu/dev/dss_alpha/IowaWS/assets/php/current_status_data_loader/usgs_dail_average.php?siteID=05387440&action=baseflow
	//var site_url='../../../pro/ds/index.php?r=ws&site_code='+site_code;
	var site_url='assets/php/current_status_data_loader/usgs_dail_average.php?siteID='+site_code+'&action=baseflow';
	layer.on('click', function (e) {
	
	//
	
	if(typeof(window["usgs_baseflow_data"][site_code])=="undefined"){
	window["usgs_baseflow_data"][site_code]={"meta":{},"time_serise":{},"site_code":site_code};	
	 //create namespace

	
	
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
						window["usgs_baseflow_data"][site_code]["time_serise"]=time_serise;
						
						var meta_code={
							"O":function(data_array){
								if(data_array.length>1){
								window["usgs_baseflow_data"][site_code]["meta"]["Owner"]=data_array[1];	
								}
								
							},			
							"ST":function(data_array){
								if(data_array.length>1){
								window["usgs_baseflow_data"][site_code]["meta"]["Sensor"]=data_array[1];	
								}
							},	
							"AD":function(data_array){
								if(data_array.length>1){
								window["usgs_baseflow_data"][site_code]["meta"]["Site"]=data_array[1];	
								}
							},
							"V":function(data_array){
								if(data_array.length>1){
								var variable_attribute_list=data_array;
								console.log(variable_attribute_list);
								/*below assign meta to variable meta obj*/
								if(!window["usgs_baseflow_data"][site_code]["meta"].hasOwnProperty("variables")){
									window["usgs_baseflow_data"][site_code]["meta"]["variables"]={};
									window["usgs_baseflow_data"][site_code]["meta"]["variables"][variable_attribute_list[1].replace(",","")]=variable_attribute_list;
								}else{
									window["usgs_baseflow_data"][site_code]["meta"]["variables"][variable_attribute_list[1].replace(",","")]=variable_attribute_list;
								}
								//window["usgs_baseflow_data"][site_code]["meta"]["variables"]=data_array[1];	
								}//end of testing array length
								
							},
							"TI":function(data_array){
								if(data_array.length>1){
								window["usgs_baseflow_data"][site_code]["meta"]["Interval"]=data_array[1];	
								}
							}			
						}//end of meta code
						
						
						for(var meta_data_each_line in meta_data){
							!function(meta_data_each_line){
							var meta_data_entry=meta_data[meta_data_each_line].split("	");
							if(meta_code.hasOwnProperty(meta_data_entry[0])){

								meta_code[meta_data_entry[0]](meta_data_entry);
								
							}			
						}(meta_data_each_line)	
						}//end of for
						
						bind_usgs_streamflow_ts_event(layer,feature);
						//layer.openPopup();						
						
							
							document.getElementById("usgs_baseflow_timeserise").disabled= false;
						//}

					}//end of testing data validation
				}//end of success
			});//end of ajax
		
	
		
	}else{
		
		bind_usgs_streamflow_ts_event(layer,feature)
		

		console.log(this);

	}
	
	});	//end of on click
	
		/*---------------------------------------------------------------------*/
	/*--------------------------generate popup-----------------------------*/
	function bind_usgs_streamflow_ts_event(layer,feature){
	
	
	$("#usgs_baseflow_timeserise").click(function(e) {				
				display_time_serise_data(site_code,site_org,window["usgs_baseflow_data"][site_code]);				
		});// TimeSerise
	}
		
}






