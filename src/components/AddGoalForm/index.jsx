import React from 'react';
import { useNavigate } from 'react-router-dom';

import { submitGoal } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth'

import emailjs from 'emailjs-com'
import { v4 as uuidv4 } from 'uuid'
import CryptoJS from 'crypto-js'
import isEmail from 'validator/lib/isEmail';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';

import HelpCenterIcon from '@mui/icons-material/HelpCenter';


function AddGoalForm() {
    const { user } = useAuth()
    const navigate = useNavigate()

    const [emailIsValid, setEmailisValid] = React.useState(false)

    const initInputs = {
        checkinDueDate: '',
        checkinFrequency: "weekly",
        completed: false,
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
    // disabled during testing
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
        if (isEmail(inputs.shareWithEmail)) {
            setEmailisValid(true)
        } else {
            setEmailisValid(false)
        }
    }

    function submit() {
        if (emailIsValid) {
            const currentDate = new Date()
            
            function calculateDueDate(frequency) {
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
                checkinDueDate: calculateDueDate(inputs.checkinFrequency)
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
        } else {
            alert("Please enter a valid email address")
        }

    }

    return(
        <Container component="main" >            
            <Box 
                id="form"
                component="form" 
                sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'rgba(256, 256, 256, .9)',
                    p: 3,
                    mx: 'auto',
                    alignItems: 'center',
                    maxWidth: "md",
                    
                }} 
                onSubmit={
                    (e)=>{e.preventDefault()
                    submit()}
                }
            >
                <Box
                    sx={{
                        display: 'flex', 
                        width: '100%', 
                        alignItems: 'center', 
                        justifyContent: 'space-between'
                    }}
                >
                    <InputLabel variant='filled' id="goalTitle"  sx={{marginBottom: 1}}>
                        What are you working towards?
                    </InputLabel>

                    
                    <Tooltip 
                        title='Check out the S.M.A.R.T. goals page for info on effective goal setting!'
                        sx={{
                            position: 'relative',
                            top: 0,
                            right: 0
                        }}
                    >
                        <IconButton>
                            <HelpCenterIcon />
                        </IconButton>
                    </Tooltip>
                </Box>


                <TextField 
                    margin='normal'
                    required
                    fullWidth
                    id='goalTitle'
                    label="Goal"
                    name='goalTitle'
                    value={inputs.goalTitle}
                    onChange={handleChange}
                    autoFocus
                />

                <InputLabel  sx={{marginBottom: 1}}>How often will you check in?</InputLabel>

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

                <Box
                    sx={{
                        display: 'flex', 
                        width: '100%', 
                        alignItems: 'center', 
                        justifyContent: 'space-between'
                    }}
                >
                    <InputLabel variant='filled' sx={{marginBottom: 1}}>
                        Give us a secret, shame, admission or disclosure
                    </InputLabel>

                    <Tooltip title='Whatever you enter here will be encrypted before being sent to the Goal Awkward server. The person you name below will only be able to access the encrypted hash and use the passphrase you provide if you miss a check in.'>
                        <IconButton>
                            <HelpCenterIcon />
                        </IconButton>
                    </Tooltip>

                </Box>

                <TextField 
                    margin='normal'
                    required
                    fullWidth
                    multiline
                    id='secretText'
                    label="Enter a secret, shame, admission, or disclosure"
                    name='secretText'
                    value={inputs.secretText}
                    onChange={handleChange}                            
                />
                
                <Box
                    sx={{
                        display: 'flex', 
                        width: '100%', 
                        alignItems: 'center', 
                        justifyContent: 'space-between'
                    }}
                >
                    <InputLabel variant='filled' sx={{marginBottom: 1}}>
                        Who will you be accountable to?
                    </InputLabel>

                    <Tooltip title="This person will receive an email letting them know you're tracking a goal on Goal Awkward.">
                        <IconButton>
                            <HelpCenterIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                <TextField 
                    margin='normal'
                    required
                    fullWidth
                    id='shareWith'
                    label="Name"
                    name='shareWith'
                    value={inputs.shareWith}
                    onChange={handleChange}
                />
              
              <Box
                    sx={{
                        display: 'flex', 
                        width: '100%', 
                        alignItems: 'center', 
                        justifyContent: 'space-between'
                    }}
                >
                    <InputLabel  variant='filled' sx={{marginBottom: 1, textAlign: 'left'}}>
                        What is their email address?
                    </InputLabel>
                    <div></div>
                </Box>
                <TextField 
                    margin='normal'
                    required
                    fullWidth
                    multiline
                    id='shareWithEmail'
                    label="Email"
                    name='shareWithEmail'
                    value={inputs.shareWithEmail}
                    onChange={handleChange}                            
                    />
                <Typography>{emailIsValid ? "Valid email" : "Please enter a valid email address."}</Typography>
                
                <Box
                    sx={{
                        display: 'flex', 
                        width: '100%', 
                        alignItems: 'center', 
                        justifyContent: 'space-between'
                    }}
                >
                    <InputLabel variant='filled' sx={{marginBottom: 1}}>
                        Passphrase
                    </InputLabel>
                    <Tooltip title='This passphrase can be used to decrypt your self directed blackmail if you miss a check in. The passphrase is never saved on Goal Awkward’s servers, but remember another person will see it, so don’t use any passwords you use elsewhere on the internet.'>
                        <IconButton>
                            <HelpCenterIcon />
                        </IconButton>
                    </Tooltip>

                </Box>

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

