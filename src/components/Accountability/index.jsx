import React from "react";
import { useParams } from "react-router-dom";
import { useSecret } from "../../hooks/useSecret";

import CryptoJS from "crypto-js";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import Paper from "@mui/material/Paper";
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';

import { ReceiverLanding } from "../ReceiverLanding";
import { AccountabilityContext } from "../../context/accountability";


function Accountability(props) {
    const { setSecretUnlockDate } = React.useContext(AccountabilityContext)


    const { userId, secretId } = useParams();

    const secretObj = useSecret(userId, secretId)

    let dateObj    

    if (secretObj.checkinDueDate !== undefined) {
        setSecretUnlockDate(new Date(secretObj.checkinDueDate.seconds * 1000))
    }

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
    }

    function dateHasPassed() {
        return new Date().getTime() - dateObj.getTime() > 0
    }

    return (
        <Container>
            
            <ReceiverLanding />

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
                >
                    Decrypt
                </Button>

            </Box>

            
            {decryptedText ?
                <Paper elevation={6} sx={{p:4}} >
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