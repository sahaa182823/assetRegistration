import React, { Component } from "react";
import LineChart from './LineChart'
import axios from 'axios';
import {serverUrl} from './UrlConstants';

class ProgramGraph extends React.Component {
      constructor(props) {
    super(props);

    this.state = {
        barData1: {
                labels: [],
                datasets: [
                    {
                       label: 'Assigned Asset Details',
                       backgroundColor:'rgba(54, 162, 235, 0.6)',                                   
                    
                       data: [],
                        
                    },
                  
                ]
            },
            barData2:{
                        labels: [],
                        datasets: [
                              {
                        label: 'Available Asset Details',
                        backgroundColor:'rgba(255, 206, 86, 0.6)',
                        data:[],
                        
                    }
                        ]
            }

    };
  }



   componentDidMount() {
        this.getAvailableAsset(); 
        this.getAssignedAsset();  
    }


    getAssignedAsset(){
             axios
            .get("http://"+serverUrl+"/api/assignedAssetCount ")
            .then(res => {
                console.log(res.data)
                const AssignedassetType = res.data;
               
                console.log(res.data.length)
         
                this.manageAssignedData(res.data,res.data.length);
                    

            });
    }

    //----------------------------------------------------------------------

    getAvailableAsset() {
        axios
            .get("http://"+serverUrl+"/api/availableAssetCount")
            .then(res => {
                console.log(res.data.length)
                const AvailableassetType = res.data;
                
                this.manageAvailableData(res.data,res.data.length);
            });
    }

   //-----------------------------------------------------------------------
    manageAvailableData=(AvailableassetType,length)=>{
        let name = new Array();
        let qty= new Array();
        let y = {};
        let z = {};

         for(let i=0;i<length;i++)
            {
                     y=AvailableassetType[i][0]
                     name.push(y)

                     z=AvailableassetType[i][1]
                     qty.push(z)

    }
    console.log(name);
      

    let barData1 = {...this.state.barData1};

    barData1.labels=name;
    console.log(barData1.labels);

    barData1.datasets[0].data = qty;
    console.log(barData1.datasets[0].data);

    this.setState({barData1});

    

     
  
      
 

    
}
//---------------------------------------------------------------------
manageAssignedData=(AssignedassetType,length)=>{
        let name = new Array();
        let qty= new Array();
        let y = {};
        let z = {};

         for(let i=0;i<length;i++)
            {
                     y=AssignedassetType[i][0]
                     name.push(y)

                     z=AssignedassetType[i][1]
                     qty.push(z)

    }
    console.log(name)
    console.log(qty)

   let barData2 = {...this.state.barData2};

    barData2.labels=name;
    console.log(barData2.labels);

    barData2.datasets[0].data = qty;
    console.log(barData2.datasets[0].data);

    this.setState({barData2});
      
 

    
}
    render() {
        console.log(this.state.barData1)
        console.log(this.state.barData2)
   
    return (
      <div className="app">
        
     
                 
                                    
                     <LineChart chartData1={this.state.barData1} chartData2={this.state.barData2}/>
             
<br/><br/><br/>

      </div>
    );
  }


} 

export default ProgramGraph;
