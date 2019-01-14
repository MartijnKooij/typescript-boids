import { Point } from './point';
import { Rect } from './rect';

export class Bird {
    private location: Rect;
    private velocity: Point;
    private velocityMultiplier: number;

    constructor() {
        this.location = { left: Math.floor(Math.random() * 490), top: Math.floor(Math.random() * 490), width: 12, height: 6 };
        this.velocity = { x: 3, y: 0 };
        this.velocityMultiplier = 0.5;
    }

    public move(boundingBox: Rect) {
        const newX = this.location.left + this.velocity.x;
        const newY = this.location.top + this.velocity.y;
        let bounced = false;

        var noise = Math.floor(Math.random() * 4) * (Math.floor(Math.random() * 2) === 1 ? 1 : -1);

        if (newX <= boundingBox.left) {
            this.velocity.x = -1 * this.velocity.x;
            this.velocity.y += noise;
            bounced = true;
        }
        if (newX + this.location.width >= boundingBox.left + boundingBox.width) {
            this.velocity.x = -1 * this.velocity.x;
            this.velocity.y += noise;
            bounced = true;
        }

        if (newY <= boundingBox.top) {
            this.velocity.y = -1 * this.velocity.y;
            this.velocity.x += noise;
            bounced = true;
        }
        if (newY + this.location.height >= boundingBox.top + boundingBox.height) {
            this.velocity.y = -1 * this.velocity.y;
            this.velocity.x += noise;
            bounced = true;
        }

        this.velocity.x = Math.min(Math.max(this.velocity.x, -5), 5);
        this.velocity.y = Math.min(Math.max(this.velocity.y, -5), 5);

        if (bounced) {
            this.velocityMultiplier = 0.9;
        } else {
            this.velocityMultiplier += 0.02;
        }

        this.velocity.x *= this.velocityMultiplier;
        this.velocity.y *= this.velocityMultiplier;

        this.location.left += this.velocity.x;
        this.location.top += this.velocity.y;
    }

    public draw(context: CanvasRenderingContext2D) {
        context.save();

        context.beginPath();

        const halfWidth = this.location.width / 2;
        const halfHeight = this.location.height / 2;
        const centerX = this.location.left + halfWidth;
        const centerY = this.location.top + halfHeight;
        context.translate(centerX, centerY);
        context.rotate(this.getAngle());

        context.moveTo(-halfWidth, -halfHeight);
        context.lineTo(-halfWidth + this.location.width, -halfHeight + halfHeight);
        context.lineTo(-halfWidth, -halfHeight + this.location.height);
        context.lineTo(-halfWidth + this.location.width / 3, -halfHeight + halfHeight);
        context.lineTo(-halfWidth, -halfHeight);
        context.fill();

        context.restore();
    }

    private getAngle(): number {
        return Math.atan2(this.velocity.y, this.velocity.x);
    }
}
