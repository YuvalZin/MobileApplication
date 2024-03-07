import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useState,useEffect } from 'react'



export default function Login(props) {

  const [usernameErr, setUsernameErr] = useState("");


  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    event.preventDefault();
    if (!usernameErr) {
      props.sendLoginRequest(data);
    }
  };

  function isValidUsername(input) {
    const regex = /^[a-zA-Z0-9!@#$%^&*()_+-=<>?{}[\]:";',.\/|\\]*$/;
    return regex.test(input);
  }

  const handleError = (e) => {
    let errStr = "";
    switch (e.target.id) {
      case "username":
        if (e.target.value == "") errStr = " ";
        else {
          if (!isValidUsername(e.target.value)) {
            errStr += "Username must contain only English characters";
          }
          if (e.target.value.length > 60) {
            errStr += "Username is too long (above 60)";
          }
        }
        setUsernameErr(errStr);
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
