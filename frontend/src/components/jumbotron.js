import React, { Component } from 'react';

export default class Jumbotron extends Component {
    render(){
      return (
        <div className="container">
            <div className="jumbotron">
                <h1>Return Path Coding Challenge</h1>
                <p>Requirements:</p>
                <ul>
                    <li>Allows a user to supply raw email message data via file upload and display the results of the email data:</li>
                        <ul>
                            <li>To</li>
                            <li>From</li>
                            <li>Date</li>
                            <li>Subject</li>
                        </ul>
                    <li>Implement an API (Go, Python, or PHP based frameworks are acceptable) that can parse user supplied email message data and return all available results:</li>
                        <ul>
                            <li>To</li>
                            <li>From</li>
                            <li>Date</li>
                            <li>Subject</li>
                            <li>Message-ID</li>
                        </ul>
                </ul>
            </div>
        </div>
      );
    }
}
