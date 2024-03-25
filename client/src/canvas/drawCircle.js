//  创建一个球类
class Circle{
//   构造坐标
  constructor(x,y,dx,dy,r,colorStyle='#000'){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.r=r;
    this.maxR=20; // 最大半径,给一个定值吧唉
    this.minR=r;  // 最小半径，就是正常半径啊啊 
    this.distance=30;   // 鼠标触发形状变化的距离
    this.canvas=get('cirCanvas');
    this.colorStyle=colorStyle;
    this.opacity = 0; // 令小球初始透明度为0，随着鼠标移动逐渐变大
  }
  // 设置小球的颜色
  setColorStyle = function(colorStyle){
    this.colorStyle=colorStyle
  }
//   draw方法，在指定画布画出一个小球
  draw = function(canvas = get('cirCanvas')){
    this.canvas=canvas
    this.cxt = this.canvas.getContext('2d')
    this.cxt.beginPath()
    this.cxt.arc(this.x,this.y,this.r,0,Math.PI*2,false)
    this.cxt.fillStyle=this.colorStyle
    this.cxt.fill()
  }

    // X轴移动引擎
    moveX = function(gravity){
        // 屏幕边缘碰撞检测
        if(this.x+this.r>this.canvas.width || this.x-this.r<0){
            // 反弹
            this.dx=-this.dx
        }
        this.x+=this.dx;
        }

    // Y轴移动引擎
    moveY = function(gravity){
        // 屏幕边缘碰撞检测
        if(this.y+this.r>this.canvas.height || this.y-this.r<0){
            this.dy=-this.dy
        }
        this.y+=this.dy
        }

    // 随鼠标缩放
    resize = function(){
        // 鼠标接近时半径增大
        if(mouse.x>0&&mouse.y>0){
            if(mouse.x-this.x<this.distance && mouse.x-this.x>-this.distance&&mouse.y-this.y<this.distance && mouse.y-this.y>-this.distance){
                // 限定最大半径
                if(this.r<=this.maxR)
                {this.r+=1}
            }
            else if(this.r>=this.minR){
                // 鼠标远离时半径减小
                this.r-=1
            }
        }
    }

    // 随鼠标改变不透明度
    changeOpacity = function(){
        // 检测鼠标与球体的位置关系
        // 靠近时透明度增大
        if(mouse.x>0&&mouse.y>0){
            if(mouse.x-this.x<this.distance && mouse.x-this.x>-this.distance&&mouse.y-this.y<this.distance && mouse.y-this.y>-this.distance && this.opacity<=1){
                // console.log('发生了碰撞，等待碰撞语句')
                this.opacity+=0.04
        // 离开时透明度降低至0
            }else if(this.opacity>=0){
                this.opacity -=0.04
                // 因为js的浮点数本身的问题，直接减去一个浮点数可能会令结果=负数
                // 如果得到了负数，则将其视作0
                this.opacity = Math.max(0,this.opacity)
            }
        }
        // draw方法也要变一下
        this.draw = (canvas = this.canvas) => {
            this.canvas=canvas
            this.cxt = this.canvas.getContext('2d')
            this.cxt.beginPath()
            this.cxt.arc(this.x,this.y,this.r,0,Math.PI*2,false)
            this.cxt.fillStyle=this.colorStyle
            this.cxt.strokeStyle = this.colorStyle

            this.cxt.save()
            // 透明度，用save和restore让其仅对fill生效
            this.cxt.globalAlpha = this.opacity
            this.cxt.fill()
            this.cxt.restore()
            this.cxt.globalAlpha = 0.6
            this.cxt.stroke()
            
        }
    }

    // update方法，默认无大小、重力、摩擦力
    update = function(resize=false,collision=false,circleArray=[],opacity=false){
        this.moveX()
        this.moveY()
        if(resize){this.resize()}
        if(collision){this.collisionDetect(circleArray)}
        if(opacity){this.changeOpacity()}
        this.draw(this.canvas)
    }

}

function get(id){
  return document.getElementById(id)
}

// 新建一个全局的鼠标对象，可以被update调用
var mouse = {x:undefined,y:undefined}
// 一个好看的颜色组
var colorArray=['#4c5870','#ebedec','#a2a9af'];
// ['#C5E99B','#C5E99B','#548687','#56445D'];


// 用事件监听器让小球跟随鼠标移动，鼠标移动到小球附近时小球变大，否则变小
export function mouseMovingCircles(canvasID='cirCanvas'){
    var canvas=get(canvasID)

    // 为canvas添加事件监听器
    canvas.addEventListener('mousemove',(event)=>{
        // 获取鼠标相对于元素的坐标，用offset
        mouse.x = event.offsetX
        mouse.y = event.offsetY
    })

    var circleArray=[];

    // 构造100个随机小球的数组
    for (let i=0;i<20;i++){
        // 小球位置，随机出现在屏幕内任何地方，
        // ******要减去半径以防卡在屏幕边缘******
        var x=Math.random()*(canvas.width-2*r)+r; 
        var y= Math.random()*(canvas.height-2*r)+r;
        var dx=(Math.random()-0.5)*4; // 小球速度，随机速度随机方向
        var dy=(Math.random()-0.5)*4;
        var r =Math.floor(Math.random()*8+10); // 小球半径,3-7之间的随机数
        circleArray.push(new Circle(x,y,dx,dy,r))
        circleArray[i].setColorStyle(colorArray[Math.floor(Math.random()*colorArray.length)])
        circleArray[i].draw()
        
    }
    // 让一堆小球动起来
    var animation=()=>{
        requestAnimationFrame(animation)
        canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height)
        for(let i=0;i<circleArray.length;i++){
            // console.log(circleArray[i]);
            circleArray[i].update(true)
        }
    }
    animation()
}
