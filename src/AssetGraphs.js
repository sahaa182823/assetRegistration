import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from 'axios';
import {serverUrl} from './UrlConstants'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            temp:'a',
          
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: []
                }
            },

            series: [
                {
                    name: "series-1",
                    data: [10]
                }
                
            ]
        };
    }

    componentWillMount() {


        this.getAssetType();

    }

    getAssetType() {
        axios
            .get("http://"+serverUrl+"/api/availableAssetCount")
            .then(res => {
                console.log(res.data)

                // this.manageData(res.data);
            });
    }

    manageData = (assetType) => {
        let name = new Array();
        let qty = new Array();
        let y = {};
        let z = {};

        for (let i = 0; i < 1; i++) {
            y = assetType[i][0]
            name.push(y)

            z = assetType[i][1]
            qty.push(z)

        }
        
        // console.log(this.state.assetName);
        // console.log(this.state.assetCount);

        let options = {...this.state.options};
        options.xaxis.categories = name;
        this.setState({options}, () => {
    console.log(this.state.options);
  });

//         let series = {...this.state.series};
//         series.data = qty;
//           this.setState({series}, () => {
//     console.log(this.state.series);
//   });

  console.log(this.state.options);
// console.log(this.state.series);

        return;
    }

    render() {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="bar"
                            width="300"
                        />
                    </div>
                </div>
                <br/>
                <br/>
            </div>
        );
    }
}

export default App;