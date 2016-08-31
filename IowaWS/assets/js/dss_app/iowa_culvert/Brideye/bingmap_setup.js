var culvert_point;
//var map=null;
var changeangle=0;
 var polygon_area=[];
//$(document).ready(function(){

$('#bingmap_div').bind('contextmenu', function(e) {
        return false;
    });



var maptool = {};
// kindly change these credentials to your maps API key if repurposing script
maptool.credentials = "AghOgGGjGyEz48JNO4k_WWGYpPl4RoVEOwp27zv3hIyXvXliYM4BYuWfkvtdmVkm";
maptool.instance = undefined;
maptool.initial = {};
maptool.initial.zoom = 7;
maptool.initial.latitude = 42.000;
maptool.initial.longitude = -93.911;
maptool.controls = $('#controls');
maptool.mousedown = false;
maptool.polygon = {};
maptool.polygon.instance = undefined;
maptool.polygon.points = [];
maptool.polygon.properties = {
    fillColor: new Microsoft.Maps.Color(0, 0, 0, 0),
    strokeColor: new Microsoft.Maps.Color(255, 206, 17, 38),
    strokeThickness: 2
};

// *****************************************************************************************

maptool.polygon.string_coordinates = function() {
    // return coordinates as lon,lat list    
    var coords = [];
    for(var i=0;i<maptool.polygon.points.length;i++){
        var point = maptool.polygon.points[i];
        // note that these go into a Location as lat,lon - but are entered as lon, lat
        coords.push([point.longitude.toFixed(6), point.latitude.toFixed(6)].join(', '));
		console.log(coords);
		
    }
    return coords.join("<br/> ");
};

// *****************************************************************************************

maptool.polygon.close = function() {
    var polygon_length = maptool.polygon.points.length;
    if (maptool.polygon.is_closed() == false && polygon_length > 2){
        maptool.polygon.points.push(maptool.polygon.points[0]);
        maptool.polygon.edit();
    }
};

// *****************************************************************************************

maptool.polygon.undo_last = function() {
    maptool.polygon.points.pop();
    maptool.polygon.edit();
};

// *****************************************************************************************

maptool.polygon.is_closed = function() {
    var polygon_length = maptool.polygon.points.length;
    if (polygon_length > 2 && maptool.polygon.points[0] == maptool.polygon.points[polygon_length-1]){
        return true;   
    }else{
        return false;   
    }
};
    
// *****************************************************************************************

maptool.polygon.render = function() {
    
    // draw entities and update controls
    maptool.instance.entities.clear()
    maptool.polygon.instance = new Microsoft.Maps.Polyline(maptool.polygon.points, maptool.polygon.properties);    
    maptool.instance.entities.push(maptool.polygon.instance);
    
    var polygon_length = maptool.polygon.points.length;
    maptool.controls.html($([
        '<div class="options">',
            '<a class="rounder_4" href="javascript:maptool.polygon.import();"><span class="shortcut_key">I</span>mport</a>',
            polygon_length > 0 ? '<a class="rounder_4" href="javascript:maptool.polygon.clear();"><span class="shortcut_key">R</span>eset</a>' : '',
            polygon_length > 0 ? '<a class="rounder_4" href="javascript:maptool.polygon.undo_last();"><span class="shortcut_key">U</span>ndo Last Point</a>' : '',
            maptool.polygon.is_closed() == false && polygon_length > 2 ? '<a class="rounder_4" href="javascript:maptool.polygon.close();">Close <span class="shortcut_key">S</span>hape</a>' : '',
        '</div>',
        '<div class="clear"></div>',
        '<form id="import_form"><h3>Import Coordinates</h3><textarea id="import_form_textarea">longitude1, latitude1\nlongitude2, latitude2\netc.</textarea><input id="import_form_submit" type="submit" value="Import"></input></form>',
        '<h3>Polyline Coordinates</h3>',
        '<div class="information">', maptool.polygon.string_coordinates(),'</div>',
        maptool.polygon.points.length === 0 ? '<div class="information clutch"><blink>Right click on map to set point.</blink></div>' : ''
    ].join('')));
    
};

// *****************************************************************************************

maptool.polygon.clear = function() {
    // remove entities
    maptool.polygon.points = [];
    maptool.instance.entities.clear();
    maptool.polygon.instance = undefined;
    maptool.polygon.render();
};

function clearmap() {
    // remove entities
    maptool.polygon.points = [];
    maptool.instance.entities.clear();
    maptool.polygon.instance = undefined;
    maptool.polygon.render();
	console.log("trigger");
};

