
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';



const UserProfile = () => {
    const { isAuthenticated, user } = useAuth0();
    return (
        isAuthenticated  && (
            <div>
                <Container maxWidth="xl" align='center'>
                    <CssBaseline />
                    <Typography variant="h4" align='center' gutterBottom component="div" sx={{ m: 2 }}>
                        MY PROFILE
                    </Typography>
                    <Box component="form" sx={{ '& > :not(style)': { m: 1 }, display: 'grid', gap: 1, gridTemplateColumns: 'repeat(2, 1fr)', height: '70vh', width: '100vh' }} noValidate autoComplete="off"
                    >
                        <div>
                            <TextField
                                disabled                                
                                id="standard-required"
                                label="Name"
                                value={user.given_name}
                                variant="outlined"
                                color='success'
                            />
                        </div>
                        <div>
                            <TextField
                                disabled                                
                                id="standard-required"
                                label="Last Name"
                                value={user.family_name}    
                                variant="outlined"
                                color='success' 
                            />
                        </div>
                        <div>
                            <TextField
                                disabled                                
                                id="standard-required"
                                label="Mail"
                                value={user.email}    
                                variant="outlined"
                                color='success' 
                            />
                        </div>
                        <div>
                            <TextField
                                disabled                                
                                id="standard-required"
                                label="User Name"
                                value={user.nickname}    
                                variant="outlined"
                                color='success' 
                            />
                        </div>
                        <div>
                            <TextField
                                disabled                                
                                id="standard-required"
                                label="DNI/Passport"
                                //value={}    
                                variant="outlined"
                                color='success' 
                            />
                        </div>
                        <div>
                            <TextField
                                disabled                                
                                id="standard-required"
                                label="Phone Number"
                                //value={}    
                                variant="outlined"
                                color='success' 
                            />
                        </div>
                    </Box>
                </Container>
            </div>
        )
    )
}

export default UserProfile;