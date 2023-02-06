import React from "react";

function GoalCard(props) {
    const fields = props.goal._document.data.value.mapValue.fields


    return (
        <div>
            <h1>Goal Card</h1>
            <h3>Goal Title: {fields.goalTitle.stringValue}</h3>
            <h3>Secret Receiver: {fields.shareWith.stringValue ? fields.shareWith.stringValue : null}</h3>


        </div>
    )
}

export { GoalCard }