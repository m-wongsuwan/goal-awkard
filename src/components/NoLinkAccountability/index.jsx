import React from "react";

import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
// import InputLabel from "@mui/material/InputLabel";
// import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';

function NoLinkAccountability() {

    return (
        <Container>
            <Box>
                <Typography>
                    You'll need the link sent to your email to unlock a secret.
                </Typography>
            </Box>
        </Container>
    )
}

export { NoLinkAccountability }