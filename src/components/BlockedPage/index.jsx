import React from "react";

import { useAuth } from '../../hooks/useAuth';

import Button from "@mui/material/Button"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function BlockedPage(props) {
    const { login } = useAuth();
    const { page } = props

    return (
        <>
            <h1>you need to sign in to see {page}</h1>

            <Paper elevation={6}>
                {/* this should be made a comopnent */}
                <Box margin={3} padding={3}>
                    <Typography component='h1' variant='h3'>
                        Here to track your goals?
                    </Typography>
                    <Button variant='contained' onClick={login}>
                        Login with Google
                    </Button>
                </Box>
            </Paper>
        </>
    )
}

export { BlockedPage }