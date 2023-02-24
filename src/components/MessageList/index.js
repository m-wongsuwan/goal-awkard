import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useMessages } from '../../hooks/useMessages'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

function MessageList({ roomID }) {
    const containerRef = React.useRef(null);
    const { user } = useAuth()
    const messages = useMessages(roomID)

    React.useLayoutEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    })

    function Message({ message, isOwnMessage }) {
        const { displayName, text } = message;
        return (
            <ListItem 
                className={['message', isOwnMessage && 'own-message'].join(' ')}
                sx={{

                    // width: '45vw'
                    // alignSelf: 'flex-end'
                }}
            >
                <ListItemText
                    primary={text}
                    secondary={isOwnMessage ? 'You' : displayName}
                    sx={{
                        textAlign: isOwnMessage ? 'right' : 'left',
                        backgroundColor: isOwnMessage ? 'lightBlue' : 'lightGreen',
                        marginLeft: isOwnMessage ? 15 : null,
                        marginRight: !isOwnMessage ? 15 : null,
                        p: 2,
                        borderRadius: '5px'
                    }}
                />
            </ListItem>
        )
    }

    return (
        <Box 
            component='div'
            ref={containerRef}
            className='message-list-container'
            sx={{
                height: '65vh',
                overflow: 'auto',
                flex: 1
            }}
        >
            <List 
                className='message-list'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                }}
            >
                {messages.map((x) => (
                    <Message 
                        key={x.id}
                        message={x}
                        isOwnMessage={x.uid === user.uid}
                    />
                ))}
            </List>

        </Box>
    )

}

export { MessageList }