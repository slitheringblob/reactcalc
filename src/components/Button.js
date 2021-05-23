//button component for all the buttons visible on the screen
import React,{Component} from "react";
import './Button.css';

class Button extends React.Component{
    
    isOperator = val => {
        return !isNaN(val) || val === "="; //to apply css colour to operators
      }
    render(){
        // const { onPress, className, ...props } = this.props

        return(
            <div className={`Button ${this.isOperator(this.props.children) ? "":"operator"}`}
                onClick={()=> this.props.onClick(this.props.children)}>
                {this.props.children}
            </div>
        );

    }
}
export default Button;