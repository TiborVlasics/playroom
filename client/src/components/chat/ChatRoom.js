import React from "react";
import {
  Grid,
  FormGroup,
  ControlLabel,
  FormControl,
  Form,
  Button
} from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import io from "socket.io-client";
import ChatTable from "./ChatTable";

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: ""
    };
    this.setNewMessage = this.setNewMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.socket = io("/");
  }

  componentDidMount() {
    this.socket.on("chat", message => {
      message.key = JSON.stringify(message);
      this.setState({
        messages: this.state.messages.concat(message)
      });
    });
  }

  render() {
    return (
      <div>
        <Grid>
          <Form inline onSubmit={this.handleSubmit}>
            <FormGroup>
              <ControlLabel>Message</ControlLabel>{" "}
              <FormControl
                id="message"
                type="text"
                label="Message"
                placeholder="Enter your message"
                onChange={this.setNewMessage}
                value={this.state.newMessage}
                autoComplete="off"
              />
            </FormGroup>
            <Button type="submit">Send</Button>
          </Form>

          <ChatTable messages={this.state.messages} />
        </Grid>
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
      name: this.props.auth.user.name,
      message: this.state.newMessage,
      timestamp: new Date().toISOString()
    });
    this.setState({
      newMessage: ""
    });
  }
}

ChatRoom.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(ChatRoom);
