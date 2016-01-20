import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Loading extends Component {
  render() {
    return (
      <div style={{position: 'fixed', zIndex: 999, top: 0, left: 0, right: 0, bottom: 0, paddingTop: '40%', textAlign: 'center', background: 'white'}}>
        <img src="/gua/loading.jpg"/>
      </div>
    )
  }
}

export default Loading;
