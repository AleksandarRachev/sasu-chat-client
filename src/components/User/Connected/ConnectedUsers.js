import React, { Component } from "react";
import "./ConnectedUsers.css";

class ConnectedUsers extends Component {
  render() {
    const { users, onUserPick } = this.props;

    return (
      <div className="list-group connected">
        {users &&
          users.map((user) => (
            <li
              key={user.uid}
              onClick={() => onUserPick(user)}
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
