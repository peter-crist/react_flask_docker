import React, { Component } from 'react';
import { loadingGif } from '../';

const imgStyle = {
    'borderRadius': '50%',
    'width': '50%'
};

export default class LoadingImage extends Component {
    render(){
      return (
        <div className='container-fluid text-center'>
            <img style={imgStyle} src={loadingGif} alt='loading' />
        </div>
      );
    }
}