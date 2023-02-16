import React from "react";
import { useParams } from "react-router-dom";

function Accountability(props) {
    const { userId, secretId} = useParams();


    return (
        <>
            <h1>you've made it to a secret page { userId ? 'with params' : 'without params'} </h1>

        </>
    )
}

export { Accountability }