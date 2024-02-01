import { Component } from "react";
import React from "react";

export default class CCButtonChangeColor extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          divBG: ""
        };
    
        this.buttonStyle = {
          marginBottom: '20px',
          fontFamily: "Geneva, Verdana, sans-serif",
          padding: 10,
          margin:10,
          background: "linear-gradient(to right, #dcdcdc, #f5f5f5)",
          borderRadius: 20,
          width: '50%'
    
        };
      }
    
      btnColorChange = (e) => {
        const newBG = e.target.innerHTML.toLowerCase();
        this.setState({ divBG: newBG });
      }
    
      render() {
        return (
          <div style={{
            display: 'flex',
            paddingTop: 10,
            marginBottom: 80,
            alignItems:"center",
            flexDirection: "column"
          }}>
            <div style={{
              padding: 10,
              borderRadius: 20,
              background:this.state.divBG,
              
            }}>
              <button onClick={this.btnColorChange} style={this.buttonStyle}>GREEN</button>
              <button onClick={this.btnColorChange} style={this.buttonStyle}>BLUE</button>
              <button onClick={this.btnColorChange} style={this.buttonStyle}>YELLOW</button>
              <button onClick={this.btnColorChange} style={this.buttonStyle}>PURPLE</button>
              <button onClick={this.btnColorChange} style={this.buttonStyle}>ORANGE</button>
              <button onClick={this.btnColorChange} style={this.buttonStyle}>RED</button>
              <button onClick={this.btnColorChange} style={this.buttonStyle}>GREY</button>
              <button onClick={this.btnColorChange} style={this.buttonStyle}>PINK</button>
            </div>
          </div>
        );
      }
}

