import React, { Component } from 'react';

//TODO: Consider very large fields. For example, if the Subject is extremely long, the UI should address this.
//      Potentially cutoff field with elipsis (...) and make clickable to "zoom".
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
