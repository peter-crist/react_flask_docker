import React, { Component } from 'react';
import FileUpload from './fileUpload';
import ParsedGrid from './parsedGrid';

export default class Body extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isLoading: false,
            responseResults: ''
        };

        this.setResponseState = this.setResponseState.bind(this);
    }

    setResponseState(isLoading, data) {
        console.log("Setting Response State - isLoading=" + isLoading);
        this.setState({
            isLoading: isLoading,
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
                        <ParsedGrid results={this.state.responseResults} isLoading={this.state.isLoading}/>
                    </div>
                </div>
            </div>  
      );
    }
}
