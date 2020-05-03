import React, { Component } from "react";
import "./Chat.css";
import send from "../../images/send.png";

class Chat extends Component {
  state = {
    message: null,
  };

  handleMessageChange = (message) => {
    this.setState({ message });
  };

  handleMessageSend = (socket, message, from, to) => {
    if (message) {
      socket.send(
        JSON.stringify({
          user: from,
          chat: message,
          type: "TEXT",
          userTo: to,
        })
      );
      this.setState({ message: null });
      document.getElementById("message").value = "";
    }
  };

  render() {
    const {
      loggedUser,
      userTo,
      showChat,
      onShowChat,
      messages,
      socket,
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
              style={{ display: "flex", width: "95%" }}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                id="message"
                onChange={(e) => this.handleMessageChange(e.target.value)}
                className="form-control"
              />
              <button
                className="send-btn pr-0"
                type="submit"
                onClick={() =>
                  this.handleMessageSend(socket, this.state.message, loggedUser, userTo)
                }
              >
                <img width="30px" height="30px" src={send} />
              </button>
            </form>
          </React.Fragment>
        </div>
      );
    } else return null;
  }
}

export default Chat;
