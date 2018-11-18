import React from "react";
import PropTypes from "prop-types";
import { loadMessages } from "../../actions/chatActions";
import { clearMessages } from "../../actions/chatActions";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";

class ChatTable extends React.Component {
  componentDidMount() {
    this.props.loadMessages();
    window.scrollTo(0, document.body.scrollHeight);
  }

  componentWillUnmount() {
    this.props.clearMessages();
  }

  render() {
    const { user } = this.props.auth;
    const { messages, loading } = this.props.chat;

    const chatTable = (
      <div>
        {messages.map(message => (
          <div
            key={message._id}
            className={
              message.author.name === user.name
                ? "message-container own-message"
                : "message-container"
            }
          >
            <div className="message-name">{message.author.name + ":"}</div>
            <div className="message-box">
              {message.text.map((text, index) => (
                <div key={index} className="message-text">
                  {text}
                </div>
              ))}
            </div>
            <div className="message-date">{message.createdDate}</div>
          </div>
        ))}
      </div>
    );

    return (
      <div className="chat-table">{loading ? <Spinner /> : chatTable}</div>
    );
  }
}

ChatTable.propTypes = {
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  loadMessages: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat
});

export default connect(
  mapStateToProps,
  { loadMessages, clearMessages }
)(ChatTable);
