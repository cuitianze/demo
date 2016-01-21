import React, {Component} from 'react';
import s from './UserPrize.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(s)

class UserPrize extends Component {

  state = {
    winResponseList: [],
    prizeInfos: []
  }

  constructor(props) {
    super(props);
    this.getPrizeInfos = this.getPrizeInfos.bind(this);
  }

  getPrizeInfos(num) {
    if(this.state.winResponseList.length) {
      this.setState({
        prizeInfos: this.state.winResponseList.slice(num, num+2)
      });
    }
  }

  componentDidMount() {
    setTimeout( ()=> {
      this.setState({
        winResponseList: this.props.data.winResponseList
      });
    }, 1000)
    var num = 0;
    setTimeout( ()=> {
      this.getPrizeInfos(num);
    }, 1000);
    setInterval( ()=> {
      if(this.state.winResponseList) {
        num+=2;
        if(num >= this.state.winResponseList.length) {
          num = 0;
        }
        this.getPrizeInfos(num);
      }
    }, 5000);
  }

  render() {
    return (
      <div>
        <div className={s.user_prize_title}>
  				<p>中奖信息</p>
  			</div>
  			<div className={s.user_prize_content}>
  				<ul>
            {this.state.prizeInfos.map((prize, index) => {
              return (
      					<li key={prize.record_id}><span>{prize.phone}</span><span>{prize.award_name}</span></li>
              )
            })}
  				</ul>
  			</div>
      </div>
    )
  }

}

export default UserPrize;
