import React from "react";

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { sendMessage } from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";

function MessageInput() {
    const { user } = useAuth()
    
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
            sx={{
                height: '55px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <TextField 
                    fullWidth
                    id='message Input '
                    label="Aa"
                    name='messageInput'
                    value={messageInput}
                    onChange={handleChange}
                    autoFocus
                    autoComplete="off"
                />
                <Button 
                    variant="contained" 
                    type='submit'
                    sx={{height: '100%'}}
                >
                    Send
                </Button>
        </Box>
    )
}

export { MessageInput }