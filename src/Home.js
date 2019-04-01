import React from 'react'
import Edit from './Edit.js'
import axios from 'axios';
import { serverUrl } from './UrlConstants'


export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            assetRecord: []

        }
    }


    componentDidMount() {
        this.getAssetRecords();
    }


    getAssetRecords() {
        axios.get("http://" + serverUrl + "/api/getAssetRecord").then(res => {
            console.log(res.data)
            const assetRecord = res.data;
            this.setState({ assetRecord });
            console.log(assetRecord);
            // window.location.reload();

        });
    }



    render() {
        let todoItems;
        if (this.state.assetRecord) {
            todoItems = this.state.assetRecord.map((assetRecord, index) => {


                console.log(assetRecord);
                return (


                    <tr>
                        <td key={index + "a"}> {assetRecord.assetType} </td>
                        <td key={index + "b"}> {assetRecord.quantity}</td>


                    </tr>

                );
            });
        }



        return (
            <div>
                <br />
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6">
                        <br /> <br />
                        <table className="table table-hover table-bordered 0" id="home-table">
                            <thead>
                                <tr>
                                    <th className="text-center">ASSET TYPE</th>
                                    <th className="text-center">QUANTITY</th>

                                </tr>
                            </thead>
                            <tbody>

                                {todoItems}



                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-3"></div>
                </div>

                <div>

                    <Edit />
                    <br /> <br />  <br />
                </div>

            </div>
        );
    }
}