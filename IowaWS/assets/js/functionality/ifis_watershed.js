var watershed_image_data = new Array();
var dir_arr = new Array(10);
	dir_arr[0] = new Array( 0, 0);
	dir_arr[1] = new Array(-1, 1);
	dir_arr[2] = new Array( 0, 1);
	dir_arr[3] = new Array( 1, 1);
	dir_arr[4] = new Array(-1, 0);
	dir_arr[5] = new Array( 0, 0);
	dir_arr[6] = new Array( 1, 0);
	dir_arr[7] = new Array(-1,-1);
	dir_arr[8] = new Array( 0,-1);
	dir_arr[9] = new Array( 1,-1);

var apprunning=false;


window["ifis_search_result"]= new L.LayerGroup();


function ifis_ws_search(map,Huc_ws_trace_style,lat, lng, type,fit,search_type){
	

	
	
window["ifis_search_result"].addTo(map);
	
	window["order_array"]=[];
	window["order_length_record"]=0;
	
	
	var x_px;
	var y_px;
    if(type==500){
	x_px=1741;
	y_px=1057;		
	}
	if(type==90){
	x_px=5900;
	y_px=3680;			
	}
	
	
	//console.log("latlng"+lat+"  "+lng);
	
	
  if (type==500){
	  
	      var dy = -(44.53785-40.133331)/y_px;
		  var dx = (-89.89942+97.154167)/x_px;
		  var y = y_px-1-Math.round((lat-44.53785)/dy);
		  var x = 1+Math.round((lng+97.154167)/dx);
		  if (x<1) x=2;
		  if (y<1) y=1;
		  if (x>x_px) x=x_px;
		  if (y>y_px) y=y_px;
  }
  if (type==90){
	  
	    //44.6438320168
		  /*
		  var dy = -(44.6438320168-40.3024337946)/y_px;
		  var dx = (-89.9975374111+96.9579313)/x_px;
		  var y = y_px-1-Math.round((lat-44.6438320168)/dy)+88;
		  var x = 1+Math.round((lng+96.9579313)/dx)-11;
		  if (x<1) x=2;
		  if (y<1) y=1;
		  if (x>x_px) x=x_px;
		  if (y>y_px) y=y_px;
	  
		 
	      var dy = 0.0011797277777777777;
		  var dx = 0.0011797277777777777;
		  var y = 88+Math.round(0.5+(lat-40.3024337946)/dy);
          var x = -11+Math.round(-0.5+(lng+96.9579313)/dx);
		  if (x<1) x=2;
		  if (y<1) y=1;
		  if (x>x_px) x=x_px;
		  if (y>y_px) y=y_px;
		  */
		    
		  var dy = 0.0011797277777777777;
		  var dx = 0.0011797277777777777;
		  var y = Math.round(0.5+(lat-40.3024337946)/dy);
		  //y = (0.5+(x-40.3024337946)/0.0011797277777777777)
          var x = -11+Math.round((lng+96.9579313)/dx);
		  //y = -11+((x+96.9579313)/0.0011797277777777777);
		  if (x<1) x=2;
		  if (y<1) y=1;
		  if (x>x_px) x=x_px;
		  if (y>y_px) y=y_px;
  }
	


  
  

  		 var search_matric=[
			[x,y],
			[x,y+1],
			[x,y-1],
			[x+1,y],
			[x+1,y+1],
			[x+1,y-1],
			[x-1,y],
			[x-1,y+1],	
			[x-1,y-1],
			];
  
  //console.log(search_type);
 if(search_type=="9*9" || search_type=="9x9"){
	 //console.log("9*9");


			
			for(var i=0;i<search_matric.length;i++){
					!function outer(i){
				
				var lcx=search_matric[i][0];
				var lcy=search_matric[i][1];
				instant_watershed(map,Huc_ws_trace_style,lcx, lcy, type,fit);
				

				}(i)
			}	
		}
	 if(search_type=="single_search"){
			//console.log("single_search");
				instant_watershed(map,Huc_ws_trace_style,x, y, type,"fit");
				

				}
	
	 
	 
 }
	












