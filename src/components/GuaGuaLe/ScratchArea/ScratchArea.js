import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import s from './ScratchArea.scss';
import withStyles from '../../../decorators/withStyles';
import Canvas from './Canvas';

@withStyles(s)
class ScratchArea extends Component {

  state = {
    scratch: false
  }

  constructor(props) {
    super(props);
    this.handleOnClickClear = this.handleOnClickClear.bind(this);
    this.handleOnScratchPrize = this.handleOnScratchPrize.bind(this);
    this.loginApp = this.loginApp.bind(this);
  }

  handleOnClickClear() {
    this.setState({
      clear: true,
      scratch: false
    });
  }

  handleOnScratchPrize() {
    this.setState({
      scratch: true
    })
  }

  loginApp() {
    // if(ios) {
      console.log('click login');
      window.location.href = "js://_?".concat(JSON.stringify({type: "login"}));
    // }
  }


  render() {
    return (
      <div className={s.luckydraw}>
        <p className={s.luckydraw_tit}>您已参与2次，本次将消耗300积分</p>
        <div className={s.scratch}>
          <Canvas {...this.state}/>
          <div className={s.real_prize}>
            {/*}
            <img src="/gua/scratch-bottom.png" />
            */}
            <p style={{textAlign: 'center'}}>奖品神马都是骗人的!</p>
          </div>
          <div className={!this.state.scratch ? s.scratch_top : s.hidden}>
          {
            this.props.isLogin ?
            <button onClick={this.handleOnScratchPrize} className={s.joinBtn}>消耗300积分,参与刮奖</button> :
            <button onClick={this.loginApp} className={s.joinBtn}>点击登陆,参与刮奖</button>
          }
            <div className={s.scratchTimes}><span>您已参与2次</span></div>
          </div>
        </div>
        <div className={s.luckydraw_btn}>
          <button onClick={this.handleOnClickClear}>再刮一次</button>
        </div>
      </div>
    );
  }

}

export default ScratchArea;
