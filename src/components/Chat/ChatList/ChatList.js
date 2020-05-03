import React, { Component } from "react";
import Chat from "../Chat";
import "./ChatList.css";

class ChatList extends Component {
  render() {
    const {
      chats,
      socket,
      messages,
      onCloseChat,
    } = this.props;

    return (
      <div className="chat-list">
        {chats &&
          chats.map((chat, i) => (
            <Chat
              key={i}
              socket={socket}
              loggedUser={chat.userFrom}
              userTo={chat.userTo}
              showChat={chat.showChat}
              messages={messages}
              onCloseChat={onCloseChat}
            />
          ))}
      </div>
    );
  }
}

export default ChatList;