function instant_watershed(map,Huc_ws_trace_style,x, y, type,fit) {
	
	if(type==90){
	var dy = 0.0011797277777777777;
	var dx = 0.0011797277777777777;
	//var lat=40.3024337946+dy*(y-0.5);	
	var lat=-0.00117973*(-y-34162.)	;
	//var lng=(x+0.5+11)*dx-96.9579313;
	var lng=-0.00117973*(82175.7-x);
	}
	//console.log(x+"  "+y);
	//console.log(" --- "+lat+" "+lng);


	

			


  
  
	
   // console.log("tg"+apprunning);
	if (apprunning){
		//console.log("2nd time");
		return;		
	}		
	else{
		apprunning=true;
		
	}
		

	t1 = Date.now();
	if (watershed_image_data.length==0) {
		load_image();
	} else {
		find_watershed();
	}

	function load_image() {
		var imageObj = new Image();
		imageObj.onload = function() {
			load_imagedata(this);
		};
		if (type==500){			
			//imageObj.src = 'data/ifis_search/IFIS_500m.png';	
        	imageObj.src = 'data/ifis_search/IFIS_500m.png';		
		}else{			
			imageObj.src = 'data/ifis_search/IFIS_90m.png';
		}
			
	}

	function load_imagedata(imgobj) {

		t2 = Date.now();
		// console.log('Data: '+watershed_image_data.length);
		//console.log('Image Load Time: '+(t2-t1)+'');

		var e = document.createElement('canvas');
		e.crossOrigin="anonymous";
        var c = e.getContext('2d');

		if (type==500) {
	        e.width = 1741;
	        e.height = 1057;
		} else {
	        e.width = 5900;
	        e.height = 3680;
		}
		c.drawImage(imgobj, 0, 0);
		var img = c.getImageData(0, 0, e.width, e.height);

	      var temp = img.data;
	      var len = temp.length/4;
	      watershed_image_data = new Uint8ClampedArray(len);
		//console.log(len);
	      for (var i = 0; i < len; i++) {
	        watershed_image_data[i] = temp[4*i];
	      };
	     temp.length = 0;
	     temp = null;

		t3 = Date.now();
	//	console.log('Image Draw Time: '+(t3-t2)+'');
		
		find_watershed();
	}

	function find_watershed() {
var t3 = Date.now();

	    var w, h;
	    if (type==500) {
	      w = 1741|0;
	      h = 1057|0;
	      x=x-1|0;
	      y=h-y-1|0;
	    } else {
	      w = 5900|0;
	      h = 3680|0;
	      x=x|0;
	      y=h-y-1|0;
	    }

	    var matrixbuff = new ArrayBuffer(w*h);
	    var matrix = new Uint8Array(matrixbuff);
	    matrix[x+w*y] = 1|0;
	    var j=1|0;
	    var dirf = new Int32Array([-1,0,1,-1,1,-1,0,1]);
	    var dirg = new Int32Array([1,1,1,0,0,-1,-1,-1]);
	    var e = new Uint8ClampedArray([9, 8, 7, 6, 4, 3, 2, 1]);

	    // new method 2  - 550ms
	      var processbuff = new ArrayBuffer(11000*4);
	      var process = new Uint32Array(processbuff);
	      process[0]=x|0;
	      process[1]=y|0;
	      var c=2|0; var o1=0|0; var o2=5500|0;
	      while (c>o1) {
	        o2=(o1+(o1=o2|0))-o2;
	        var len=c|0;
	        c=o1|0;
	        for (var k=o2|0; k<len; k+=2) {
	          var arx=process[k]|0;
	          var ary=process[k+1]|0;
	          for (var i=7|0; i>-1; i--) {
	            var nx=(arx+dirf[i])|0;
	            var ny=(ary+dirg[i])|0;
	            var ind=(ny*w+nx)|0;
	            if (watershed_image_data[ind] === e[i]) {
	              process[c++]=nx;
	              process[c++]=ny;
	              matrix[ind]=1|0;
	            }
	          }
	        }
	      }


		    var t4 = Date.now();



		    //var dirxy = new Array(new Array(0,0),new Array(0,-1),new Array(1,0),new Array(0,1),new Array(-1,0));
		    var dirx = new Array(0,0,1,0,-1);
		    var diry = new Array(0,-1,0,1,0);
		    var dirxyr = new Array(0,-w,1,w,-1);
		    var found = 1|0;
		    var curX = x|0;
		    var curY = y|0;
		    var dir = 1|0;
		    var border = new Array();
		    var sdir1 = new Array(1,2,3,4,1);
		    var sdir3 = new Array(3,4,1,2,3);
		    var sdir4 = new Array(2,3,4,1,2);

		    var offsetx = 1;
		    if (type==500) {
		      // first point on the border
		      find_dir();
		      border.push(curX+offsetx);
		      border.push(h-curY-1);

		      var icurX = curX;
		      var icurY = curY;

		      // second point on the border
		      find_dir();
		      border.push(curX+offsetx);
		      border.push(h-curY-1);

		      while (found>0) {
		        find_dir();
		        if (icurX===curX && icurY===curY) {
		          found=0;
		        } else {
		          border.push(curX+offsetx);
		          border.push(h-curY-1);
		        }
		      }
		    } else {
		      // first point on the border
		      find_dir();
		      border.push(11.5+curX+offsetx);
		      border.push(88.5+curY);

		      var icurX = curX;
		      var icurY = curY;

		      // second point on the border
		      find_dir();
		      border.push(11.5+curX+offsetx);
		      border.push(88.5+curY);

		      while (found>0) {
		        find_dir();
		        if (icurX===curX && icurY===curY) {
		          found=0;
		        } else {
		          border.push(11.5+curX+offsetx);
		          border.push(88.5+curY);
		        }
		      }
		    }

		    matrix = null;
		    process = null;
		    dirxy = null;
		    newpro = null;

		    t5 = Date.now();
			
			//console.log("length"+border.length);
			cell_coord_conversion(border,fit,type);
			 
			 
			apprunning=false;
			return border;
			
		   // draw_realtime_watershed(border);

		    function find_dir() {
		      var dir1 = sdir1[dir];
		      var dir3 = sdir3[dir];
		      var dir4 = sdir4[dir];
		      var ofs = curX+w*curY;
		      if (!matrix[ofs+dirxyr[dir1]]) {
		        dir=dir1;
		      } else if (!matrix[ofs+dirxyr[dir]]) {
		        //dir=dir;
		      } else if (!matrix[ofs+dirxyr[dir3]]) {
		        dir=dir3;
		      } else if (!matrix[ofs+dirxyr[dir4]]) {
		        dir=dir4;
		      } else {
		        dir=0;
		      }
		      curX += dirx[dir];
		      curY += diry[dir];
		    }

	}

}


