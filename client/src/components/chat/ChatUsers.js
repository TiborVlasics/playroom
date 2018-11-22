import React from "react";

const ChatUsers = ({ users }) => (
  <div className="users-bar">
    <p className="users-bar-header">online users:</p>
    {users.map((user, index) => {
      return (
        <div
          className="user"
          key={index}
          onClick={() => this.props.onClick(user)}
        >
          <div>{user.name}</div>
          <img src={user.avatar} alt="user avatar" />
        </div>
      );
    })}
  </div>
);

export default ChatUsers;
