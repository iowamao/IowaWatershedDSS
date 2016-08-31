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
function instant_watershed(lat, lng, type,fit) {
	
	
	
  var dy = -(44.53785-40.133331)/1057;
  var dx = (-89.89942+97.154167)/1741;
  var y = 1057-1-Math.round((lat-44.53785)/dy);
  var x = 1+Math.round((lng+97.154167)/dx);
  if (x<1) x=2;
  if (y<1) y=1;
  if (x>1740) x=1740;
  if (y>1057) y=1057;
  //console.log(x+"  "+y);
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
	]
	
	

	
	
	
	
	
	//console.log('x: '+x+' / y: '+y);
    console.log("tg"+apprunning);
	if (apprunning){
		console.log("2nd time");
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
			imageObj.src = 'data/IFIS_500m.png';	
        		
		}else{
			imageObj.src = 'data/IFIS_500m.png';
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
	
	//	 console.log('process');
	//	 console.log(process);
             
			

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
		    //console.log('Image Load: '+(t3-t1)+' - Array length: '+border.length);
		 //   console.log('Boundary: '+(t5-t3)+' - Array length: '+border.length);
		 //   console.log('Boundary: '+(t5-t1)+' - Array length: '+border.length);
            
			
			
			
			cell_coord_conversion(border,fit);
			 
			 
			apprunning=false;
			
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

var geojson_bordor_group;
function instant_watershed_max_cell(lat, lng, type) { 
	geojson_bordor_group=[];
	
	
  var dy = -(44.53785-40.133331)/1057;
  var dx = (-89.89942+97.154167)/1741;
  var y = 1057-1-Math.round((lat-44.53785)/dy);
  var x = 1+Math.round((lng+97.154167)/dx);
  if (x<1) x=2;
  if (y<1) y=1;
  if (x>1740) x=1740;
  if (y>1057) y=1057;
  //console.log(x+"  "+y);
	
	
	var x_org=x;
	var y_org=y;

	/*
 var cell_offset=[
 [0,0],
 [1,0],
 [1,1],
 [1,-1],
 [-1,0],
 [-1,1],
 [-1,-1],
 [0,1],
 [0,-1], 
 ];
*/
 var cell_offset=[
 [0,0],

  
 ];


	
	
	
    console.log("tg"+apprunning);
	if (apprunning){
		console.log("2nd time");
		return;		
	}		
	else{
		apprunning=true;
		
	}		

		for( var offs=0; offs<cell_offset.length; offs++) {
	
	

	
	x=x_org+cell_offset[offs][0];
	y=y_org+cell_offset[offs][1];	
	
	console.log('x: '+x+' / y: '+y);
	

	
	
	t1 = Date.now();
	if (watershed_image_data.length==0) {
		load_image();
	} else {
		find_watershed();
	}
	
}	
console.log(geojson_bordor_group);
	

	function load_image() {
		var imageObj = new Image();
		imageObj.onload = function() {
			load_imagedata(this);
		};
		if (type==500){
			imageObj.src = 'data/IFIS_500m.png';	
        		
		}else{
			imageObj.src = 'data/IFIS_500m.png';
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
	
	//	 console.log('process');
	//	 console.log(process);
             
			

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
		    //console.log('Image Load: '+(t3-t1)+' - Array length: '+border.length);
		 //   console.log('Boundary: '+(t5-t3)+' - Array length: '+border.length);
		 //   console.log('Boundary: '+(t5-t1)+' - Array length: '+border.length);
            
			
			
			
			cell_coord_conversion_group(border);
			 
			 
			apprunning=false;
			
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
















	







function cell_coord_conversion(border,fit){
	
	var border_coord=[];
	var dy = -(44.53785-40.133331)/1057;
    var dx = (-89.89942+97.154167)/1741;
	
	
	for( var k=0;k<border.length;k=k+2){
		
		var lng=(dx*(border[k]-1)-97.154167);
        var lat=((1057-1-border[k+1])*dy+44.53785);
		
		border_coord.push([lng,lat]);
		
	}
	
	border_coord.push(border_coord[0]);
	
//	console.log(border_coord);
	var geojson_bordor={
    "type": "Feature",
    "properties": {"watershed": "1"},
    "geometry": {
        "type": "Polygon",   //LineString
        "coordinates": [border_coord]
    }
    };
	
	
	//console.log(geojson_bordor);
	
	console.log(geojson_bordor);
	
	draw_ifis_boundary(geojson_bordor,fit);
	return geojson_bordor;	
	
	
}


function cell_coord_conversion_group(border){	
	var border_coord=[];
	var dy = -(44.53785-40.133331)/1057;
    var dx = (-89.89942+97.154167)/1741;
	
	
	for( var k=0;k<border.length;k=k+2){
		
		var lng=(dx*(border[k]-1)-97.154167);
        var lat=((1057-1-border[k+1])*dy+44.53785);
		
		border_coord.push([lng,lat]);
		
	}
	
	border_coord.push(border_coord[0]);
	
//	console.log(border_coord);
	geojson_bordor_group.push({
    "type": "Feature",
    "properties": {"watershed": "1"},
    "geometry": {
        "type": "Polygon",   //LineString
        "coordinates": [border_coord]
    }
    });
	
	
	//console.log(geojson_bordor);
	
	//console.log(geojson_bordor_group);
	
	//draw_ifis_boundary(geojson_bordor);
	//return geojson_bordor_group;	
	if(geojson_bordor_group.length>7){
		draw_ifis_boundary(geojson_bordor_group,fit);
	}
	
	
}
