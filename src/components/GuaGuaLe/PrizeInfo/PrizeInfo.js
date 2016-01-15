import React, { Component } from 'react';
import fetch from '../../../core/fetch';
import s from './PrizeInfo.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(s)
class PrizeInfo extends Component {

  state = {
    prizeInfo: this.props.prizeInfo
  }

  constructor(props) {
    super(props);
    this.handleOnChangeData = this.handleOnChangeData.bind(this);
  }

  async handleOnChangeData() {
    const response = await fetch('http://api.lib.wn518.com/blogs/list?wn=123', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': 'wn518'
      },
      method: 'POST',
      body: JSON.stringify({
        keywords: 'test',
        numsPerPage: 4
      })
    });
    const data = await response.json();
    console.log(data.data, 'data')
    this.setState({
      prizeInfo: data.data
    });
  }

  render() {
    var prizes = [1,2,3,4,5,6,7,8];
    var newPrizeLi = [];
    for (var i = 0; i < prizes.length; i+=3) {
      newPrizeLi.push(prizes.slice(i, i+3));
    };
    for(var i = 0; i < newPrizeLi.length; i++) {
      var newRow = true;
      for(let a = 0; a < (3 - newPrizeLi[i].length % 3); a++ ) {
        if(newRow && newPrizeLi[i].length < 3) {
         newPrizeLi[i].push(1);          
        }
        newRow = false;
      }      
    }
    console.log(newPrizeLi, 'newArr');
    return (
      <div>
        <div className={s.prizeTitle}>
          <img src="/gua/prize.png"/>
        </div>
        <div className={s.prizecontent}>
          <ul>
            {newPrizeLi.map( (item, index)=> {
              return (
               <li key={index}>
                {item.map( (xitem, index)=> {
                  return (
                    <div key={index}>
                      <img src="/gua/iphone.png"/>
                      <p>iPhone 6S 16G 1部</p>
                    </div>
                  )
                })}
              </li>      
              )
            })}

          </ul>
          <button onClick={this.handleOnChangeData}>click</button>
        </div>
      </div>
    );
  }

}

export default PrizeInfo;
