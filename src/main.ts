// @ts-nocheck
import { drawBG } from './drawBG';
import { Square } from './Square';
import {
    getOffsetCoords,
    cursorInRect,
    getMouseCoords,
} from './utils';

// Функциональная нотация hsl() выражает цвет в цветовом пространстве sRGB.
// тон, насыщенность светлота (hue, saturation, lightness)
let hsl = (h, s, l) => `hsl(${h},${s}%,${l}%)`

// Берём 2 канваса БГ и прозрачный с фигурами
// задаём им размер
let canvasBG = document.getElementById('mycanvas')
let canvas2 = document.getElementById('mycanvas2')
let ctx = canvasBG.getContext('2d')
let ctx2 = canvas2.getContext('2d')
let w = canvasBG.width = canvas2.width = window.innerWidth * 0.9;
let h = canvasBG.height = canvas2.height = window.innerHeight * 0.9;

canvasBG.style.backgroundColor = 'transparent'
canvas2.style.backgroundColor = 'transparent'

ctx.lineWidth = 2                   // Вроде юзлес
// Текст внутри канвы
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'
ctx.font = '10px Arial'

drawBG(ctx2, w, h)


// Создаётся массив кубов
let prtcls = new Array(10).fill().map(() => new Square(Math.random() * w, Math.random() * h, 60, hsl(Math.floor(Math.random() * 360), 100, 50)))


// =============================================================
//                          HANDLERS
// =============================================================


window.addEventListener('resize', () => {
    w = canvasBG.width = canvas2.width = window.innerWidth * 0.9;
    h = canvasBG.height = canvas2.height = window.innerHeight * 0.9;
    drawBG(ctx2, w, h)
})

// Обработка клика, срабатывает при отпусканни кнопки мыши
// не используется
// canvasBG.addEventListener('click', e => {
//     let mouse = getMouseCoords(canvasBG, e)
// })

canvasBG.addEventListener('mousemove', e => {
    let mouse = getMouseCoords(canvasBG, e)

    let prtclsArr = prtcls.map(e => cursorInRect(mouse.x, mouse.y, e.x, e.y, e.edge, e.edge))
    !prtclsArr.every(e => e === false) ? canvasBG.classList.add('pointer') : canvasBG.classList.remove('pointer')

    prtcls.forEach(e => {

        if (e.selected) {
            e.x = mouse.x - e.offset.x
            e.y = mouse.y - e.offset.y
        }

        cursorInRect(mouse.x, mouse.y, e.x, e.y, e.edge, e.edge) ?
            e.active != true ? e.activate() : false
            : e.active = false
    })
})


canvasBG.addEventListener('mousedown', e => {
    let mouse = getMouseCoords(canvasBG, e)
    prtcls.forEach(e => {
        if (cursorInRect(mouse.x, mouse.y, e.x, e.y, e.edge, e.edge)) {
            e.selected = true
            e.offset = getOffsetCoords(mouse, e)
        } else {
            e.selected = false
        }
    })
})

// Срабатывает на mouseup в любой части канваса
canvasBG.addEventListener('mouseup', e => {
    prtcls.forEach(e => e.selected = false)
})

let addBtn = document.getElementById('add_btn');
addBtn.addEventListener('click', e => {
    const newSquare = new Square(Math.random() * w, Math.random() * h, 60, hsl(Math.floor(Math.random() * 360), 100, 50));
    prtcls.push(newSquare)
})

// =============================================================
//                          MAIN LOOP
// =============================================================

function animate() {
    ctx.clearRect(0, 0, w, ctx.canvas.height)
    ctx.fillStyle = 'white'
    prtcls.forEach(e => {
        e.draw(ctx)
    })
    window.requestAnimationFrame(animate)
}

animate()
