import React from "react";

import { extendTime, deleteGoal } from "../../services/firebase";

import Container from '@mui/material/Container';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';

function GoalCard(props) {
    const {
        checkinDueDate,
        checkinFrequency,
        date,
        docName,
        goalTitle,
        senderUid,
        shareWith
    } = props.goal

    const goalSetDate = new Date (date.seconds * 1000 )
    const checkinDate = new Date (checkinDueDate.seconds * 1000)

    // template for checking difference in two days by time
    // console.log(goalTitle)
    // console.log((new Date(checkinDueDate.seconds * 1000)))
    // console.log(new Date())
    // console.log((Math.abs(new Date(checkinDueDate.seconds * 1000 - new Date()))) / 86400000)

    function isInCheckinWindow(frequency) {
        if (frequency === "daily") {
            return (Math.abs(new Date(checkinDueDate.seconds * 1000 - new Date()))) / 86400000 < 1
        }
        if (frequency === "weekly") {
            return (Math.abs(new Date(checkinDueDate.seconds * 1000 - new Date()))) / 86400000 < 2
        }
        if (frequency === "monthly") {
            return (Math.abs(new Date(checkinDueDate.seconds * 1000 - new Date()))) / 86400000 < 7
        }
        
    }



    function returnDateString(date) {
        const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return `${monthsArr[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }

    function handleExtend() {

        let willExtend = true
        let daysToAdd = 0

        if (checkinFrequency === "daily") {
            if (isInCheckinWindow('daily')) {
                daysToAdd = 1
                alert("You've added 24 hours to your check in time.")
            } else {
                willExtend = false
                alert("You can't check more than a day before the check in time.")
            }
        }
        if (checkinFrequency === "weekly") {
            if (isInCheckinWindow('weekly')) {
                daysToAdd = 7
                alert("You've added one week to your check in time.")
            } else {
                willExtend = false
                alert("You can't check in until two days before the check in time.")
            }
        }
        if (checkinFrequency === "monthly") {
            if (isInCheckinWindow('monthly')) {
                daysToAdd = 30
                alert("You've added thirty days to your check in time.")
            } else {
                willExtend = false
                alert("You can't check in until seven days before the check in time.")
            }
        }
        
        if (willExtend) {
            const currentDueDate = new Date(checkinDueDate.seconds * 1000)
            const newDueDate = new Date(currentDueDate.setDate(currentDueDate.getDate() + daysToAdd))
            extendTime(senderUid, docName, newDueDate)
        }     
        
    }

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    return (
        <Container>
            <Typography component="h1" variant='h2'>
                {goalTitle}
            </Typography>
            <Typography component='h3' variant='h4'>
                Accountable to: {capitalizeFirstLetter(shareWith)}
            </Typography>
            <Typography component='h4' variant='h5'>
                Goal Set Date: {returnDateString(goalSetDate)}
            </Typography>
            <Typography component='h4' variant='h5'>
                Check In Due: {returnDateString(checkinDate)}
            </Typography>
            <Typography component='h4' variant='h5'>
                Check In Frequency: {capitalizeFirstLetter(checkinFrequency)}
            </Typography>
            
            <Button 
                onClick={()=> handleExtend()}
                variant="contained"
                sx={{
                    m:1
                }}
            >
                Check In
            </Button>
            <Button 
                variant="contained"
                color="error"
                onClick={()=> deleteGoal(senderUid, docName)}
                sx={{
                    m:1
                }}
            >
                Delete
            </Button>

        </Container>
    )
}

export { GoalCard }