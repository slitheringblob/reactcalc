import React, { Component } from "react";
import './App.css';
import OutputScreen from './components/OutputScreen.js';
import Button from './components/Button.js';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/GlobalTheme.js";
import { lightTheme, darkTheme } from "./components/Themes.js";

//defined an object with all calculator operations for easy access through a common function
const calculatorOperations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue,
  '±': (prevValue, nextValue) => prevValue *-1,
  'square':(prevValue, nextValue) => prevValue *prevValue,
  'sqroot': (prevValue, nextValue) => Math.sqrt(prevValue)
}

class App extends React.Component{
  
constructor(props){
	super(props);
	this.state={
		inputValue:null,
    displayValue:'0',
		operator:null,
    waitingforOperand:false,
    scientificmode:false,
    theme:'light'
		
	};
}

//function to apply light theme
lightTheme = () => {
  const {theme} = this.state
  console.log(theme)
  if (theme === 'dark'){
    this.setState({
      theme:'light'
    })
    console.log(this.state.theme)
  }
 }

//function to apply dark theme
 darkTheme = () =>{
  const {theme} = this.state
  console.log(theme)
  if (theme === 'light'){
    this.setState({
      theme:'dark'
    })
    console.log(this.state.theme)
  }
}

//function to add data to the screen
addtoInput = val =>{
  const { displayValue, waitingForOperand } = this.state

    if (waitingForOperand) {
      this.setState({
        displayValue: String(val),
        waitingForOperand: false
      })
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(val) : displayValue + val
      })
    }
}

//main calculation function that calls on the object to perform operations
performOperation = nextOperator => {
  const { value, displayValue, operator } = this.state
  const inputValue = parseFloat(displayValue)

  if (value === null) {     //check if its the first number 
    this.setState({
           
           value: inputValue
         })
        }
  else if (operator){
    
    const currentValue = value || 0
    console.log("current value in elif",currentValue)
    const newValue = calculatorOperations[operator](currentValue, inputValue) //call array of operations
    console.log("calculated value in elif",newValue)

    this.setState({
             value: newValue,
             displayValue: String(newValue)
     })
     
  }
  this.setState({
         waitingForOperand: true,
         operator: nextOperator
 })
}
//function to clear the stack of the calculator
clearAll=()=> {
  this.setState({
    value: null,
    displayValue: '0',
    operator: null,
    waitingForOperand: false
  })
}

//function to toggle the state of the scientific mode
scientificModeToggle = () =>{
  const {scientificmode} = this.state
  if(scientificmode){
    this.setState({
    scientificmode:false
  })
  console.log("scientificmode",scientificmode)
}else{
  this.setState({
    scientificmode:true
  })
  console.log("scientificmode",scientificmode)
}
}

render(){
  const { scientificmode } = this.state;
  
  return (
    <ThemeProvider theme={this.state.theme === 'light' ? lightTheme : darkTheme}>
    <>
    <GlobalStyles/>
    <div className="App">
      <div className="border-wrapper">
      
      <div className="layer">
      
        <Button onClick={this.lightTheme}>Light</Button>
        <Button onClick={this.darkTheme}>Dark</Button>

      </div>
      
      <div className="layer">
        <OutputScreen>{this.state.displayValue}</OutputScreen>
      </div>
      <div className="layer">
        <Button onClick={() => this.addtoInput(1)}>1</Button>
        <Button onClick={() => this.addtoInput(2)}>2</Button>
        <Button onClick={() => this.addtoInput(3)}>3</Button>
        <Button onClick={() => this.performOperation('+')}>+</Button>
      </div>
      
      <div className="layer">
      <Button onClick={() => this.addtoInput(4)}>4</Button>
        <Button onClick={() => this.addtoInput(5)}>5</Button>
        <Button onClick={() => this.addtoInput(6)}>6</Button>
        <Button onClick={() => this.performOperation('-')}>-</Button>
      </div>
      
      <div className="layer">
        <Button onClick={() => this.addtoInput(7)}>7</Button>
        <Button onClick={() => this.addtoInput(8)}>8</Button>
        <Button onClick={() => this.addtoInput(9)}>9</Button>
        <Button onClick={() => this.performOperation('*')}>*</Button>
      </div>
      
      <div className="layer">
      <Button onClick = {this.clearAll}>Clear</Button>
        <Button onClick={() => this.addtoInput(0)}>0</Button>
        <Button onClick={() => this.performOperation('=')}>=</Button>
        <Button onClick={() => this.performOperation('/')}>/</Button>
      </div>
      <div className="layer">
      <Button onClick={this.scientificModeToggle}>ScMode</Button>
      {scientificmode && (					
					<div className="layer">
          <Button onClick={() => this.performOperation('±')}>±</Button>
          <Button onClick={() => this.performOperation('square')}>square</Button>
          <Button onClick={() => this.performOperation('sqroot')}>sqroot</Button>
					</div>
				)}
      </div>


      </div>
    </div>
    </>
    </ThemeProvider>
  );
}
}

export default App;
