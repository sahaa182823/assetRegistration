import React from 'react'
import axios from 'axios';
import moment from 'moment';
import {CSVLink, CSVDownload} from 'react-csv';
import './AssignedHistory.css'
import $ from 'jquery'
import {serverUrl} from './UrlConstants'


export default class AssignedHistory extends React.Component{
    constructor(props, context) {
        super(props, context)
        this.state = {
            historyItems : [], 
            assetType: '',
            organization:'',
            AssignDate:'' ,
            ReleasedDate:'',
            filter: 1     
        }  
    }

      captureAssignDate = event => {
        const value = event.target.value;
        let AssignDate;
        this.setState({AssignDate : value})
        
      }
    captureReleasedDate = event => {
      const value = event.target.value;
        let ReleasedDate;
        this.setState({ReleasedDate : value})
        
    }

    filterDate(e){

         let timeEnd= moment(this.state.ReleasedDate);
     let startDate = moment(this.state.AssignDate);
    const diff = timeEnd.diff(startDate);
    const diffDuration = moment.duration(diff);
    console.log(this.state.AssignDate)
    console.log(this.state.ReleasedDate)
    console.log(diffDuration)
    console.log(diff)
    console.log("Days:", diffDuration.days());
      e.preventDefault()
      if(diffDuration.days()>0){
      axios.get(`http://${serverUrl}/api/historyOnDateFilter/${this.state.AssignDate}/${this.state.ReleasedDate}`)
           .then(res => {
                console.log(res.data)
                const filterData = res.data;
                this.setState({filterData});
                console.log(filterData);
                this.setState({filter : 0});
            });
      }
      else
      {
          window.alert(" 'To' date cannot be earlier than 'From' date.")
      }
          
  }

//   resetFilters(e){
//       e.preventDefault()
//       window.location.reload();
//     }

//      ResetData(e){
//   e.preventDefault()
//   window.location.reload();
//      }

    filterItems=(val, type)=> {
     switch (type) {
      case 'organization':
        this.setState({organization: val});
        break;
        case 'assetType':
        this.setState({assetType: val});
        break;
      default:
        break;
    }
  }

  componentWillMount(){
    this.getTodos();
  } 
    getTodos() // here we are using jquery but u can also use axios and superAgent to fetch json data from other API's
        {
                    axios.get("http://"+serverUrl+"/api/get_history").then( res => 
        {
            console.log(res.data)
            const historyItems = res.data;
           this.setState({historyItems});
           console.log(this.state.historyItems)
           

        });
     }

       changeOption(type, e) {
    var val = e.target.value;
    console.log(val)
    console.log(type)
    this.filterItems(val, type);
  } 

     render(){
           console.log(this.state.historyItems)
        var filteredItems = this.state.historyItems;
    // var state = this.state;

    ["organization","assetType","All"].forEach((filterBy) => {
      var filterValue = this.state[filterBy];
      if(filterValue === "All"){
          return filteredItems;
      }
      if (filterValue) {
        filteredItems = filteredItems.filter((item) => {
          return item[filterBy] === filterValue;
        });
      }
    });
    // var filterValue;
    // if(filterValue === "All"){
    //     return filteredItems;
    // }


    console.log(this.state.organization)
    var organizationArray = $.unique(this.state.historyItems.map((item) =>
    { 
        console.log(organizationArray)
        return item.organization
 
    }));
        var assetTypeArray =  $.unique(this.state.historyItems.map((item)=> 
    { 
        return item.assetType 
    }));
         return(
             <div className="container">
             
                        <br/><br/>
                        <div className="row">
                            <div className="col-sm-5" > </div>
                            <div className="col-sm-7 date_range_text" ><b>&nbsp;&nbsp;Assigned Date Range</b></div>
                        </div>


        <div className="row">
                
                <div className="col-sm-3" >
                   <b> OrgName: &nbsp;</b>
                      <select id="organization"  onChange={this.changeOption.bind(this, 'organization')} >
                      <option selected={true}>All</option>
                      {organizationArray.map((option) => 
                      {
                          console.log(option)
                          return ( 
                              
                              <option key={option} value={option}>{option}</option> )
                      })}
                      </select>
            </div>
            <div className="col-sm-3" > 
                    <b>  AssetType: &nbsp;</b>
                      <select id="AssetType"  onChange={this.changeOption.bind(this, 'assetType')} >
                      <option selected={true}>All</option>
                      {assetTypeArray.map((option) => 
                      {
                          console.log(option)
                          return ( 
                              <option key={option} value={option}>{option}</option> )
                      })}
                      </select>
            </div>
                <div className="col-sm-6 date_box" >
                
                     <b id="date_filter">From: &nbsp;</b>
                      <input type="date" name="AssignDate" onChange={this.captureAssignDate.bind(this)}/> &nbsp;&nbsp;
                      <b>To: &nbsp;</b>
               <input type="date" name="ReleaseDate" onChange={this.captureReleasedDate.bind(this)}/>&nbsp;&nbsp;
               <button type="submit" class="btn btn-primary btn-sm" name="ReleaseDate" onClick={this.filterDate.bind(this)}>Search</button>&nbsp;&nbsp;
                 <input type="reset" class="btn btn-primary search_btn btn-sm" />&nbsp;
                        
           </div>
            
     </div>
    

        <div className="filter-form"><br/><br/>
          <FilterItems data={filteredItems} filterData={this.state.filterData} filter={this.state.filter}/>

        
         </div>
		 </div>
         );
     }
}



