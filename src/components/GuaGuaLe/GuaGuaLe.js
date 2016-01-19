import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import s from './GuaGuaLe.scss';
import withStyles from '../../decorators/withStyles';

// 抽奖活动头部标题
import Title from './Title';
// 刮奖区域
import ScratchArea from './ScratchArea';
// 奖品信息
import PrizeInfo from './PrizeInfo';
// 中奖信息
import UserPrize from './UserPrize';
// 活动规则
import ActivityRule from './ActivityRule';
// 抽奖活动API统一路径前缀
const remoteApiUrl = 'http://192.168.1.106:2692';
// 抽奖活动信息API
const activityApi = "/award_activity.wn";
@withStyles(s)

class GuaGuaLe extends Component {

  // 从上级会得到 {isLogin: token} {activityId: id}
  state = {
    activityData: '',
    isLogin: this.props.isLogin,
    activityId: this.props.activityId,
    notFound: false
  }

  constructor(props) {
    super(props);
    this.getAwardActivity = this.getAwardActivity.bind(this);
  }

  // 获取活动信息
  async getAwardActivity() {
    const response = await fetch( remoteApiUrl + activityApi + '?param=' + JSON.stringify({id: this.props.activityId}) );
    const responseData = await response.json();
    if( responseData.code == 0 ) {
      this.setState({
        notFound: true,
        message: responseData.message
      });
    }
    this.setState({
      activityData: responseData.body
    });
  }

  componentDidMount() {
    this.getAwardActivity();
  }

  render() {
    return (
      <div>
      {
        this.state.notFound ?
        <div style={{textAlign: 'center'}}> { this.state.message } </div> :
        <div>
          <Title data={this.state.activityData}/>
          <ScratchArea data={this.state.activityData} remoteApiUrl={remoteApiUrl} url={"/draw_award.wn"} isLogin={this.state.isLogin} activityId={this.state.activityId}/>
          <div className={s.prizeWrap}>
            <PrizeInfo data={this.state.activityData}/>
            <UserPrize data={this.state.activityData}/>
            <ActivityRule data={this.state.activityData}/>
          </div>
        </div>
      }
      </div>
    );
  }

}

export default GuaGuaLe;
