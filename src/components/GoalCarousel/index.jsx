import * as React from 'react';

import { extendTime, deleteGoal, markAchieved } from "../../services/firebase";

import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

function GoalCarousel(props) {
    // console.log((1678130555 * 1000 - new Date().getTime()) / ( 60 * 1000))
    // console.log(((1678130555 * 1000 - new Date().getTime()) / ( 60 * 60 * 1000)) )

    
    
    const {goals, completed} = props
    const goalArray = completed ? goals.filter(goal => goal.completed) : goals.filter(goal => !goal.completed)
    
    function returnCountdown(seconds) {
        let totalMinutes = (seconds * 1000 - new Date().getTime()) / ( 60 * 1000)
        let totalHours = totalMinutes / 60
        let days = Math.floor(totalHours / 24)
        let hours = Math.floor(totalHours % 24)
        let minutes = Math.floor(totalMinutes % 60)
        return `${days} days, ${hours} hours, ${minutes} minutes before check in is due.`
    }

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = goalArray.length;

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    function returnDateString(date) {
        const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return `${monthsArr[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function handleExtend(goal) {

        function isInCheckinWindow(frequency) {
            if (frequency === "daily") {
                return (Math.abs(new Date(goal.checkinDueDate.seconds * 1000 - new Date()))) / 86400000 < 1
            }
            if (frequency === "weekly") {
                return (Math.abs(new Date(goal.checkinDueDate.seconds * 1000 - new Date()))) / 86400000 < 2
            }
            if (frequency === "monthly") {
                return (Math.abs(new Date(goal.checkinDueDate.seconds * 1000 - new Date()))) / 86400000 < 7
            }
            
        }

        let willExtend = true
        let daysToAdd = 0

        if (goal.checkinFrequency === "daily") {
            if (isInCheckinWindow('daily')) {
                daysToAdd = 1
                alert("You've added 24 hours to your check in time.")
            } else {
                willExtend = false
                alert("You can't check more than a day before the check in time.")
            }
        }
        if (goal.checkinFrequency === "weekly") {
            if (isInCheckinWindow('weekly')) {
                daysToAdd = 7
                alert("You've added one week to your check in time.")
            } else {
                willExtend = false
                alert("You can't check in until two days before the check in time.")
            }
        }
        if (goal.checkinFrequency === "monthly") {
            if (isInCheckinWindow('monthly')) {
                daysToAdd = 30
                alert("You've added thirty days to your check in time.")
            } else {
                willExtend = false
                alert("You can't check in until seven days before the check in time.")
            }
        }
        
        if (willExtend) {
            const currentDueDate = new Date(goal.checkinDueDate.seconds * 1000)
            const newDueDate = new Date(currentDueDate.setDate(currentDueDate.getDate() + daysToAdd))
            extendTime(goal.senderUid, goal.docName, newDueDate)
        }     
        
    }


    return (
        <Box sx={{ maxWidth: 800, flexGrow: 1 }}>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    height: 50,
                    pl: 2,
                    bgcolor: 'background.default',
                  }}
            >
                <Typography>
                    {completed ? "Completed Goals" : "Goals in Progress"}
                </Typography>

            </Paper>
            {goalArray.length > 0 ? 
                <>
                <Box sx={{ height: 255, maxWidth: 800, width: '100%', p: 2, backgroundColor: goalArray[activeStep].completed ? 'lightBlue' : null }}>
                    
                    <Typography component="h1" variant='h4'>
                    {capitalizeFirstLetter(goalArray[activeStep].goalTitle)}
                    </Typography>
                    
                    {!goalArray[activeStep].completed ? 
                        <Typography>
                            {returnCountdown(goalArray[activeStep].checkinDueDate.seconds)}
                        </Typography>
                    :
                        null
                    }
                    
                    <Typography component='h3' variant='h5'>
                        Accountable to: {capitalizeFirstLetter(goalArray[activeStep].shareWith)}
                    </Typography>
                    <Typography component='h4' variant='h6'>
                        {/* Goal Set Date: {returnDateString(new Date (goalArray[activeStep].date.seconds * 1000))} */}
                        Goal Set Date: {returnDateString(new Date (goalArray[activeStep].date.seconds * 1000))}
                    </Typography>

                    {goalArray[activeStep].completionDate ? 
                        <>
                            <Typography component='h4' variant='h6'>
                                {/* Check In Due: {returnDateString(new Date (goalArray[activeStep].checkinDate.seconds * 1000))} */}
                                Completed: {returnDateString(new Date (goalArray[activeStep].completionDate.seconds * 1000))}
                            </Typography>
                        </>
                    :
                        <>
                            <Typography component='h4' variant='h6'>
                                {/* Check In Due: {returnDateString(new Date (goalArray[activeStep].checkinDate.seconds * 1000))} */}
                                Check In Due: {returnDateString(new Date (goalArray[activeStep].checkinDueDate.seconds * 1000))}
                            </Typography>
                            <Typography component='h4' variant='h6'>
                                Check In Frequency: {capitalizeFirstLetter(goalArray[activeStep].checkinFrequency)}
                            </Typography>
                        </>

                    }

                    
                    {!goalArray[activeStep].completionDate ? 
                        <>
                            <Button 
                                onClick={()=> handleExtend(goalArray[activeStep])}
                                variant="contained"
                                sx={{
                                    m:1
                                }}
                            >
                                Check In
                            </Button>

                            <Button 
                                onClick={()=> markAchieved(goalArray[activeStep])}
                                variant="contained"
                                sx={{
                                    m:1
                                }}
                            >
                                Completed
                            </Button>

                        </>
                    :
                    null
                    }
                    
                    <Button
                        variant="contained"
                        color="error"
                        onClick={()=> deleteGoal(goalArray[activeStep].senderUid, goalArray[activeStep].docName)}
                        sx={{
                            m:1
                        }}
                    >
                        Delete
                    </Button>
                </Box>
                

                {/* Stepper */}
                <MobileStepper
                    variant="text"
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}
                        >
                            Next
                            {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                            ) : (
                            <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                            ) : (
                            <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
                
                </>
            :
            null}

        </Box>
    )
}

export { GoalCarousel }