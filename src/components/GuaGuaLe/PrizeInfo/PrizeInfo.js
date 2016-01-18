import React, { Component } from 'react';
import fetch from '../../../core/fetch';
import s from './PrizeInfo.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(s)
class PrizeInfo extends Component {

  render() {
    return (
      <div>
        <div className={s.prizeTitle}>
          <img src="/gua/prize.png"/>
        </div>
        <div className={s.prizecontent}>
          {this.props.data.awardResponseList && this.props.data.awardResponseList.map( (item, index)=> {
            return (
              <div key={index}>
                <img src={item.img}/>
                <p>{item.name} {item.unit}</p>
              </div>
            )
          })}
        </div>
      </div>
    );
  }

}

export default PrizeInfo;
