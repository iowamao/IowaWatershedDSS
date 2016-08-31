// Map setup



//geoserver/Iowa_Watershed/wms




var map = L.map('map', {
    center: [41.900, -93.311],
    zoom: 1,
//crs: L.CRS.EPSG102100,  -- do not apply this, it will break the geoserver wms
 continuousWorld: true,
 zoomControl:false,

});


	

var imageUrl = 'data/temp_basemap2.png',
    imageBounds = [[38.28131307922966,-103.95263671874999], [45.60635207711834,-82.85888671875]];

L.imageOverlay(imageUrl, imageBounds).addTo(map);

//map.fitBounds([[39.34223130910491, -99.920],[44.62175409623324, -86.8247734375]]);

map.dragging.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
map.attributionControl.setPrefix(" ");


//var state_dem=L.tileLayer.wms("http://s-iihr32.iihr.uiowa.edu:8080/geoserver/Iowa_Watershed/wms",{layers: 'Iowa_Watershed:ned_ft1_50', format: 'image/gif', version: '1.1.0', transparent: true, srs:32615, attribution: "", tiled:true, styles:"Iowa_WS_DEM_gen" });





console.log(map.getBounds());

//   
//watershed HUC   
//   
var HUC8_global = new L.LayerGroup(); 
function handleBasin(data) {

var Huc_Default_style={
	            weight: 1.5,
                opacity: 1,
                fillColor: '#005AEB ',
				color: '#FFFFFF  ', //#999999 
                fillOpacity: 0.8,
				stroke:true,
				fill:true,
	
} 
 mask_json_data=data;
 var feature = L.geoJson(data,{
               style: Huc_Default_style ,onEachFeature: function (feature, layer) {
				
		layer.on('mouseout', function (e) {	
		
	 layer.setStyle(Huc_Default_style);
	// $('#output').html(' Watershed Name: '+feature.properties.SUBBASIN+'<br> Region Name: '+feature.properties.BASIN+'<br> HUC: '+feature.properties.HUC_8);
	   	$('#output').html('');			

});
	
	 layer.on('mouseover', function (e) {	
$('#output').html(feature.properties.WMA_NAME);			
	 layer.setStyle({        	
				weight: 4,
                opacity: 1,
                fillColor: '#00CCFF ',
				color: '#FFFFFF  ', //#999999 
                fillOpacity: 0.8,
				stroke:true,
				fill:true,
			});
					});
					
					
			 layer.on('click', function (e) {/*	
console.log(feature.geometry.coordinates);
$.post("watershed.php",
    {
        feature_geom: JSON.stringify(feature),
        
    },
    function(data, status){
        console.log("Data: "  + "\nStatus: " + status);
		 window.open("http://s-iihr32.iihr.uiowa.edu/dev/prototype/dss/");
    });
			 
			*/
					});//end of on layer click
	
	 }
 
 }
 
 );
var bounds=feature.getBounds();
//map.fitBounds(bounds);
 
feature.addTo(HUC8_global); 
map.setZoom(6.7);
}


/*
$.getScript( "js/proj4leaflet.js", function( data, textStatus, jqxhr ) {
});//end of getting script 
*/
$.ajax({
  url : "data/IA_WMA.json",

  dataType : 'json',
  jsonpCallback: 'getJson',
  success: handleBasin 
  
});
map.addLayer(HUC8_global);







