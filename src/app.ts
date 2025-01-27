import { Behavior } from './behaviour';
import { Bird } from './bird';
import { Rectangle } from './rectangle';

export class App {
    private readonly maxBirds = 1;

    private context: CanvasRenderingContext2D;
    private lastFrameTimeMs = 0;
    private canvasSize: Rectangle;
    private birds: Bird[] = [];

    public start(canvas: HTMLCanvasElement) {
        this.canvasSize = new Rectangle(0, 0, canvas.width, canvas.height);
        this.context = canvas.getContext('2d');

        for (let b = 0; b < this.maxBirds; b++) {
            this.birds.push(new Bird(b, this.canvasSize));
        }

        requestAnimationFrame(this.renderLoop);
    }

    public updateBehavior(behavior: Behavior) {
        this.birds.forEach((bird) => bird.updateBehavior(behavior));
    }

    private drawBirds(): any {
        this.context.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
        this.birds.forEach((bird) => bird.draw(this.context));
    }

    private updateBirds(delta: number): any {
        this.birds.forEach((bird) => bird.move(this.birds, delta));
    }

    private renderLoop = (timestamp: number) => {
        const delta = timestamp - this.lastFrameTimeMs;
        this.lastFrameTimeMs = timestamp;

        this.updateBirds(delta);
        this.drawBirds();

        requestAnimationFrame(this.renderLoop);
    }
}
