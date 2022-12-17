module.exports = class Player {
    username = "Player";
    score = 0;
    position = {
        x: 0,
        y: 0,
    };

    constructor(username) {
        this.username = username;
    }

    setPosition() {}
};
