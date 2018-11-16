import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserHistory, clearUserHistory } from "../../actions/authActions";

class History extends Component {
  componentDidMount() {
    this.props.getUserHistory();
  }

  componentWillUnmount() {
    this.props.clearUserHistory();
  }

  render() {
    const auth = this.props.auth;
    const history = auth.history;

    return (
      <div className="history">
        {history.map((log, index) => (
          <div className="history-item" key={index}>
            <span>{log.text}</span>
            <span>{log.createdDate}</span>
          </div>
        ))}
      </div>
    );
  }
}

History.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUserHistory, clearUserHistory }
)(History);
