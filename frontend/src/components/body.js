import React, { Component } from 'react';
import FileUpload from './fileUpload';
import ParsedGrid from './parsedGrid';

export default class Body extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            responseResults: ''
        };

        this.setResponseState = this.setResponseState.bind(this);
    }

    setResponseState(data) {
        this.setState({
            responseResults: data
        });
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <FileUpload setResponseState={this.setResponseState} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12'>
                        <ParsedGrid results={this.state.responseResults}/>
                    </div>
                </div>
            </div>  
      );
    }
}
