import React from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function About() {
    return(
        <Paper elevation={6}>
            <Box margin={3} padding={3}>
                <Typography component='h1' variant='h3'>
                    About
                </Typography>
                <Typography component='p' variant='p'>
                Sign up for free to start tracking your goals with Goal Awkward. Goal Awkward helps you achieve your goals by threatening to share your deepest, darkest secrets with those you know!
                </Typography>

                <Typography component='p' variant='p'>
                    When you first register a goal with Goal Awkward, you’ll be asked to provide a string of text, the email address of someone you wouldn’t want seeing the string of text you shared, and a passphrase they can use to unlock your secret if you ever stop logging progress towards your goal. The content of the text is up to you; it could be a secret, an embarrassing personal disclosure, admission of guilt in a criminal case, or, perhaps most terrifying, the link to the web diary you kept in high school. The more compromising or embarrassing the text, the more motivation you have to keep making progress towards your goal!
                </Typography>

                <Typography component='p' variant='p'>
                    Secrets are encrypted before they ever make it to Goal Awkward’s servers and only the person you specify has both the link and passphrase needed to decrypt and reveal your secret.
                </Typography>

            </Box>
        </Paper>
    )
}

export { About }