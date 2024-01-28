import { Component } from "react";
import React from "react";

export default class CCTable extends Component {

    constructor(props) {
        super(props);
        this.myInnerTable = React.createRef();
        this.mainDiv = React.createRef();
    }

    avner = (e) => {
        const contatinerDiv = document.getElementById("containerDiv")
        contatinerDiv.style.width = "50%"
    }

    avnerDouble = (e) => {
        const contatinerDiv = document.getElementById("containerDiv")
        contatinerDiv.style.width = "100%"
    }

    render() {


        return (
            <>
                <div id="containerDiv" ref={this.mainDiv} style={{
                    width: "100%",
                    textAlign: "center",
                    margin: "0 auto",
                    display: "block",
                }} >
                    <div style={{
                        border: "solid black 1px",
                        float: "left",
                        width: "33%",
                        backgroundColor: "red",
                    }} onDoubleClickCapture={this.avnerDouble} onClick={this.avner}>Click Me!</div>
                    <div style={{
                        border: "solid black 1px",
                        float: "left",
                        width: "33%",
                        backgroundColor: "red",
                    }} onDoubleClickCapture={this.avnerDouble} onClick={this.avner}>Click Me!</div>
                    <div style={{
                        border: "solid black 1px",
                        float: "left",
                        width: "33%",
                        backgroundColor: "red",
                    }} onDoubleClickCapture={this.avnerDouble} onClick={this.avner}>Click Me!</div>
                    <div style={{
                        border: "solid black 1px",
                        float: "left",
                        width: "33%",
                        backgroundColor: "red",
                    }} onDoubleClickCapture={this.avnerDouble} onClick={this.avner}>Click Me!</div>
                    <div style={{
                        border: "solid black 1px",
                        float: "left",
                        width: "33%",
                        backgroundColor: "red",
                    }} onDoubleClickCapture={this.avnerDouble} onClick={this.avner}>Click Me!</div>
                    <div style={{
                        border: "solid black 1px",
                        float: "left",
                        width: "33%",
                        backgroundColor: "red",
                    }} onDoubleClickCapture={this.avnerDouble} onClick={this.avner}>Click Me!</div>
                </div>
            </>
        );
    }
}