// *****************************************************************************************

maptool.polygon.edit = function() {
    
    var points_length = maptool.polygon.points.length;
    var next_point_location;
    var icon_width = 14;
    var icon_height = 14;
    
    var pin_options = {
        draggable: true, 
        icon: 'data/dss/IDOT/state_data/', 
        height: icon_height, 
        width: icon_width, 
        anchor: new Microsoft.Maps.Point(icon_width/2, icon_height/2) 
    }
    
    var splitter_options = $.extend({},pin_options);
    splitter_options.icon =  'graphic/sight.png';
    
    function add_splitter(point_location, next_point_location, iref){
        
        // one point, no splitter to add
        if (typeof(next_point_location) == 'undefined'){
            return;
        }
        // add splitter point
        var next_point_longitude = next_point_location.longitude;
        var next_point_latitude = next_point_location.latitude;
        var mid_point_longitude = (next_point_longitude + point_longitude)/2;
        var mid_point_latitude = (next_point_latitude + point_latitude)/2;        
        var splitter_location = new Microsoft.Maps.Location(mid_point_latitude, mid_point_longitude);
        var splitter_pin = new Microsoft.Maps.Pushpin(splitter_location, splitter_options); 
        splitter_pin.iref = iref; 
        maptool.instance.entities.push(splitter_pin);
        Microsoft.Maps.Events.addHandler(splitter_pin, 'mouseup', maptool.polygon.edit_update_splitter);
        Microsoft.Maps.Events.addHandler(splitter_pin, 'mouseover', maptool.cursor.move);
    }
    
    maptool.polygon.render();
    
    for(var i=0;i<points_length;i++){
        
        var point_location = maptool.polygon.points[i];
        var point_longitude = point_location.longitude;
        var point_latitude = point_location.latitude;
        
        // closed polyline has 2 identical points at 0 and length -1
        if (i > 1 ){
            var point0_location = maptool.polygon.points[0];
            if (String(point0_location) === String(point_location)){
                continue;
            }
        }
        
        var mm_location = new Microsoft.Maps.Location(point_latitude, point_longitude);
        var edit_pin = new Microsoft.Maps.Pushpin(mm_location, pin_options);         
        edit_pin.iref = i;        
        maptool.instance.entities.push(edit_pin);        
        Microsoft.Maps.Events.addHandler(edit_pin, 'mouseup', maptool.polygon.edit_update_pin);
        Microsoft.Maps.Events.addHandler(edit_pin, 'mouseover', maptool.cursor.move);
        
        var splitter_ref = i+1;
        var next_point_location = maptool.polygon.points[splitter_ref];
        add_splitter(point_location, next_point_location, splitter_ref);
    }
};

// *****************************************************************************************

maptool.polygon.edit_update_pin = function(e) {
    
    // only delete with shift key down
   if (e.originalEvent.shiftKey){
        var point_ref = maptool.polygon.points[e.target.iref];
        var point_ref_latitude = point_ref.latitude;
        var point_ref_longitude = point_ref.longitude;        
        var points = maptool.polygon.points;
        var points_length = points.length;    
        
        // a shape close point can occupy 2 points, start and end - so loop
        for (var i=points_length-1;i>=0; i--){
            var point = points[i];
            if(point.longitude == point_ref_longitude && point.latitude == point_ref_latitude){
                var spliced = maptool.polygon.points.splice(i,1);
            }
        }
        
   }else{
    
        var pin_location = e.target.getLocation();
        var pin_longitude = pin_location.longitude;
        var pin_latitude = pin_location.latitude;
        var point_ref = e.target.iref;     
        
        // maptool.polygon.points[point_ref is a reference, will update a close point
        maptool.polygon.points[point_ref].latitude = pin_latitude;
        maptool.polygon.points[point_ref].longitude = pin_longitude;
        
    }
    
    maptool.polygon.edit();
    
};

// *****************************************************************************************

maptool.polygon.edit_update_splitter = function(e) {
    if (e.targetType == 'pushpin'){
        var pin_location = e.target.getLocation();
        var pin_longitude = pin_location.longitude;
        var pin_latitude = pin_location.latitude;
        var point_ref = e.target.iref;        
        var mm_point = new Microsoft.Maps.Location(pin_latitude, pin_longitude)
        maptool.polygon.points.splice(point_ref,0,mm_point);        
        maptool.polygon.edit();
        
    }
};

// *****************************************************************************************

maptool.cursor = {};

maptool.cursor.crosshairs = function(e) {
    if (!(maptool.mousedown)){
         $('.MicrosoftMap').css('cursor', 'crosshair');
    }
};

