import React, { Component } from 'react';

const supportedFileTypes = ".tar.gz, .msg";

export default class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
        fileName: '',
    };

    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload = e => {
    var isLoading = true // Indicates to the parent that the fetch results haven't been recieved yet.
    this.props.setResponseState(isLoading, '');
    e.preventDefault();

    const upload = new FormData();
    upload.append('file', this.uploadInput.files[0]);
    upload.append('filename', this.state.fileName);

    console.log("Starting fetch...");
    fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: upload
        })
        .then(response => response.json())
        .then((data) => {
            console.log("Fetch complete");  
            this.setState({ parseResults: data })
            isLoading = false;
            this.props.setResponseState(isLoading, data);
    });
  }

  onChange = e => {
    this.setState({ fileName: e.target.files[0].name});
  };

  render() {
    return (
    <div>
        <form onSubmit={this.handleUpload}>
            <div className="col-12">
                <h4>Parse Email Data File</h4>
                <div className="input-group">
                    <label className="input-group-btn">
                        <span className="btn btn-primary">
                        Browse… <input 
                                    type="file" 
                                    accept={supportedFileTypes}
                                    ref={(ref) => { this.uploadInput = ref; }}
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