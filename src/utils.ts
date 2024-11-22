// Функция читает положение мыши над канвасом
export let getMouseCoords = (canvas: any, event: any) => {
    let canvasCoords = canvas.getBoundingClientRect()  // Получаем предоставляющий информацию о размере элемента RECT и его положении относительно области просмотра.

    return {
        x: event.pageX - canvasCoords.left,
        y: event.pageY - canvasCoords.top
    }
}

// Функция читает положение клика (нажатия) кнопки мыши относительно квадрата
// В какой точке квадрата нажали
export let getOffsetCoords = (mouse: any, rect: any) => {
    return {
        x: mouse.x - rect.x,
        y: mouse.y - rect.y
    }
}

// Как будто заполнять рандомными числами излишне USELESS
// let arr = new Array(40).fill('empty').map(() => Math.floor(Math.random() * 100)) // Массив из 40 рандомных елементов до 100

// Проверяет, находится ли курсор в квадрате, работает всегда на всех квадратах.
export  let cursorInRect = (
    mouseX: number, 
    mouseY: number, 
    rectX: number, 
    rectY: number, 
    rectW: number, 
    rectH: number,
) => {
    let xLine = mouseX > rectX && mouseX < rectX + rectW
    let yLine = mouseY > rectY && mouseY < rectY + rectH

    return xLine && yLine
}