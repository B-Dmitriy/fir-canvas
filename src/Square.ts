import { drawCoords } from "./drawCoords";

// Класс квадрата (сущности)
export class Square {
    x: number;
    y: number;
    edge: number;
    color: string;
    selected: boolean;
    active: boolean;
    activeColor: string;
    activeColor2: string;

    constructor(x: number, y: number, edge: number, color: string) {

        this.x = x                     // Положение ЦЕНТРА фугуры x
        this.y = y                     // Положение ЦЕНТРА фугуры y
        this.edge = edge               // размер
        this.color = color             // цвет
        this.selected = false          // выбрванный (обводка)
        this.active = false            // активный ОСИ на x/y
        // @ts-ignore
        this.activeColor = color.replace(/,\d\d%\)/, (str) => str.replace(/\d\d/, str.match(/\d\d/)[0] * 0.7))  // цвет ховера
        // @ts-ignore
        this.activeColor2 = color.replace(/,\d\d%\)/, (str) => str.replace(/\d\d/, (str.match(/\d\d/)[0] * 0.6).toString())) // цвет обводки

    }
    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color
        if (this.active) {
            // рисует 2 линии на оси y и x
            context.fillStyle = this.activeColor;
            context.save()
            context.setLineDash([10, 5, 30, 5])
            context.beginPath()
            context.moveTo(this.x, this.y)
            context.lineTo(0, this.y)
            context.moveTo(this.x, this.y)
            context.lineTo(this.x, 0)
            context.moveTo(this.x, this.y)
            context.closePath()
            context.lineWidth = 0.5
            context.strokeStyle = this.activeColor
            context.stroke()

            drawCoords(context, this.x, this.y, this.activeColor)
            
            context.restore()
        }
        context.fillRect(this.x, this.y, this.edge, this.edge)
        
        context.font = "12px serif"
        context.fillStyle = 'black';
        context.fillText('Title', this.x + (this.edge / 2), this.y + (this.edge / 6))
        
        context.font = "10px serif"
        context.fillStyle = 'black';
        context.fillText('Info from', this.x + (this.edge / 2), this.y + (this.edge / 2))
        context.fillText('this square', this.x + (this.edge / 2), this.y + (this.edge - 10))

        context.save()

        context.beginPath();
        context.strokeStyle = 'black';
        context.arc(this.x + (this.edge / 2), this.y, 2, 0, 2 * Math.PI)
        context.closePath()  
        context.fill()
        context.stroke();

        context.beginPath();
        context.strokeStyle = 'black';
        context.arc(this.x, this.y + (this.edge / 2), 2, 0, 2 * Math.PI)
        context.closePath()  
        context.fill()
        context.stroke();

        context.beginPath();
        context.strokeStyle = 'black';
        context.arc(this.x + (this.edge / 2), this.y + this.edge, 2, 0, 2 * Math.PI)
        context.closePath()  
        context.fill()
        context.stroke();
        
        context.beginPath();
        context.strokeStyle = 'black';
        context.arc(this.x + this.edge, this.y + (this.edge / 2), 2, 0, 2 * Math.PI)
        context.closePath()  
        context.fill()
        context.stroke();
        
        context.restore()

        if (this.selected) {
            // Рисует обводку
            context.lineWidth = 2;
            context.strokeStyle = this.activeColor2
            context.strokeRect(this.x, this.y, this.edge, this.edge)
        }
    }
    update() {
        this.x += 0.1 // USELESS
    }

    select() {
        this.selected = !this.selected
    }

    activate() {
        this.active = !this.active
    }
}
