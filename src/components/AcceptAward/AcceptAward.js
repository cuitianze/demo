import React, { Component } from 'react';

const s = {};
s.body = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#eee',
  textAlign: 'center'
}
s.title = {
  marginTop: '100px',
  marginBottom: 0,
  fontSize: '14px',
  fontWeight: 'normal'
}
s.input = {
  width: '62.5%',
  height: '38px',
  marginTop: '35px',
  padding: '2px',
  border: '0',
  borderRadius: '5px'
}
s.btn = {
  width: '31.5%',
  height: '35px',
  marginTop: '25px',
  color: '#fff',
  backgroundColor: '#75c202',
  border: '0',
  borderRadius: '3px'
}
s.btnActive = {
  width: '31.5%',
  height: '35px',
  marginTop: '25px',
  color: '#fff',
  backgroundColor: '#75c202',
  border: '0',
  borderRadius: '3px',
  color: '62a300'
}

class AcceptAward extends Component {
  constructor(props) {
    super(props);
    this.getValidCode = this.getValidCode.bind(this);
    this.acceptAward = this.acceptAward.bind(this);
    this.toggleClick = this.toggleClick.bind(this);
  }

  state = {
    validCode: '',
    click: false,
    awardResult: ''
  }

  getValidCode(e) {
    if (e.target.value.length==4 || e.target.value.length==9) {
      this.setState({
        validCode: e.target.value + '-'
      });
    } else {
      this.setState({
        validCode: e.target.value
      });
    }
  }

  async acceptAward(e) {
    e.preventDefault();
    const realCode = this.state.validCode.replace(/\-/g, '');
    const response = await fetch("http://192.168.1.106:2692/award_activity.wn?param={%22id%22:1}");
    const resData = await response.json();
    this.setState({
      awardResult: resData.body
    });
  }

  toggleClick() {
    this.setState({
      click: !this.state.click
    });
  }

  render() {
    return (
      <div style={s.body}>
        <h1 style={s.title}>请输入兑奖码</h1>
        <form onSubmit={this.acceptAward}>
          <input value={this.state.validCode} type="tel" placeholder="请输入兑奖码" style={s.input} onChange={this.getValidCode} minLength="14" maxLength="14"/>
          <br/>
          <button type="submit" style={this.state.click ? s.btnActive : s.btn}
            onTouchStart={this.toggleClick}
            onTouchEnd={this.toggleClick}
          >提交</button>
        </form>
        <div >
          <p>{this.state.awardResult}</p>
          <hr/>
          <span>确定</span>
        </div>
      </div>
    )
  }
}

export default AcceptAward;
