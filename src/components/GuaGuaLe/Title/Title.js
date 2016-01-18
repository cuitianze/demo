import React, { Component } from 'react';
import s from './Title.scss';
import withStyles from '../../../decorators/withStyles';

const endTime = new Date("2016-01-19");

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

  getRemainTime() {
    const currentTime = new Date();
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
       <img src="/gua/title.png" alt="积分刮刮乐" className={s.tit_pic}/>
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
