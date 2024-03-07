import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useState } from 'react'
import './FCRegister.css';
import Autocomplete from '@mui/material/Autocomplete';



export default function Register(props) {

    // State variables for error messages 
    const [usernameErr, setUsernameErr] = useState("");
    const [firstname, setFirstNameErr] = useState("");
    const [lastname, setLastNameErr] = useState("");
    const [mail, setEmailErr] = useState("");
    const [pic, setPicErr] = useState("");
    const [date, setDateErr] = useState("");
    const [street, setStreetErr] = useState("");
    const [stNum, setStNumErr] = useState("");
    const [pass, setPass] = useState("");
    const [passErr1, setPassErr1] = useState("");
    const [passErr2, setPassErr2] = useState("");
    const [confirmPassErr, setConfirmPassErr] = useState("");
    const [validationErr, setValidationErr] = useState("");

    // Array of Israeli cities for autocomplete
    const citiesInIsrael = [
        'Jerusalem',
        'Tel Aviv',
        'Haifa',
        'Rishon LeZion',
        'Petah Tikva',
        'Ashdod',
        'Netanya',
        'Beer Sheva',
        'Holon',
        'Bnei Brak',
        'Bat Yam',
        'Ramat Gan',
        'Ashkelon',
        'Herzliya',
        'Kfar Saba',
        'Raanana',
        'Hadera',
        'Bet Shemesh',
        'Lod',
        'Nazareth'
    ];

    //validate username field to be non hebrew
    const nonHebrewRegex = /[^\u0590-\u05FF\s]/;
    function isValidUsername(input) {
        const regex = /^[a-zA-Z0-9!@#$%^&*()_+-=<>?{}[\]:";',.\/|\\]*$/;
        return regex.test(input);
    }

    function isValidImageFile(file) {
        if (file && file.name) {
            let filename = file.name;
            return filename.toLowerCase().endsWith('.jpg') || filename.toLowerCase().endsWith('.jpeg');
        }
        return false; // Return false if file is null, undefined, or has no name property
    }

    function isValidBirthday(date) {
        const selectedDate = new Date(date);
        const currentDate = new Date();
        const minBirthDate = new Date(currentDate);
        minBirthDate.setFullYear(minBirthDate.getFullYear() - 120); // 120 years ago
        const maxBirthDate = new Date(currentDate);
        maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 18); // 18 years ago

        if (isNaN(selectedDate.getTime()) || selectedDate > currentDate || selectedDate < minBirthDate || selectedDate > maxBirthDate) {
            return false;
        }
        return true;
    }

    // Function to handle input validation errors -on change/on blur events
    const handleError = (e) => {
        let errStr = "";
        let errStr1 = "";
        switch (e.target.id) {
            case "username":
                if (e.target.value == "") errStr = " ";
                else {
                    if (!isValidUsername(e.target.value)) {
                        errStr = "Username must contain only English characters";
                    }
                    if (e.target.value.length > 60) {
                        errStr = "Username is too long (above 60)";
                    }
                }
                setUsernameErr(errStr);

                break;

            case "firstName":
                if (!/^[a-zA-Z]+$/.test(e.target.value)) {
                    errStr = "First Name must contain only English characters";
                }
                setFirstNameErr(errStr);
                break;

            case "lastName":
                if (e.target.value != "") {
                    if (!/^[a-zA-Z]+$/.test(e.target.value)) {
                        errStr = "Last Name must contain only English characters";
                    }
                }
                setLastNameErr(errStr);
                break;

            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(e.target.value)) {
                    errStr = "Please enter a valid email address";
                }
                setEmailErr(errStr);
                break;

            case "photo":
                if (e.target.files[0]) {
                    if (!isValidImageFile(e.target.files[0])) {
                        errStr = "Please upload a valid image file (jpg/jpeg)"
                    }
                }
                setPicErr(errStr);
                break;

            case "birthdate":
                if (e.target.value) {
                    if (!isValidBirthday(e.target.value)) {
                        errStr = "invalid date: Your age must be between 18 and 119 years old"
                    }
                }
                setDateErr(errStr);
                break;

            case "city":
                // No validation needed for city
                break;

            case "street":
                const hebrewRegex = /^[\u0590-\u05FF\s]+$/;
                if (e.target.value != "") {
                    if (!hebrewRegex.test(e.target.value)) {
                        errStr = "Street Name must contain only Hebrew characters";
                    }
                }
                setStreetErr(errStr);
                break;

            case "streetNum":
                if (e.target.value != "") {
                    if (!(e.target.value > 0)) {
                        errStr = "Please enter a valid street number";
                    }
                }
                setStNumErr(errStr);
                break;

            case "password":
                setPass(e.target.value);
                if (e.target.value != "") {
                    if (e.target.value.length < 7 || e.target.value.length > 12) {
                        errStr = "Your password must be between 7 to 12 characters";
                    }
                    const HasSpecial = /[!@#$%^&*(),.?":{}|<>]/;
                    const HasUpper = /[A-Z]/;
                    const HasNumber = /\d/;
                    if (!(HasNumber.test(e.target.value) && HasSpecial.test(e.target.value) && HasUpper.test(e.target.value))) {
                        errStr1 = "Your password must contain at least one number, special character, and uppercase";
                    }
                }
                setPassErr1(errStr);
                setPassErr2(errStr1);
                break;

            case "confirmPassword":

                if (e.target.value != "") {
                    if (pass !== e.target.value) {
                        errStr = "Passwords do not match!";
                    }
                }
                setConfirmPassErr(errStr);
                break;
        }
    }

    // Function to handle form submission
    const handleSubmit = (event) => {
        const data1 = new FormData(event.currentTarget);
        const data = Object.fromEntries(data1.entries());
        data.photo = URL.createObjectURL(data.photo);
        event.preventDefault();
        // Check if all fields are valid and no active errors shown on screen
        if (!usernameErr && !firstname && !lastname &&
            !mail && !pic && !date && !street && !stNum && !passErr1 && !passErr2) {
            // Send form data
            props.sendForm2P(data);
        }
        else setValidationErr("Please ensure all fields are completed correctly");  // Display validation error message


    };

    return (

        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} >
            <Box
                sx={{
                    py: 3,
                    px: 8,
                    my: 8,
                    mx: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                        onChange={handleError}
                    />
                    <span>{usernameErr}</span>
                    <TextField

                        margin="normal"
                        required={true}
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        onChange={handleError}
                    />
                    <span>{firstname}</span>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        onChange={handleError}
                    />
                    <span>{lastname}</span>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleError}
                    />
                    <span>{mail}</span>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="photo"
                        label="Photo"
                        name="photo"
                        type="file"
                        accept="image/*"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        // onChange={handleFileInputChange}
                        onChange={handleError}
                    />
                    <span>{pic}</span>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="birthdate"
                        label="Birthdate"
                        name="birthdate"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleError}
                    />
                    <span>{date}</span>

                    <Autocomplete
                        disablePortal
                        fullWidth
                        options={citiesInIsrael}
                        renderInput={(params) =>
                            <TextField {...params}
                                fullWidth
                                label="City"
                                margin="normal"
                                required
                                id="city"
                                name="city"
                            />}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="street"
                        label="Street"
                        name="street"
                        onChange={handleError}
                    />
                    <span>{street}</span>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="streetNum"
                        label="Street Number"
                        name="streetNum"
                        type="number"
                        onChange={handleError}
                    />
                    <span>{stNum}</span>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={handleError}
                    />
                    <span>{passErr1}</span><br />
                    <span>{passErr2}</span>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        onChange={handleError}
                    />
                    <span>{confirmPassErr}</span>
                    <span>{props.userExistErr}</span>
                    <br />
                    <span>{validationErr}</span>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Grid>

    );
}
