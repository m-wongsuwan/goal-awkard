import React from 'react';

import { submitGoal } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth'

import emailjs from 'emailjs-com'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'


function AddGoalForm() {
    const { user } = useAuth()

    const initInputs = {
        goalTitle: "",
        // secretType: "text",
        checkinFrequency: "weekly",
        secretText: "",
        shareWith: "",
        // shareWithContactType: "none",
        shareWithEmail: "",
        // shareWithText: '',
        // phoneCarrier: 'att',
        paused: false,
        shared: false,
        date: '',
        checkinDueDate: '',
        // testing
        from_name: 'secret service',
        to_name: 'morgan',
        message: 'poopy butthole'
    }
    const [inputs, setInputs] = React.useState(initInputs)


    // from_name to_name message
    function sendEmail() {
        emailjs.sendForm('secret_service', 'send_secret', inputs, 'uA-6EB5WK_WxXR47o')
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

        submitGoal(user.uid, inputsWithDate)
        setInputs(initInputs)
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
                <Typography component="h1" variant="h5">
                    Add Goal
                </Typography>
            </Box>
            
            <Box 
                component="form" 
                sx={{ mt: 1 }} 
                onSubmit={
                    (e)=>{e.preventDefault()
                    submit()}
                }
                // can i add ref={form} here????
            >
                <InputLabel id="goalTitle">Goal Title</InputLabel>
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

                {/* <InputLabel>Secret Type</InputLabel>
                <Select
                    id="secretType"
                    value={inputs.secretType}
                    required
                    label="secretType"
                    name='secretType'
                    onChange={handleChange}
                >
                    <MenuItem value={"none"}>Select Type</MenuItem>
                    <MenuItem value={"text"}>Text Only</MenuItem>
                    <MenuItem value={"file"}>File</MenuItem>
                </Select> */}

                
                <InputLabel>Secret Description</InputLabel>
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
                    
                {/* Going with MVP of text secrets over email
                {inputs.secretType === "file" ? 
                    <h1>this will appear if the input type is File</h1> 
                    : null
                } */}
                
                <Typography component='p' variant='p'>Who should we share your secret with if you don't follow through with your goal?</Typography>
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

                {/* Choosing MVP of send to email
                
                <InputLabel>How should we get in touch with them?</InputLabel>
                <Select
                    id="shareWithContactType"
                    value={inputs.shareWithContactType}
                    required
                    label="shareWithContactType"
                    name='shareWithContactType'
                    onChange={handleChange}
                >
                    <MenuItem value={"none"}>Select Type</MenuItem>
                    <MenuItem value={"email"}>Email</MenuItem>
                    <MenuItem value={"text"}>Text</MenuItem>
                </Select> */}

                
                    
                <InputLabel>Secret Receiver Email</InputLabel>
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
                    

                {/* Not necessary for MVP of send secret to email
                inputs.shareWithContactType === "text" ? 
                    <>
                        <TextField 
                            margin='normal'
                            required
                            fullWidth
                            multiline
                            id='shareWithText'
                            label="Secret Receiver Text Number"
                            name='shareWithText'
                            value={inputs.shareWithText}
                            onChange={handleChange}                            
                        />
                        
                        <InputLabel>Secret Receiver Phone Provider</InputLabel>
                        <RadioGroup
                            name='phoneCarrier'
                            value={inputs.phoneCarrier}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="att" control={<Radio />} label="AT&T" />
                            <FormControlLabel value="sprint" control={<Radio />} label="Sprint" />
                            <FormControlLabel value="verizon" control={<Radio />} label="Verizon" />
                            <FormControlLabel value="tmobile" control={<Radio />} label="T-Mobile" />
                            <FormControlLabel value="boost" control={<Radio />} label="Boost" />
                            <FormControlLabel value="cricket" control={<Radio />} label="Cricket" />
                        </RadioGroup>
                    </>
                    
                    : null
                */}

                <InputLabel>Check In Frequency</InputLabel>
                    <RadioGroup
                        name='checkinFrequency'
                        value={inputs.checkinFrequency}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="daily" control={<Radio />} label="Daily" />
                        <FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
                        <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
                </RadioGroup>

                <Button 
                    variant="contained"
                    type="submit"
                >
                    Submit
                </Button>
                <Button onClick={() => sendEmail()}>
                    test email
                </Button>
            </Box>
        </Container>

    )
}

export { AddGoalForm }