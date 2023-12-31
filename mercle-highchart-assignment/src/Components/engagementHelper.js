import {messageCountList}from './Utils/MessageList';
import {channels}from './Utils/Channels';
import { findDuplicatesWithFullData, sereisDataFormation } from './helper';

const engagementHelper = {engagementMessageOverTimeChartOptions: function(messageCountList, channels) {
		const duplicates = findDuplicatesWithFullData(messageCountList); // Find Duplicates in message Count list
		const formatteddata = sereisDataFormation(duplicates, channels) // formation may line chart series

		const chartOptions = {
			chart: {
				type: "spline",
				backgroundColor: "transparent",
				style: {
					fontFamily: "'Roboto', sans-serif",
					fontSize: 12,
				},
			},
            accessibility: {
                enabled: false
              },
            
			credits: {
				enabled: false, // hide highchart credit from bottom of chart
			},
			title: {
				text: " ",  
			},

			xAxis: {
				type: "datetime",
				tickInterval: 24 * 3600 * 1000, 
				dateTimeLabelFormats: {
					millisecond: "%l:%M %p",
					second: "%l:%M %p",
					minute: "%l:%M %p",
					hour: "%l:%M %p",
					day: "%e %b",
					week: "%e. %b",
					month: "%b '%y",
					year: "%Y",
				},
				tickLength: 10,
				tickWidth: 2,
				lineWidth: 2,
				labels: {
					style: {
						textTransform: "normal",
						color: "#3c4048",
						fontWeight: 500,
						fontSize: "12px"
					},
				},
			},
			yAxis: {
				gridLineWidth: 0,
				gridLineDashStyle: "none",
				gridLineColor: "",
				lineColor: "",
				lineWidth: 0,
				title: " ",
				tickLength: 10,
				tickWidth: 2,
				labels: {
					style: {
						textTransform: "normal",
						color: "#3c4048",
						fontWeight: 500,
						fontSize: "12px"
					},
				},
			},
			series: formatteddata,
			
			tooltip: {
				// followPointer: true,
				// followTouchMove: true,
				outside: true,
				crosshairs: true,
				useHTML: true,
                // shadow: false,
				formatter: function() {
					const unixTimestamp = this.x;
					const date = new Date(unixTimestamp);
					const options = {
						day: 'numeric',
						month: 'short'
					};
					const formattedDate = date.toLocaleDateString('en-US', options);
					return `${this.series.name} <br/>${this.y} message on ${formattedDate}</b>`;
				},
                backgroundColor: "#0c0c0f",
                // borderColor:"#008f8d",
                borderWidth:2,
             
                style: {
                    opacity:"0.8",
                    color: 'white',
                    background:"transparent",
                },
				
			},
            plotOptions: {
                series: {
                    marker: {
                            symbol: "circle",
                      
                        enabled: false, 
                        color:"#008f8d",
                    },
                }
            },
			legend: {
				itemStyle: {
					fontWeight: 500,
                    color:"white",
				},
                itemHoverStyle: {
                    color: 'white'
                },
                backgroundColor:"#15161b",
				alignColumns: false,
                
			}
		}
		return chartOptions
	}
}
export {
	engagementHelper,
	messageCountList,
	channels
};