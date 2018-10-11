import React, { Component } from "react";
import NewGameForm from "./NewGameForm";

class Tavern extends Component {
  render() {
    return (
      <div class="container cards">
        <NewGameForm />
        <div>
          <div>Games:</div>
        </div>
      </div>
    );
  }
}

export default Tavern;
