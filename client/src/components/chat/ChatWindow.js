import React, { Component } from "react";

class ChatWindow extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }

  componentDidMount() {}

  render() {
    const user = this.props.user;
    return (
      <div id="myNav" className="overlay">
        <a className="closebtn" onClick={this.onClick}>
          &times;
        </a>
        <div className="overlay-content">{user.name}</div>
      </div>
    );
  }
}

export default ChatWindow;
