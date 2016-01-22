import React, {Component} from 'react';
import ReactDOM from 'react-dom';
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
    var prizeListsWrap = document.getElementById('prizeListsWrap');
    var prizeLists = document.getElementById('prizeLists');
    setTimeout( ()=> {
      this.setState({
        winResponseList: this.props.data.winResponseList
      });
    }, 1000)
    setInterval( ()=> {
      if (prizeLists.offsetHeight - prizeListsWrap.scrollTop <= 78) {
        prizeListsWrap.scrollTop = 0;
      } else {
        prizeListsWrap.scrollTop ++;
      }
    }, 100)
  }

  render() {
    return (
      <div>
        <div className={s.user_prize_title} style={{backgroundImage: 'url(/gua/info.png)'}}>
  				<p>中奖信息</p>
  			</div>
  			<div id="prizeListsWrap" className={s.user_prize_content} style={{height: '78px', overflow: 'hidden'}}>
  				<ul id="prizeLists">
            {this.state.winResponseList.map((prize, index) => {
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
