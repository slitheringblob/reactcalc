// Input/Output Screen for the calculator

import React,{Component} from "react";
import './OutputScreen.css';

class OutputScreen extends Component{
    render(){
        return(
            <div className="OutputScreen">
                {this.props.children}
            </div>
        );
    }
}

export default OutputScreen;