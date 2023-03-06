import React from "react";
import { useParams } from "react-router-dom";

import { markShared } from "../../services/firebase";

import { makeDecryptDateString } from '../../hooks/functions';
import { useSecret } from "../../hooks/useSecret";

import CryptoJS from "crypto-js";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import Paper from "@mui/material/Paper";
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';



function Accountability(props) {
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

    const { userId, secretId } = useParams();

    const secretObj = useSecret(userId, secretId)

    const [passphraseInput, setPassphraseInput] = React.useState('')
    const [decryptedText, setDecryptedText] = React.useState('')

    function handleChange(e) {
        const { value } = e.target;
        setPassphraseInput(value)
    }

    function handleSubmitDecrypt() {
        let bytes = CryptoJS.AES.decrypt(secretObj.secretText, passphraseInput)
        let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        setDecryptedText(decryptedData)
        markShared(userId, secretId)
    }

    function dateHasPassed() {
        return new Date().getTime() - secretObj.checkinDueDate.seconds * 1000 > 0
    }

    return (
        <Container>
            
            <Paper elevation={6} sx={props.authenticated ? styles.authenticatedStyle : null}>
                <Box sx={styles.boxStyle}>
                    <Typography component='h1' variant='h4'>
                        Someone wants you to hold them accountable
                    </Typography>
                    <Typography component='h1' variant='h6' sx={{fontStyle: 'italic'}}>
                        What an honor
                    </Typography>
                    <Typography component='p' variant='p' sx={styles.pStyle}>
                        <b>Goal Awkward</b> helps people achieve their goals by threatening to share their deepest, darkest secrets with those they know!
                    </Typography>

                    <Typography component='p' variant='p' sx={styles.pStyle}>
                        When someone registers a goal on Goal Awkward, they also enter a compromising string of text. A secret, an embarrassing personal disclosure, admission of guilt in a criminal case, or, perhaps most terrifying, a link to the web diary they kept in high school. If a user ever fails to log progress towards their goal in the time frame they set for themself, their secret can be decrypted.
                    </Typography>

                    <Typography component='p' variant='p' sx={{...styles.pStyle, fontSize: '1.2rem', fontWeight: 'bold'}}                    >
                        {secretObj.completed ? "This goal has been marked complete! The encrypted secret hash has been permanently deleted." : (secretObj.checkinDueDate ? dateHasPassed() ? `This person has missed their check in and you may decrypt their "secret."` : `This goal setter has until ` + makeDecryptDateString(new Date(secretObj.checkinDueDate.seconds * 1000)) + ` to check in.` : "Error retrieving goal and secret data.")}
                    </Typography>
                    
                    {props.authenticated ? null :
                        <Typography component='p' variant='h6' sx={styles.pStyle}>
                            Ready to harness the power of embarrassment to achieve your own goals? Sign up and try it out for yourself!
                        </Typography>

                    }
                </Box>
            </Paper>

            {secretObj.completed ? null :
            
                <Box
                    id="form"
                    component="form"
                    onSubmit={ (e) => {
                        e.preventDefault()
                        if (dateHasPassed()) {
                            handleSubmitDecrypt()
                        } else {
                            alert('The person who set this goal still has time to check in!')
                        }
                    }}  
                >

                    <TextField 
                        margin='normal'
                        required
                        fullWidth
                        id='passphraseInput'
                        label="Passphrase Input"
                        name='passphraseInput'
                        value={passphraseInput}
                        onChange={handleChange}
                        autoFocus
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        size="large"
                    >
                        Decrypt
                    </Button>

                </Box>
            }

            
            {decryptedText ?
                <Paper elevation={6} sx={{p:4, my:3}} >
                    <Typography variant='h6' align="left" sx={{mb:3}}>
                        Your decrypted text:
                    </Typography>
                    <Typography variant='h3'>
                        {decryptedText}
                    </Typography>
                </Paper>
            :
                null
            }
        </Container>
    )
}

export { Accountability }