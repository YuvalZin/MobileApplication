import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import FCEditDetails from './FCEditDetails';


export default function FCProfile(props) {
  // State variables to manage user data and edit visibility
  const [user, setUser] = useState(null);
  const [editVisible, setEditIsVisible] = useState(false);

  // Message to display if the user is not logged in
  const [msg,] = useState("You must log in or sign up to the system!");

  let loggedUser = sessionStorage.getItem('userLogged');

  // Load user data when component mounts or user data changes
  useEffect(() => {
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    } else {
      setUser(null);
    }
    console.log("hi");
  }, [loggedUser]);

  // Function to handle clicking on "Edit Profile" button
  const editProfileClicked = () => {
    setEditIsVisible(true);
  }

  // Function to open game URL in a new tab
  const openGameURL = () => {
    window.open("https://gameforge.com/en-US/littlegames/bloons-tower-defense-4/#", '_blank');
  }

  // Function to handle logging out
  const logOut = () => {
    sessionStorage.removeItem('userLogged');
    setUser(null);
    props.logOut();
  };

  // Render user profile if user is valid and logged in
  if (user) {
    const name = user.firstName + " " + user.lastName;
    const mail = user.email;
    const address = user.street + " " + user.streetNum + ", " + user.city;
    const birthday = user.birthdate;
    const avatar = user.photo;
    return (
      <>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} >
          <Box
            sx={{
              py: 3,
              px: 3,
              my: 2,
              mx: 1,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex' }}>
              <Avatar sx={{ border: '3px solid purple', width: 80, height: 80, m: 1, bgcolor: 'secondary.main', overflow: 'hidden' }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={avatar} alt="" />
              </Avatar>
              <div style={{ width: '70%', paddingLeft: 10, display: 'flex', flexDirection: 'column', fontFamily: "'Roboto',sans-serif" }}>
                <h2 style={{ color: 'black' }}>{name}</h2>
                <div style={{ color: 'black', paddingBottom: 8, fontSize: 14, display: 'flex' }}>{<EmailIcon fontSize="14px" />}<span>&nbsp;</span>{mail}</div>
                <div style={{ color: 'black', paddingBottom: 8, fontSize: 14, display: 'flex' }}>{<HomeIcon fontSize="16px" />}<span>&nbsp;</span>{address}</div>
                <div style={{ color: 'black', fontSize: 14, display: 'flex' }}>{<CakeOutlinedIcon fontSize="14px" />}<span>&nbsp;</span>{birthday}</div>
              </div>
              <div style={{ textAlign: 'right', width: '100%' }}><span style={{ cursor: 'pointer' }} onClick={logOut}>{<LogoutIcon color='primary' />}</span></div>
            </div>
            <div style={{ display: 'flex' }}>
              <Button
                style={{ fontFamily: "'Roboto',sans-serif", textTransform: 'none' }}
                fullWidth
                variant="contained"
                onClick={editProfileClicked}
                sx={{ mr: 1, mt: 3, mb: 2 }}
              >Edit Profile
              </Button>
              <Button
                style={{ fontFamily: "Roboto,sans-serif", textTransform: 'none' }}
                color='secondary'
                fullWidth
                onClick={openGameURL}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >My Game
              </Button>
            </div>
          </Box>
        </Grid>
        {
          editVisible && <div>
            <FCEditDetails setEditIsVisible={setEditIsVisible} profileEditUser={user} updateUser={setUser} />
          </div>
        }
      </>
    );
  } else {
    // Display message if user is not logged in
    return (
      <>
        <div style={{ color: 'purple', borderRadius: 15, padding: 15, backgroundColor: 'white', textAlign: 'center' }}>{msg}</div>
      </>
    );
  }
}
