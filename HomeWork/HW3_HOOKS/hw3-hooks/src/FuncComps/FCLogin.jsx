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



export default function Login(props) {

  const [usernameErr, setUsernameErr] = useState("");
  const [passErr1, setPassErr1] = useState("");
  const [passErr2, setPassErr2] = useState("");

  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    event.preventDefault();
    if (!usernameErr && !passErr1 && !passErr2) {
      console.log("grapeee");
      props.sendLoginRequest(data);
    }
    else console.log("somnthing wrong");
  };

  function isValidUsername(input) {
    const regex = /^[a-zA-Z0-9!@#$%^&*()_+-=<>?{}[\]:";',.\/|\\]*$/;
    return regex.test(input);
  }

  const handleError = (e) => {
    let errStr = "";
    let errStr1 = "";
    switch (e.target.id) {
      case "username":
        console.log(e.target.value)
        if (e.target.value == "") errStr = " ";
        else {
          if (!isValidUsername(e.target.value)) {
            errStr += "hebrew.";
          }
          if (e.target.value.length > 60) {
            errStr += "too long";
          }
        }
        setUsernameErr(errStr);
        break;

      case "password":
        if (e.target.value != "") {
          if (e.target.value.length < 7 || e.target.value.length > 12) {
            errStr = "ur pass must be between 7 to 12 chars";
          }
          const HasSpecial = /[!@#$%^&*(),.?":{}|<>]/;
          const HasUpper = /[A-Z]/;
          const HasNumber = /\d/;
          console.log(HasNumber.test(e.target.value) && HasSpecial.test(e.target.value) && HasUpper.test(e.target.value));
          if (!(HasNumber.test(e.target.value) && HasSpecial.test(e.target.value) && HasUpper.test(e.target.value))) {
            errStr1 = "ur pass must contain at least one:num,special char,uppercase";
          }
        }
        setPassErr1(errStr);
        setPassErr2(errStr1);
        break;
    }
  }

  return (

    <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} >
      <Box
        sx={{
          py: 3,
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
          Sign in
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
            onBlur={handleError}
          />
          <span>{usernameErr}</span>
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
          <div>
            <span>{passErr1}</span><br />
            <span>{passErr2}</span>
            <span>{props.userNotFoundErr}</span>

          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
