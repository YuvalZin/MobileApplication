import React from 'react';
import { List, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function FCSystemAdmin(props) {
    let users = JSON.parse(localStorage.getItem("users"));

    const editUser = (userEmail) =>{
        props.adminEditUser(userEmail);
    }
    
    const renderUsers = () => {
        return users.map(user => (
            <TableRow key={user.email}>
                <TableCell>
                    <Avatar alt={user.firstName + " " + user.lastName} src={user.photo} />
                </TableCell>
                <TableCell>{user.firstName + " " + user.lastName}</TableCell>
                <TableCell>{user.birthdate}</TableCell>
                <TableCell>{user.street + " "+ user.streetNum + ", "+ user.city}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                    <IconButton onClick={() => editUser(user.email)} aria-label="edit">
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Avatar</TableCell>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Birthdate</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Email Address</TableCell>
                        <TableCell></TableCell> {/* Unnamed column for edit/delete buttons */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderUsers()}
                </TableBody>
            </Table>
        </TableContainer>
    );
}