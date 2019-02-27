import React, { Component } from 'react';
import Body from './components/body';
import Jumbotron from './components/jumbotron';

/* Component Hierarchy (wouldn't want to maintain this comment but just for this coding challenge):

        App
      /     \
Jumbotron   Body
            /    \
    FileUpload   ParsedGrid
                  \
                    MsgRow

*/


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
