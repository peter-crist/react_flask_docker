import React, { Component } from 'react';
import { loadingGif } from '../';

const imgStyle = {
    'borderRadius': '50%',
    'width': '50%'
};

//TODO: Potentially improve user experience to show loading for at least 1-2 seconds so it doesn't appear to "flash" at them
export default class LoadingImage extends Component {
    render(){
      return (
        <div className='container-fluid text-center'>
            <img style={imgStyle} src={loadingGif} alt='loading' />
        </div>
      );
    }
}