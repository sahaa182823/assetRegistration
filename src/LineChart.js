import React from "react"
import { Bar } from 'react-chartjs-2';

export default class LineChart extends React.Component {
    render() {
       return (
            <div>
            <div className="row">

              
                    <div className ="col-sm-3" ></div>
                    <div className ="col-sm-6" >
                    <Bar data={this.props.chartData1}
                         options={{ 
                            title: {
                                display: true,                                
                                fontSize: 25
                                   },
                            legend: {
                                display: true,
                                position: "bottom"
                                    }
                                }}/>
                    </div>
                      <div className ="col-sm-3" ></div>
                   </div> 
                
           <div className="row">
               <div className ="col-sm-3"></div>
                    <div className ="col-sm-6">
                    <Bar data={this.props.chartData2}
                         options={{ 
                            title: {
                                display: true,                                
                                fontSize: 25
                                   },
                            legend: {
                                display: true,
                                position: "bottom"
                                    }
                                }}/>
                    </div>
                    <div className ="col-sm-3"></div>
                </div>
                </div>
          
        )
    }
}
