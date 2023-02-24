import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from '../../hooks/useAuth';

import Box from '@mui/material/Box';
import Button from "@mui/material/Button"
import Grid from '@mui/material/Unstable_Grid2'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function SignIn() {
    const { login } = useAuth();
    const navigate = useNavigate()

    function logInAndNavigateHome() {
        login()
        try {
            navigate('/')
        } catch (error) {
            
        }
    }

    return (
        <Grid xs={6}>
            <Paper elevation={6}>
                <Box margin={3} padding={3}>
                    <Typography component='h1' variant='h3'>
                        Here to track your goals?
                    </Typography>
                    <Button variant='contained' onClick={logInAndNavigateHome}>
                        Login with Google
                    </Button>
                </Box>
            </Paper>
        </Grid>
    )
}

export { SignIn }