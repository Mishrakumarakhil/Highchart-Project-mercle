import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {engagementHelper,messageCountList, channels} from "./engagementHelper";

const EngagementMessagesOverTime=()=> {

 const options = engagementHelper.engagementMessageOverTimeChartOptions(messageCountList, channels)
 
  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  )
}

export default  EngagementMessagesOverTime;
