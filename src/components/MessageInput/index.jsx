import React from "react";

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { sendMessage } from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";

function MessageInput() {
    const { user } = useAuth()
    console.log(user)
    
    const [messageInput, setMessageInput] = React.useState('')

    function handleChange(e) {
        const { value } = e.target
        setMessageInput(value)
    }

    function handleSubmit() {
        sendMessage('general', user, messageInput)
        setMessageInput('')
    }

    return (
        <Box 
            component='form'
            onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}
        >
            <TextField 
                    margin='normal'
                    // fullWidth
                    id='message Input '
                    label="Aa"
                    name='messageInput'
                    value={messageInput}
                    onChange={handleChange}
                    autoFocus
                />
                <Button 
                    variant="contained" 
                    type='submit'
                >
                    Send
                </Button>
        </Box>
    )
}

export { MessageInput }