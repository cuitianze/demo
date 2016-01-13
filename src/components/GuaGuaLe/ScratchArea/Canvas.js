import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const PropTypes = React.PropTypes;

class Canvas extends Component {

  static propTypes = {
    brushColor: PropTypes.string,
    lineWidth: PropTypes.number,
    canvasStyle: PropTypes.shape({
      backgroundColor: PropTypes.string,
      cursor: PropTypes.string
    }),
    clear: PropTypes.bool
  };

  static defaultProps = {
    brushColor: '#000000',
    lineWidth: 20,
    canvasStyle: {
      backgroundColor: '#FFFFFF',
      cursor: 'pointer'
    },
    clear: false
  };

  state = {
    canvas: null,
    context: null,
    drawing: false,
    lastX: 0,
    lastY: 0
  }

  constructor(props) {
    super(props);
    this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
    this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
    this.draw = this.draw.bind(this);
  }

  componentDidMount() {
    let canvas = ReactDOM.findDOMNode(this);

    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let ctx = canvas.getContext('2d'); // 访问绘画上下文
    ctx.globalCompositeOperation = 'destination-out'; // canvas设置全局绘制方式

    this.setState({
      canvas: canvas,
      context: ctx
    });


    // var isDown = false; // 按下状态
    // var radius = 15; // 定义半径
    // var pi2 = Math.PI * 2; // 定义绘制圆终点
    // var img = new Image; // 声明图片
    // img.onload = start; // 图片加载完执行绘制遮罩图片函数
    // img.src = 'http://pic.baike.soso.com/p/20090711/bki-20090711100310-2024468547.jpg';
    // // 绘制遮罩图片函数
    // function start() {
    //   ctx.drawImage(this, 0, 0, canvas.width, canvas.height); // 绘制遮罩图片
    //   ctx.globalCompositeOperation = 'destination-out'; // canvas设置全局绘制方式
    // }
  }

  handleOnMouseDown(e) {
    console.log(this);
    let rect = this.state.canvas.getBoundingClientRect();
    this.state.context.beginPath();
    this.setState({
      lastX: e.targetTouches[0].pageX - rect.left,
      lastY: e.targetTouches[0].pageY - rect.top,
      drawing: true
    });
  }

  handleOnMouseMove(e) {
    e.preventDefault();
    if(this.state.drawing) {
      let rect = this.state.canvas.getBoundingClientRect();
      let lastX = this.state.lastX;
      let lastY = this.state.lastY;
      let currentX;
      let currentY;
      currentX = e.targetTouches[0].pageX - rect.left;
      currentY = e.targetTouches[0].pageY - rect.top;
      this.draw(lastX, lastY, currentX, currentY);
      this.setState({
        lastX: currentX,
        lastY: currentY
      })
    }
  }

  draw(lX, lY, cX, cY) {
    this.state.context.strokeStyle = this.props.brushColor;
    this.state.context.lineWidth = this.props.lineWidth;
    this.state.context.moveTo(lX,lY);
    this.state.context.lineTo(cX,cY);
    this.state.context.stroke();
  }
  // 获取圆心
  // getXY(e) {
  //   var rect = canvas.getBoundingClientRect();
  //   return {
  //     x: e.clientX - rect.left,
  //     y: e.clientY - rect.top
  //   }
  // }
  // // 处理鼠标按下
  // handleTouchStart(e) {
  //   // this.isDown = true;
  //   console.log(this);
  //   var pos = this.getXY(e);
  //   this.erase(pos.x, pos.y);
  // }
  // // 处理鼠标移动
  // handleTouchMove(e) {
  //   if(!isDown) return;
  //   var pos = getXY(e);
  //   erase(pos.x, pos.y);
  // }
  // // 处理鼠标抬起
  // handleTouchEnd(e) {
  //   isDown = false;
  // }
  // // 绘制圆形(即"橡皮擦")
  // erase(x, y) {
  //   ctx.beginPath(); // 新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
  //   ctx.arc(x, y, radius, 0, pi2); // 画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从0开始到2*PI*R结束
  //   ctx.fill(); // 通过填充路径的内容区域生成实心的图形。
  // }

  render() {
    return (
      <canvas onTouchStart={this.handleOnMouseDown} onTouchMove={this.handleOnMouseMove}></canvas>
    )
  }
}

export default Canvas;
