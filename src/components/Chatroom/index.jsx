import React from "react"
import { MessageInput } from "../MessageInput"
import { MessageList } from "../MessageList"

import Container from '@mui/material/Container'
import Typography from "@mui/material/Typography"

function ChatRoom() {

    return (
        <Container 
            className="component--chatroom"
            sx={{
                // width: '350px'
            }}
        >
            <Typography component='h1' variant='h3'>chatroom component</Typography>
            <MessageList roomID='general'/>
            <MessageInput />
        </Container>
    )
}

export { ChatRoom }