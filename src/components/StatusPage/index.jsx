import React from "react";

import { useAuth } from "../../hooks/useAuth";
import { useGoals } from "../../hooks/useGoals";


import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'


import { GoalCard } from "../GoalCard";
import { ChatRoom } from "../Chatroom";
import { GoalCarousel } from "../GoalCarousel";

function StatusPage() {
    const { user } = useAuth()
    const goals = useGoals(user.uid)

    // goalCard is out? 
    const goalCards = goals.map((goal, index) => {
        return <GoalCard goal={goal} key={index} />
    })

    return (

            <Grid container spacing={2}>
                <Grid item={true} xs={8}>
                    <Typography component='h1' variant='h1'>
                        Status Page
                    </Typography>

                    {/* {goalCards} */}
                    <GoalCarousel goals={goals} completed={false}/>
                    <GoalCarousel goals={goals} completed={true}/>
                </Grid>

                <Grid item={true} xs={4}>
                    <ChatRoom />

                </Grid>
            </Grid>
    )
}

export { StatusPage }