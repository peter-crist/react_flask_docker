import React, { Component } from 'react';

export default class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
        fileName: '',
    };

    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload(e) {
    e.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.state.fileName);
    console.log(data);

    fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: data
        })
        .then((response) => {
            console.log(response);
    });
  }

  onChange = e => {
    this.setState({ fileName: e.target.files[0].name});
  };

  render() {
    return (
    <div>
        <form onSubmit={this.handleUpload}>
            <div className="col-lg-6 col-sm-6 col-12">
                <h4>Parse Email Data File</h4>
                <div className="input-group">
                    <label className="input-group-btn">
                        <span className="btn btn-primary">
                        Browse… <input ref={(ref) => { this.uploadInput = ref; }} type="file" style={{display: 'none'}} onChange={ (event) => this.onChange(event) }/>
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