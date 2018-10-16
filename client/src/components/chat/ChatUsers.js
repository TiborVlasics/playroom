import React, { Component } from "react";

class ChatUsers extends Component {
  constructor() {
    super();
    this.state = { users: [] };
  }

  componentDidMount() {
    this.props.socket.on("users", users => {
      this.setState({ users: users });
    });
    this.props.socket.emit("get users");
  }

  render() {
    let { users } = this.state;

    return (
      <div
        className="usersBar"
        style={{ position: "relative", bottom: "70px", right: "80px" }}
      >
        <p>online users:</p>
        {users.map((user, index) => {
          return (
            <div key={index}>
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
  }
}

export default ChatUsers;
