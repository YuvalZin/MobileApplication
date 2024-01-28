import { Component } from "react";
import React from "react";

export default class CCButtonChangeColor extends Component {

    constructor(props) {
        super(props);
        this.mainDiv = React.createRef();
    }

    changeColor = (e) => {

        const buttonInnerHTML = e.target.innerHTML;
        console.log("Button Inner HTML:", buttonInnerHTML);
        const mainDiv = this.mainDiv.current;

        if (mainDiv) {
            mainDiv.style.backgroundColor = buttonInnerHTML.toLowerCase();
        }
    }

    render() {

        return (
            <>
                <div ref={this.mainDiv} id="main" style={{
                    border: "white solid 3px",
                    width: "200px",

                }}>
                    <button onClick={this.changeColor}>Green</button><br />
                    <button onClick={this.changeColor}>Red</button><br />
                    <button onClick={this.changeColor}>Orange</button><br />
                    <button onClick={this.changeColor}>Yellow</button><br />
                    <button onClick={this.changeColor}>Purple</button><br />
                    <button onClick={this.changeColor}>Black</button><br />
                    <button onClick={this.changeColor}>White</button><br />
                    <button onClick={this.changeColor}>Blue</button><br />
                </div>
            </>
        )
    }
}

