import React from "react";

import { SizingContext } from "../../context/sizing";

import { useAuth } from "../../hooks/useAuth";
import { useGoals } from "../../hooks/useGoals";

import { extendTime } from "../../services/firebase";


import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { GoalCarousel } from "../GoalCarousel";

function StatusPage() {
    
    const { drawerWidth, appBarHeight } = React.useContext(SizingContext)
    
    function createData(goal, title, accountabilibuddy, setDate, dueDate, frequency, docName, completionDate) {
        return {goal, title, accountabilibuddy, setDate, dueDate, frequency, docName, completionDate}
    }
    
    const { user } = useAuth()
    const goals = useGoals(user.uid)

    const inProgressGoals = goals.filter(goal => !goal.completed)
    const completedGoals = goals.filter(goal => goal.completed)

    let inProgressRows = []
    let completedRows = []

    inProgressGoals.forEach(goal => inProgressRows.push(createData(goal, goal.goalTitle, goal.shareWith, goal.date.seconds, goal.checkinDueDate.seconds, goal.checkinFrequency, goal.docName)))
    completedGoals.forEach(goal => completedRows.push(createData(goal, goal.goalTitle, goal.shareWith, goal.date.seconds, goal.checkinDueDate.seconds, goal.checkinFrequency, goal.docName, goal.completionDate)))

    let [width, setWidth] = React.useState(window.innerWidth)

    React.useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize)

        return () => window.removeEventListener("resize", handleWindowResize)
    })

    // this might be needlessly byzantine
    function isInCheckinWindow(goal) {
        if (goal.checkinFrequency === "daily") {
            return (Math.abs(new Date(goal.checkinDueDate.seconds * 1000 - new Date()))) / 86400000 < 1
        }
        if (goal.checkinFrequency === "weekly") {
            return (Math.abs(new Date(goal.checkinDueDate.seconds * 1000 - new Date()))) / 86400000 < 2
        }
        if (goal.checkinFrequency === "monthly") {
            return (Math.abs(new Date(goal.checkinDueDate.seconds * 1000 - new Date()))) / 86400000 < 7
        }
        
    }

    function handleExtend(goal) {
        let willExtend = true
        let daysToAdd = 0
        let alertText = ""

        if (goal.checkinFrequency === "daily") {
            if (isInCheckinWindow('daily', goal)) {
                daysToAdd = 1
                alertText = "You've added 24 hours to your check in time."
            } else {
                willExtend = false
                alertText = "You can't check more than a day before the check in time."
            }
        }
        if (goal.checkinFrequency === "weekly", goal) {
            if (isInCheckinWindow('weekly', goal)) {
                daysToAdd = 7
                alertText = "You've added one week to your check in time."
            } else {
                willExtend = false
                alertText = "You can't check in until two days before the check in time."
            }
        }
        if (goal.checkinFrequency === "monthly") {
            if (isInCheckinWindow('monthly', goal)) {
                daysToAdd = 30
                alertText ="You've added thirty days to your check in time."
            } else {
                willExtend = false
                alertText ="You can't check in until seven days before the check in time."
            }
        }
        
        if (willExtend) {
            const currentDueDate = new Date(goal.checkinDueDate.seconds * 1000)
            const newDueDate = new Date(currentDueDate.setDate(currentDueDate.getDate() + daysToAdd))
            extendTime(goal.senderUid, goal.docName, newDueDate)
            alert(alertText)
        }     
        
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
            case "daily":
                freqStr = "this month";
                break;
        }

        if (goal.checkinDueDate.seconds - new Date().getTime() < 0) {
            if (isInCheckinWindow(goal)) {
                return (
                       <Button 
                           variant="contained"
                           onClick={()=> handleExtend(goal)}
                       >
                           I made progress {freqStr}
                       </Button>

                )
            } else {
                return (
                    <Button 
                        variant="contained"
                        disabled
                        onClick={()=>alert('not yet')}
                    >
                        I made progress {freqStr}
                    </Button>
                )
            }

        }
        
                
    }

    function makeDateString(date) {
        const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return `${monthsArr[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }

    function returnCountdown(seconds) {
        let totalMinutes = (seconds * 1000 - new Date().getTime()) / ( 60 * 1000)
        let totalHours = totalMinutes / 60
        let days = Math.floor(totalHours / 24)
        let hours = Math.floor(totalHours % 24)
        let minutes = Math.floor(totalMinutes % 60)
        if (days > 0) {
            return `${days} day${days === 1 ? "" : "s"}, ${hours} hour${hours === 1 ? "" : "s"}, ${minutes} minute${minutes === 1 ? "" : "s"} until you can check in`
        } else if (days > 0 && hours > 0) {
            return `${hours} hour${hours === 1 ? "" : "s"} and ${minutes} minute${minutes === 1 ? "" : "s"} until you can check in`
        } else {
            return `${minutes} minute${minutes === 1 ? "" : "s"} until you can check in`
        }
    }

    return (
                <Box
                    sx={{ 
                        ml: `${drawerWidth}px`}}
                >
                    <h1>{width - drawerWidth}</h1>   
                    <TableContainer 
                        component={Paper}
                    >
                        <Table 
                            aria-label="In Progress Table"
                            style={{width: width - drawerWidth}}                            
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Goal Title</TableCell>
                                    <TableCell align="right">Goal Set Date</TableCell>
                                    <TableCell align="center">Check In</TableCell> 
                                    <TableCell align="right">Check in Due Date</TableCell>
                                    <TableCell align="center"></TableCell> 
                                    <TableCell align="right">Check in Frequency</TableCell>
                                    <TableCell align="right">Accountable to</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {inProgressRows.map((row, index) => (
                                    <TableRow
                                        key={row.name + `${index}`}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.title}
                                        </TableCell>
                                        <TableCell align="right">{makeDateString(new Date(row.setDate * 1000))}</TableCell>
                                        <TableCell align="center">{checkInCell(row.goal)}</TableCell>
                                        <TableCell align="right">{makeDateString(new Date(row.dueDate * 1000))}</TableCell>
                                        <TableCell align="right">{returnCountdown(row.dueDate)}</TableCell>
                                        <TableCell align="right">{row.frequency}</TableCell>
                                        <TableCell align="right">{row.accountabilibuddy}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TableContainer component={Paper}>
                        <Table 
                            aria-label="Completed Table"
                            style={{width: width - drawerWidth}}  
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Goal Title</TableCell>
                                    <TableCell align="right">Set Date</TableCell>
                                    <TableCell align="right">Completion Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {completedRows.map((row, index) => (
                                    <TableRow
                                        key={row.name + `${index}`}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.title}
                                        </TableCell>
                                        <TableCell align="right">{row.setDate}</TableCell>
                                        <TableCell align="right">{row.completionDate.seconds}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* <GoalCarousel goals={goals} completed={false}/>
                    <GoalCarousel goals={goals} completed={true}/> */}
                </Box>

    )
}

export { StatusPage }