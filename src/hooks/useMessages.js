import React from "react";
import { getMessages } from "../services/firebase";

function useMessages(roomID) {
    const [messages, setMessages] = React.useState([])

    React.useEffect(() => {
        const unsubscribe = getMessages(roomID, setMessages);
        return unsubscribe
    }, [roomID])

    return messages;

}

export { useMessages }