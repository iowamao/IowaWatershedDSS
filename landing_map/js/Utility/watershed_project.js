// JavaScript Document
// JavaScript Document
var watershed_projects={
	"turkey_river":{
		"ws_title":"Turkey River",
		"alias ":[],
		"project":["HUD|IA_WS|tony"],
		"huc":{}
		},
	"clear_creek":{
		"ws_title":"Clear Creek",
		"alias ":[],
		"project":["NSF|IML_CZO","NSF_CDI|SWAT"],
		"huc":{}
		},
	"indian_creek":{
		"ws_title":"Indian Creek",
		"alias ":[],
		"project":["FSA|Pilot"],
		"huc":{}
		},
	"soap_creek":{
		"ws_title":"Soap Creek",
		"alias ":[],
		"project":["HUD|IA_WS|sun"],
		"huc":{}
		},
	"raccoon_creek":{
		"ws_title":"Raccoon Creek",
		"alias ":[],
		"project":["HUD|IA_WS"],
		"huc":{}
		},
	"upper_cedar":{
		"ws_title":"Upper Cedar",
		"alias ":[],
		"project":["HUD|IA_WS","American_River|FSE"],
		"huc":{}
		},
	"middle_cedar":{
		"ws_title":"Middle Cedar",
		"alias ":[],
		"project":["TNC|EVS"],
		"huc":{}
		},
	"cedar":{
		"ws_title":"Cedar",
		"alias ":[],
		"project":["USACE|HEC_RAS"],
		"huc":{}
		},
	"iowa_cedar":{
		"ws_title":"Iowa Cedar",
		"alias ":[],
		"project":["NSF_CNH|SWAT"],
		"huc":{}
		},	
};

var project_detail={
	"HUD":{
		"IA_WS":{
			"display_title":"Hydrologic Engineering Centers Hydrologic Modeling System (HEC-HMS)",
			"project":"Iowa Watersheds Project",
			"developer":["UI"],
			"sponsor":["HUD"],
			"model":["HEC-HMS"],
			"project_type":["flood_mitigation"],			
		},		
	},
	"NSF":{
		"IML_CZO":{
			"display_title":"Critical Zone Observatory (CZO)",
			"project":"Critical Zone Observatory for Intensively Managed Landscapes",
			"developer":["UI"],
			"sponsor":["NSF"],
			"model":[],
			"project_type":["water_quality","sensor_network"],	
			//-          Clear Creek: Soil and Water Assessment Tool (SWAT). Developer: UI/Sponsor NSF-CDI
		},		
	},
	"NSF_CDI":{
		"SWAT":{
			"display_title":"Soil and Water Assessment Tool (SWAT)",
			"project":" ",
			"developer":["UI"],
			"sponsor":["NSF-CDI"],
			"model":["SWAT"],
			"project_type":["sedimentation"],				
		},
	},	
	"FSA":{
		"Pilot":{
			"display_title":"Gridded Surface/Subsurface Hydrologic Analysis (GSSHA)",
			"project":"FSA Pilot Project ",
			"developer":["USACE"],
			"sponsor":["USACE","FSA"],
			"model":["GSSHA"],
			"project_type":["flood_mitigation"],	
		},		
	},
	"TNC":{
		"EVS":{
			"display_title":"Ecosystem Services Valuation",
			"project":"",
			"developer":["TNC"],
			"sponsor":["Private"],
			"model":["null"],
			"project_type":["flood_mitigation"],	
			//Upper Cedar: Floodplain Storage Evaluation. Developer: American Rivers/Sponsor: Private

		},		
	},
	"American_River":{
			"FSE":{
			"display_title":"Floodplain Storage Evaluation",
			"project":"",
			"developer":["American Rivers"],
			"sponsor":["Private"],
			"model":[""],
			"project_type":["flood_mitigation"],	

		},	
	},
	"USACE":{
		"HEC_RAS":{
			"display_title":"Hydrologic Engineering Centers River Analysis Systems (HEC-RAS)",
			"project":"",
			"developer":["USACE"],
			"sponsor":["Federal"],
			"model":["HEC-RAS"],
			"project_type":["flood_mitigation"],	

		},		
	},
	"NSF_CNH":{
			"SWAT":{
			"display_title":"Soil and Water Assessment Tool (SWAT)",
			"project":"",
			"developer":["UI"],
			"sponsor":["NSF-CNH"],
			"model":["SWAT"],
			"project_type":["sedimentation"],	
		},
	},		
};

function ws_project_generate_project_prompt(feature_ws,ws_project,project_detail,result_type){
	//console.log(feature_ws)
	if(ws_project.hasOwnProperty(feature_ws)){
		var html_text="";
		var final_result="";
		//console.log(feature_ws)
		var ws_project_obj=ws_project[feature_ws];
		if(typeof(ws_project[feature_ws]["ws_title"])!="undefined"){
		var ws_title=ws_project[feature_ws]["ws_title"];	
		}else{
			var ws_title=feature_ws;
		}
		
		var ws_project_list=ws_project_obj["project"];
		//console.log(ws_project_list)
		console.log(ws_project_list.length);
		for(var each in ws_project_list){
			!function outer(each){
			var org_project_version=ws_project_list[each].split("|");
			if(org_project_version.length>=2){
				var project_org=org_project_version[0];
				var project_name=org_project_version[1];
				
				//console.log(project_org+"  "+project_name);
				//console.log(project_detail);
				//console.log(project_detail.hasOwnProperty(project_org)+" "+project_org);
				if(project_detail.hasOwnProperty(project_org)){
					console.log(project_detail[project_org].hasOwnProperty(project_name)+" "+project_name);
					if(project_detail[project_org].hasOwnProperty(project_name)){
						//console.log(project_detail[project_org]) 
						//console.log(typeof(result_type)+" "+result_type);
						if(typeof(result_type)!='undefined'){
							if(result_type=='info'){
								//console.log("info send");
							final_result = {"project_key":ws_project_list.join("+")};	
							//console.log(final_result);
							}else{
								final_result += format_project_output(ws_title,project_detail[project_org][project_name]);
								
							}
													
						}else{
							final_result += format_project_output(ws_title,project_detail[project_org][project_name]);

						}
						
						
					}//test if the  project org has the project
				}//test if the project detail has the org data
				
				
			}//test if the project has essencial
			}(each)			
		}//for loop looping through ws_project_list		
		return final_result
	}
	 function format_project_output(ws_name,project_detail_obj){
		 //console.log("aa");
		 var text_line1=ws_name+": "+project_detail_obj["display_title"];
		 //console.log(typeof(project_detail_obj["developer"])+"   "+typeof(project_detail_obj["sponsor"]));
		 var text_line2="Developer: "+project_detail_obj["developer"].join(", ")+" ;  "+"Sponsor: "+project_detail_obj["sponsor"].join(", ");

		 var new_text="<p style='color:#8C001A;'><p><b style='color:#8C001A;'>"+text_line1+"</b></p><p><b style='color:#8C001A;'>"+text_line2+"</b><p></p></br>";
		 if(html_text.indexOf(new_text)==-1){
			html_text=new_text 
		 }
		 
		 //console.log(html_text);
		 return html_text;
		 
	 }
	
}

