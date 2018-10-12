import React from "react";
import PropTypes from "prop-types";
import { loadMessages } from "../../actions/chatActions";
import { clearMessages } from "../../actions/chatActions";
import { connect } from "react-redux";

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

    const spinner = (
      <div id="cssload-loader">
        <div className="cssload-dot" />
        <div className="cssload-dot" />
        <div className="cssload-dot" />
        <div className="cssload-dot" />
        <div className="cssload-dot" />
        <div className="cssload-dot" />
        <div className="cssload-dot" />
        <div className="cssload-dot" />
      </div>
    );

    const chatTable = (
      <div className="chat-table">
        {messages.map(message => (
          <div
            key={message._id}
            className={
              message.author.name === user.name
                ? "message-container own-message"
                : "message-container"
            }
          >
            <img
              src={message.thumbnail}
              style={{ maxWidth: 35 }}
              alt="thumbnail"
            />
            <div className="message-name">{message.author.name + ":"}</div>
            {message.text.map((text, index) => (
              <div key={index} className="message-text">
                {text}
              </div>
            ))}
            <div className="message-date">{message.createdDate}</div>
          </div>
        ))}
      </div>
    );

    return <div className="container">{loading ? spinner : chatTable}</div>;
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
