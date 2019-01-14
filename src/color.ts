export class Color {
    private static colors = ['#f2476a', '#fb654e', '#eb2d3a', '#90ee90', '#ff0000', '#ff8100', '#fff400', '#08115a', '#007081', '#10b285', '#348757'];

    public static getRandomColor(): string {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }
}
