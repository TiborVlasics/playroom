import React from "react";

const ChatUsers = ({ users }) => (
  <div className="usersBar">
    <p>online users:</p>
    {users.map((user, index) => {
      return (
        <div
          className="user"
          key={index}
          onClick={() => this.props.onClick(user)}
        >
          <div style={{ display: "inline-block", marginRight: "20px" }}>
            {user.name}
          </div>
          <img
            src={user.avatar}
            alt="user avatar"
            style={{
              maxWidth: "20px",
              borderRadius: "50%",
              display: "inline-block"
            }}
          />
        </div>
      );
    })}
  </div>
);

export default ChatUsers;
