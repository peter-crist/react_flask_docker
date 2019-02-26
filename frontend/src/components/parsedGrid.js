import React, { Component } from 'react';
import MsgRow from './msgRow';
import LoadingImage from './loadingImage';

//TODO: Implement pagination with Flask-SocketIO to handle extremely large files?
export default class ParsedGrid extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Return a loading message if the fetch results from the parse haven't arrived yet.
        if (this.props.isLoading) {
            return (
                <div><LoadingImage /></div>
            )
        }
    
        var gridData = this.props.results;
        // If there is no data, don't show anything; we haven't tried to parse anything yet.
        if (!gridData) {
            return (
                <div></div>
            )
        } 

        // Display the parsed response data from the file that was uploaded!
        if (gridData) {
            var msgGrid = gridData.map((msgData, index) => {
                return (
                    <MsgRow key={index} msgData={msgData}/>
                )
            });
            return (
                <table className="table table-bordered table-striped" width="100%">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>To</th>
                        <th>From</th>
                        <th>Subject</th>
                    </tr>
                    </thead>
                    <tbody>
                        {msgGrid}
                    </tbody>
                </table>              
            )
        }        
    }
}