import React from "react";

import { GoalCard } from "../GoalCard";

import { useAuth } from "../../hooks/useAuth";
import { useGoals } from "../../hooks/useGoals";

function StatusPage() {
    const { user } = useAuth()
    const goals = useGoals(user.uid)

    const goalCards = goals.map((goal, index) => {
        return <GoalCard goal={goal} key={index} />
    })

    // const firstGoal = goals[0]._document.data.value.mapValue.fields

    // console.log(firstGoal.goalTitle.stringValue)

    return (
        <>
            <h1>Status Page</h1>
            {goalCards}
        </>
    )
}

export { StatusPage }