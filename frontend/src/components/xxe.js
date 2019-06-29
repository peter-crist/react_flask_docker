import React, { Component } from 'react';

const supportedFileTypes = ".xml";

export default class ParseXXE extends Component {
  constructor(props) {
    super(props);

    this.state = {
        fileName: '',
    };

    this.handleXMLUpload = this.handleXMLUpload.bind(this);
  }

  handleXMLUpload = e => {
    e.preventDefault();
    if (!this.xmlInput.files[0]) {
        return;
    }

    const upload = new FormData();
    upload.append('file', this.xmlInput.files[0]);
    upload.append('filename', this.state.fileName);

    fetch('http://localhost:5000/api/xml', {
            method: 'POST',
            body: upload,
        })
        .then(response => response.json())
        .then((data) => {
            this.setState({ parseResults: data })
            this.props.setResponseResults(data);
    });
  }

  // Simply changes the filename for display
  onChange = e => {
    if (e.target.files[0]) {
        this.setState({ fileName: e.target.files[0].name});
    }
    else {
        this.setState({ fileName: '' })
    }
  };

  render() {
    return (
    <div>
        <form onSubmit={this.handleXMLUpload}>
            <div className="col-12">
                <h4>Parse XML! (Please don't include XXE k thanks)</h4>
                <div className="input-group">
                    <label className="input-group-btn">
                        <span className="btn btn-primary">
                        Browse… <input
                                    type="file"
                                    accept={supportedFileTypes}
                                    ref={(ref) => { this.xmlInput = ref; }}
                                    style={{display: 'none'}}
                                    onChange={ (event) => this.onChange(event) }
                                />
                        </span>
                    </label>
                    <input value={this.state.fileName} type="text" className="form-control" readOnly />
                    <label className="input-group-btn">
                        <span>
                            <button type="submit" className="btn btn-primary">Parse!</button>
                        </span>
                    </label>
                </div>
            </div>
        </form>
    </div>
    );
  }
}