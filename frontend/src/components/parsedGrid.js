import React, { Component } from 'react';
import MsgRow from './msgRow';
import LoadingImage from './loadingImage';

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
        
        // Otherwise, render the results from the parsed file.
        var gridData = this.props.results;
        if (!gridData) {
            return (
                <div></div>
            )
        } 
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