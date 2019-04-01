import React from "react";
import { Bar, Line, Pie } from 'react-chartjs-2';
import LineChart from "./LineChart";
import axios from 'axios';

export default class Middle extends React.Component {
        constructor(props) {
        super(props);    
        this.state = {
            barData: {
                labels: [],
                datasets:  [
                     {
                       label: 'Assigned Assets',
                       backgroundColor:'rgba(54, 162, 235, 0.6)',
                          
                       data:this.getDataSourceState()
                        
                    },
                    {
                        label: 'Available Assets',
                        backgroundColor:'rgba(255, 206, 86, 0.6)',
                        data:this.getDataSourceState(),
                        
                    }
                ]
            },

            
    }
   

}

   componentDidMount() {
    this.getDataSourceState()
       
  this.setState(function(state) {
      return {
        barData: Object.assign({}, state.barData, { labels: this.props.chartLabel })
      };
    });
        
}

componentWillMount(){
    this.getDataSourceState()
}

getDataSourceState(){
    console.log(this.props.chartData)
    return this.props.chartData
}
render(){
    console.log(this.props.chartData)
    console.log(this.props.chartLabel)
    return(
        <div>
        
        <LineChart chartData={this.state.barData & this.props.chartLabel}/>
        </div>);
}
}