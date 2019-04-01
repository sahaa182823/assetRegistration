import React from 'react'
import axios from 'axios';
import {CSVLink, CSVDownload} from 'react-csv';
import $ from 'jquery'

import {serverUrl} from './UrlConstants'



import './viewAvailable.css'

export default class ViewAvailable extends React.Component {
    constructor(props, context) {
        super(props, context)
          this.state = {
            availableAssets : [],
              assetType : ''
          }

    }

           filterItems=(val, type)=> {
     switch (type) {
        case 'assetType':
        this.setState({assetType: val});
        break;
      default:
        break;
    }
  }


      componentWillMount(){
    this.getAvailableAssets();
  } 
    getAvailableAssets() // here we are using jquery but u can also use axios and superAgent to fetch json data from other API's
        {
                    axios.get("http://"+serverUrl+"/api/available_asset").then( res => 

        {
            console.log(res.data)
            const availableAssets = res.data;
           this.setState({availableAssets});
           

        });
     }

     

     render(){
         console.log(this.state.availableAssets)
        var filteredItems = this.state.availableAssets;
        // var state = this.state;

            ["assetType","All"].forEach((filterBy) => {
        console.log(filterBy)
      var filterValue = this.state[filterBy];
        if(filterValue === "All"){
          return filteredItems;
      }
      if (filterValue) {
        filteredItems = filteredItems.filter((item) => {
            console.log(item[filterBy])
          return item[filterBy] === filterValue;
        });
      }

});

       var assetTypeArray =  $.unique(this.state.availableAssets.map((item)=> 
    { 
        return item.assetType 
    }));

    return(
        <div className="container">
          <FilterOptions 
            data={this.state.availableAssets} 
           assetTypeOption ={assetTypeArray}
            changeOption={this.filterItems} />
            <div className="filter-form">
          <FilterItems data={filteredItems} />
          </div>
        </div>
    );
     }

    }

    class FilterOptions extends React.Component{
        changeOption(type, e) {
    var val = e.target.value;

    this.props.changeOption(val, type);
  }

 

  render() {
    return (
        <div className="container" > <br/> <br/>
            <div className="row">
                 
                <div className="col-sm-3">
                <b>AssetType: &nbsp;</b><select id="AssetType" onChange={this.changeOption.bind(this, 'assetType')} >
                 <option selected={true} >All</option>
                    {this.props.assetTypeOption.map((option) => 
                            {
                                console.log(option)
                                return ( 
                                        <option key={option} value={option}>{option}</option> )
                            })}
                </select>
            </div>
            <div className="col-sm-4"></div>
             <div className="col-sm-5"></div>
        </div>
        <br/><br/>   </div>
        
        
    );
  }

    }

class FilterItems extends React.Component{
      dateTime= new Date();
  render() {
      let availableAssetsLists ;
    console.log(this.props.data)

        if(this.props.data){
            availableAssetsLists = this.props.data.map((availableAsset,index) => {
                
                
                    return(
                        
                        <tr>
                           <td key={index+"a"}> {availableAsset.assetId} </td> 
                           <td key={index+"b"}> {availableAsset.assetType}</td>               
                           <td key={index+"c"}> {availableAsset.makeModel}</td>
                           <td key={index+"d"} title={availableAsset.assetSpecification}>{availableAsset.assetSpecification.slice(0,20)}</td>
                           <td key={index+"e"}> {availableAsset.assignedDate}</td>
                                                  
                          
                        </tr>
                     
                    );
            });
        }
         return (
               <div class="container-fluid">
                        <table class="table table-hover table-bordered" width="100%">
                            <thead>
                                <tr className="table_head">
                                    <th className="text-center">AssetID</th>
                                    <th className="text-center">AssetType</th>
                                    <th className="text-center">Make&Model</th>
                                    <th className="text-center">Specifications</th>
                                    <th className="text-center">RegisterDate</th>
                                    
                                    

                                </tr>
                            </thead>
                            <tbody>
                              {availableAssetsLists}
                            </tbody>
                        </table>
                            <CSVLink data={this.props.data} filename={"Available Assets on "+this.dateTime+".csv"} className="btn btn-primary" target="_blank">
                                Download Excel file
                            </CSVLink>
                        
                        <br/> <br/> <br/>
          
                    </div>
        );


  }
}
