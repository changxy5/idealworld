var canvas = null
export class Wave{
  constructor(amplitude,length,frequency,opacity){
    canvas = document.getElementById('myCanvas')
    this.cxt = canvas.getContext('2d')
    this.wave = {
      // 波浪属性配置
      y: canvas.height/2,
      // 越大越高
      amplitude : amplitude,
      // 越小越密
      length :length,
      frequency:frequency,
      opacity:opacity
    }
    this.increment = this.wave.frequency

  }
  update(){
    this.increment += this.wave.frequency
    this.draw()
  }
  draw(){
    // this.cxt.clearRect(0,0,canvas.width, canvas.height)
    this.cxt.beginPath()
    this.cxt.moveTo(0,canvas.height/2)

    for(let x=0;x<=canvas.width;x++){
      this.cxt.lineTo(x, this.wave.y + Math.sin(x/this.wave.length + this.increment)*this.wave.amplitude)
    }

    this.fill()
  }
  fill(){
    this.cxt.lineTo(canvas.width,canvas.height)
    this.cxt.lineTo(0,canvas.height)
    this.cxt.lineTo(0,canvas.height/2)
    this.cxt.fillStyle = `rgba(255,255,255,${this.wave.opacity})`
    this.cxt.fill()
  }
  animate(){
    drawSinWaves()
  }
}

export function drawSinWaves(){
  var wave1 = new Wave(45,50,0.03,0.5)
  var wave2 = new Wave(40,50,0.01,1)
  animation()
  function animation(){
    requestAnimationFrame(animation)
    canvas.getContext('2d').clearRect(0,0,canvas.width, canvas.height)
    wave1.update()
    wave2.update()
    // console.log('绘画完毕');
  }
}