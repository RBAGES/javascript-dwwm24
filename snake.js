
const edgeCollision = true; // true si on veut que les cotés soient pris en compte dans les collisions
const canvasDimension = 15;//nombre de cases du canvas (10x10)
const margin = 0;//marge entre les bords et le snake
const initPlace = {//position initiale du snake
    x: 3,
    y: 3
}
const blockSize = 30;//taille des blocs du snake
const randomizeColors = false;
var direction = "";//"up""down""left""right"
var directionChangeable = "";

//Initialisation du canvas
const snakeCanvas = document.createElement("canvas");
snakeCanvas.id = "snake";
snakeCanvas.width = canvasDimension * blockSize + 2 * margin;
snakeCanvas.height = canvasDimension * blockSize + 2 * margin;
snakeCanvas.style.marginLeft = "50%";
snakeCanvas.style.transform = "translate(-50%,0)";
snakeCanvas.classList.add("myCanvas");
document.body.appendChild(snakeCanvas);

//le texte pour afficher des infos
const pCoords = document.createElement("p");
pCoords.innerHTML = `x : <span id="posX"></span>
                    <br>
                    y : <span id="posY"></span>
                    `;
document.body.appendChild(pCoords);
const spanX = document.getElementById("posX");
const spanY = document.getElementById("posY");

const blocks = [];//le tableau qui modélisera le snake
//les coordonnées de la première pomme
var appleX = margin + Math.floor(Math.random() * canvasDimension) * blockSize;
var appleY = margin + Math.floor(Math.random() * canvasDimension) * blockSize;

// la classe qui permet de créer un block et de le bouger
class blockGame {
    static width = blockSize;
    static height = blockSize;
    constructor(x, y, color = "rgb(0,0,0,0.3)") {
        if (randomizeColors){
            var col1 = Math.floor(Math.random()*255);
            var col2 = Math.floor(Math.random()*255);
            var col3 = Math.floor(Math.random()*255);
            this.color = "rgb("+col1+","+col2+","+col3+")";
        }
        else{
            this.color = color;
        }
        this.x = x;
        this.y = y;
        this.context = snakeCanvas.getContext("2d");
        this.context.fillStyle = this.color;
        this.context.strokeStyle= "white";
        this.drawBlock();
        this.movable = false;
    }
    drawBlock() {
        this.context.fillRect(this.x, this.y, blockGame.width, blockGame.height);
        // this.context.strokeRect(this.x, this.y, blockGame.width, blockGame.height);
    }
    moveX(val) {
        this.clearBlock();
        this.x += val;
        if (!edgeCollision) {
            this.x %= snakeCanvas.width - 2 * margin;
            this.x = (this.x < (0 + margin)) ? (snakeCanvas.width - margin - blockGame.width) : this.x;
        }
        this.drawBlock();
    }
    moveY(val) {
        this.clearBlock();
        this.y += val;
        if (!edgeCollision) {
            this.y %= snakeCanvas.height - 2 * margin;
            this.y = (this.y < (0 + margin)) ? (snakeCanvas.height - margin - blockGame.height) : this.y;
        }
        this.drawBlock();
    }
    clearBlock() {
        this.context.clearRect(this.x, this.y, blockGame.width, blockGame.height);
    }
}

//fonction qui ajoute un block au tableau de blocks représentant le snake
const createBlock = () => {
    if (blocks.length == 0) {
        blocks.push(new blockGame(initPlace.x * blockSize + margin, initPlace.y * blockSize + margin));
        blocks[0].movable = true;
    }
    else
        blocks.push(new blockGame(blocks[0].x, blocks[0].y));
};


// // fonction alternative pour le déplacement
// const moveSnakeAlt = () => {
//     if (direction === "")
//         return null;

    
    
