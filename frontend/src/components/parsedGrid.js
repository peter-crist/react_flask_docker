import React, { Component } from 'react';
import LoadingImage from './loadingImage'
import MsgRow from './msgRow';

export default class ParsedGrid extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        var gridData = this.props.results;
        console.log(gridData);
        if (!gridData) {
            return (
                <div>
                    <LoadingImage />
                </div>
            )
        }
        else {
            var row_id = 0
            var msgGrid = gridData.map((msgData) => {
                row_id += 1;
                return (
                    <MsgRow msgData={msgData}/>
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