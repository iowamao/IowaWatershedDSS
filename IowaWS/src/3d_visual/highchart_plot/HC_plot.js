 $.ajax({
  url : '../../../CZO/data/IFC/BridgeSensor_CLRCRKS02.txt',
  dataType : 'text',
  jsonpCallback: 'getJson',
  success: handle_chart
});



function handle_chart(data) {
	var ploting_data=csvToArray(data);


var date=[];
var stage=[];
plotting(date,stage,"Time Series","Date","Gauge Height (ft)","feet",parseInt(date.length));

}







/* '../../../CZO/data/IFC/BridgeSensor_CLRCRKS02.txt' */







function csvToArray(csvString){
  // The array we're going to build
  var csvArray   = [];
  // Break it into rows to start
  var csvRows=csvString.split(/\n/);
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
				renderTo: document.getElementById('plot')
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