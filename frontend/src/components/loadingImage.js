import React, { Component } from 'react';

const imgStyle = {
    'border-radius': '50%',
    'width': '50%'
};

export default class LoadingImage extends Component {
    render(){
      return (
        <div className='container-fluid text-center'>
            <img style={imgStyle} src='https://s-media-cache-ak0.pinimg.com/originals/90/80/60/9080607321ab98fa3e70dd24b2513a20.gif' alt='loading' />
        </div>
      );
    }
}