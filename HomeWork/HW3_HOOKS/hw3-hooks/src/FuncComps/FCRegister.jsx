import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useState} from 'react'
import './FCRegister.css';


export default function Register() {

    const [usernameErr, setUsernameErr] = useState("");

    //validate username field to be non hebrew
    const nonHebrewRegex = /[^\u0590-\u05FF\s]/; 
    const isNonHebrew = (input) => {
        return nonHebrewRegex.test(input);
      };
    
    const handleBlur = (e) =>{
        console.log(e.target.id);
        switch(e.target.id)
        {
            case "username":
                console.log(e.target.value)

                if(!isNonHebrew(e.target.value))
                {
                    setUsernameErr("hebrew");
                }
                break;
            case "firstName":
                break;
            case "lastName":
                break;
            case "email":
                break;
            case "photo":
                break;
            case "birthdate":
                break;
            case "city":
                break;
            case "street":
                break;
            case "streetNum":
                break;
            case "password":
                break;
            case "confirmPassword":
                break;
        }
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
      };
  return (
        
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
        sx={{
            my: 8,
            mx: 4,
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onBlur={handleBlur}
            />
            <span>{usernameErr}</span>
            <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            />
            <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            />
            <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            />
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
        />
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
            />
            <TextField
            margin="normal"
            required
            fullWidth
            id="city"
            label="City"
            name="city"
            autoComplete="address-level2"
            />
            <TextField
            margin="normal"
            required
            fullWidth
            id="street"
            label="Street"
            name="street"
            autoComplete="address-line1"
            />
            <TextField
            margin="normal"
            required
            fullWidth
            id="streetNum"
            label="Street Number"
            name="streetNum"
            type="number"
            autoComplete="address-line2"
            />
            <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            />
            <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            />
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
