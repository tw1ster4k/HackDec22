module.exports = class Enemy {
    type = 1;
    element = null;
    speed = 20;
    position = {
        x: 0,
        y: 0,
    };
    reward = 0;

    constructor(type, position, element, speed = 20, reward = 10) {
        this.type = type;
        this.position = position;
        this.element = element;
        this.speed = speed;
        this.reward = reward;
    }

    kill() {
        this.element.remove();
    }

    move() {
        this.position.x -= this.speed;
        this.element.style.left = this.position.x + "px";
    }
};
