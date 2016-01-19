import React, {Component} from 'react';
import s from './ActivityRule.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(s)

class ActivityRule extends Component {

  state = {
    rules: this.props.data.text_rule || []
  }

  componentDidMount() {
    setTimeout( ()=> {
      this.setState({
        rules: this.props.data.text_rule
      });
      console.log(this.state.rules)
    }, 1000)
  }


  render() {

    return (
      <div className={s.activity_rule}>
  			<div className={s.activity_rule_title}>
  				<p>活动规则</p>
  			</div>
  			<div className={s.activity_rule_content}>
          <span dangerouslySetInnerHTML={{__html: this.props.data.text_rule}} />
          {/*
  				<ul>
  					<li>1.本次活动最终解释权归微农网络技术有限公司所有 </li>
  					<li>2.本次活动最终解释权归微农网络技术有限公司所有 </li>
  				</ul>
          */}
  			</div>
  			<p>说明：</p>
  			<p>本次活动最终解释权归北京微农网络技术有限公司所有</p>
  		</div>
    )

  }
}

export default ActivityRule;
