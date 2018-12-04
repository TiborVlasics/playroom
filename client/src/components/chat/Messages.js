import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import moment from "moment-timezone";

class Messages extends React.Component {
  render() {
    const { user } = this.props.auth;
    const { messages, loading } = this.props.chat;

    const chatTable = (
      <div>
        {loading ? <Spinner /> : null}
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
            <div className="message-date">
              {moment(message.createdDate)
                .tz("Europe/Budapest")
                .fromNow() + "..."}
            </div>
          </div>
        ))}
      </div>
    );

    return <div className="chat-table">{chatTable}</div>;
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
