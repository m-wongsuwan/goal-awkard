import React from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function About() {
    return(
        <Paper elevation={6}>
            <Box margin={3} padding={3}>
                <Typography component='h1' variant='h3'>
                    About
                </Typography>
                <Typography component='p' variant='p'>
                Lorem ipsum dotem Lorem ipsum dotem Lorem ipsum dotem Lorem ipsum dotem Lorem ipsum dotem Lorem ipsum dotem Lorem ipsum dotem Lorem ipsum dotem Lorem ipsum dotem Lorem ipsum dotem Lorem ipsum dotem Lorem ipsum dotem 
                </Typography>
            </Box>
        </Paper>
    )
}

export { About }