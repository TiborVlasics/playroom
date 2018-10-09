import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import io from "socket.io-client";
import ChatTable from "./ChatTable";
import { addMessage } from "../../actions/authActions";

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: "",
      usersTyping: []
    };
    this.setNewMessage = this.setNewMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.socket = io("/", { transports: ["polling"] });
  }

  componentDidMount() {
    this.socket.on("chat", message => {
      this.props.addMessage(message);
    });

    this.socket.on("user typing", user => {
      if (!this.state.usersTyping.includes(user.name) && user.isTyping) {
        this.setState({
          usersTyping: this.state.usersTyping.concat(user.name)
        });
      } else if (this.state.usersTyping.includes(user.name) && !user.isTyping) {
        let index = this.state.usersTyping.indexOf(user.name);
        this.setState({
          usersTyping: this.state.usersTyping
            .slice(0, index)
            .concat(
              this.state.usersTyping.slice(
                index,
                this.state.usersTyping.length - 1
              )
            )
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                className="chat-input form-control mx-sm-3"
                id="message"
                type="text"
                label="Message"
                placeholder="Talk to your little friends..."
                onChange={this.setNewMessage}
                value={this.state.newMessage}
                autoComplete="off"
                autoFocus
              />
            </div>
          </form>
          <div class="chat-wrapper">
            <ChatTable />
            <div class="users-typing typewriter">
              {this.state.usersTyping.map(user => user + " is typing...")}
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    this.socket.close();
  }

  setNewMessage(event) {
    this.setState({
      newMessage: event.target.value
    });
    if (event.target.value !== "") {
      this.socket.emit("user typing", {
        name: this.props.auth.user.name,
        isTyping: true
      });
    } else {
      this.socket.emit("user typing", {
        name: this.props.auth.user.name,
        isTyping: false
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.socket.emit("chat", {
      author: this.props.auth.user,
      text: this.state.newMessage,
      timestamp: new Date().toISOString()
    });
    this.setState({
      newMessage: ""
    });
    this.socket.emit("user typing", {
      name: this.props.auth.user.name,
      isTyping: false
    });
  }
}

ChatRoom.propTypes = {
  auth: PropTypes.object.isRequired,
  addMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addMessage }
)(ChatRoom);
