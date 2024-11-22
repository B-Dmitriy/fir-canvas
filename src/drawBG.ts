export const drawBG = (context: CanvasRenderingContext2D, width: number, height: number) => {

    context.save()                  // чекпоинт состояния 

    context.fillStyle = 'white'     // цвет цаливки
    context.fillRect(0, 0, width, height)    // квадрат размер, весь экран
    context.lineWidth = 0.3;        // толщина линии
    context.strokeStyle = 'gray'    // цвет линии
    context.fillStyle = 'black'     // цвет заливки, далее для текста

    // Вертикальные линии
    for (let i = 1; i < width; i++) {
        context.beginPath()         // начать создание пути, контура 
        if (i % 10 === 0) {
            context.moveTo(i, 0);
            context.lineTo(i, height)
            context.moveTo(i, 0);
        }
        context.closePath()         // завершить создание пути, контура
        context.stroke()            // залить контур
    }

    // Горизонтальные линии
    for (let i = 1; i < height; i++) {
        context.beginPath()         // начать создание пути, контура
        if (i % 10 === 0) {
            context.moveTo(0, i)
            context.lineTo(width, i)
            context.moveTo(0, i)
        }
        context.closePath()          // завершить создание пути, контура
        context.stroke()             // залить контур
    }


    context.lineWidth = 1            // переключаем ширину линии 
    context.strokeStyle = 'gray'     // цвет линии


    // Отметки шага для X
    context.beginPath()
    for (let i = 50; i < width; i += 10) {
        if (i % 50 === 0) {
            context.moveTo(i, 0)
            context.lineTo(i, 30)
            context.fillText(` ${i}`, i, 30)
        } else {
            context.moveTo(i, 0)
            context.lineTo(i, 10)
        }

    }
    context.closePath()
    context.stroke()


    // Отметки шага для Y
    context.beginPath()
    for (let i = 50; i < height; i += 10) {
        if (i % 50 === 0) {
            context.moveTo(0, i)
            context.lineTo(30, i)
            context.fillText(` ${i}`, 30, i)
        } else {
            context.moveTo(0, i)
            context.lineTo(10, i)
        }

    }
    context.closePath()
    context.stroke()

    context.restore()
}