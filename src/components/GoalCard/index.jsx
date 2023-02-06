import React from "react";

function GoalCard(props) {
    const goal = props.goal
    console.log(goal.date.toDate().getFullYear())
    console.log(goal.date.toDate().getMonth())

    return (
        <div>
            <h1>Goal Card</h1>
            <h3>Goal Title: {goal.goalTitle}</h3>
            <h3>Secret Receiver: {goal.shareWith}</h3>
            {/* <h3>Date Set: {goal.date}</h3> */}

        </div>
    )
}

export { GoalCard }