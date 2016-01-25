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
  marginTop: '10%',
  marginBottom: 0,
  fontSize: '14px',
  fontWeight: 'normal'
}
s.input = {
  width: '62.5%',
  height: '38px',
  marginTop: '20px',
  padding: '2px 5px',
  border: '1px solid #ccc',
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
s.resetBtn = {
  width: '31.5%',
  height: '35px',
  marginTop: '10px',
  color: '#fff',
  backgroundColor: 'red',
  border: '0',
  borderRadius: '3px'
}
s.resultModal = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.25)'
}
s.resultWrap = {
  width: '62.5%',
  margin: '40% auto',
  backgroundColor: '#fff',
  borderRadius: '5px'
}

class AcceptAward extends Component {
  constructor(props) {
    super(props);
    this.getValidCode = this.getValidCode.bind(this);
    this.getAward = this.getAward.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  state = {
    validCode: '',
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

  async getAward(e) {
    e.preventDefault();
    const realCode = this.state.validCode.replace(/\-/g, '');
    const response = await fetch("http://192.168.1.106:2692/get_award.wn?param=" + JSON.stringify({code: realCode}));
    const resData = await response.json();
    if(resData) {
      this.setState({
        awardResult: resData.message
      });
    }
  }

  closeModal() {
    this.setState({
      awardResult: ''
    });
  }

  render() {
    return (
      <div style={s.body}>
        <h1 style={s.title}>请输入兑奖码</h1>
        <form onSubmit={this.getAward}>
          <input value={this.state.validCode} type="tel" placeholder="请输入兑奖码" style={s.input} onChange={this.getValidCode} minLength="14" maxLength="14" required/>
          <br/>
          <button type="submit" style={s.btn}>提交</button>
          <br/>
          <button type="reset" style={s.resetBtn}>重置</button>
        </form>
        <div style={!this.state.awardResult ? {display: 'none'} : s.resultModal}>
          <div style={s.resultWrap}>
            <p style={{padding: '10px'}}>{this.state.awardResult}</p>
            <hr/>
            <span style={{display: 'inline-block', width: '100%', padding: '10px'}} onClick={this.closeModal}>确定</span>
          </div>
        </div>
      </div>
    )
  }
}

export default AcceptAward;