maptool.cursor.pointer = function(e) {
    if (!(maptool.mousedown)){
         $('.MicrosoftMap').css('cursor', 'pointer');
    }
};

maptool.cursor.move = function(e) {
    if (!(maptool.mousedown)){
         $('.MicrosoftMap').css('cursor', 'move');
    }
};

// *****************************************************************************************

maptool.keydown = function(e) {
    // shortcut keys
    switch(e.keyCode){
        case 83: // "S"
            maptool.polygon.close();
            break;
        case 73: // "I"
            maptool.polygon.import();
            break;
        case 85: // "U"
            maptool.polygon.undo_last();
            break;
        case 82: // "R"
            maptool.polygon.clear();
            break;
        default:
            break;
    }
};

// *****************************************************************************************

maptool.key_is_down = function(key_code) {    
    if (key_code in maptool.keysdown && maptool.keysdown[key_code]){
        return true;
    }else{
        return false;
    }   
};

// *****************************************************************************************

maptool.click = function(e) {
    
    var point = new Microsoft.Maps.Point(e.getX(), e.getY());
    try{
        var point_location = e.target.tryPixelToLocation(point);
    }catch(e){
        console.error('could not resolve click point');
        return;
    }
    var point_longitude = point_location.longitude;
    var point_latitude = point_location.latitude;
    
    // remove close point if polygon is closed
    if (maptool.polygon.is_closed()){
        maptool.polygon.points.pop();
    }
    
    var mm_location = new Microsoft.Maps.Location(point_latitude, point_longitude);
    maptool.polygon.points.push(mm_location);
    maptool.polygon.edit();
    
};

// *****************************************************************************************

maptool.change = function() {
    // placeholder, perhaps useful in force polygon redraw on Chrome/FF?
};

// *****************************************************************************************

maptool.polygon.import = function() {
    
    var import_form = $('#import_form'); 
    var input_textarea = $('#import_form_textarea');
    
    import_form.toggle();
    input_textarea.select();
    
    import_form.submit(function(){
        
        var input = input_textarea.val();
        var lines = $.trim(input).split("\n");
        
        if (lines == ''){
            return false;
        }
        
        maptool.polygon.clear();
        maptool.polygon.points = [];
        
        
        for(var i=0;i<lines.length;i++){
            var line = $.trim(lines[i]);
            if (line == ''){
                continue;
            }
            var dimensions = line.split(",");
            var point_longitude = $.trim(dimensions[0]);
            var point_latitude = $.trim(dimensions[1]);
            if (isNaN(point_longitude) || isNaN(point_longitude)){
                continue;
            }            
            var mm_location = new Microsoft.Maps.Location(point_latitude, point_longitude);            
            maptool.polygon.points.push(mm_location);
            
        }
        
        maptool.polygon.edit();
        import_form.hide();
        input_textarea.val('');
        
        maptool.instance.setView({center:mm_location, animate: true});
        
        return false;
                
    });
};




//mapini = function() {
    
    maptool.instance = new Microsoft.Maps.Map(document.getElementById("bingmap_div"), {
        credentials: maptool.credentials,
        center: new Microsoft.Maps.Location(maptool.initial.latitude, maptool.initial.longitude),
        mapTypeId: /*Microsoft.Maps.MapTypeId.aerial,*/Microsoft.Maps.MapTypeId.birdseye,
        zoom: maptool.initial.zoom,
	labelOverlay: Microsoft.Maps.LabelOverlay.hidden,
        enableSearchLogo: false,
        showDashboard: true,
        enableClickableLogo: false,
        showCopyright: true,

       // tileBuffer: 2
    });
    
    Microsoft.Maps.Events.addHandler(maptool.instance, 'viewchange', maptool.change);
    Microsoft.Maps.Events.addHandler(maptool.instance, 'rightclick', maptool.click);
    Microsoft.Maps.Events.addHandler(maptool.instance, 'keydown', maptool.keydown);
    Microsoft.Maps.Events.addHandler(maptool.instance, 'mousemove', maptool.cursor.crosshairs);
    Microsoft.Maps.Events.addHandler(maptool.instance, 'mousedown', function(e){maptool.mousedown = true;});
    Microsoft.Maps.Events.addHandler(maptool.instance, 'mouseup', function(e){maptool.mousedown = false;});
    
    maptool.polygon.render();
    
//};

// *****************************************************************************************

//mapini();


















maptool.instance.getZoomRange = function ()
{
  return {
    max:      25,
    min:      10
  };
};

