import { Behavior } from './behaviour';
import { Color } from './color';
import { Point } from './point';
import { Rectangle } from './rectangle';

export class Bird {
    public id: number;
    public color = Color.getRandomColor();
    public location: Rectangle;
    public velocity: Point;

    private behavior: Behavior;
    private boundingBox: Rectangle;

    private previousVelocity: Point;
    private previousColor = this.color;

    private velocityMultiplier: number;

    constructor(id: number, boundingBox: Rectangle) {
        this.id = id;
        this.behavior = new Behavior();
        this.boundingBox = boundingBox;

        const defaultWidth = 16;
        const defaultHeight = 8;
        const startX = Math.max(Math.floor(Math.random() * 490), defaultWidth);
        const startY = Math.max(Math.floor(Math.random() * 490), defaultHeight);

        this.location = new Rectangle(startX, startY, defaultWidth, defaultHeight);
        this.previousVelocity = { x: 3, y: 0 };
        this.velocity = { x: Math.floor(Math.random() * 5), y: Math.floor(Math.random() * 5) };
        this.velocityMultiplier = 1.0;
        this.ensureVelocityRange();
    }

    public updateBehavior(behavior: Behavior) {
        this.behavior = behavior;
    }

    public move(allBirds: Bird[]) {
        this.previousVelocity = this.velocity;

        const otherBirds = allBirds.filter((b) => b.id !== this.id);

        this.assumeColorOfNearbyBirds(otherBirds);

        const bounced = this.moveWithinBoundaries();

        this.modifySpeedAfterBounce(bounced);

        this.ensureVelocityRange();

        this.location.left += this.velocity.x;
        this.location.top += this.velocity.y;
    }

    public draw(context: CanvasRenderingContext2D) {
        context.save();
        context.beginPath();
        this.drawBird(context);
        context.restore();
    }

    private assumeColorOfNearbyBirds(otherBirds: Bird[]) {
        const nearbyBirds = otherBirds.filter((otherBird) => otherBird.location.isNear(this.location));
        if (nearbyBirds && nearbyBirds.length > 0) {
            this.previousColor = this.color;
            this.color = nearbyBirds[0].color;
        } else {
            this.color = this.previousColor;
        }
    }

    private drawBird(context: CanvasRenderingContext2D) {
        const halfWidth = this.location.width / 2;
        const halfHeight = this.location.height / 2;
        const centerX = this.location.left + halfWidth;
        const centerY = this.location.top + halfHeight;

        context.translate(centerX, centerY);
        context.rotate(this.velocityToAngle());
        context.moveTo(-halfWidth, -halfHeight);
        context.fillStyle = this.color;
        context.lineTo(-halfWidth + this.location.width, -halfHeight + halfHeight);
        context.lineTo(-halfWidth, -halfHeight + this.location.height);
        context.lineTo(-halfWidth + this.location.width / 3, -halfHeight + halfHeight);
        context.lineTo(-halfWidth, -halfHeight);
        context.fill();
    }

    private modifySpeedAfterBounce(bounced: boolean) {
        if (bounced && this.behavior.slowDownOnBounce) {
            this.velocityMultiplier = 1.0;
        } else {
            this.velocityMultiplier += 0.001;
        }

        this.velocity.x *= this.velocityMultiplier;
        this.velocity.y *= this.velocityMultiplier;
    }

    private moveWithinBoundaries() {
        const newX = this.location.left + this.velocity.x;
        const newY = this.location.top + this.velocity.y;
        const noise = Math.floor(Math.random() * 4) * (Math.floor(Math.random() * 2) === 1 ? 1 : -1);

        let bounced = false;

        if (!this.isInXBounds(newX)) {
            this.velocity.x = -1 * (this.velocity.x / 10);
            this.velocity.y += noise;
            bounced = true;
        }

        if (!this.isInYBounds(newY)) {
            this.velocity.y = -1 * (this.velocity.y / 10);
            this.velocity.x += noise;
            bounced = true;
        }

        return bounced;
    }

    private ensureVelocityRange() {
        const newVelocityX = Math.min(Math.max(this.velocity.x, -16), 16);
        const newVelocityY = Math.min(Math.max(this.velocity.y, -16), 16);
        const newX = this.location.left + newVelocityX;
        const newY = this.location.top + newVelocityY;

        if (this.isInXBounds(newX) && this.isInYBounds(newY)) {
            this.velocity.x = newVelocityX;
            this.velocity.y = newVelocityY;
        } else {
            this.velocity = this.previousVelocity;
        }

        if (this.velocity.x === 0 && this.velocity.y === 0) {
            this.velocity = { x: Math.floor(Math.random() * 5), y: Math.floor(Math.random() * 5) };
        }
    }

    private isInXBounds(newX: number) {
        return newX > this.boundingBox.left && newX + this.location.width < this.boundingBox.left + this.boundingBox.width;
    }

    private isInYBounds(newY: number) {
        return newY > this.boundingBox.top && newY + this.location.height < this.boundingBox.top + this.boundingBox.height;
    }

    private velocityToAngle(): number {
        return Math.atan2(this.velocity.y, this.velocity.x);
    }
}
