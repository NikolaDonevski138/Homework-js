import { cow } from '../public/assets/cow'

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement

let width: number = canvas.offsetWidth
let height: number = canvas.offsetHeight

const ctx: CanvasRenderingContext2D = canvas.getContext("2d")

function onResize(): void {
  width = canvas.offsetWidth
  height = canvas.offsetHeight
  if (window.devicePixelRatio > 1) {
    canvas.width = canvas.clientWidth * 2;
    canvas.height = canvas.clientHeight * 2;
    ctx.scale(2, 2);
  } else {
    canvas.width = width;
    canvas.height = height;
  }
}
window.addEventListener("resize", onResize)
onResize()


let PERSPECTIVE = width * 0.8
let PROJECTION_CENTER_X = width / 2
let PROJECTION_CENTER_Y = height / 2
const dots: Dot[] = []

class Dot {
  x: number
  y: number
  z: number
  radius: number

  xProjected: number
  yProjected: number
  scaleProjected: number

  constructor(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
    this.radius = 0.2

    this.xProjected = 0
    this.yProjected = 0
    this.scaleProjected = 0
  }

  project(): void {
    this.scaleProjected = (PERSPECTIVE * 50) / (PERSPECTIVE + this.z)
    this.xProjected = (this.x * this.scaleProjected) + PROJECTION_CENTER_X
    this.yProjected = (this.y * this.scaleProjected) + PROJECTION_CENTER_Y
  }

  draw(): void {
    this.project()
    ctx.globalAlpha = Math.abs(1 - this.z / width)
    let drawX = this.xProjected - this.radius
    let drawY = this.yProjected - this.radius
    let drawW = this.radius * 2 * this.scaleProjected
    let drawH = this.radius * 2 * this.scaleProjected
    ctx.fillRect(drawX, drawY, drawW, drawH)
  }
}

function getVertices(OBJ: string): Array<Array<number>> {
  let verMatches: RegExpMatchArray = cow.match(/^v( -?\d+(\.\d+)?){3}$/gm)
  let vertices = verMatches.map(cvm => {
    let verticesString = cvm.split(" ")
    verticesString.shift()
    return verticesString
  }).map(verArr => verArr.map(ver => parseFloat(ver)))
  return vertices
}

getVertices(cow).forEach(vertex => {
  dots.push(new Dot(vertex[0], vertex[1], vertex[2]))
})


// for (let i = 0; i < 400; i++) {
//   dots.push(new Dot())
// }

function render(): void {
  ctx.clearRect(0, 0, width, height)

  dots.forEach(dot => dot.draw());

  window.requestAnimationFrame(render)
}

render()
