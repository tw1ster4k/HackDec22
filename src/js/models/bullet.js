module.exports = class Bullet {
    position = {
        x: 0,
        y: 0,
    };
    element = null;

    constructor(position, element) {
        this.element = element;

        this.position = position;

        this.element.className = "bullet";
        this.element.style.left = this.position.x + "px";
        this.element.style.top = this.position.y + "px";
    }

    move() {
        if (this.position.x > screen.width) this.element.remove();
        this.position.x += 50;
        this.element.style.left = this.position.x + "px";
    }

    clear() {
        this.element.remove();
    }
};
