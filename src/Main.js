import React, { Component } from "react";
import {
    BrowserRouter as
    HashRouter,
    NavLink,
    Route
} from "react-router-dom";
import Header from './Header.js'
import Footer from './Footer.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Main.css'
import './Home.css'
import Home from './Home.js'
import RegisterAsset from './RegisterAsset.js'
import AssignAsset from './AssignAsset.js'
import ViewAssigned from './ViewAssigned.js'
import ViewAvailable from './ViewAvailable.js'
import AssignedHistory from './AssignedHistory.js'
import ProgramGraph from './ProgramGraph.js'
import AssetGraphs from './AssetGraphs.js'
 
class Main extends Component {
  render() {
    return (
        <div>
        
       <Header/> 
       
        <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
           <HashRouter>
                    <div>
                        <ul className="nav nav-tabs">
                
                            <li>
                                <NavLink exact to="/"><b>Home</b></NavLink>
                            </li>
                            <li>
                                <NavLink to="/register"><b>Register Asset</b></NavLink>
                            </li>
                            <li>
                                <NavLink to="/assign"><b>Assign Asset</b></NavLink>
                            </li>
                            <li>
                                <NavLink to="/viewAssigned"><b>View Assigned Asset</b></NavLink>
                            </li>
                            <li>
                                <NavLink to="/viewAvailable"><b>View Available Asset</b></NavLink>
                            </li>
                             <li>
                                <NavLink to="/AssignedHistory"><b>View Assigned History</b></NavLink>
                            </li>
                             <li>
                                <NavLink to="/ProgramGraph"><b>Graphical View</b></NavLink>
                            </li>
                        </ul>
                    <br/>

                    <div className="content">
                    
                        <Route exact path="/" component={Home}/>
                        <Route  path="/register" component={RegisterAsset}/>
                        <Route  path="/assign" component={AssignAsset}/>
                        <Route  path="/viewAssigned" component={ViewAssigned}/>
                        <Route  path="/viewAvailable" component={ViewAvailable}/>
                        <Route  path="/AssignedHistory" component={AssignedHistory}/>
                        <Route  path="/ProgramGraph" component={ProgramGraph}/>

                    </div>
                    </div>
                </HashRouter>
               
                
        
          <Footer/>
        </div>
    );
  }
}
 
export default Main;
