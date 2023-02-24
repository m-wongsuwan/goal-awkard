import React from "react";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';
import { SignIn } from "../SignIn";
import Paper from "@mui/material/Paper";

function NoLinkAccountability() {

    return (
        <Container>
            <Box>
                <Paper elevation={6}>
                    <Typography component='h2' variant='h3'>
                        You'll need the link sent to your email to unlock a secret.
                    </Typography>
                </Paper>
            </Box>
            <SignIn />
        </Container>
    )
}

export { NoLinkAccountability }