import React from "react";
import { useParams } from "react-router-dom";
import { useSecret } from "../../hooks/useSecret";

import CryptoJS from "crypto-js";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from "@mui/material/InputLabel";
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';


function Accountability() {
    // Testing URL. Passphrase: "Encryption Test"
    // http://localhost:3000/accountability/ysQMrka0omWRREgJXY5ac7o3Zyv1/df3836af-539a-437b-853f-c595a9c4e417


    const { userId, secretId} = useParams();
    const secretObj = useSecret(userId, secretId)

    let dateObj

    

    if (secretObj.checkinDueDate != undefined) {
        dateObj = new Date(secretObj.checkinDueDate.seconds * 1000)
        // console.log(dateObj)
    }

    // console.log(new Date().getTime())

    const [passphraseInput, setPassphraseInput] = React.useState('')
    const [decryptedText, setDecryptedText] = React.useState('')

    function handleChange(e) {
        const { value } = e.target;
        setPassphraseInput(value)
    }

    // let bytes = CryptoJS.AES.decrypt(encryptedSecret, 'Encryption Test')
    // let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    // console.log(decryptedData)

    function handleSubmitDecrypt() {
        let bytes = CryptoJS.AES.decrypt(secretObj.secretText, passphraseInput)
        let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        setDecryptedText(decryptedData)
    }

    function returnDateString(date) {
        const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return `${monthsArr[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }


    return (
        <>
            <Typography>
                Check in Due Date: {dateObj ? returnDateString(dateObj) : null}
            </Typography>
            <Box
                id="form"
                component="form"
                onSubmit={ (e) => {
                    e.preventDefault()
                    if (new Date().getTime() - dateObj.getTime() > 0) {
                        alert('should show')
                        // handleSubmitDecrypt()
                    } else {
                        alert('should not')
                    }
                }}  
            >
                <InputLabel id="passphrase">
                    Passphrase
                </InputLabel>
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
                <Box>
                    <Typography>
                        {decryptedText}
                    </Typography>
                </Box>
            :
                null
            }

        </>
    )
}

export { Accountability }