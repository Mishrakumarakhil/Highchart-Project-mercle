import {messageCountList}from './Utils/MessageList';
import {channels}from './Utils/Channels';

function findDuplicatesWithFullData(list) {
	const duplicateIds = [];
	const duplicateObjects = [];
	const idsMap = new Map();
	list.forEach((item) => {
		const channelId = item.channelId;
		if(idsMap.has(channelId)) {
			if(!duplicateIds.includes(channelId)) {
				duplicateIds.push(channelId);
				duplicateObjects.push(idsMap.get(channelId));
			}
			duplicateObjects.push(item);
		} else {
			idsMap.set(channelId, item);
		}
	});
	return duplicateObjects;
}

function sereisDataFormation(duplicates, channels) {
	const dataByChannel = {};
	const updatedData = duplicates.map(item => ({
		x: new Date(item.timeBucket).getTime(),
		y: +item.count,
		channelId: item.channelId
	}));
	updatedData.forEach((item) => {
		const channelId = item.channelId;
		if(!dataByChannel[channelId]) {
			dataByChannel[channelId] = [];
		}
		dataByChannel[channelId].push(item);
	});
	const result = Object.entries(dataByChannel).map(([channelId, data]) => {
		const channelObj = channels.find((channel) => channel.id === channelId);
		return {
			name: channelObj ? channelObj.name : null,
			color: "#1b474d",
			data: data,
		};
	});
	return result;
}
const engagementHelper = {
	engagementMessageOverTimeChartOptions: function(messageCountList, channels) {
		const duplicates = findDuplicatesWithFullData(messageCountList);
		const formatteddata = sereisDataFormation(duplicates, channels)
		console.log("formatteddata", formatteddata)
		const chartOptions = {
			chart: {
				type: "spline",
				backgroundColor: "transparent",
				style: {
					fontFamily: "'Roboto', sans-serif",
					fontSize: 12,
				},
			},
			credits: {
				enabled: false,
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
				gridLineColor: "#ccd6eb",
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
			plotOptions: {
				series: {
					marker: {
						radius: 4,
						enabled: true,
						symbol: "circle",
					},
				},
			},
			tooltip: {
				followPointer: true,
				followTouchMove: true,
				outside: true,
				crosshairs: true,
				useHTML: true,
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
				backgroundColor: "#fff",
				borderRadius: 6,
			},
			legend: {
				itemStyle: {
					fontWeight: 500,
					fontFamily: "'Roboto', sans-serif",
					textTransform: "normal",
				},
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