import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const PropTypes = React.PropTypes;

class Canvas extends Component {

  static propTypes = {
    brushColor: PropTypes.string,
    // lineWidth: PropTypes.number,
    canvasStyle: PropTypes.shape({
      backgroundColor: PropTypes.string,
      cursor: PropTypes.string
    }),
    clear: PropTypes.bool
  };

  static defaultProps = {
    brushColor: '#fff',
    // lineWidth: 20,
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
    X: 0,
    Y: 0
  }

  constructor(props) {
    super(props);
    this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
    this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
    this.draw = this.draw.bind(this);
    this.drawScratchImage = this.drawScratchImage.bind(this);
    this.resetCanvas = this.resetCanvas.bind(this);
    this.getCircleCenter = this.getCircleCenter.bind(this);
  }

  componentDidMount() {
    let canvas = ReactDOM.findDOMNode(this);

    canvas.style.width = '100%';
    canvas.style.height = '100%';
    console.log(canvas.offsetWidth);
    console.log(canvas.offsetHeight);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    console.log(canvas.height);

    let ctx = canvas.getContext('2d'); // 访问绘画上下文

    this.setState({
      canvas: canvas,
      context: ctx
    });
    this.drawScratchImage();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.clear) {
      this.resetCanvas();
    }
  }

  drawScratchImage() {
    var img = new Image; // 声明图片
    img.onload = start; // 图片加载完执行绘制遮罩图片函数
    img.src = '/gua/scratch-area.png';
    // 绘制遮罩图片函数
    let self = this;
    function start() {
      self.state.context.globalCompositeOperation = 'copy'; // canvas设置全局绘制方式
      self.state.context.drawImage(this, 0, 0, self.state.canvas.width, self.state.canvas.height); // 绘制遮罩图片
      self.state.context.globalCompositeOperation = 'destination-out'; // canvas设置全局绘制方式
    }
  }

  getCircleCenter(e) {
    let rect = this.state.canvas.getBoundingClientRect();
    this.setState({
      X: e.targetTouches[0].pageX - rect.left,
      Y: e.targetTouches[0].pageY - rect.top
    });
  }

  handleOnMouseDown(e) {
    this.setState({
      drawing: true
    });
    this.getCircleCenter(e);
    this.draw(this.state.X, this.state.Y);
  }

  handleOnMouseMove(e) {
    e.preventDefault();
    if(this.state.drawing) {
      this.getCircleCenter(e);
      this.draw(this.state.X, this.state.Y);
    }
  }

  handleOnMouseUp(e) {
    this.setState({
      drawing: false
    })
  }

  draw(X, Y) {
    this.state.context.beginPath();
    this.state.context.arc(X, Y, 15, 0, Math.PI*2);
    this.state.context.fill();
  }

  resetCanvas() {
    console.log('lalala');
    let width = this.state.context.canvas.width;
    let height = this.state.context.canvas.height;
    this.drawScratchImage();
  }

  getDefultStyle() {
    // return {
    //   backgroundImage: 'url(/gua/scratch-bottom.png)',
    //   backgroundSize: '100% 100%'
    // }
  }

  canvasStyle() {
    let defaults = this.getDefultStyle();
    let custom = this.props.canvasStyle;
    return Object.assign({}, defaults);
  }

  render() {
    return (
      <canvas style = {this.canvasStyle()}
        onMouseDown = {this.handleOnMouseDown}
        onTouchStart = {this.handleOnMouseDown}
        onMouseMove = {this.handleOnMouseMove}
        onTouchMove = {this.handleOnMouseMove}
        onMouseUp = {this.handleonMouseUp}
        onTouchEnd = {this.handleonMouseUp}
      ></canvas>
    )
  }
}

export default Canvas;
