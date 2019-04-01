import React from 'react';
import axios from 'axios';
import SweetAlert from "react-bootstrap-sweetalert";
import swal from 'sweetalert';
import './AssignAsset.css';
import moment from 'moment'
import {serverUrl} from './UrlConstants'


export default class AssignAsset extends React.Component {
        constructor(props, context) {
        super(props, context)
         this.state = {
            assetType : [],
            assetDetails: [],
             typeAsset:"",
                assetId:"",
                empId:"",
                empName:"",
                organization:"",
                registerDate:"",
                releaseDate:"",
                displayBody: 0 ,
                onExpand : false,
                bulk : [{
                    "assignedId":"",
                    "assetFkId":"",
                    "assetType":"",
                    "empId":"",
                    "empName":"",
                    "organization":"",
                    "assignedDate":"",
                    "releasedDate":"",
                    "createDateTime":"",
                    "updateDateTime":"",
                    "assigned":""
                }]
         }
    }
    addClick(){
        this.setState(prevState=>({
            bulk: [...prevState.bulk,{ 
                    "assignedId":"",
                    "assetFkId":"",
                    "assetType":"",
                    "empId":"",
                    "empName":"",
                    "organization":"",
                    "assignedDate":"",
                    "releasedDate":"",
                    "createDateTime":"",
                    "updateDateTime":"",
                    "assigned":""    
    }]

        }))
    }

      createUI(){
             let asset_types;
         if (this.state.assetType) {
            asset_types = this .state.assetType.map(type => {
                    return (

                        <option key={<type className="assetType"> </type>} value={type.assetType}>{type.assetType}</option>
                    );
                });

        }

         let assetListByType;
         if (this.state.assetDetails) {
            assetListByType = this .state.assetDetails.map(detail => {
                    return (

                         
                        <option key={<type className="assetType"> </type>} value={detail.assetId}>Id:{detail.assetId}, Make & Model:{detail.makeModel}, Specifications:{detail.assetSpecification}</option>
                        
                    );
                });

        }
               return this.state.bulk.map((el, i) => (<div>
                 <form >
                   <div class="assettype">
                   
                    <label class="type_label"><b>I want to assign :  &nbsp;  </b></label>
                    <select onChangeCapture={this.captureAssetType.bind(this)} id="type_select">
                    <option disabled={true} selected={true}>Select AssetType</option>
                          {asset_types}
                    </select>
            </div>
                            <br/>
        <p>{this.state.displayBody===1 &&   <div>
                    <div class="container">
                     <div class="row">
                            <div class="col-sm-4"></div>
                    <div class="col-sm-4 form-group">
                   <b>Asset Id:</b>
                    <select onChange={this.captureAssetId.bind(this)} class="form-control" id="sel1">
                    <option disabled={true} selected={true}>Select Asset</option>
                          {assetListByType}
                    </select>
                    </div>
                    <div class="col-sm-4"></div>
                    </div>

                        <div class="row">
                            <div class="col-sm-6">
                                
                    
                                <label>Employee ID:</label>
                                <input type="text" name="empId" minLength="1" maxLength="25" pattern="^(\w+\S+)$"  onChange={this.captureEmpId.bind(this)} required/>
                                <label>Employee Name:</label>
                                <input type="text"  name="empName" onChange={this.captureEmpName.bind(this)}/>
                                <label>Organization:</label>
                                <input type="text" name="makeModel" onChange={this.captureOrganization.bind(this)}/>
                                </div>

                                <div class="col-sm-6">

                                

                                <label>Assign Date:</label>
                                <input type="date" name="assignedDate" onChange={this.captureAssignDate.bind(this)}/>
                                <label>Release Date:</label>
                                <input type="date" name="releaseDate" onChange={this.captureReleaseDate.bind(this)}/>
                            </div>
                        </div>
                    </div>
                     <button type="submit" class="btn btn-success btn-sm"  value="Assign" onClick={this.onExpand.bind(this)}>+</button>
                    <button type="submit" class="btn btn-success btn-lg"  value="Assign" >Assign Asset</button> 
                    <button type="submit" class="btn btn-success btn-sm"  value="Assign" onClick={this.onCollapse.bind(this)}>-</button>                   
                    </div>} </p><br/>
                  
               </form>
                   </div>));
      }

