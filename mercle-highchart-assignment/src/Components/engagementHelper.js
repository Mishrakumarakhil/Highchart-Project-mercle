import { messageCountList } from './Utils/MessageList';
import { channels } from './Utils/Channels';


  
  function findDuplicatesWithFullData(list) {
    const duplicateIds = [];
    const duplicateObjects = [];
  
    const idsMap = new Map();
  
    list.forEach((item) => {
      const channelId = item.channelId;
      if (idsMap.has(channelId)) {
        if (!duplicateIds.includes(channelId)) {
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
    const  updatedData = duplicates.map(item => ({
      
        x:   new Date(item.timeBucket).getTime() / 1000,
        y: +item.count,
        channelId:item.channelId

 
      }));
  
      updatedData.forEach((item) => {
      const channelId = item.channelId;
      if (!dataByChannel[channelId]) {
        dataByChannel[channelId] = [];
      }
      dataByChannel[channelId].push(item);
    });
  
  
    const result = Object.entries(dataByChannel).map(([channelId, data]) => {
      const channelObj = channels.find((channel) => channel.id === channelId);

  
     

    console.log(updatedData)
  
      return {
        name: channelObj ? channelObj.name : null,
        // color:"red",
        data: data,
      };
    });
  
    return result;
  }
  

  

  




  
const engagementHelper = {
    engagementMessageOverTimeChartOptions: function (messageCountList, channels) {
   
  

      const duplicates = findDuplicatesWithFullData(messageCountList);

      const formatteddata=sereisDataFormation(duplicates,channels)

console.log("formatteddata",formatteddata)
      const chartOptions = { 
        
        chart: { 
            type: "spline", 
             backgroundColor: "transparent",
        },

        xAxis:{
            type:"datetime",
        },
        series: formatteddata,
            

          




          
            

    }
    return chartOptions

}
 
  }

  

  
  export { engagementHelper, messageCountList, channels };