import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

const SecretRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        renderMergedProps(Component, props, rest)
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

SecretRoute.proptypes = { auth: PropTypes.object.isRequired };

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(SecretRoute);
