import React from "react";
import { Link } from 'react-router-dom'

import { SizingContext } from "../../context/sizing";

import { useAuth } from "../../hooks/useAuth";
import { useGoals } from "../../hooks/useGoals";
import { createData, makeInProgressRows } from "../../hooks/functions";
import { deleteGoal } from "../../services/firebase";


import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import DeleteIcon from '@mui/icons-material/Delete';


function StatusPage() {
    const { user } = useAuth()
    const { drawerWidth } = React.useContext(SizingContext)
    const goals = useGoals(user.uid)
    
    let [width, setWidth] = React.useState(window.innerWidth)
    
    const inProgressGoals = goals.filter(goal => !goal.completed)
    const completedGoals = goals.filter(goal => goal.completed)

    let inProgressRows = []
    let completedRows = []

    inProgressGoals.forEach(goal => inProgressRows.push(createData(goal, goal.goalTitle, goal.shareWith, goal.date.seconds, goal.checkinDueDate.seconds, goal.checkinFrequency, goal.docName)))
    completedGoals.forEach(goal => completedRows.push(createData(goal, goal.goalTitle, goal.shareWith, goal.date.seconds, goal.checkinDueDate.seconds, goal.checkinFrequency, goal.docName, goal.completionDate)))

    const tableHeaderData = [
        {
            text: "Goal Title",
            alignment: "left"
        },
        {
            text: "Set Date",
            alignment: "center"
        },
        {
            text: "Frequency",
            alignment: "center"
        },
        {
            text: "Check In",
            alignment: "center"
        },
        {
            text: "Due",
            alignment: "center"
        },
        {
            text: "Accountable to",
            alignment: "right"
        },
        {
            text: "Mark Complete",
            alignment: "center"
        },
        {
            text: "Delete",
            alignment: "center"
        }
    ]
    const tableHeaderCells = tableHeaderData.map(cellData => {
        return (
            <TableCell align={cellData.alignment} sx={{fontSize: '1.2rem'}} key={cellData.text}>
                    {cellData.text}
            </TableCell>
        )
    })

    React.useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize)

        return () => window.removeEventListener("resize", handleWindowResize)
    })

    

    function makeDateString(date) {
        const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return `${monthsArr[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }


    return (
        <Box>
            <TableContainer component={Paper}>
                <Table 
                    aria-label="In Progress Table"
                    style={{width: width - drawerWidth -20}}                       
                >
                    <TableHead>
                        <TableRow>
                            {tableHeaderCells}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {makeInProgressRows(inProgressRows)}
                        <TableRow>
                            <TableCell>
                                <Link 
                                    to='/addgoal'
                                    style={{ 
                                        textDecoration: 'none',
                                        color: '#404040'
                                    }}
                                >
                                    <Button size="small" color="success" variant="contained">
                                        Add New Goal
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
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
                            <TableCell align="right"
                                sx={{
                                    fontSize: '1.2rem'
                                }}
                            >
                                Delete
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
                                <TableCell align="right">{makeDateString(new Date (row.setDate * 1000))}</TableCell>
                                <TableCell align="right">{makeDateString(new Date(row.completionDate.seconds * 1000))}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={()=>deleteGoal(row.goal)}>
                                        <DeleteIcon fontSize="small"/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    )
}

export { StatusPage }