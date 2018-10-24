import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";


const SecretRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={props =>
    auth.isAuthenticated === true
      ? (<Component {...props} />)
      : (<Redirect to="/" />)
  } />
);

SecretRoute.proptypes = { auth: PropTypes.object.isRequired };

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(SecretRoute);