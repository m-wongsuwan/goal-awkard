import React from "react";

import { SizingContext } from "../../context/sizing";

import { useAuth } from "../../hooks/useAuth";
import { useGoals } from "../../hooks/useGoals";

import { extendTime, deleteGoal, markAchieved } from "../../services/firebase";

import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';

// import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import CelebrationIcon from '@mui/icons-material/Celebration';

// import { GoalCarousel } from "../GoalCarousel";

function StatusPage() {
    
    const { 
        drawerWidth, 
        // appBarHeight 
    } = React.useContext(SizingContext)
    
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
            if (isInCheckinWindow(goal)) {
                daysToAdd = 1
                alertText = "You've added 24 hours to your check in time."
            } else {
                willExtend = false
                alertText = "You can't check more than a day before the check in time."
            }
        }
        if (goal.checkinFrequency === "weekly") {
            if (isInCheckinWindow(goal)) {
                daysToAdd = 7
                alertText = "You've added one week to your check in time."
            } else {
                willExtend = false
                alertText = "You can't check in until two days before the check in time."
            }
        }
        if (goal.checkinFrequency === "monthly") {
            if (isInCheckinWindow(goal)) {
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
        let unlockStr = ""
        switch(goal.checkinFrequency) {
            case "daily":
                freqStr = "today";
                unlockStr = "24 hours"
                break;
            case "weekly":
                freqStr = "this week";
                unlockStr = "two days"
                break;
            case "monthly":
                freqStr = "this month";
                unlockStr = "one week"
                break;
            default:
                console.error("Error Retrieving frequency")
        }

        if (goal.checkinDueDate.seconds - new Date().getTime() < 0) {
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
                        {`Check in up to ${unlockStr} before the due date`}
                    </Button>
                )
            }

        }
        
                
    }

    // function capitalizeFirstLetter(str) {
    //     return str.charAt(0).toUpperCase() + str.slice(1)
    // }

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
            return `(${days} day${days === 1 ? "" : "s"})`
        } else if (days === 0 && hours > 0) {
            return `(${hours} hour${hours === 1 ? "" : "s"} and ${minutes} minute${minutes === 1 ? "" : "s"})`
        } else if (days === 0 && hours === 0 && minutes >= 0) {
            return `(${minutes} minute${minutes === 1 ? "" : "s"})`
        } else {
            return "(Past due date!)"
        }
    }

    return (
        <Box>
            <TableContainer 
                component={Paper}
            >
                <Table 
                    aria-label="In Progress Table"
                    style={{width: width - drawerWidth}}                            
                >
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    fontSize: '1.2rem'
                                }}
                            >
                                Goal Title
                            </TableCell>
                            <TableCell align="right"
                                sx={{
                                    fontSize: '1.2rem'
                                }}
                            >
                                    Goal Set Date
                            </TableCell>
                            <TableCell align="center"
                                sx={{
                                    fontSize: '1.2rem'
                                }}
                            >
                                    Check In
                            </TableCell> 
                            <TableCell align="left"
                                sx={{
                                    fontSize: '1.2rem'
                                }}
                            >
                                    Check in Due
                            </TableCell>
                            <TableCell align="right"
                                sx={{
                                    fontSize: '1.2rem'
                                }}
                            >
                                    Accountable to
                            </TableCell>
                            <TableCell align="center"
                                sx={{
                                    fontSize: '1.2rem'
                                }}
                            >
                                    Mark Complete
                            </TableCell>
                            <TableCell align="center"
                                sx={{
                                    fontSize: '1.2rem'
                                }}
                            >
                                    Delete
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inProgressRows.map((row, index) => (
                            <TableRow
                                key={row.name + `${index}`}
                                sx={{ 
                                    '&:last-child td, &:last-child th': { border: 0 } 
                                }}
                            >
                                <TableCell component="th" scope="row"
                                    sx={{
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">{makeDateString(new Date(row.setDate * 1000))}</TableCell>
                                <TableCell align="center">{checkInCell(row.goal)}</TableCell>
                                <TableCell align="left">{makeDateString(new Date(row.dueDate * 1000))} {returnCountdown(row.dueDate)}</TableCell>
                                <TableCell align="right">{row.accountabilibuddy}</TableCell>
                                <TableCell align="center">
                                    <IconButton>
                                        <CelebrationIcon
                                            onClick={()=>markAchieved(row.goal)}
                                        />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton>
                                        <DeleteIcon 
                                            onClick={()=>deleteGoal(row.goal)}
                                        />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer 
                component={Paper}
                sx={{
                    mt: 3,
                    mx: 'auto'
                }}
                style={{
                    width: width - drawerWidth * 2,
                }}  
            >
                <Table 
                    aria-label="Completed Table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    fontSize: '1.2rem'
                                }}
                            >
                                Completed Goals
                            </TableCell>
                            <TableCell align="right"
                                sx={{
                                    fontSize: '1.2rem'
                                }}
                            >
                                Set Date
                            </TableCell>
                            <TableCell align="right"
                                sx={{
                                    fontSize: '1.2rem'
                                }}
                            >
                                Completion Date
                            </TableCell>
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
                                <TableCell align="right">{makeDateString(new Date (row.setDate))}</TableCell>
                                <TableCell align="right">{makeDateString(new Date(row.completionDate.seconds * 1000))}</TableCell>
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