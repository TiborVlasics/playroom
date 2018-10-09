import React, { Component } from "react";

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">some stupid app</h1>
                <p className="lead">
                  {" "}
                  Gaming and social app for people who don't like challenges
                  (with art by Banksy)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
