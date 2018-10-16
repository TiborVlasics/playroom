import React, { Component } from "react";

class ChatUsers extends Component {
  constructor() {
    super();
    this.state = { users: [] };
  }

  componentDidMount() {
    this.props.socket.on("users", users => {
      this.setState({ users: users });
      window.scrollTo(0, document.body.scrollHeight);
    });

    this.props.socket.emit("get users");

    this.props.socket.on("user joined", user => {
      this.setState({ users: this.state.users.concat(user) });
    });

    this.props.socket.on("user left", userData => {
      let users = this.state.users.filter(user => user.id !== userData.id);
      this.setState({ users: users });
    });
  }

  render() {
    let { users } = this.state;

    return (
      <div className="usersBar">
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
