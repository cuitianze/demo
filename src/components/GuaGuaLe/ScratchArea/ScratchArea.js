import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import ReactCanvas from 'react-canvas';
// console.log(ReactCanvas, 'who')
import s from './ScratchArea.scss';
import withStyles from '../../../decorators/withStyles';
import Canvas from './Canvas';

@withStyles(s)
class ScratchArea extends Component {


  render() {
    return (
      <div className={s.luckydraw}>
        <p className={s.luckydraw_tit}>您已参与2次，本次将消耗300积分</p>
        <div className={s.scratch}>
          <Canvas/>
          {/*}
          <img src="/gua/scratch-bottom.png" />
          <img src="/gua/scratch-top.png" className={s.scratch_top}/>
          */}
        </div>
        <div className={s.luckydraw_btn}>
          <button>再刮一次</button>
        </div>
      </div>
    );
  }

}

export default ScratchArea;
