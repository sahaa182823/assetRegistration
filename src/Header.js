import React from 'react';
import './Header.css';

export default class Header extends React.Component {

    render() {

        return (
            <div className="outer_main">
                
                    <div className="row">
                        <div className="col-sm-3">
                        <img alt="logo" className="img-fluid tlogo" src={require('./pictures/tlogo.png')}/>
                           
                        </div>

                        <div className="col-sm-6">
                      <h3 className="header-name"><b>Telstra HPSE Asset Management</b></h3>
                        </div>

                        <div className="col-sm-3">
                      
                        <img alt="logo" className="img-fluid clogo" src={require('./pictures/clogo3.png')}/>
                        </div>
    
                        
                    </div>
            
            </div>
        )
    }
}