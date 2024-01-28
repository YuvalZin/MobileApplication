import { Component } from "react";
import React from "react";

export default class CCIsPsychometry extends Component {

    constructor(props) {
        super(props);

    }


    render() {

        return (
            <>
                <div style={{ width: "400px", margin: "auto", marginTop: "50px" }}>
                    <h2>University Admission Form</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                            />
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"

                            />
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="grade">Grade:</label>
                            <input
                                type="text"
                                id="grade"
                                name="grade"

                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            
            </>
        );
    }
}

