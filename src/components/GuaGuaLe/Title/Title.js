import React, { Component } from 'react';
import s from './Title.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(s)
class Title extends Component {

  constructor() {
    super();
    this.getRemainTime = this.getRemainTime.bind(this);
  }

  state = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  }

  // 计算倒计时
  getRemainTime() {
      // 当前时间
      const currentTime = Date.now();
      // 服务端活动截止时间
      const endTime = this.props.data.end_time ? this.props.data.end_time : Date.now();
      // 倒计时
      const remainTime = endTime - currentTime;
      // Days
      const remainDays = Math.floor(remainTime/(1000*60*60*24));
      // Hours
      const remainS1 = remainTime%(1000*60*60*24);
      let remainHours = Math.floor(remainS1/(1000*60*60));
      if( remainHours.toString().length < 2 ) remainHours = '0' + remainHours;
      // Minutes
      const remainS2 = remainS1%(1000*60*60);
      let remainMinutes = Math.floor(remainS2/(1000*60));
      if( remainMinutes.toString().length < 2 ) remainMinutes = '0' + remainMinutes;
      // Seconds
      const remainS3 = remainS2%(1000*60);
      let remainSeconds = Math.floor(remainS3/(1000));
      if(remainSeconds.toString().length<2) remainSeconds = '0' + remainSeconds;

      // 如果取不id活动，则return
      // if ( !this.props.data ) return;

      this.setState({
        days: remainDays,
        hours: remainHours,
        minutes: remainMinutes,
        seconds: remainSeconds
      });

      setTimeout(()=> {
        this.getRemainTime()
      }, 1000)
  }

  componentDidMount() {
    this.getRemainTime();
  }

  render() {
    return (
      <div className={s.tit}>
       <img src={this.props.data.img_title ? this.props.data.img_title : "/gua/title.png"} className={s.tit_pic}/>
       <div className={s.countdown}>
         <span>刮奖活动倒计时</span>
         <p>{this.state.days}</p>
         <span className={s.semicolon}>:</span>
         <p>{this.state.hours}</p>
         <span className={s.semicolon}>:</span>
         <p>{this.state.minutes}</p>
         <span className={s.semicolon}>:</span>
         <p>{this.state.seconds}</p>
       </div>
      </div>
    );
  }

}

export default Title;
