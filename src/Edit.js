import React from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import {serverUrl} from './UrlConstants'
import {Button, Modal} from 'react-bootstrap'

 

class Edit extends React.Component {

    constructor(props, context) {

        super(props, context)

        this.state = {

            editShow: false,
            text:''

        }

        this.handleShow = this
            .handleShow
            .bind(this);

        this.handleClose = this
            .handleClose
            .bind(this);

    }

    state = {

        final: {

            description: '',

            quantity: '',

            date: ''
        },

        assetType:""
    }

    captureDescription = event => {

        console.log(event.target.value)

        const value = event.target.value;

        this.setState(function (state) {

            return {

                final: Object.assign({}, state.final, {description: value})

            }

        })

    }

    captureQuantity = eventObject => {

        console.log(eventObject.target.value)

        const value = eventObject.target.value;

        this.setState(function (state) {

            return {

                final: Object.assign({}, state.final, {quantity: value})

            }

        })

    }

    captureDate = event => {

        console.log(event.target.value)

        const value = event.target.value;

        this.setState(function (state) {

            return {

                final: Object.assign({}, state.final, {date: value})

            }

        })

    }

    onProductSubmit = eventObject => {

        eventObject.preventDefault()
    }
    handleClose() {

        this.setState({editShow: false});

    }

    handleShow() {

        this.setState({editShow: true});

    }

    onchange(e){
        this.setState({text : e.target.value})
    }


   onFormSubmit(e){
         e.preventDefault();
       console.log("Inside OnFormSubmit")
  console.log(this.refs.atype.value)

  this.setState({assetType:this.refs.atype.value})
  axios.post(`http://${serverUrl}/api/addAsset`, {
"id": "",
"assetType": this.refs.atype.value,
"quantity": "",
"createDateTime":"",
"updateDateTime":""     
},)

  .then(function (response) {
        //handle success
        
        console.log(response.data.message);
         swal("Message: "+response.data.message, "",)
         
        document.getElementById("editPage").reset();
    })


  
// window.location.reload();

      console.log("form submitted successfully");
    
this.setState({editShow: false});
// window.location.reload();
}
    

    render() {
        console.log(this.state.text)

        return (

            <div>

                <Button type="button" className="btn btn-success btn-md" onClick={this.handleShow}>Add Asset</Button>

                <Modal show={this.state.editShow} onHide={this.handleClose}>

                    <Modal.Header>

                        <Modal.Title
                            style={{
                            marginRight: '360px'
                        }}>
                            
                            <b>New Asset</b>
                            
                        </Modal.Title>

                    </Modal.Header>
                   <form id="editPage" onSubmit={this.onFormSubmit.bind(this)}>
                        <Modal.Body>
                       
                
                            <strong>New Asset Type:  </strong> 
                            <input type="text" minLength="1" maxLength="40" pattern="^[a-zA-Z]+(\s[a-zA-Z]+(\s[a-zA-Z])?$" onChange={this.onchange.bind(this)} autoFocus={true} name="asset-type" ref="atype" required={true} />
                               
                             &nbsp;&nbsp;<button type="submit" className="btn btn-success" >Save</button>
                               </Modal.Body>
                                <Modal.Footer>
                      
                      

                  
                        </Modal.Footer>
                        </form>
                            <button className="btn btn-danger" onClick={this.handleClose.bind(this)}>Close</button>
                </Modal>

            </div>

        );

    }

}

export default
Edit;
