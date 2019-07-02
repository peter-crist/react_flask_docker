import React, { Component } from 'react';

export default class ParsedXXEGrid extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var gridData = this.props.results;
        // If there is no data, don't show anything; we haven't tried to parse anything yet.
        if (!gridData) {
            return (
                <div></div>
            )
        }

        // Display the parsed response data from the file that was uploaded!
        console.log(gridData);
        if (gridData) {
            let xmlOutput = ''
            gridData.forEach(element => {
                if (element) {
                    xmlOutput+=element.toString().trim();
                }
            });
            return (
                <div>
                    {xmlOutput}
                    <div>
                        { xmlOutput == 'PartyParrot!!!'
                            ? <img src='https://media.giphy.com/media/7o6oVRTLFI2GY/giphy.gif'></img>
                            : null
                        }
                    </div>
                </div>
            )
        }
    }
}