//     switch (direction) {
//         case "left":
//             blocks.unshift(new blockGame(blocks[0].x-blockSize, blocks[0].y))
//             break;
//         case "down":
//             blocks.unshift(new blockGame(blocks[0].x, blocks[0].y+blockSize))
//             break;
//         case "up":
//             blocks.unshift(new blockGame(blocks[0].x, blocks[0].y-blockSize));
//             break;
//         case "right":
//             blocks.unshift(new blockGame(blocks[0].x+blockSize, blocks[0].y));
//             break;
//         default:
//             null;
//             break;
//     }
//     blocks[blocks.length-1].clearBlock();
//     blocks.pop();
//     console.log(blocks);
//     blocks.forEach(block => {
//         block.drawBlock();
//     });
//     directionChangeable = direction;// on stock la direction du tick pour la comparer avec celle qu'entrera l'utilisateur, pour voir s'il a le droit d'aller dans sa nouvelle direction
//     checkCollision();
// }

const moveSnake = () => {
    if (direction === "")
        return null;
    if (blocks.length > 1) {
        for (let i = 1; i < blocks.length; i++) {
            if (blocks[blocks.length - i].movable === true) {
                blocks[blocks.length - i].clearBlock();
                blocks[blocks.length - i].x = blocks[blocks.length - i - 1].x;
                blocks[blocks.length - i].y = blocks[blocks.length - i - 1].y;
            }
            else {
                blocks[blocks.length - i].movable = true;
            }
        }
    }
    switch (direction) {
        case "left":
            blocks[0].moveX(-blockSize);
            break;
        case "down":
            blocks[0].moveY(blockSize);
            break;
        case "up":
            blocks[0].moveY(-blockSize);
            break;
        case "right":
            blocks[0].moveX(blockSize);
            break;
        default:
            null;
            break;
    }

    blocks.forEach(block => {
        block.drawBlock();
    });
    directionChangeable = direction;// on stock la direction du tick pour la comparer avec celle qu'entrera l'utilisateur, pour voir s'il a le droit d'aller dans sa nouvelle direction
    checkCollision();
}

document.addEventListener("keydown", (e) => {
    if (!(["ArrowLeft", "ArrowDown", "ArrowUp", "ArrowRight"].includes(e.key)))
        return null;
    e.preventDefault(); // empêche le scroll de la page avec les touches fléchées

    switch (e.key) {
        case "ArrowLeft":
            if (directionChangeable !== 'right')
                direction = "left";
            break;
        case "ArrowDown":
            if (directionChangeable !== "up")
                direction = "down";
            break;
        case "ArrowUp":
            if (directionChangeable !== "down")
                direction = "up";
            break;
        case "ArrowRight":
            if (directionChangeable !== "left")
                direction = "right";
            break;
        default:
            null;
            break;
    }

});



const updateApple = () => {
    do {
        var reroll = false;// si les coords de la pomme sont les mêmes que celles d'un des blocs du snake, on relance
        appleX = margin + Math.floor(Math.random() * canvasDimension) * blockSize;
        appleY = margin + Math.floor(Math.random() * canvasDimension) * blockSize;
        blocks.forEach(block => {
            if (appleX == block.x && appleY == block.y) {
                reroll = true;
            }
        });
    } while (reroll);

    spanX.innerHTML = appleX;
    spanY.innerHTML = appleY;

    var context = snakeCanvas.getContext("2d");
    context.fillStyle = "red";
    context.fillRect(appleX, appleY, blockGame.width, blockGame.height);
    createBlock();
}



const  checkCollision = () => {
    let x = blocks[0].x;
    let y = blocks[0].y;
    if (x == appleX && y == appleY) {
        updateApple();
    }
    if (edgeCollision) {
        if (x + blockGame.width > snakeCanvas.width || y + blockGame.height > snakeCanvas.height || x < 0 || y < 0) {
            clearInterval(startGame);
            alert('perdu');
        }
    }
    for (let i = 1; i < blocks.length; i++) {
        if (blocks[i].x == x && blocks[i].y == y && blocks[i].movable) {
            clearInterval(startGame);
            alert('perdu');
        }
    }
}

updateApple(); // pour la création de la première pomme
const startGame = setInterval(moveSnake, 100);