class FilterItems extends React.Component {

   dateTime= new Date();

    render(){

      let historyItemsLists ;
      console.log(this.props.data)

        if(this.props.data && this.props.filter === 1){
            historyItemsLists = this.props.data.map((historyItem,index) => {
                
                
                    return(
                        
                        <tr>
                           <td key={index+"a"}> {historyItem.assetId} </td>  
                           <td key={index+"b"}> {historyItem.empId}</td>
                           <td key={index+"c"}> {historyItem.empName}</td>
                           <td key={index+"d"}> {historyItem.assetType}</td>
                           <td key={index+"e"}> {historyItem.makeModel}</td>              
                           <td key={index+"f"} title={historyItem.assetSpecifications}> 
                                {historyItem.assetSpecifications.slice(0,20)}  
                            </td>
                           <td key={index+"g"}>{historyItem.organization}</td>
                           <td key={index+"h"}> {historyItem.assignedDate}</td>
                           <td key={index+"i"}> {historyItem.releasedDate}</td>          
                           <td key={index+"j"}> {historyItem.createDateTime}</td>                 
                          
                        </tr>
                     
                    );
            });
        }
        else if(this.props.filterData && this.props.filter === 0){
            historyItemsLists = this.props.filterData.map((historyItem,index) => {
               
                
                console.log(historyItem);
                    return(

                        
                        <tr>
                            <td key={index+"a"}> {historyItem.assetId} </td>  
                           <td key={index+"b"}> {historyItem.empId}</td>
                           <td key={index+"c"}> {historyItem.empName}</td>
                           <td key={index+"d"}> {historyItem.assetType}</td>
                           <td key={index+"e"}> {historyItem.makeModel}</td>              
                           <td key={index+"f"} title={historyItem.assetSpecifications}> 
                                {historyItem.assetSpecifications.slice(0,20)}  
                            </td>
                           <td key={index+"g"}>{historyItem.organization}</td>
                           <td key={index+"h"}> {historyItem.assignedDate}</td>
                           <td key={index+"i"}> {historyItem.releasedDate}</td>          
                           <td key={index+"j"}> {historyItem.createDateTime}</td>
                           
                           
                        </tr>
                     
                    );
            });
        }

        return (
               <div class="container">
               
              
                  
                
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr className="table_head">
                                    <th className="text-center">AssetID</th>
                                    <th className="text-center">EmpID</th>
                                    <th className="text-center">EmpName</th>
                                    <th className="text-center">AssetType</th>
                                    <th className="text-center">Make&Model</th>
                                    <th className="text-center">Specifications</th>
                                    <th className="text-center">Organization</th>
                                    <th className="text-center">AssignedDate</th>
                                    <th className="text-center">ExpectedReleaseDate</th>
                                    <th className="text-center">ActualReleaseDate</th>
                                    

                                </tr>
                            </thead>
                            <tbody>
                              {historyItemsLists}


                            </tbody>
                        </table>
                            <CSVLink data={this.props.data} filename={"AssetHistory on "+this.dateTime+".csv"} className="btn btn-primary" target="_blank">
                                Download Excel file
                            </CSVLink>

                            <br/> <br/> <br/>
                    </div>
        );
    }
}