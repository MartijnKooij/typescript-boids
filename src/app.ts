import { Bird } from './bird';
import { Point } from './point';
import { Rectangle } from './rectangle';

export class App {
    private readonly maxFPS = 30;

    private context: CanvasRenderingContext2D;
    private lastFrameTimeMs = 0;
    private canvasSize: Rectangle;
    private birds: Bird[] = [];

    public start(canvas: HTMLCanvasElement) {
        this.canvasSize = { left: 0, top: 0, width: canvas.width, height: canvas.height };
        this.context = canvas.getContext('2d');

        for (let b = 0; b < 10; b++) {
            this.birds.push(new Bird(b));
        }

        requestAnimationFrame(this.renderLoop);
    }

    private drawBirds(): any {
        this.context.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
        this.birds.forEach(bird => bird.draw(this.context));
    }

    private updateBirds(): any {
        this.birds.forEach(bird => bird.move(this.canvasSize, this.birds));
    }

    private renderLoop = (timestamp: number) => {
        if (timestamp < this.lastFrameTimeMs + (1000 / this.maxFPS)) {
            requestAnimationFrame(this.renderLoop);
            return;
        }
        this.lastFrameTimeMs = timestamp;

        this.updateBirds();
        this.drawBirds();

        requestAnimationFrame(this.renderLoop);
    }
}
