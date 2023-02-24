import React from 'react';
import { useNavigate } from 'react-router-dom';

import { submitGoal } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth'

import emailjs from 'emailjs-com'
import { v4 as uuidv4 } from 'uuid'
import CryptoJS from 'crypto-js'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel';
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'


function AddGoalForm() {
    const { user } = useAuth()
    const navigate = useNavigate()

    const initInputs = {
        checkinDueDate: '',
        checkinFrequency: "weekly",
        date: '',
        docName: uuidv4(),
        goalTitle: "",
        passphrase: '',
        paused: false,
        senderName: user.displayName,
        senderUid: user.uid,
        shared: false,
        shareWith: "",
        shareWithEmail: "",
        secretText: "",
    }

    const [inputs, setInputs] = React.useState(initInputs)


    // from_name to_name message
    function sendEmail() {
        emailjs.sendForm('secret_service', 'send_secret', 'form', 'uA-6EB5WK_WxXR47o')
            .then((result) => {
                alert("The person you have indicated will be able to access your secret if you don't check in on schedule.")
                console.log(result.text)
            }, (error) => {
                console.log(error.text)
            }
            )
    }

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function submit() {
        const currentDate = new Date()
        
        function returnDueDate(frequency) {
            if (frequency === 'monthly') {
                return new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000)
            } else if (frequency === 'daily') {
                return new Date(currentDate.getTime() + 1  * 24 * 60 * 60 * 1000)
            } else {
                return new Date(currentDate.getTime() + 7  * 24 * 60 * 60 * 1000)
            }

        }

        const inputsWithDate = {
            ...inputs,
            date: new Date(),
            checkinDueDate: returnDueDate(inputs.checkinFrequency)
        }
        
        // ENCRYPTION
        inputsWithDate.secretText = CryptoJS.AES.encrypt(JSON.stringify(inputsWithDate.secretText), inputs.passphrase).toString()
        
        // These key:value pairs are only needed for sending the notification to the secret receiver with emailJS
        // We specifically wouldn't want to save the passphrase anywhere and the sender's name is included with the google Auth package
        delete inputsWithDate["senderName"]
        delete inputsWithDate["passphrase"]

        sendEmail()

        submitGoal(user.uid, inputsWithDate)
        setInputs(initInputs)
        
        navigate('/')

    }

    return(
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}    
            >
                <Typography component="h1" variant="h3">
                    Add Goal
                </Typography>
            </Box>
            
            <Box 
                id="form"
                component="form" 
                sx={{ mt: 1 }} 
                onSubmit={
                    (e)=>{e.preventDefault()
                    submit()}
                }
            >
                <InputLabel id="goalTitle" variant='filled' sx={{marginBottom: 1}}>Goal Title</InputLabel>
                <TextField 
                    margin='normal'
                    required
                    fullWidth
                    id='goalTitle'
                    label="Goal Title"
                    name='goalTitle'
                    value={inputs.goalTitle}
                    onChange={handleChange}
                    autoFocus
                />

                <InputLabel variant='filled' sx={{marginBottom: 1}}>Check In Frequency</InputLabel>

                    <RadioGroup
                        row
                        name='checkinFrequency'
                        value={inputs.checkinFrequency}
                        onChange={handleChange}
                    >
                    <Box
                        sx={{
                            width: '100%',
                            marginLeft: 'auto',
                            marginRight: 'auto',

                        }}
                    >
                        <FormControlLabel value="daily" control={<Radio />} label="Daily" />
                        <FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
                        <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
                    </Box>
                    </RadioGroup>

                
                <InputLabel variant='filled' sx={{marginBottom: 1}}>Secret Description</InputLabel>
                <TextField 
                    margin='normal'
                    required
                    fullWidth
                    multiline
                    id='secretText'
                    label="What is your secret shame?"
                    name='secretText'
                    value={inputs.secretText}
                    onChange={handleChange}                            
                />
                
                <InputLabel variant='filled' sx={{marginBottom: 1}}>Who should we share your secret with?</InputLabel>
                <TextField 
                    margin='normal'
                    required
                    fullWidth
                    id='shareWith'
                    label="Secret Receiver Name"
                    name='shareWith'
                    value={inputs.shareWith}
                    onChange={handleChange}
                />
              
                <InputLabel variant='filled' sx={{marginBottom: 1}}>Secret Receiver Email</InputLabel>
                <TextField 
                    margin='normal'
                    required
                    fullWidth
                    multiline
                    id='shareWithEmail'
                    label="Secret Receiver Email"
                    name='shareWithEmail'
                    value={inputs.shareWithEmail}
                    onChange={handleChange}                            
                />
                    
                <InputLabel variant='filled' sx={{marginBottom: 1}}>Passphrase</InputLabel>
                <TextField 
                    margin='normal'
                    required
                    fullWidth
                    multiline
                    id='passphrase'
                    label="Passphrase"
                    name='passphrase'
                    value={inputs.passphrase}
                    onChange={handleChange}                            
                />

                {/* 
                    A quirk of email-js is that it takes values from forms as "props." So
                    while we want to send these values to the secret Receiver, the secret 
                    sender does not need to see them while completing the form.
                */}
                <TextField 
                    sx={{display: 'none'}}
                    margin='normal'
                    fullWidth
                    id='senderName'
                    label="Hidden senderName TextField"
                    name='senderName'
                    value={inputs.senderName}
                    onChange={handleChange}                            
                />
                <TextField 
                    sx={{display: 'none'}}
                    margin='normal'
                    fullWidth
                    id='senderUid'
                    label="hidden senderUid TextField"
                    name='senderUid'
                    value={inputs.senderUid}
                    onChange={handleChange}                            
                />
                <TextField 
                    sx={{display: 'none'}}
                    margin='normal'
                    fullWidth
                    id='docName'
                    label="hidden docName Textfield"
                    name='docName'
                    value={inputs.docName}
                    onChange={handleChange}                            
                />

                <Button 
                    variant="contained"
                    type="submit"
                >
                    Submit
                </Button>

            </Box>
        </Container>

    )
}

export { AddGoalForm }

