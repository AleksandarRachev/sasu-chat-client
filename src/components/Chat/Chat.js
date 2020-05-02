import React, { Component } from "react";
import "./Chat.css";
import send from "../../images/send.png";

class Chat extends Component {
  render() {
    const {
      loggedUser,
      userTo,
      showChat,
      onShowChat,
      message,
      messages,
      onMessageChange,
      onSend,
    } = this.props;

    if (showChat) {
      return (
        <div className="chat">
          <div className="chat-info">
            <span>{userTo && userTo.username}</span>
            <button onClick={onShowChat} type="button" className="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <React.Fragment>
            <div className="chat-messages">
              {messages &&
                messages.map((message, i) => {
                  if (message.user.uid === loggedUser.uid) {
                    return (
                      <p
                        style={{ marginLeft: "35%", borderRadius: "15px" }}
                        className="text-break text-right badge-primary p-1 pr-3"
                        key={i}
                      >
                        {message.chat}
                      </p>
                    );
                  } else {
                    return (
                      <p
                        style={{ marginRight: "35%", borderRadius: "15px" }}
                        className="text-break text-left badge-light p-1 pl-3"
                        key={i}
                      >
                        {message.user.username + ": " + message.chat}
                      </p>
                    );
                  }
                })}
            </div>
            <form
              style={{ display: "flex", width:"95%" }}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                id="message"
                onChange={(e) => onMessageChange(e.target.value)}
                class="form-control"
              />
              <button className="send-btn pr-0" type="submit" onClick={() => onSend(message)}>
                <img width="30px" height="30px"  src={send}/>
              </button>
            </form>
          </React.Fragment>
        </div>
      );
    } else return null;
  }
}

export default Chat;
