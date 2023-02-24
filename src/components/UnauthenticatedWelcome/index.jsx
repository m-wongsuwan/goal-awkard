import React from "react";
import { Link } from 'react-router-dom'

import { SignIn } from "../SignIn";
import { About } from "../About";

import Container from '@mui/material/Container';
import Button from "@mui/material/Button"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2'

function UnauthenticatedWelcome() {

    return (
        <Container>
            <About />

            <Grid container spacing={2}>
        
                <SignIn />

                <Grid xs={6}>
                    <Paper elevation={6}>
                        <Box margin={3} padding={3}>
                            <Typography component='h1' variant='h4'>
                                Here to keep someone accountable or reveal their secret?
                            </Typography>
                            <Typography component='h3' variant='h5'>
                                (No sign in required)
                            </Typography>
                            <Button variant='contained'>
                                <Link to='/accountability'>
                                    {/* styles */}
                                    Take me to the accountability page.
                                </Link>
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

            </Grid>       
        </Container>
    )
}

export { UnauthenticatedWelcome }