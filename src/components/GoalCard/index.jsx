import React from "react";

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function GoalCard(props) {
    const goal = props.goal
    //don't delete this
    console.log(new Date (goal.date.seconds * 1000 ))

    const goalSetDate = new Date (goal.date.seconds * 1000 )

    // const goalSetDate = goal.date.seconds.toDate()
    // console.log(goalSetDate)

    function returnDateString(date) {
        const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return `${monthsArr[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }

    return (
        <Container>
            <Typography component="h1" variant='h2'>
                {goal.goalTitle}
            </Typography>
            <Typography component='h3' variant='h4'>
                Accountable to: {goal.shareWith}
            </Typography>
            <Typography component='h4' variant='h5'>
                Goal Set Date: {returnDateString(goalSetDate)}
                {/* // Objects are not valid react children
                 Goal Set Date: {goalSetDate} */}
            </Typography>
            <Typography component='h4' variant='h5'>
                Check In Due: {returnDateString(goalSetDate)}
            </Typography>


        </Container>
    )
}

export { GoalCard }