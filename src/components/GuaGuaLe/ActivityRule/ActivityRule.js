import React, {Component} from 'react';
import s from './ActivityRule.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(s)

class ActivityRule extends Component {

  state = {
    rules: this.props.data.text_rule || []
  }

  componentDidMount() {
    if( this.props.data.text_rule ) {
      setTimeout( ()=> {
        this.setState({
          rules: this.props.data.text_rule
        });
      }, 1000)
    }
  }


  render() {

    return (
      <div className={s.activity_rule}>
  			<div className={s.activity_rule_title} style={{backgroundImage: 'url(/gua/rule.png)'}}>
  				<p>活动规则</p>
  			</div>
  			<div className={s.activity_rule_content}>
          <span dangerouslySetInnerHTML={{__html: this.props.data.text_rule}} />
  			</div>
  			<p>说明：</p>
  			<p>{this.props.data.text_explain}</p>
  		</div>
    )

  }
}

export default ActivityRule;
