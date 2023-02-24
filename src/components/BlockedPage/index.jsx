import React from "react";

import Container from "@mui/system/Container";
import Typography from "@mui/material/Typography";

import { About } from "../About";

import { SignIn } from "../SignIn";

function BlockedPage(props) {
    const { page } = props

    return (
        <Container>
            <Typography
                component='h1'
                variant='h3'
            >
                {page !== "doesn't exist" ? `You need to sign in to see ${page}.` : "This page doesn't exist. Please sign in."}
            </Typography>

            <SignIn />
            <About />
        </Container>
    )
}

export { BlockedPage }