import React from "react";

import { useAuth } from '../../hooks/useAuth';

import Button from "@mui/material/Button"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2'

function SignIn() {
    const { login } = useAuth();

    return (
        <Grid xs={6}>
            <Paper elevation={6}>
                <Box margin={3} padding={3}>
                    <Typography component='h1' variant='h3'>
                        Here to track your goals?
                    </Typography>
                    <Button variant='contained' onClick={login}>
                        Login with Google
                    </Button>
                </Box>
            </Paper>
        </Grid>
    )
}

export { SignIn }