import React, { Component } from 'react';
import ParseXXE from './xxe';
import ParsedXXEGrid from './parsedXXEGrid';

export default class Body extends Component {
    constructor(props) {
        super(props);

        this.state = {
            responseResults: ''
        };

        this.setResponseResults = this.setResponseResults.bind(this);
    }

    setResponseResults(data) {
        this.setState({
            responseResults: data
        });
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <ParseXXE setResponseResults={this.setResponseResults} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12'>
                        <ParsedXXEGrid results={this.state.responseResults} />
                    </div>
                </div>
            </div>
      );
    }
}
