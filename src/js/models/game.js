module.exports = class Game {
    score = 0;
    player = null;
    rootDiv = null;
    enemies = [];
    isOver = false;
    bullets = [];
    EnemyModel = null;
    BulletModel = null;
    isStarted = false;
    gameOverCb = null;
    counterElement;

    constructor(
        rootDiv,
        EnemyModel,
        BulletModel,
        player,
        gameOverCb,
        counterElement
    ) {
        this.player = player;
        this.rootDiv = rootDiv;
        this.EnemyModel = EnemyModel;
        this.BulletModel = BulletModel;
        this.gameOverCb = gameOverCb;
        this.counterElement = counterElement;
    }

    start() {
        const gameInterval = setInterval(() => {
            this.isOver && clearInterval(gameInterval);

            this.bullets.forEach((el) => {
                el.move();
                el.position.x >= screen.width && el.clear();
            });
            this.enemies.forEach((el) => {
                el.move();
                el.position.x <= 0 && el.kill();
            });

            this.bullets = this.bullets.filter(
                (el) => el.position.x < screen.width
            );
            this.enemies = this.enemies.filter((el) => el.position.x > 0);
            this.checkHits();
            this.checkIntersections();
            this.isStarted = true;
        }, 100);

        const enemiesInterval = setInterval(() => {
            this.isOver && clearInterval(enemiesInterval);
            this.createRandomEnemy();
        }, 1000);
    }

    createRandomEnemy() {
        const newEnemy = new this.EnemyModel(
            this.randomizer(1, 10),
            {
                x: screen.width,
                y: this.randomizer(0, screen.height),
            },
            document.createElement("div"),
            this.randomizer(5, 25),
            this.randomizer(5, 25)
        );
        newEnemy.element.className = `enemy e${newEnemy.type}`;
        newEnemy.element.style.top = newEnemy.position.y + "px";
        newEnemy.element.style.left = newEnemy.position.x + "px";
        this.rootDiv.insertAdjacentElement("afterbegin", newEnemy.element);
        this.enemies.push(newEnemy);
    }

    randomizer(from = 0, to = 100) {
        return Math.ceil(from + Math.random() * (to - from));
    }

    attack(posX, posY) {
        const newBullet = new this.BulletModel(
            { x: posX, y: posY },
            document.createElement("div")
        );
        newBullet.element.className = "bullet";
        newBullet.element.style.top = newBullet.position.y + "px";
        newBullet.element.style.left = newBullet.position.x + "px";
        this.bullets.push(newBullet);
        this.rootDiv.insertAdjacentElement("afterbegin", newBullet.element);
    }

    isHit(polyCords, pointX, pointY) {
        let i = 0;
        let j = 0;
        let c = 0;

        for (i = 0, j = polyCords.length - 1; i < polyCords.length; j = i++) {
            if (
                polyCords[i][1] > pointY != polyCords[j][1] > pointY &&
                pointX <
                    ((polyCords[j][0] - polyCords[i][0]) *
                        (pointY - polyCords[i][1])) /
                        (polyCords[j][1] - polyCords[i][1]) +
                        polyCords[i][0]
            ) {
                c = !c;
            }
        }

        return c;
    }

    checkHits() {
        this.bullets.forEach((bullet) => {
            this.enemies.forEach((enemie) => {
                if (
                    this.isHit(
                        [
                            [enemie.position.x, enemie.position.y],
                            [enemie.position.x + 100, enemie.position.y],
                            [enemie.position.x + 100, enemie.position.y + 100],
                            [enemie.position.x, enemie.position.y + 100],
                        ],
                        bullet.position.x,
                        bullet.position.y
                    )
                ) {
                    enemie.kill();
                    this.enemies = this.enemies.filter((el) => el !== enemie);
                    bullet.clear();
                    this.bullets = this.bullets.filter((el) => el !== bullet);
                    this.score += enemie.reward;
                    this.counterElement.innerText = this.score;
                }
            });
        });
    }

    checkIntersections() {
        this.enemies.forEach((enemie) => {
            if (
                this.isHit(
                    [
                        [enemie.position.x, enemie.position.y],
                        [enemie.position.x + 100, enemie.position.y],
                        [enemie.position.x + 100, enemie.position.y + 100],
                        [enemie.position.x, enemie.position.y + 100],
                    ],
                    this.player.position.x + 200,
                    this.player.position.y
                ) ||
                this.isHit(
                    [
                        [enemie.position.x, enemie.position.y],
                        [enemie.position.x + 100, enemie.position.y],
                        [enemie.position.x + 100, enemie.position.y + 100],
                        [enemie.position.x, enemie.position.y + 100],
                    ],
                    this.player.position.x + 180,
                    this.player.position.y + 100
                )
            ) {
                this.gameOver();
            }
        });
    }

    gameOver() {
        this.isOver = true;
        this.isStarted = false;
        this.gameOverCb();
    }
};