      removeClick(i){
     let bulk = [...this.state.bulk];
     bulk.splice(i, 1);
     this.setState({ bulk });
  }


    componentDidMount() {
        this.getAssetType();
    }

    getAssetType() {
        axios

            .get("http://"+serverUrl+"/api/getAssetRecord")

            .then(res => {
                console.log(res.data)
                const assetType = res.data;
                this.setState({assetType});
                console.log(assetType);

            });
    }


     onAssetAssign = e => {

      let timeEnd= moment(this.state.releaseDate);
    let startDate = moment(this.state.assignDate);
    const diff = timeEnd.diff(startDate);
    const diffDuration = moment.duration(diff);
    console.log(this.state.assignDate)
    console.log(this.state.releaseDate)
    console.log(diffDuration)
    console.log(diff)
    console.log("Days:", diffDuration.days());
        e.preventDefault()
        console.log("Inside onAssetSubmit")
       console.log(this.state.assetId);
       console.log(this.state.assetType.assetSpecification);
       console.log(this.state.makeModel);
       console.log(this.state.registerDate);
       console.log(this.state.releaseDate);
       

      
 if(diffDuration.days()>0){
        axios.post(`http://${serverUrl}/api/assignAsset` ,{
"assignedId":"",
"assetFkId":this.state.assetId,
"assetType":this.state.typeAsset,
"empId":this.state.empId,
"empName":this.state.empName,
"organization":this.state.organization,
"assignedDate":this.state.assignDate,
"releasedDate":this.state.releaseDate,
"createDateTime":"",
"updateDateTime":"",
"assigned":""
        }, )

       .then(function (response) {
                 console.log(response.data.message);
         swal("Message: "+response.data.message, "",) 
    })

        document.getElementById("assignForm").reset();
 }
 else{
        window.alert("'To' date cannot be earlier than 'From' date.")
    }
    }

      captureAssetId = event => {
        const value = event.target.value;
        let assetId;
        this.setState({assetId : value})
        console.log("new id: "+this.state.assetId)
    }
     captureAssetType = event => {
        const value = event.target.value;
        let typeAsset;
        let displayBody;
        this.setState({displayBody : 1})
        this.setState({typeAsset : value}, () => {
    console.log(this.state.typeAsset);
  })
        console.log("new asset type: "+this.state.typeAsset)

        axios
            .get(`http://${serverUrl}/api/assetIdByType/${value}`)
            .then(res => {
                console.log(res.data)
                const assetDetails = res.data;
                this.setState({assetDetails});
                console.log(assetDetails);

            });


    }
    captureEmpId = event => {
        const value = event.target.value;
        let empId;
       this.setState({empId : value})
        console.log("new empId: "+this.state.empId)
    }
    captureEmpName = event => {
        const value = event.target.value;
        let empName;
        this.setState({empName : value})
        console.log("new empName: "+this.state.empName)
    }
    captureOrganization = event => {
        const value = event.target.value;
        let organization;
        this.setState({organization : value}, () => {
    console.log(this.state.organization);
  })
        console.log("new organization: "+ this.state.organization)
    }

     captureAssetTypea123456789 = event => {
        const value = event.target.value;
        let typeAsset;
        let displayBody;
        this.setState({displayBody : 1})
        this.setState({typeAsset : value}, () => {
    console.log(this.state.typeAsset);
  })
        console.log("new asset type: "+this.state.typeAsset)
     }

    captureAssignDate = event => {
        const value = event.target.value;
        let assignedDate;
        this.setState({assignDate : value})
        console.log("new assignDate: "+this.state.assignDate)
    }
    captureReleaseDate = event => {
        const value = event.target.value;
        let releaseDate;
        this.setState({releaseDate : value})
        console.log("new releaseDate: "+this.state.releaseDate)
        }
    onExpand = event => {
            this.setState({onExpand : true})
    }