// Attach a handler to the event that gets fired whenever the map's view is about to change
Microsoft.Maps.Events.addHandler(maptool.instance,'viewchangestart',restrictZoom);

// Forcibly set the zoom to our min/max whenever the view starts to change beyond them 
var restrictZoom = function ()
{
  if (maptool.instance.getZoom() <= maptool.instance.getZoomRange().min) 
  {
    maptool.instance.setView({
      'zoom':       maptool.instance.getZoomRange().min,
      'animate':    false
    });
  }
  else if (maptool.instance.getZoom() >= maptool.instance.getZoomRange().max) 
  {
    maptool.instance.setView({
      'zoom':       maptool.instance.getZoomRange().max,
      'animate':    false
    });
  }
};



















/*	
	
	var mapOptions = {
    credentials: 'AghOgGGjGyEz48JNO4k_WWGYpPl4RoVEOwp27zv3hIyXvXliYM4BYuWfkvtdmVkm', center: new Microsoft.Maps.Location(42.000, -93.911),
                            mapTypeId: Microsoft.Maps.MapTypeId.birdseye,
                            zoom: 7}
map = new Microsoft.Maps.Map(document.getElementById("map"), mapOptions);
*/

 Microsoft.Maps.registerModule("GeoJSONModule", "assets/js/dss_app/iowa_culvert/Brideye/GeoJSONModule.js");
              Microsoft.Maps.loadModule("GeoJSONModule");
	

	
	
	var pins;


$(".bing_map_close").click(function(e) {
            maptool.instance.entities.clear();

    });




 function LoadGeoJSON(url) {
	 
	 
              maptool.instance.entities.clear();

              //Define default shape options

              var polylineOptions = {
                  strokeColor: new Microsoft.Maps.Color(156, 0, 0, 255)
              };

              var polygonOptions = {
                  fillColor: new Microsoft.Maps.Color(156, 0, 0, 255),
                  strokeColor: new Microsoft.Maps.Color(156, 0, 255, 0)
              };
			  
			  var pushpinOptions = {
				icon:"graphic/red.png", 
				height:10, 
				width:10, 
				anchor:new 
                Microsoft.Maps.Point(0,0),
				draggable: false
				  };

              new GeoJSONModule().ImportGeoJSON(url, GeoJSONImportedCallback, { polylineOptions: polylineOptions, polygonOptions: polygonOptions});
			  
		
			  
		  
			  
          }

          function GeoJSONImportedCallback(items, bounds) {

			console.log(items);
             pins= maptool.instance.entities.push(items);

              maptool.instance.setView({ bounds: bounds });

              //Advance functionalities can be added here such as adding event handlers.
			  
			 
			  
			  
          }
		
  
		  
	
	LoadGeoJSON('data/dss/IDOT/state_data/geo_json/culvert_bingmap.json');
	//LoadGeoJSON('../../../../geoserver/haowen/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=haowen:IA_county&maxFeatures=800&outputFormat=json');

	
	

function setmepview(a){	
	maptool.instance.setView({ center:a});
}
function zoommepview(){	
	maptool.instance.setView({zoom:25});
}
function resetmepview(){	
 var a = new Microsoft.Maps.Location(42.000, -93.911);
	maptool.instance.setView({ center:a });
	maptool.instance.setView({zoom:9});
}


//Those function are used by parent window, not current window itself
function closeBirdeye(){	
document.getElementById("culvert_properties").style.visibility="hidden";
document.getElementById("culvert_properties").style.display="none";
}






 function callback() {

};
 
 function zoomtoculvert(x,y){
	 

//	 var x=document.getElementById('xcoord').innerHTML;
//	 var y=document.getElementById('ycoord').innerHTML;
	 
	
	 if(x!=0&&y!=0){
	 var loco = new Microsoft.Maps.Location(y,x);
	 
	
		
	 maptool.instance.setView({ center:loco });
	maptool.instance.setView({zoom:20});

	$( "#culvert_properties" ).show("scale", {}, 500, callback );

	
	 }else{
	

		 
 setTimeout(function(){

 if(x!=0&&y!=0){
var loco = new Microsoft.Maps.Location(y,x);
	
	 maptool.instance.setView({ center:loco });
	maptool.instance.setView({zoom:20});
 

	$( "#culvert_properties" ).show("scale", {}, 500, callback );
 }else{
	 alert("please click inside Iowa state to show Birdeye view");
 }


},1000);
      
    

}
		 
 		 		 
	//	 alert("No culvert selected, please select a culvert location first by clicking round icon using right mouse button!")
		 }
	 
	 