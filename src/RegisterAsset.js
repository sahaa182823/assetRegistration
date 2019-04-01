import React from 'react'
import axios from 'axios';
// import SweetAlert from "react-bootstrap-sweetalert";
import swal from 'sweetalert';
import './RegisterAsset.css';
import moment from 'moment';

import {serverUrl} from './UrlConstants'

export default class RegisterAsset extends React.Component {
    constructor(props, context) {
        super(props, context)
         this.state = {
            assetType : [],
             typeAsset:"",
                assetId:"",
                makeModel:"",
                assetSpecification:"",
                registerDate:"",
                releaseDate:"" ,
                displayBody: 0
         }
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


     onAssetSubmit = e => {

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
        console.log("Inside onAssetRegister")
       console.log(this.state.assetId);
       console.log(this.state.assetSpecification);
       console.log(this.state.makeModel);
       console.log(this.state.assignDate);
       console.log(this.state.releaseDate);
       

        axios.post(`http://${serverUrl}/api/registerAsset` ,{
"registeredId":"",
"assetId":this.state.assetId,
"assetType":this.state.typeAsset,
"assetSpecification":this.state.assetSpecification,
"makeModel":this.state.makeModel,
"assignedDate":this.state.assignDate,
"releasedDate":this.state.releaseDate,
"createDateTime":"",
"updateDateTime":"",
"assigned":""
        }, )
          .then(function (response) {        
   
         swal("Message: "+response.data.message, "",)
        
    })

        var frm = document.getElementsByName('register-form')[0];
   frm.reset();      
   

     }

      captureAssetId = event => {
        const value = event.target.value;
        // let assetId;
        this.setState({assetId : value})
        console.log("new id: "+this.state.assetId)
    }
     captureAssetType = event => {
        const value = event.target.value;
        // let displayBody;
        // let typeAsset;
        this.setState({typeAsset : value})
        this.setState({displayBody : 1})
        console.log("new asset type: "+this.state.typeAsset)
        console.log("new value: "+this.state.displayBody)

    }
    captureMakeModel = event => {
        const value = event.target.value;
        // let makeModel;
       this.setState({makeModel : value})
        console.log("new makeModel: "+this.state.makeModel)
    }
    captureAssetSpecification = event => {
        const value = event.target.value;
        // let assetSpecification;
        this.setState({assetSpecification : value})
        console.log("new assetSpecification: "+this.state.assetSpecification)
    }
    captureAssignDate = event => {
        const value = event.target.value;
        // let assignedDate;
        this.setState({assignDate : value})
        console.log("new assignDate: "+this.state.assignDate)
    }
    captureReleaseDate = event => {
        const value = event.target.value;
        // let releaseDate;
        this.setState({releaseDate : value})
        console.log("new releaseDate: "+this.state.releaseDate)
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
        

        return (
            <div>
            
                <br/><br/><br/>
                

                <form name="register-form" onSubmit={this.onAssetSubmit.bind(this)}>
                   <div class="assettype">
                   
                    <label className="type_label"><b>I want to register :</b></label>
                    <select onChange={this.captureAssetType.bind(this)} id="type_select">
                    <option disabled={true} selected={true}>Select AssetType</option>
                          {asset_types}
                    </select>
            </div>
                            <br/><br/><br/>
                <p>{this.state.displayBody===1 &&   <div>
                    <div class="container">
                        <div class="row">
                        <div class="col-sm-4"></div> 

                            <div class="main_form col-sm-4">
                            <br/> <br/>
                             <div class="form-group">
                                <strong>Asset Id:&nbsp; </strong>
                                <input class="form-control" type="text" minLength="1" maxLength="25" pattern="^(\w+\S+)$" name="assetId" onChange={this.captureAssetId.bind(this)} required />
                                </div> <br/>
                                
                                 <div class="form-group">
                                <strong>Make & Model:&nbsp; </strong>
                                <input class="form-control" type="text" name="makeModel"  onChange={this.captureMakeModel.bind(this)} required/>
                                </div> <br/>
                                
                                 <div class="form-group">
                                <strong>Asset Specification:&nbsp; </strong>
                                <input class="form-control" type="text" name="assetSpecification" onChange={this.captureAssetSpecification.bind(this)} required/>
                                </div> <br/>
                                
                                <div class="form-group">
                                <strong>Register Date:&nbsp; </strong>
                                <input class="form-control" type="date" name="registerDate" onChange={this.captureAssignDate.bind(this)} required/>
                                </div>
                                <br/><br/>
                            </div>

                            <div class="col-sm-4">  </div>
                        </div>
                    </div>
                   <br/>
                    <button type="submit" class="btn btn-success btn-md" value="Register">Register</button>
                </div>} </p>
               </form>
<br/> <br/>
            </div> 
        );
    }
}