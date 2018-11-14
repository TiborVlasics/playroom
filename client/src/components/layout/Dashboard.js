import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserHistory, clearUserHistory } from "../../actions/authActions";

class Dashboard extends Component {
  pushUserToGame(game) {
    if (game.hasOwnProperty("_id") && game.isFull) {
      if (game.kind === "tictactoes") {
        this.props.history.push(`/tictactoe/${game._id}`);
      } else if (game.kind === "pongs") {
        this.props.history.push(`/pong/${game._id}`);
      }
    }
  }

  componentDidMount() {
    this.pushUserToGame(this.props.currentGame);
    this.props.getUserHistory();
  }

  componentWillUnmount() {
    this.props.clearUserHistory();
  }

  componentWillReceiveProps(nextProps) {
    this.pushUserToGame(nextProps.currentGame);
  }

  render() {
    const auth = this.props.auth;
    const history = auth.history;

    return (
      <div>
        {/* <h4>Hello {auth.user.name}!</h4> */}
        <div className="dashboard">
          <div className="history">
            {history.map((log, index) => (
              <div className="history-item" key={index}>
                <span>{log.text}</span>
                <span>{log.createdDate}</span>
              </div>
            ))}
          </div>
          <div className="statistics">
            <table>
              <tbody>
                <tr>
                  <th>some</th>
                  <th>some</th>
                </tr>
                <tr>
                  <td>sosme statistics</td>
                  <td>sosme statistics</td>
                </tr>
                <tr>
                  <td>sosme statistics</td>
                  <td>sosme statistics</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rewards">
            <h2>You have 40 xp</h2>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentGame: state.currentGame,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUserHistory, clearUserHistory }
)(Dashboard);
