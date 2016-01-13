import React, {Component} from 'react';
import s from './UserPrize.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(s)

class UserPrize extends Component {
  render() {
    return (
      <div>
        <div className={s.user_prize_title}>
  				<p>中奖信息</p>
  			</div>
  			<div className={s.user_prize_content}>
  				<ul>
  					<li><span>15810972188</span><span>一等奖：iPhone 6SG 16G</span></li>
  					<li><span>15810972188</span><span>一等奖：iPhone 6SG 16G</span></li>
  				</ul>
  			</div>
      </div>
    )
  }
}

export default UserPrize;
