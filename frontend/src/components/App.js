import React, { Component } from "react";
import { render } from "react-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
<<<<<<< HEAD
    return <h1>{this.props.name}</h1>;
=======
    return <h1>Testing React Code</h1>;
>>>>>>> 3aad44eaae9fce12ccda086af4a345b614a30b13
  }
}

const appDiv = document.getElementById("app");
<<<<<<< HEAD
render(<App name = "tim"/>, appDiv);
=======
render(<App></App>, appDiv);
>>>>>>> 3aad44eaae9fce12ccda086af4a345b614a30b13
