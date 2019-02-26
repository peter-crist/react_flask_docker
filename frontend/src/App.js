import React, { Component } from 'react';
import Body from './components/body';
import Jumbotron from './components/jumbotron';

export default class App extends Component {
  render() {
    return (
      <div>
        <Jumbotron />
        <Body />
      </div>
    );
  }
}
