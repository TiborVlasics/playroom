import React from "react";
import PropTypes from "prop-types";
import { fetchMessages } from "../../actions/authActions";
import { connect } from "react-redux";

class ChatTable extends React.Component {
  componentDidMount() {
    this.props.fetchMessages();
  }

  render() {
    const { user } = this.props.auth;
    const messages = this.props.messages;

    return (
      <div className="chat-table">
        {messages.map(message => (
          <div className="chat-message" key={message._id}>
            <img src={message.thumbnail} style={{ maxWidth: 30 }} />
            <div className="name-column">{message.author.name}</div>
            <div>{message.text}</div>
          </div>
        ))}
      </div>
    );
  }
}

ChatTable.propTypes = {
  auth: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  fetchMessages: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  messages: state.messages
});

export default connect(
  mapStateToProps,
  { fetchMessages }
)(ChatTable);