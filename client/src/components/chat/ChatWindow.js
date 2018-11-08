import React, { Component } from "react";

class ChatWindow extends Component {
  constructor() {
    super();
    this.state = {
      newMessage: "",
      messages: []
    };

    this.setNewMessage = this.setNewMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.socket.on("private", data => {
      this.setState({ messages: this.state.messages.concat(data.msg) });
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <div id="myNav" className="overlay">
        <a onClick={this.onClick}>&times;</a>
        <p>messages</p>
        <div>
          {messages.map(msg => (
            <p>{msg}</p>
          ))}
        </div>

        <form onSubmit={this.handleSubmit}>
          <input
            id="message"
            type="text"
            label="Message"
            onChange={this.setNewMessage}
            value={this.state.newMessage}
            autoComplete="off"
            autoFocus
          />
        </form>
      </div>
    );
  }

  setNewMessage(event) {
    this.setState({
      newMessage: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.socket.emit("private", {
      to: this.props.user.id,
      text: this.state.newMessage
    });
    this.setState({
      newMessage: ""
    });
  }
}

export default ChatWindow;
