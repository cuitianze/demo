import React, {Component} from 'react';
import s from './UserPrize.scss';
import withStyles from '../../../decorators/withStyles';

const prizeInfo = [
  {
    phone: 1,
    prize: 'iphone 6S'
  },
  {
    phone: 2,
    prize: '特等奖是我的'
  },
  {
    phone: 3,
    prize: '奖品在哪里呢'
  },
    {
    phone: 4,
    prize: 'iphone 6S'
  },
  {
    phone: 5,
    prize: '特等奖是我的'
  },
  {
    phone: 6,
    prize: '奖品在哪里呢'
  },
    {
    phone: 7,
    prize: 'iphone 6S'
  },
  {
    phone: 8,
    prize: '特等奖是我的'
  },
  {
    phone: 9,
    prize: '奖品在哪里呢'
  }
]


let prizeInfos = [];

@withStyles(s)

class UserPrize extends Component {
  state = {
    prizeInfos: []
  }
  constructor(props) {
    super(props);
    this.getPrizeInfos = this.getPrizeInfos.bind(this);
  }
  getPrizeInfos(num) {
    this.setState({
      prizeInfos: prizeInfo.slice(num, num+2)
    })
  }
  componentDidMount() {
    var num = 0;
    this.getPrizeInfos(num);
    setInterval(()=> {
      // console.log(this.state.prizeInfos);
      if(num >= prizeInfo.length) {
        num = 0;
      }
      this.getPrizeInfos(num);
      num+=2;
    }, 5000)
  }
  render() {
    return (
      <div>
        <div className={s.user_prize_title}>
  				<p>中奖信息</p>
  			</div>
  			<div className={s.user_prize_content}>
  				<ul>
            {
              /*
  					<li><span>15810972188</span><span>一等奖：iPhone 6SG 16G</span></li>
  					<li><span>15810972188</span><span>一等奖：iPhone 6SG 16G</span></li>
              */
            }
            {this.state.prizeInfos.map((prize, index) => {
              return (
      					<li key={prize.phone}><span>{prize.phone}</span><span>{prize.prize}</span></li>
              )
            })}
  				</ul>
  			</div>
      </div>
    )
  }
}

export default UserPrize;
