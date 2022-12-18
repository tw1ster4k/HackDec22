module.exports = class Player {
    username = "Player";
    score = 0;
    position = {
        x: 100,
        y: 500,
    };
    element = null;

    constructor(username, element) {
        this.username = username;
        this.element = element;
        this.element.className = "player";
        this.element.classList.add("vibrate");
        this.element.style.left = this.position.x + "px";
        this.element.style.top = this.position.y + "px";
    }

    setPosition(x = 0, y = 0) {
        x &&
            (this.position.x += x) &&
            (this.element.style.left = this.position.x + "px");
        y &&
            (this.position.y += y) &&
            (this.element.style.top = this.position.y + "px");
    }
};
