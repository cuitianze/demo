import React, {Component} from 'react';
import s from './UserPrize.scss';
import withStyles from '../../../decorators/withStyles';

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
    if( !this.props.data ) return;
    this.setState({
      prizeInfos: this.props.data.winResponseList.slice(num, num+2)
    });
  }

  componentDidMount() {
    var num = 0;
    setTimeout( ()=> {
      this.getPrizeInfos(num);
    }, 100);
    setInterval( ()=> {
      console.log(num);
      if(num >= this.props.data.winResponseList && this.props.data.winResponseList.length) {
        num = 0;
      }
      this.getPrizeInfos(num);
      num+=2;
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
