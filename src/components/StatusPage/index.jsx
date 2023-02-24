import React from "react";

import { useAuth } from "../../hooks/useAuth";
import { useGoals } from "../../hooks/useGoals";

import Typography from '@mui/material/Typography'
// import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import { GoalCard } from "../GoalCard";
import { ChatRoom } from "../Chatroom";

function StatusPage() {
    const { user } = useAuth()
    const goals = useGoals(user.uid)

    const goalCards = goals.map((goal, index) => {
        return <GoalCard goal={goal} key={index} />
    })

    return (

            <Grid container spacing={2}>
                <Grid item={true} xs={8}>
                    <Typography component='h1' variant='h1'>
                        Status Page
                    </Typography>

                    {goalCards}
                </Grid>

                <Grid item={true} xs={4}>
                    <ChatRoom />
                </Grid>
            </Grid>
    )
}

export { StatusPage }