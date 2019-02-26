import React, { Component } from 'react';

export default class MsgRow extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <tr>
                <td>{this.props.msgData['date']}</td>
                <td>{this.props.msgData['to']}</td>
                <td>{this.props.msgData['sender']}</td>
                <td>{this.props.msgData['subject']}</td>
            </tr>
        )
    }
}
