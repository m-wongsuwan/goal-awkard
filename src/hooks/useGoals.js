import React from "react";
import { getGoals } from "../services/firebase";

function useGoals(uid) {
    const [goals, setGoals] = React.useState([])

    React.useEffect(()=> {
        const unsubscribe = getGoals(uid, setGoals);
        return unsubscribe;
    }, [uid]);

    return goals

}

export { useGoals }