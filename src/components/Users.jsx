import { useState, useEffect } from 'react';

import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, styled, Button } from '@mui/material';

import axios from 'axios';

const Component = styled(Box)`
    width: 90%;
    margin: 30px auto;
    
    & > h4 {
        margin-bottom: 25px;
        color: black; 
        font-size: 24px;
        font-weight: bold;
    }

    & > div > table {
        width: 100%;
        border-collapse: collapse;
    }

    & > div > table > thead {
        background-color: green;
    }

    & > div > table > thead > tr > th {
        color: black; 
        font-size: 18px;
        font-weight: 500;
        padding: 10px;
        border-right: 1px solid #ddd; 
    }

    & > div > table > tbody > tr > td {
        font-size: 16px;
        color: black;
        padding: 8px;
        border-right: 1px solid #ddd; 
    }

    & > div > table > thead > tr > th:last-child,
    & > div > table > tbody > tr > td:last-child {
        border-right: none; 
    }
`;



const Users = () => {

    const [users, setUsers] = useState([]);

    const API_URL = 'https://a6yow11vbc.execute-api.ap-south-1.amazonaws.com/Dev';

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(API_URL);
            setUsers(JSON.parse(response.data.body).Items);
        }
        getData();
    }, [])

    const removeEntry = (id) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
    }

    return (
        <Component>
            <Typography variant="h4">Users</Typography>
            <Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Salary</TableCell>
                            <TableCell>Remove Entry</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.age}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.salary}</TableCell>
                                    <TableCell><Button variant="contained" color="error" onClick={() => removeEntry(user.id)}>Remove</Button></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Box>
        </Component>
    )
}

export default Users;