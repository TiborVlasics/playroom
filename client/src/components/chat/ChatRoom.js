import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import io from "socket.io-client";
import ChatTable from "./ChatTable";
import { fetchMessages } from "../../actions/authActions";

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: ""
    };
    this.setNewMessage = this.setNewMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.socket = io("/", { transports: ["polling"] });
  }

  componentDidMount() {
    this.socket.on("chat", message => {
      this.props.fetchMessages();
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
                placeholder="Say something dirty..."
                onChange={this.setNewMessage}
                value={this.state.newMessage}
                autoComplete="off"
                autoFocus
              />
            </div>
          </form>
          <ChatTable messages={this.state.messages} />
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
  }
}

ChatRoom.propTypes = {
  auth: PropTypes.object.isRequired,
  fetchMessages: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fetchMessages }
)(ChatRoom);
