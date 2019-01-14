import { App } from './app';
import { Behavior } from './behaviour';

const app = new App();

console.log('Hello Boids!');

setTimeout(() => {
    app.start(document.querySelector('canvas'));
    updateBehavior();

    document.querySelectorAll('input').forEach((input) => {
        input.addEventListener('change', (event) => {
            updateBehavior();
        });
    });
}, 100);

function updateBehavior() {
    const updatedBehavior: Behavior = {
        slowDownOnBounce: (document.querySelector('#slowdownonbounce') as HTMLInputElement).checked,
    };

    app.updateBehavior(updatedBehavior);
}
