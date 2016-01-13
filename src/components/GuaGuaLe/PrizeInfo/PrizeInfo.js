import React, { Component } from 'react';
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
          <ul>
            <li>
              <div>
                <img src="/gua/iphone.png"/>
                <p>iPhone 6S 16G 1部</p>
              </div>
              <div>
                <img src="/gua/iphone.png"/>
                <p>iPhone 6S 16G 1部</p>
              </div>
              <div>
                <img src="/gua/iphone.png"/>
                <p>iPhone 6S 16G 1部</p>
              </div>
            </li>
            <li>
              <div><img src="/gua/iphone.png"/></div>
              <div><img src="/gua/iphone.png"/></div>
              <div><img src="/gua/iphone.png"/></div>
            </li>
          </ul>
        </div>
      </div>
    );
  }

}

export default PrizeInfo;
