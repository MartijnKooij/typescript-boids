import { Point } from './point';
import { Rect } from './rect';

export class Bird {
    private position: Point;
    private velocity: Point;

    constructor() {
        this.position = {x: 100, y: 100};
        this.velocity = {x: 3, y: 0};
    }

    public move(boundingBox: Rect) {
        const newX = this.position.x + this.velocity.x;
        const newY = this.position.y + this.velocity.y;

        if (newX <= boundingBox.left || newX + 5 >= boundingBox.left + boundingBox.width) {
            this.velocity.x = -1 * this.velocity.x;
        }
        if (newY <= boundingBox.top || newY + 5 >= boundingBox.top + boundingBox.height) {
            this.velocity.y = -1 * this.velocity.y;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    public draw(context: CanvasRenderingContext2D) {
        context.fillRect(this.position.x, this.position.y, 5, 5);
    }
}
