import { App } from "./app";

console.log('Hello Boids!');

setTimeout(() => {
    const app = new App();
    app.start(document.querySelector('canvas'));
}, 100);
