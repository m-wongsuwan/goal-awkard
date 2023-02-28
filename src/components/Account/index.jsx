import React, { useContext } from "react";
import { Link } from 'react-router-dom'

import { deleteAllGoals } from "../../services/firebase";

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';

import { AuthContext } from "../../context/auth";

function Account() {
    const {logOff, user} = useContext(AuthContext)
    // console.log(user.uid)

    return (
        <>
            <Typography component="h2" variant="h4">Account</Typography>
            <Link to='/'>
                <Button variant="contained" onClick={() => logOff()}>
                    Sign Out
                </Button>
            </Link>
        </>
    )
}

export { Account }