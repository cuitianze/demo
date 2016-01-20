import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fetch from '../../../core/fetch';
import s from './ScratchArea.scss';
import withStyles from '../../../decorators/withStyles';
import Canvas from './Canvas';

@withStyles(s)
class ScratchArea extends Component {

  state = {
    scratch: false,
    startScratch: false,
    hideCanvas: false,
    consumPoint: {}
  }

  constructor(props) {
    super(props);
    this.handleOnScratchAgain = this.handleOnScratchAgain.bind(this);  // 再刮一次
    this.handleOnScratchPrize = this.handleOnScratchPrize.bind(this);  // 点击刮奖
    this.loginApp = this.loginApp.bind(this);  // 调用APP登陆
    this.scratchStart = this.scratchStart.bind(this);
    this.scratchEnd = this.scratchEnd.bind(this);  // TouchEnd消除遮罩层
    this.getConsumPoint = this.getConsumPoint.bind(this);  // 获取用户该次抽奖消耗积分
  }

  // 简单起见，刮奖置顶
  scrollToTop() {
    window.scroll(0, 0);
  }

  scratchStart() {
    this.setState({
      startScratch: true
    })
  }

  // TouchEnd消除遮罩层
  scratchEnd() {
    console.log(this.state.startScratch);
    if(this.state.startScratch) {
      this.setState({
        hideCanvas: true
      });
    }
  }

  // 再刮一次
  handleOnScratchAgain() {
    this.setState({
      clear: true,
      scratch: false
    });
    this.getConsumPoint();
  }

  // 点击刮奖
  async handleOnScratchPrize() {
    this.setState({
      scratch: true,
      hideCanvas: false
    })
    const response = await fetch( this.props.remoteApiUrl + this.props.url + '?param=' + JSON.stringify({id: this.props.activityId}), {
      headers: {
        'token': this.props.userToken
      }
    });
    console.log(response)
  }

  // 获取用户该次抽奖消耗积分
  async getConsumPoint() {
    const response = await fetch( this.props.remoteApiUrl + '/consum_point.wn' + '?param=' + JSON.stringify({id: this.props.activityId}), {
      headers: {
        'token': this.props.userToken
      }
    });
    const data = await response.json();
    this.setState({
      consumPoint: data.body
    });
  }

  // 调用APP登陆
  loginApp() {
    window.location.href = "js://_?".concat(JSON.stringify({type: "login"}));
  }

  componentDidMount() {
    if( this.props.userToken ) {
      this.getConsumPoint();
    }
  }

  render() {
    return (
      <div className={s.luckydraw}>
        <div className={s.scratch} onTouchStart={this.scrollToTop}>
          <div className={!this.state.scratch ? s.scratch_top : s.hidden}>
          {
            this.props.userToken ?
            <button onClick={this.handleOnScratchPrize} className={s.joinBtn}>消耗{this.state.consumPoint.consume_point}积分,参与刮奖</button> :
            <button onClick={this.loginApp} className={s.joinBtn}>点击登陆,参与刮奖</button>
          }
          <div className={s.scratchTimes}><span>您已参与{this.state.consumPoint.frequcncy}次</span></div>
          </div>
          <div className={this.state.hideCanvas ? s.hidden : s.scratchCanvas} onTouchMove={this.scratchStart} onMouseUp={this.scratchStart} onTouchEnd={this.scratchEnd} onMouseUp={this.scratchEnd}>
            <Canvas {...this.state}/>
          </div>
          <div className={s.real_prize} style={this.state.hideCanvas ? {zIndex: '9'} : {zIndex: '-9'}}>
            <p style={{textAlign: 'center'}}>奖品神马都是骗人的!</p>
            <div className={s.luckydraw_btn}>
              <button onClick={this.handleOnScratchAgain}>再刮一次</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default ScratchArea;
