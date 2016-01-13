import React, { Component } from 'react';
import s from './Title.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(s)
class Title extends Component {

  render() {
    return (
      <div className={s.tit}>
       <img src="/gua/title.png" alt="积分刮刮乐" className={s.tit_pic}/>
       <div className={s.countdown}>
         <span>刮奖活动倒计时</span>
         <p>15</p>
         <span className={s.semicolon}>:</span>
         <p>15</p>
         <span className={s.semicolon}>:</span>
         <p>15</p>
       </div>
      </div>
    );
  }

}

export default Title;
