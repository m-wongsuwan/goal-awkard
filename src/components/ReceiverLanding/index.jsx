import React from 'react';

import { AccountabilityContext } from '../../context/accountability';

import { makeDecryptDateString } from '../../hooks/functions';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List'
import Link from '@mui/material/Link'
import ListItem from '@mui/material/ListItem'
import Paper from '@mui/material/Paper';

function ReceiverLanding(props) {
    const { secretUnlockDate } = React.useContext(AccountabilityContext)

    const styles = {
        pStyle: {
            my: 2
        },
        pStyleTwo: {
            mt: 2
        },
        authenticatedStyle: {
            width: '80%',
            mx: 'auto',
        },
        boxStyle: {
            m:3,
            p:3
        }
    }

    return(
        <>
            <Paper elevation={6} sx={props.authenticated ? styles.authenticatedStyle : null}>
                <Box sx={styles.boxStyle}>
                    <Typography component='h1' variant='h4'>
                        Someone wants you to hold them accountable
                    </Typography>
                    <Typography component='h1' variant='h6'>
                        What an honor
                    </Typography>
                    <Typography 
                        component='p' 
                        variant='p'
                        sx={styles.pStyle}
                    >
                        <b>Goal Awkward</b> helps people achieve their goals by threatening to share their deepest, darkest secrets with those they know!
                    </Typography>

                    <Typography 
                        component='p' 
                        variant='p'
                        sx={styles.pStyle}
                    >
                        When someone registers a goal on Goal Awkward, they also enter a compromising string of text. A secret, an embarrassing personal disclosure, admission of guilt in a criminal case, or, perhaps most terrifying, a link to the web diary they kept in high school. If a user ever fails to log progress towards their goal in the time frame they set for themself, their secret can be decrypted.
                    </Typography>

                    <Typography 
                        component='p' 
                        variant='p'
                        sx={styles.pStyle}
                    >
                        The goal setter has until <b>{makeDecryptDateString(secretUnlockDate)}</b> to check in. After which time you can decrypt their "secret."
                    </Typography>
                    
                    {props.authenticated ? null :
                        <Typography 
                            component='p' 
                            variant='h6'
                            sx={styles.pStyle}
                        >
                            Ready to harness the power of embarrassment to achieve your own goals? Sign up and try it out for yourself!
                        </Typography>

                    }
                </Box>
            </Paper>

            {props.authenticated ?
            <Paper elevation={6} sx={props.authenticated ? styles.authenticatedStyle : null}>
                <Box sx={{...styles.boxStyle, textAlign: 'left'}}>
                    <Typography component='h1' variant='h4'>
                        About the Project
                    </Typography>

                    <Typography component='p' variant='p' sx={styles.pStyleTwo} >
                        This app is a web development portfolio project by Morgan Wongsuwan.
                    </Typography>
                    <Typography component='p' variant='p'  sx={styles.pStyleTwo} >
                        Here is a non-exhaustive list of technologies used in the making of this project:
                    </Typography>
                    <List 
                        sx = {{
                        listStyleType: 'disc',
                        lineHeight: .8,
                        pl: 4,
                        '& .MuiListItem-root': {
                        display: 'list-item',
                        }}}
                    >
                        <ListItem>React</ListItem>
                        <ListItem>React Router</ListItem>
                        <ListItem>Material UI Component Library</ListItem>
                        <ListItem>Google Firebase Authentication and Back End</ListItem>
                        <ListItem>Real Time Chat</ListItem>
                        <ListItem>Node packages including CryptoJS and EmailJS</ListItem>
                        </List>
                    <Typography component='p' variant='p'  sx={styles.pStyleTwo} >
                        For employment inquiries or to get in touch, check out my <Link href='https://www.linkedin.com/in/m-wongsuwan/' target="_blank" rel="noopener">LinkedIn</Link>.
                    </Typography>
                </Box>


            </Paper>
            
            :
                null}
        </>
        
        
    )
}

export { ReceiverLanding }