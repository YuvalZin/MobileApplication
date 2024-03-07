import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react'
import './FCRegister.css';
import Autocomplete from '@mui/material/Autocomplete';
import Swal from 'sweetalert2';



export default function FCEditDetails(props) {

    // State variables for current user details(before any changes made)
    const [currentUsername, setUsername] = useState("");
    const [currentFirstname, setFirstname] = useState("");
    const [currentLastname, setLastname] = useState("");
    const [currentCity, setCity] = useState("");
    const [currentDate, setBirthdate] = useState("");
    const [currentStreet, setStreet] = useState("");
    const [currentStNum, setStreetNum] = useState("");
    const [currentEmail, setEmail] = useState("");

    // State variable to track user being edited
    const [user2Edit, setUser2Edit] = useState(null);

    // Effect to update user being edited based on props(thats how we know who requested to edit a user)
    useEffect(() => {
        if (props.profileEditUser) {
            if (props.profileEditUser.userName !== 'admin') setUser2Edit(props.profileEditUser);
        }
        else if (props.adminEditUser) setUser2Edit(props.adminEditUser);

    }, [props.profileEditUser, props.adminEditUser]);

    // Effect to update user details when user2Edit changes
    useEffect(() => {
        if (user2Edit) {
            setUsername(user2Edit.userName);
            setFirstname(user2Edit.firstName);
            setLastname(user2Edit.lastName);
            setCity(user2Edit.city);
            setBirthdate(user2Edit.birthdate);
            setStreet(user2Edit.street);
            setStreetNum(user2Edit.streetNum);
            setEmail(user2Edit.email);
        }
    }, [user2Edit])

    // State variables for input validation errors and messages
    const [usernameErr, setUsernameErr] = useState("");
    const [firstname, setFirstNameErr] = useState("");
    const [lastname, setLastNameErr] = useState("");
    const [pic, setPicErr] = useState("");
    const [date, setDateErr] = useState("");
    const [street, setStreetErr] = useState("");
    const [stNum, setStNumErr] = useState("");
    const [passErr1, setPassErr1] = useState("");
    const [passErr2, setPassErr2] = useState("");
    const [validationErr, setValidationErr] = useState("");


    const editUser = (formData) => {
        // Update user details and storing in localStorage
        let users = JSON.parse(localStorage.getItem('users'));
        let userIndex = users.findIndex(u => u.email === formData.email);
        users[userIndex].userName = formData.userName;
        users[userIndex].firstName = formData.firstName;
        users[userIndex].lastName = formData.lastName;
        users[userIndex].birthdate = formData.birthdate;
        users[userIndex].street = formData.street;
        users[userIndex].streetNum = formData.streetNum;
        users[userIndex].city = formData.city;

        // Update user's photo if provided
        if (formData.photo != "") {
            users[userIndex].photo = formData.photo;
        }

        // Update user's password if provided
        if (formData.password != "") {
            users[userIndex].password = formData.password;
        }
        localStorage.setItem('users', JSON.stringify(users));
        // Update logged-in user details if user is not an admin (so changes can be visible if on profile page)
        if (JSON.parse(sessionStorage.getItem("userLogged")).userName != "admin") {
            sessionStorage.setItem('userLogged', JSON.stringify(users[userIndex]));
            props.updateUser(users[userIndex]);
            props.setEditIsVisible(false);
        }
        else {
            props.setAdminEditVisible(false);
        }
        Swal.fire({
            title: "Changes Saved",
            text: "Your updates have been successfully saved.",
            icon: "success"
        });

    }
    //validate username field to be non hebrew
    const nonHebrewRegex = /[^\u0590-\u05FF\s]/;
    function isValidUsername(input) {
        const regex = /^[a-zA-Z0-9!@#$%^&*()_+-=<>?{}[\]:";',.\/|\\]*$/;
        return regex.test(input);
    }
    // Function to validate image file (JPEG/JPG)
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

    // Function to handle input validation errors
    const handleError = (e) => {
        let errStr = "";
        let errStr1 = "";
        switch (e.target.id) {
            case "userName":
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
                if (e.target.value != "") {
                    if (!/^[a-zA-Z]+$/.test(e.target.value)) {
                        errStr = "First Name must contain only English characters";
                    }
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
        }
    }

    const handleSubmit = (event) => {
        const data1 = new FormData(event.currentTarget);
        const data = Object.fromEntries(data1.entries());
        data.photo = URL.createObjectURL(data.photo);
        event.preventDefault();
        if (!usernameErr && !firstname && !lastname &&
            !pic && !date && !street && !stNum && !passErr1 && !passErr2) {
            editUser(data);
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
                    Edit Profile
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        tabIndex={-1}

                        autoFocus={false}
                        id="email"
                        label="Email Address"
                        name="email"
                        value={currentEmail}
                        InputProps={{
                            readOnly: true,
                        }}

                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="userName"
                        label="Username"
                        name="userName"
                        value={currentUsername}
                        autoFocus
                        onChange={(e) => {
                            setUsername(e.target.value);
                            handleError(e)}}
                    />
                    <span>{usernameErr}</span>
                    <TextField
                        value={currentFirstname}
                        margin="normal"
                        required={true}
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        onChange={(e) => {
                            setFirstname(e.target.value);
                            handleError(e); // Call the validation function here
                        }}
                    />
                    <span>{firstname}</span>

                    <TextField
                        value={currentLastname}
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        onChange={(e) => {
                            setLastname(e.target.value);
                            handleError(e);
                        }}
                    />
                    <span>{lastname}</span>


                    <TextField
                        margin="normal"
                        fullWidth
                        id="photo"
                        label="Photo (Optional)"
                        name="photo"
                        type="file"
                        accept="image/*"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleError}
                    />
                    <span>{pic}</span>

                    <TextField
                        value={currentDate}
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
                        onChange={(e) => {
                            setBirthdate(e.target.value);
                            handleError(e);
                        }}
                    />
                    <span>{date}</span>

                    <Autocomplete
                        disablePortal
                        fullWidth
                        value={currentCity}
                        onChange={(e, newValue) => {
                            setCity(newValue);
                        }}
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
                        value={currentStreet}
                        margin="normal"
                        required
                        fullWidth
                        id="street"
                        label="Street"
                        name="street"
                        onChange={(e) => {
                            setStreet(e.target.value);
                            handleError(e);
                        }}
                    />
                    <span>{street}</span>

                    <TextField
                        value={currentStNum}
                        margin="normal"
                        required
                        fullWidth
                        id="streetNum"
                        label="Street Number"
                        name="streetNum"
                        type="number"
                        onChange={(e) => {
                            setStreetNum(e.target.value);
                            handleError(e);
                        }}
                    />
                    <span>{stNum}</span>

                    <TextField
                        margin="normal"
                        fullWidth
                        autoComplete='current-password'
                        name="password"
                        label="New Password (Optional)"
                        type="password"
                        id="password"
                        onChange={handleError}
                    />
                    <span>{passErr1}</span><br />
                    <span>{passErr2}</span>
                    <span>{validationErr}</span>



                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Edit Profile
                    </Button>
                </Box>
            </Box>
        </Grid>

    );
}

