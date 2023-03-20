import React from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function About(props) {
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
                    <Typography component='h1' variant='h3'>
                        Need motivation?
                    </Typography>
                    <Typography component='h1' variant='h5'>
                        Goal Awkward can help you achieve your goals!
                    </Typography>
                    <Typography 
                        component='p' 
                        variant='p'
                        sx={styles.pStyle}
                    >
                        Start tracking your goals for free with <b>Goal Awkward</b>. Goal Awkward helps you achieve your goals by threatening to share your deepest, darkest secrets with those you know!
                    </Typography>

                    <Typography 
                        component='p' 
                        variant='p'
                        sx={styles.pStyle}
                    >
                        When you first register a goal with Goal Awkward, you’ll be asked to provide a string of text, the email address of someone you wouldn’t want seeing the string of text you shared, and a passphrase they can use to unlock your secret if you ever stop logging progress towards your goal. The content of the text is up to you; it could be a secret, an embarrassing personal disclosure, admission of guilt in a criminal case, or, perhaps most terrifying, the link to the web diary you kept in high school. The more compromising or embarrassing the text, the more motivation you have to keep making progress towards your goal!
                    </Typography>

                    <Typography 
                        component='p' 
                        variant='p'
                        sx={styles.pStyle}
                    >
                        From there, you just need to log in and confirm you've made progress on your goal every day, week, or month (depending on your preferences)!
                    </Typography>

                    <Typography 
                        component='p' 
                        variant='p'
                        sx={styles.pStyle}
                    >
                        Secrets are encrypted before they ever make it to Goal Awkward’s servers. Delete all data related to your secret at any time. Only the person you specify has both the link and passphrase needed to decrypt and reveal your secret.
                    </Typography>
                    
                    {props.authenticated ? null :
                        <Typography 
                            component='p' 
                            variant='h6'
                            sx={styles.pStyle}
                        >
                            Ready to harness the power of embarrassment to achieve your goals? Sign up to try it yourself!
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
                        lineHeight: .5,
                        pl: 4,
                        '& .MuiListItem-root': {
                        display: 'list-item',
                        }}}
                    >
                        <ListItem>React</ListItem>
                        <ListItem>React Router</ListItem>
                        <ListItem>Material UI Component Library</ListItem>
                        <ListItem>Material UI Theming</ListItem>
                        <ListItem>Google Firebase Authentication, Back End, and Deployment</ListItem>
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
            
            <Box styles={{position: 'relative', bottom: 0}}>
                 <Typography variant='caption'>
                    Copyright Morgan Wongsuwan 2023. Goal Icon created by Erix Subyarko from Noun Project   
                </Typography>
            </Box>
        </>
        
        
    )
}

export { About }