function cell_coord_conversion(border,fit,type){
	
	//console.log(border);
	//console.log(border.length);
		//if(border.length>16 ){
	if(border.length>window["order_length_record"] ){
		window["order_length_record"]=border.length;
		
	var x_px;
	var y_px;
    if(type==500){
	var x_px=1741;
	var y_px=1057;
		
	}
	if(type==90){
	var x_px=5900;
	var y_px=3680;	
		
	}

	
	
	
	var border_coord=[];
	
	
	
	
	var x_px;
	var y_px;
	var dy;
	var dx;
    if(type==500){
	x_px=1741;
	y_px=1057;	
	 dy = -(44.53785-40.133331)/1057;
     dx = (-89.89942+97.154167)/1741;	
	}
	
	if(type==90){
	x_px=5900;
	y_px=3680;	
	dy = 0.0011797277777777777;
	dx = 0.0011797277777777777;
	}
	
	


	
	for( var k=0;k<border.length;k=k+2){
		if(type==500){
		var lng=(dx*(border[k]-1)-97.154167);
        var lat=((y_px-1-border[k+1])*dy+44.53785);	
		}
		if(type==90){
			
		//var lat=40.3024337946+dy*(border[k+1]-0.5);	
		//var lng=(border[k]+0.5+11)*dx-96.9579313;
			var lat=-0.00117973*(-border[k+1]-34162.0);	
			var lng=-0.00117973*(82175.7-border[k]);

		/*	
	    var lat=((y_px-1-border[k+1])*dy+44.6438320168);
		var lng=(dx*(border[k]-88-1)-96.9579313);
       		
		var lat=40.3024337946+dy*(border[k+1]-88-0.5);	
	    var lng=(border[k]+11+0.5)*dx-96.9579313;
			

		*/
		}
		border_coord.push([lng,lat]);		
	}
	

	
	
	
	border_coord.push(border_coord[0]);
	
	
	var geojson_bordor={
    "type": "Feature",
    "properties": {"watershed": "1"},
    "geometry": {
        "type": "Polygon",   //LineString
        "coordinates": [border_coord]
    }
    };
	
	//console.log(geojson_bordor);


	draw_ifis_boundary(map,geojson_bordor,Huc_ws_trace_style,fit);
	//window["order_array"].push(geojson_bordor);
	//return geojson_bordor;	
	}//end of testing
}




function draw_ifis_boundary(map,json_data,Huc_ws_trace_style,ifis_search_result,fit){

//console.log("draws");
window["ifis_search_result"].clearLayers();
var result_display = L.geoJson(json_data, {
  style:Huc_ws_trace_style,onEachFeature: function (feature, layer) {
				
			//third_level_ws_boundary(feature,layer);
				
	
			}//end of oneach
				
			});


 result_display.addData(json_data);
  //console.log(result_display);
 //console.log(json_data);
 ifis_search_result_extend=result_display.getBounds();
window["third_level_boundary"]=ifis_search_result_extend;

if(fit=="fit"){
	 var ifis_search_result_extend=result_display.getBounds();
	  map.fitBounds(ifis_search_result_extend);
	 
 }
//result_display.bringToFront();
result_display.addTo(window["ifis_search_result"]);


for(var each in window["ifis_search_result"]["_layers"]){
	//console.log(each);
	window["ifis_search_result"]["_layers"][each].bringToBack();
}

//console.log(window["ifis_search_result"])

}


