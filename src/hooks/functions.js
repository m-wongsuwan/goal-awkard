import React from 'react';

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip'

import DeleteIcon from '@mui/icons-material/Delete';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ErrorIcon from '@mui/icons-material/Error';

import { extendTime, deleteGoal, markAchieved } from '../services/firebase';

function isInCheckinWindow(goal) {
    if (goal.checkinFrequency === "daily") {
        return ((new Date(goal.checkinDueDate.seconds * 1000 - new Date()))) / 86400000 < 1
    }
    if (goal.checkinFrequency === "weekly") {
        return ((new Date(goal.checkinDueDate.seconds * 1000 - new Date()))) / 86400000 < 2
    }
    if (goal.checkinFrequency === "monthly") {
        return ((new Date(goal.checkinDueDate.seconds * 1000 - new Date()))) / 86400000 < 7
    }
}

function createData(goal, title, accountabilibuddy, setDate, dueDate, frequency, docName, completionDate) {
    return {goal, title, accountabilibuddy, setDate, dueDate, frequency, docName, completionDate}
}
function checkInCell(goal) {
    let freqStr = ""
    switch(goal.checkinFrequency) {
        case "daily":
            freqStr = "today";
            break;
        case "weekly":
            freqStr = "this week";
            break;
        case "monthly":
            freqStr = "this month";
            break;
        default:
            console.error("Error Retrieving frequency")
    }

    if (isInCheckinWindow(goal)) {
        return (
            <Button 
                size="small"
                variant="contained"
                onClick={()=> handleExtend(goal)}
            >
                I made progress {freqStr}
            </Button>
        )
    } else {
        return (
            <Button 
            size="small"
            variant="contained"
            disabled
        >
            Locked
        </Button>
        )
    }      
}
function handleExtend(goal) {
    let willExtend = true
    let daysToAdd = 0
    let alertText = ""
    let pastDueText = ""

    if (goal.checkinFrequency === "daily") {
        if (isInCheckinWindow(goal)) {
            daysToAdd = 1
            alertText = "You've added 24 hours to your check in time."
            pastDueText = "You were past due. Your new check in is one day from now."
        } else {
            willExtend = false
            alertText = "You can't check more than a day before the check in time."
        }
    }
    if (goal.checkinFrequency === "weekly") {
        if (isInCheckinWindow(goal)) {
            daysToAdd = 7
            alertText = "You've added one week to your check in time."
            pastDueText = "You were past due. Your new check in is one week from now."
        } else {
            willExtend = false
            alertText = "You can't check in until two days before the check in time."
        }
    }
    if (goal.checkinFrequency === "monthly") {
        if (isInCheckinWindow(goal)) {
            daysToAdd = 30
            alertText ="You've added thirty days to your check in time."
            pastDueText = "You were past due. Your new check in is one month from now."
        } else {
            willExtend = false
            alertText ="You can't check in until seven days before the check in time."
        }
    }
    
    if (willExtend) {
        const currentDueDate = new Date(goal.checkinDueDate.seconds * 1000)

        if (currentDueDate - new Date < 0) {
            const rightNow = new Date()
            const newDueDate = new Date(rightNow.setDate(rightNow.getDate() + daysToAdd))
            extendTime(goal.senderUid, goal.docName, newDueDate)
            alert(pastDueText)
        } else {
            const newDueDate = new Date(currentDueDate.setDate(currentDueDate.getDate() + daysToAdd))
            extendTime(goal.senderUid, goal.docName, newDueDate)
            alert(alertText)
        }

    }     
}

function makeDateString(date) {
    const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return `${monthsArr[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

function makeDecryptDateString(date) {
    const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return `${monthsArr[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes()} ${date.getHours() > 12 ? 'pm' : 'am'}`
}

function returnCountdown(seconds) {
    let totalMinutes = (seconds * 1000 - new Date().getTime()) / ( 60 * 1000)
    let totalHours = totalMinutes / 60
    let days = Math.floor(totalHours / 24)
    let hours = Math.floor(totalHours % 24)
    let minutes = Math.floor(totalMinutes % 60)
    if (days > 0) {
        return `(${days} day${days === 1 ? "" : "s"})`
    } else if (days === 0 && hours > 0) {
        return `(${hours} hour${hours === 1 ? "" : "s"} and ${minutes} minute${minutes === 1 ? "" : "s"})`
    } else if (days === 0 && hours === 0 && minutes >= 0) {
        return `(${minutes} minute${minutes === 1 ? "" : "s"})`
    } else {
        return "(Past due date!)"
    }
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function makeInProgressRows(arr) {
    return arr.map((row, index) => (
        <TableRow
            key={row.name + `${index}`}
            sx={{ 
                '&:last-child td, &:last-child th': { border: 0 } 
            }}
        >
            <TableCell component="th" scope="row" fontSize="small"
                sx={{
                    fontWeight: 'bold'
                }}
            >
                {capitalizeFirstLetter(row.title)}
            </TableCell>
            <TableCell align="right">{makeDateString(new Date(row.setDate * 1000))}</TableCell>
            <TableCell align="center">{capitalizeFirstLetter(row.goal.checkinFrequency)} </TableCell>
            <TableCell align="center">{checkInCell(row.goal)}</TableCell>
            <TableCell align="left">{makeDateString(new Date(row.dueDate * 1000))} {returnCountdown(row.dueDate)}</TableCell>
            <TableCell align="right">
                {row.goal.shared ? 
                    <Tooltip title="This person has accessed your self-blackmail text.">
                        <IconButton>
                            <ErrorIcon />
                        </IconButton>
                    </Tooltip>
                         : null
                        }
                {row.accountabilibuddy} 
            </TableCell>
            <TableCell align="center">
                <IconButton onClick={()=>markAchieved(row.goal)}>
                    <CelebrationIcon fontSize="small" />
                </IconButton>
            </TableCell>
            <TableCell align="center">
                <IconButton onClick={()=>deleteGoal(row.goal)}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </TableCell>
        </TableRow>
    ))
}



export { isInCheckinWindow, capitalizeFirstLetter, createData, handleExtend, makeInProgressRows, makeDecryptDateString };