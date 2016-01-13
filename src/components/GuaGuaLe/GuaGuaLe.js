/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import s from './GuaGuaLe.scss';
import withStyles from '../../decorators/withStyles';

import Title from './Title';
import ScratchArea from './ScratchArea';
import PrizeInfo from './PrizeInfo';
import UserPrize from './UserPrize';
import ActivityRule from './ActivityRule';

const title = '刮奖';

@withStyles(s)
class GuaGuaLe extends Component {

  // static contextTypes = {
  //   onSetTitle: PropTypes.func.isRequired,
  //   onPageNotFound: PropTypes.func.isRequired,
  // };
  //
  componentWillMount() {
    // this.context.onSetTitle(title);
    // this.context.onPageNotFound();
  }

  componentDidMount() {
    var r = ReactDOM.findDOMNode(this);
    console.log(r);
  }

  render() {
    return (
      <div>
        <Title/>
        <ScratchArea/>
        <div className={s.prizeWrap}>
          <PrizeInfo/>
          <UserPrize/>
          <ActivityRule/>
        </div>
      </div>
    );
  }

}

export default GuaGuaLe;
