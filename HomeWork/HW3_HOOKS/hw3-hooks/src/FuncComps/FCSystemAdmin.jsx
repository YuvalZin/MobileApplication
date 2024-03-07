import React from 'react';
import { Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react'
import FCEditDetails from './FCEditDetails';
import Swal from 'sweetalert2';


export default function FCSystemAdmin(props) {
    // Ensuring users is initialized as an empty array if there's nothing in localStorage
    let users = JSON.parse(localStorage.getItem("users")) || []; 
    
    // State variables to manage user editing and deletion
    const [user2Edit, setUser2Edit] = useState(null);
    const [userEditVisible, setEditVisible] = useState(false);

    // Function to handle editing user details
    const editUser = (userEmail) => {
        setEditVisible(true); // Set the visibility of the edit component
        let userIndex = users.findIndex(u => u.email === userEmail);// Find the index of the user
        setUser2Edit(users[userIndex]);// Set the user to be edited
    }

    const deleteUser = (userEmail) => {
        // Show confirmation dialog before deletion
        Swal.fire({
            title: "Are you sure you want to delete that user?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `Cancel`
        }).then((result) => {
            if (result.isConfirmed) {
                let userIndex = users.findIndex(u => u.email === userEmail);
                users.splice(userIndex, 1);
                localStorage.setItem("users", JSON.stringify(users));// Update the users list in local storage
                setUserRemoved(true);
                Swal.fire("User deleted successfully!", "", "success");}// Show success message
        });
        
    }

    // Function to render user information in the table
    const renderUsers = () => {
        if (users.length === 0) {
            // Display a message if no users are registered
            return (
                <TableRow>
                    <TableCell colSpan={6} align="center">No users registered yet</TableCell>
                </TableRow>
            );
        } else { // Map through the users array and render each user's information
            return users.map(user => (
                <TableRow key={user.email}>
                    <TableCell><Avatar alt={user.firstName + " " + user.lastName} src={user.photo} /></TableCell>
                    <TableCell>{user.firstName + " " + user.lastName}</TableCell>
                    <TableCell>{user.birthdate}</TableCell>
                    <TableCell>{user.street + " " + user.streetNum + ", " + user.city}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                        <IconButton onClick={() => editUser(user.email)} aria-label="edit">
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => deleteUser(user.email)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            ));
        }
    };

    return (
        <><TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Avatar</TableCell>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Birthdate</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Email Address</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderUsers()}
                </TableBody>
            </Table>
        </TableContainer>
            {userEditVisible && <div style={{ margin: 'auto', width: '45%' }}>
                <FCEditDetails setAdminEditVisible={setEditVisible} adminEditUser={user2Edit} />
            </div>}
        </>
    );
}
