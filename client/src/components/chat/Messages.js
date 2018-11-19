import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";

class Messages extends React.Component {
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

Messages.propTypes = {
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat
});

export default connect(mapStateToProps)(Messages);
