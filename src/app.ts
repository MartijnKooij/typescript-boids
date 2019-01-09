import { Bird } from './bird';
import { Point } from './point';
import { Rect } from './rect';

export class App {
    private readonly maxFPS = 30;

    private context: CanvasRenderingContext2D;
    private lastFrameTimeMs = 0;
    private canvasSize: Rect;
    private bird: Bird;

    public start(canvas: HTMLCanvasElement) {
        this.canvasSize = { left: 0, top: 0, width: canvas.width, height: canvas.height };
        this.context = canvas.getContext('2d');
        this.bird = new Bird();

        requestAnimationFrame(this.renderLoop);
    }

    private drawBirds(): any {
        this.context.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
        this.bird.draw(this.context);
    }

    private updateBirds(): any {
        this.bird.move(this.canvasSize);
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
