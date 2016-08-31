// JavaScript Document

function csvToArray(csvString){
  // The array we're going to build
  var csvArray   = [];
  // Break it into rows to start
  var csvRows    = csvString.split(/\n/);    // old \n
  // Take off the first line to get the headers, then split that into an array
  var csvHeaders = csvRows.shift().split(',');

  // Loop through remaining rows
  for(var rowIndex = 0; rowIndex < csvRows.length; ++rowIndex){
    var rowArray  = csvRows[rowIndex].split(',');

    // Create a new row object to store our data.
    var rowObject = csvArray[rowIndex] = {};
    
    // Then iterate through the remaining properties and use the headers as keys
    for(var propIndex = 0; propIndex < rowArray.length; ++propIndex){
      // Grab the value from the row array we're looping through...
      var propValue =   rowArray[propIndex].replace(/^"|"$/g,'');
      // ...also grab the relevant header (the RegExp in both of these removes quotes)
      var propLabel = csvHeaders[propIndex].replace(/^"|"$/g,'');;

      rowObject[propLabel] = propValue;

    }
  }

  return csvArray;
  
}






function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
 


function JSONToYAMLConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
   
    
	
	 "use strict";
    var YAML = window.YAML
    , json
    , data
    , yml
    ;
   console.log(JSONData);
    //data = JSON.parse(cliped_data);
    yml = YAML.stringify(JSONData);
    console.log(yml);
	
	
	
    //Generate a file name
    var fileName = "MyCZO_Data_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(yml);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".txt";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
 
















function plotting_two(xd,yd1,yd2,title,xl,yl,xunit,ticks){	
////console.log(xd);
////console.log(yd);
	
//void require('http://www.macwright.org/simple-statistics/simple_statistics.js');
//console.log("koa");	
//console.log(ticks);	
				
	 var chart = new Highcharts.Chart({
            chart: {

				zoomType: 'xy',
                type: 'line',
				renderTo: document.getElementById('ploting_area')
            },
		    legend: {
            enabled: true
                                  },     
			
		
		
            title: {
                text: title,
				 style: {
                    fontWeight: 'normal',					
					color:'black',
					fontFamily:'Calibri',
					fontSize:'20px'
                
                }
            },
            xAxis: {
                categories: xd,
                tickmarkPlacement: 'on',
				tickInterval: Math.floor(ticks/8),
                title: {
                    enabled: false,
					text: 'Date (M/D/YYYY  H:MM)'+'<br/>',
					
					
			 style: {
                    fontWeight: 'normal',
					color:'black',
					fontFamily:'Calibri',
					fontSize:'18px'
                }
					
                },
			
            },
            yAxis: {
				
				title: {
                    enabled: true,
					text: yl,
					 style: {
                    fontWeight: 'normal',
					color:'black',
					fontFamily:'Calibri',
					fontSize:'18px'
                }
                },
				labels:{
				format: '{value}'	
				},
				
			
									
            },
			
            tooltip: {
                
				
                valueSuffix: yl,
				
		formatter: function() {
                return 'Depth <b>'+ this.y+'</b> (ft)'+' at time <b>'+ this.x+'<br/>';
            }
				
				  /* formatter: function() {
                var s = 'Distance: '+ this.x +' feet';
                
                $.each(this.points, function(i, point) {
                    s += '<br/>'+ point.series.name +': '+
                        point.y.toFixed(2) +' feet';
                });
                
                return s;
            },
            shared: true,
			valueDecimals: 2,
			*/

			
            },
            plotOptions: {
				
				series: {
				//	stacking:"null"
               
            },
               line: {
                    lineWidth: 2,
                    marker: {
						enabled:false,
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                },showInLegend: true
            },
            series: [ 
			{
				 name: 'Raw Data',
				color: 'green',
                data: yd1
                
            },
			{
				 name: 'Provisional Data',
				color: 'blue',
                data: yd2
                
            },
			
			
			
			
			
			]
        });
		
}



function plotting(xd,yd,title,xl,yl,xunit,ticks){	
////console.log(xd);
////console.log(yd);
	
//void require('http://www.macwright.org/simple-statistics/simple_statistics.js');
//console.log("koa");	
//console.log(ticks);	
				
	 var chart = new Highcharts.Chart({
            chart: {

				zoomType: 'xy',
                type: 'line',
				renderTo: document.getElementById('ploting_area')
            },
		    legend: {
            enabled: false
                                  },     
			
		
		
            title: {
                text: title,
				 style: {
                    fontWeight: 'normal',					
					color:'black',
					fontFamily:'Calibri',
					fontSize:'20px'
                
                }
            },
            xAxis: {
                categories: xd,
                tickmarkPlacement: 'on',
				tickInterval: Math.floor(ticks/8),
                title: {
                    enabled: false,
					text: 'Date (M/D/YYYY  H:MM)'+'<br/>',
					
					
			 style: {
                    fontWeight: 'normal',
					color:'black',
					fontFamily:'Calibri',
					fontSize:'18px'
                }
					
                },
			
            },
            yAxis: {
				
				title: {
                    enabled: true,
					text: yl,
					 style: {
                    fontWeight: 'normal',
					color:'black',
					fontFamily:'Calibri',
					fontSize:'18px'
                }
                },
				labels:{
				format: '{value}'	
				},
				
			
									
            },
			
            tooltip: {
                
				
                valueSuffix: yl,
				
		formatter: function() {
                return 'Depth <b>'+ this.y+'</b> (ft)'+' at time <b>'+ this.x+'<br/>';
            }
				
				  /* formatter: function() {
                var s = 'Distance: '+ this.x +' feet';
                
                $.each(this.points, function(i, point) {
                    s += '<br/>'+ point.series.name +': '+
                        point.y.toFixed(2) +' feet';
                });
                
                return s;
            },
            shared: true,
			valueDecimals: 2,
			*/

			
            },
            plotOptions: {
				
				series: {
					stacking:"null"
               
            },
               line: {
                    lineWidth: 2,
                    marker: {
						enabled:false,
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                },showInLegend: true
            },
            series: [ 
			{
				 name: 'Reference',
				color: 'green',
                data: yd
                
            },
			
			
			
			
			
			]
        });
				
	
		
}









