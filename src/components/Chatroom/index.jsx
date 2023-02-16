import React from "react"
import { MessageInput } from "../MessageInput"
import { MessageList } from "../MessageList"

function ChatRoom() {

    return (
        <div className="component--chatroom">
            <h1>chatroom component</h1>
            <MessageList roomID='general'/>
            <MessageInput />
        </div>
    )
}

export { ChatRoom }