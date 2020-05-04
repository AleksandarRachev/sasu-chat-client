import React, { Component } from "react";
import "./Chat.css";
import send from "../../images/send.png";

class Chat extends Component {
  state = {
    message: null,
    chat: null,
  };

  componentDidMount() {
    this.setState({
      chat: {
        userFrom: this.props.loggedUser,
        userTo: this.props.userTo,
        showChat: true,
      },
    });
  }

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
      document.getElementById("message" + this.props.userTo.uid).value = "";
    }
  };

  render() {
    const {
      loggedUser,
      userTo,
      showChat,
      messages,
      socket,
      onCloseChat,
    } = this.props;

    if (showChat) {
      return (
        <div className="chat">
          <div className="chat-info">
            <span>{userTo && userTo.username}</span>
            <button
              onClick={() => onCloseChat(this.state.chat)}
              type="button"
              className="close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <React.Fragment>
            <div className="chat-messages">
              {messages &&
                messages.map((message, i) => {
                  if (
                    message.user.uid === userTo.uid ||
                    message.user.uid === loggedUser.uid
                  ) {
                    if (
                      message.user.uid === loggedUser.uid &&
                      message.userTo.uid === userTo.uid
                    ) {
                      return (
                        <p
                          className="chat-message-wrapper text-break text-right"
                          key={i}
                        >
                          <span className="chat-message d-inline-block badge-primary p-1 pr-2 pl-2">
                            {message.chat}
                          </span>
                        </p>
                      );
                    } else {
                      if (
                        message.userTo.uid === loggedUser.uid &&
                        message.user.uid !== loggedUser.uid
                      ) {
                        return (
                          <p
                            className="chat-message-wrapper text-break text-left"
                            key={i}
                          >
                            <span className="chat-message d-inline-block badge-light p-1 pr-2 pl-2">
                              {message.user.username + ": " + message.chat}
                            </span>
                          </p>
                        );
                      }
                    }
                  }
                })}
            </div>
            <form
              className="chat-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                id={"message" + userTo.uid}
                onChange={(e) => this.handleMessageChange(e.target.value)}
                className="form-control"
              />
              <button
                className="send-btn pr-0"
                type="submit"
                onClick={() =>
                  this.handleMessageSend(
                    socket,
                    this.state.message,
                    loggedUser,
                    userTo
                  )
                }
              >
                <img width="25px" height="25px" src={send} />
              </button>
            </form>
          </React.Fragment>
        </div>
      );
    } else return null;
  }
}

export default Chat;
