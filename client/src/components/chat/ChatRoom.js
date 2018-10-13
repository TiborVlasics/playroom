import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SocketContext from "../../SocketContext";
import ChatTable from "./ChatTable";
import { addMessage } from "../../actions/chatActions";

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: "",
      usersTyping: {}
    };
    this.setNewMessage = this.setNewMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.socket.on("chat", message => {
      this.props.addMessage(message);
    });

    this.props.socket.on("user typing", user => {
      let name = user.name;
      let text = user.text;
      let oldstate = this.state.usersTyping;
      let newState;
      if (!this.state.usersTyping[name] && user.isTyping) {
        newState = { ...oldstate, [name]: text };
      } else if (this.state.usersTyping[name] && user.isTyping) {
        newState = { ...oldstate, [name]: text };
      } else if (this.state.usersTyping[name] && !user.isTyping) {
        let { [name]: omit, ...state } = oldstate;
        newState = state;
      } else {
        newState = oldstate;
      }
      this.setState({ usersTyping: newState });
    });
  }

  componentWillUnmount() {
    this.props.socket.removeAllListeners("chat");
    this.props.socket.removeAllListeners("user typing");
  }

  render() {
    return (
      <div className="container">
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
          <div className="chat-wrapper">
            <ChatTable />
            {Object.keys(this.state.usersTyping).map((user, index) => (
              <div key={index} className="message-container">
                <div className="message-name typewriter">
                  {user} is writing a message...
                </div>
                <div
                  style={{ backgroundColor: "white" }}
                  className="message-text blurry-text"
                >
                  {this.state.usersTyping[user]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  setNewMessage(event) {
    this.setState({
      newMessage: event.target.value
    });
    if (event.target.value !== "") {
      this.props.socket.emit("user typing", {
        name: this.props.auth.user.name,
        text: event.target.value,
        isTyping: true
      });
    } else {
      this.props.socket.emit("user typing", {
        name: this.props.auth.user.name,
        text: event.target.value,
        isTyping: false
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.socket.emit("chat", {
      author: this.props.auth.user,
      text: this.state.newMessage,
      timestamp: new Date().toISOString()
    });
    this.setState({
      newMessage: ""
    });
    this.props.socket.emit("user typing", {
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

const ChatRoomWithSockets = props => (
  <SocketContext.Consumer>
    {socket => <ChatRoom {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default connect(
  mapStateToProps,
  { addMessage }
)(ChatRoomWithSockets);
