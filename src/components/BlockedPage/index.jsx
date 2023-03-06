import React from "react";

import { About } from "../About";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Container from "@mui/system/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function BlockedPage(props) {
    const { page } = props

    return (
        <Container>
            <Paper elevation={6} sx={{p: 3}}>
                <Typography
                    component='h1'
                    variant='h4'
                >
                    {props.accountability ? "You'll need to use the link sent to your email to decrypt a secret." : page !== "doesn't exist" ? `You need to sign in to ${page}.` : "Looks like this page doesn't exist. Please sign in."}
                </Typography>

                <Link to='/' style={{textDecoration: 'none'}} >
                    <Button variant="contained" sx={{my: 3}} size="large">
                        Return Home
                    </Button>
                </Link>
            </Paper>

            <About />
        </Container>
    )
}

export { BlockedPage }