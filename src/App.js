import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar.js/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/User/Login";
import ConnectedUsers from "./components/User/Connected/ConnectedUsers";
import Chat from "./components/Chat/Chat";
import ChatList from "./components/Chat/ChatList/ChatList";

const AppConfig = {
  PROTOCOL: "ws:",
  HOST: "//localhost",
  PORT: ":9000",
};

const socket = new WebSocket(
  AppConfig.PROTOCOL + AppConfig.HOST + AppConfig.PORT
);

const user = JSON.parse(localStorage.getItem("user"));

class App extends Component {
  state = {
    users: [],
    messages: [],
    message: null,
    showChat: false,
    userTo: null,
    userFrom: user,
    chats: [],
  };

  componentDidMount() {
    socket.onopen = () => {
      if (user) {
        socket.send(
          JSON.stringify({
            user: user,
            chat: "123",
            type: "USER_JOINED",
          })
        );
      }
    };

    socket.onmessage = (message) => {
      let data = JSON.parse(message.data);
      console.log(data);
      switch (data.type) {
        case "USER_JOINED":
          this.setState({ users: data.users });
          break;
        case "USER_LEFT":
          this.setState({ users: data.users });
          break;
        case "TEXT":
          this.setState({
            messages: [data].concat(this.state.messages),
            showChat: true,
          });
          if (user.uid === data.user.uid) {
            this.setState({
              userTo: data.userTo,
              userFrom: data.user,
            });
          } else {
            this.setState({
              userTo: data.user,
              userFrom: data.userTo,
            });
          }
          break;
        default:
          break;
      }
    };
  }

  handleLeave = () => {
    socket.send(
      JSON.stringify({
        user: user,
        chat: "123",
        type: "USER_LEFT",
      })
    );
  };

  handleUserPick = (userTo) => {
    this.setState({ userTo: userTo });
  };

  handleShowChat = () => {
    this.setState({ showChat: !this.state.showChat });
  };

  handleCloseChat = (chat) => {
    let chats = [...this.state.chats];
    const index = this.getChatIndex(chat, this.state.chats);
    if (index !== -1) {
      let chatChange = { ...chats[index] };
      chatChange.showChat = false;
      chats[index] = chatChange;
      this.setState({ chats });
    }
  };

  getChatIndex(chat, chats) {
    for (var i = 0; i < chats.length; i++) {
      if (
        chats[i].userFrom === chat.userFrom &&
        chats[i].userTo === chat.userTo
      ) {
        return i;
      }
    }
    return -1;
  }

  handleOpenChat = (chat) => {
    let chats = [...this.state.chats];
    const index = this.getChatIndex(chat, this.state.chats);
    if (index !== -1) {
      let chatChange = { ...chats[index] };
      chatChange.showChat = true;
      chats[index] = chatChange;
      this.setState({ chats: chats, userTo: chat.userTo });
    } else {
      this.setState({
        chats: this.state.chats.concat(chat),
        userTo: chat.userTo,
      });
    }
  };

  render() {
    return (
      <Router>
        <NavBar onLeave={this.handleLeave} />
        <div style={{ display: "flex" }}>
          <ConnectedUsers
            users={this.state.users}
            userFrom={user}
            onUserPick={this.handleUserPick}
            onOpenChat={this.handleOpenChat}
          />
          <button onClick={() => console.log(this.state.chats)}>Chats</button>
          {/* <Chat
            socket={socket}
            loggedUser={user}
            userTo={this.state.userTo}
            showChat={this.state.showChat}
            onShowChat={this.handleShowChat}
            messages={this.state.messages}
          /> */}
          <ChatList
            chats={this.state.chats}
            socket={socket}
            onShowChat={this.handleShowChat}
            messages={this.state.messages}
            onCloseChat={this.handleCloseChat}
          />
          <Switch>
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
