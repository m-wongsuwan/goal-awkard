import React from "react";

import { SizingContext } from "../../context/sizing";

import { About } from "../About";

import Container from '@mui/material/Container';



function UnauthenticatedWelcome() {
    const { appBarHeight } = React.useContext(SizingContext)

    return (
        <Container
            sx={{
                mt: `${appBarHeight + 20}px`,
                width: '50%'
            }}
        >
            <About />
   
        </Container>
    )
}

export { UnauthenticatedWelcome }