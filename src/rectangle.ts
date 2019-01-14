export class Rectangle {
    public top: number;
    public left: number;
    public width: number;
    public height: number;

    constructor(top: number, left: number, width: number, height: number) {
        this.top = top;
        this.left = left;
        this.width = width;
        this.height = height;
    }

    public isNear(other: Rectangle): boolean {

        return !(other.left > this.left + this.width ||
            other.left + other.width < this.left ||
            other.top > this.top + this.height ||
            other.top + other.height < this.top);
    }
}