    onCollapse = event => {
            this.setState({onExpand : false})
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
      axios.get(`http://${serverUrl}/api/assigeee/${this.state.AssignDate}/${this.state.ReleasedDate}`)
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

    render() {

        let asset_types;
         if (this.state.assetType) {
            asset_types = this .state.assetType.map(type => {
                    return (

                        <option key={<type className="assetType"> </type>} value={type.assetType}>{type.assetType}</option>
                    );
                });

        }

         let assetListByType;
         if (this.state.assetDetails) {
            assetListByType = this .state.assetDetails.map(detail => {
                    return (

                         
                        <option key={<type className="assetType"> </type>} value={detail.assetId}>Id:{detail.assetId}, Make & Model:{detail.makeModel}</option>
                        
                    );
                });

        }

        
        
        

        return (
            <div>
            
                <br/><br/><br/>
                <form name="assign-form" id="assignForm" onSubmit={this.onAssetAssign.bind(this)}>
                   <div class="assettype">
                   
                    <label class="type_label"><b>I want to assign :  &nbsp;  </b></label>
                    <select onChangeCapture={this.captureAssetType.bind(this)} id="type_select">
                    <option disabled={true} selected={true}>Select AssetType</option>
                          {asset_types}
                    </select>
            </div>
                            <br/><br/><br/>
        <p>{this.state.displayBody===1 &&   <div>
                    <div className="container mainForm">
                     <div class="row">
                            <div class="col-sm-5">
                             <label class="id_label"> Asset Id : </label>
                            </div>
                    <div class="col-sm-3 form-group">
                   
                    <select onChange={this.captureAssetId.bind(this)} class="form-control" id="sel1">
                    <option disabled={true} selected={true}>Select Asset</option>
                          {assetListByType}
                    </select>   
                    </div>
                    <div class="col-sm-4"></div>
                    </div>
                    
                        <br/><br/>
                        
                        <div className="row">
                        <div className="col-sm-2"> </div>
                            <div className="col-sm-3 left-body">
                                
                                 <div class="form-group">
                                <strong>Employee ID:&nbsp;</strong>
                                <input class="form-control" type="text" name="empId" minLength="1" maxLength="25" pattern="^(\w+\S+)$" onChange={this.captureEmpId.bind(this)} required/></div> <br/><br/>
                                
                                 <div class="form-group">
                                <strong>Employee Name:&nbsp;</strong>
                                <input class="form-control" type="text"  name="empName" onChange={this.captureEmpName.bind(this)} required/>
                                </div> <br/><br/>
                                
                                 <div class="form-group">
                                <strong>Organization:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                   
                                <select class="form-control" onChange={this.captureOrganization.bind(this)} required >
                                        <option  key ="1" disabled={true} selected={true}>Select Organization</option>
                                        <option key ="2" value="Telstra">Telstra</option>
                                        <option key ="3" value="Cognizant">Cognizant</option>
                                </select>
                                </div>
                               
                                </div>
                                
                                <div class="col-sm-2"> </div>

                                <div className="col-sm-3 right-body">                                
                                 <div class="form-group">
                                <strong>Assign Date:&nbsp;</strong>
                                <input class="form-control" type="date" name="assignedDate" onChange={this.captureAssignDate.bind(this)} required/> </div> <br/><br/>   
                                
                                 <div class="form-group">
                                <strong>Release Date:&nbsp;</strong>
                                <input class="form-control" type="date" name="releaseDate" onChange={this.captureReleaseDate.bind(this)}/>
                                </div>
                            </div>
                           <div class="col-sm-2"> </div>
                        </div>
                       
                    </div>
                    <br/><br/>
                    <button type="submit" class="btn btn-success btn-md"  value="Assign">Assign Asset</button> 
                                     
                    </div>} </p><br/>
              
               </form>
                   
               



            </div>
        );
    }
}