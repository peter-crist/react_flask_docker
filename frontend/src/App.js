import React, { Component } from 'react';
import Jumbotron from "./components/jumbotron";
import FileUpload from './components/fileUpload';

export default class App extends Component {
  constructor () {
    super();
  }

  state = {
    
  };

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <Jumbotron />
        <FileUpload />
      </div>
    );
  }
}
