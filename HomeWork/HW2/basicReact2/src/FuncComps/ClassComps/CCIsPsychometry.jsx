import { Component } from "react";
import React from "react";

export default class CCIsPsychometry extends Component {

    constructor(props) {
        super(props);
        this.state = {
          firstName: "",
          lastName: "",
          grade: "",
          errorMessages: {
            firstName: "",
            lastName: "",
            grade: "",
          },
        };
    
        // Validate fields initially to show error messages for empty fields
        this.validateField("firstName", this.state.firstName);
        this.validateField("lastName", this.state.lastName);
        this.validateField("grade", this.state.grade);
      }
    
      handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
          [name]: value,
        });
        this.validateField(name, value);
      };
    
      handleSubmit = (e) => {
        e.preventDefault();
        // Perform any form submission logic here
        // You can also add further validation before submitting
      };
    
      validateField = (fieldName, value) => {
        const { errorMessages } = this.state;
    
        switch (fieldName) {
          case "firstName":
            errorMessages.firstName = value.trim() === "" ? "First Name is required" : "";
            break;
          case "lastName":
            errorMessages.lastName = value.trim() === "" ? "Last Name is required" : "";
            break;
          case "grade":
            errorMessages.grade =
              value.trim() === ""
                ? "Grade is required"
                : isNaN(value)
                ? "Grade must be a number"
                : value > 555
                ? "You can apply"
                : "You cannot apply";
            break;
          default:
            break;
        }
    
        this.setState({
          errorMessages: { ...errorMessages },
        });
      };
    
      render() {
        const { firstName, lastName, grade, errorMessages } = this.state;
    
        return (
          <div style={{ width: "400px", margin: "50px auto", textAlign: "left" }}>
            <h2>University Admission Form</h2>
            <form onSubmit={this.handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="firstName" style={{ display: "block", marginBottom: "8px" }}>
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={this.handleChange}
                  onBlur={() => this.validateField("firstName", firstName)}
                  style={{ width: "100%", padding: "8px" }}
                />
                <span style={{ color: "red", fontSize: "12px" }}>{errorMessages.firstName}</span>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="lastName" style={{ display: "block", marginBottom: "8px" }}>
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={this.handleChange}
                  onBlur={() => this.validateField("lastName", lastName)}
                  style={{ width: "100%", padding: "8px" }}
                />
                <span style={{ color: "red", fontSize: "12px" }}>{errorMessages.lastName}</span>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="grade" style={{ display: "block", marginBottom: "8px" }}>
                  Grade:
                </label>
                <input
                  type="text"
                  id="grade"
                  name="grade"
                  value={grade}
                  onChange={this.handleChange}
                  onBlur={() => this.validateField("grade", grade)}
                  style={{ width: "100%", padding: "8px" }}
                />
                <span style={{ color: errorMessages.grade === "You can apply" ? "green" : "red", fontSize: "12px" }}>
                  {errorMessages.grade}
                </span>
              </div>
              <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007BFF", color: "#fff", border: "none" }}>
                Submit
              </button>
            </form>
          </div>
        );
      }
}

