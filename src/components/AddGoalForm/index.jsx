import React from 'react';

import { submitGoal } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'


function AddGoalForm() {
    const { user } = useAuth()

    const initInputs = {
        goalTitle: "",
        secretType: "text",
        checkinFrequency: "weekly",
        secretText: "",
        shareWith: "",
        shareWithContactType: "none",
        shareWithEmail: "",
        shareWithText: '',
        phoneCarrier: 'att',
        paused: false,
        shared: false
    }
    const [inputs, setInputs] = React.useState(initInputs)

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function submit() {
        const inputsWithDate = {...inputs, date: new Date()}

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
            >
                <InputLabel id="demo-simple-select-label">Goal Title</InputLabel>
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

                <InputLabel>Secret Type</InputLabel>
                <Select
                    id="secretType"
                    value={inputs.secretType}
                    required
                    label="secretType"
                    name='secretType'
                    onChange={handleChange}
                >
                    <MenuItem value={"none"}>Select Type</MenuItem>
                    <MenuItem value={"text"}>Text</MenuItem>
                    <MenuItem value={"file"}>File</MenuItem>
                </Select>

                {inputs.secretType === "text" ? 
                    <>
                        <InputLabel>Secret Text</InputLabel>
                        <TextField 
                            margin='normal'
                            required
                            fullWidth
                            multiline
                            id='secretText'
                            label="Type your secret"
                            name='secretText'
                            value={inputs.secretText}
                            onChange={handleChange}                            
                        />
                    </>
                    : null
                }
                {inputs.secretType === "file" ? <h1>this will appear if the input type is File</h1> : null}
                
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
                </Select>

                {inputs.shareWithContactType === "email" ? 
                    <>
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
                    </>
                    : null
                }
                {inputs.shareWithContactType === "text" ? 
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
                }

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
            </Box>
        </Container>

    )
}

export { AddGoalForm }