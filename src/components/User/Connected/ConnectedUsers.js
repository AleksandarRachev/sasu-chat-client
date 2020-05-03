import React, { Component } from "react";
import "./ConnectedUsers.css";

class ConnectedUsers extends Component {
  render() {
    const { users, userFrom, onOpenChat } = this.props;

    return (
      <div className="list-group connected">
        {users &&
          users.map((user) => (
            <li
              key={user.uid}
              onClick={() =>
                onOpenChat({ userFrom: userFrom, userTo: user, showChat: true })
              }
              className="list-group-item list-group-item-action"
            >
              <span className="badge badge-success p-1 mr-2"> </span>
              {user.username}
            </li>
          ))}
      </div>
    );
  }
}

export default ConnectedUsers;
