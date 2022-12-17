module.exports = class Enemy {
    type = 1;
    width = 50;
    height = 50;
    element = null;
    speed = 20;
    position = {
        x: 0,
        y: 0,
    };

    constructor(type, position, element, speed = 20, width = 50, height = 50) {
        this.type = type;
        this.position = position;
        this.element = element;
        this.height = height;
        this.width = width;
        this.speed = speed;
    }

    kill() {
        this.element.remove();
    }

    move() {
        this.position.x -= this.speed;
        this.element.style.left = this.position.x + "px";
    }
};
