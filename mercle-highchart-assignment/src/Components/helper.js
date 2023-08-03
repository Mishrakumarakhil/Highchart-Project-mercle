export const  findDuplicatesWithFullData=(list)=> {
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

export const sereisDataFormation=(duplicates, channels)=> {
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
			color: "#008f8d",
			data: data,
		};
	});
	return result;
}