module.exports = class Enemy {
    type = 1;
    position = {
        x: 0,
        y: 0,
    };

    constructor(type) {
        this.type = type;
    }
};
