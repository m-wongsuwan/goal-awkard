import React from "react"
import { MessageInput } from "../MessageInput"

function ChatRoom() {

    return (
        <div className="component--chatroom">
            <h1>chatroom component</h1>
            <MessageInput />
        </div>
    )
}

export { ChatRoom }