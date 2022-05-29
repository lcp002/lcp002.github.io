
let characterList = [
    [
        "Lando", "lando.png", 100, [
            ["Tackle", 1, 5, 1, 10,], //Move Name, Minimum Damage, Maximum Damage, Lower Miss Value, Higher Miss Value
            ["Kick", 5, 10, 2, 10,],
            ["Bite", 10, 50, 3, 10,],
            ["Rage", 1, 100, 5, 10,],
        ],
    ],
    [
        "Lee", "lee.png", 100, [
            ["Tackle", 1, 5, 1, 10,],
            ["Kick", 5, 10, 2, 10,],
            ["Bite", 10, 50, 3, 10,],
            ["Rage", 1, 100, 5, 10,],
        ],
    ],
    [
        "Shandra", "mom.png", 100, [
            ["Tackle", 1, 5, 1, 10,],
            ["Kick", 5, 10, 2, 10,],
            ["Bite", 10, 50, 3, 10,],
            ["Rage", 1, 100, 5, 10,],
        ],
    ],
    [
        "Hayden", "hayden.png", 100, [
            ["Tackle", 1, 5, 1, 10,],
            ["Kick", 5, 10, 2, 10,],
            ["Bite", 10, 50, 3, 10,],
            ["Rage", 1, 100, 5, 10,],
        ],
    ],
];

$(document).ready(function() {
    spawnP1();
    spawnP2();
    hideGameInfoBox();
});

class Character {
    constructor(name, sprite, hp, moves) {
        this.name = name;
        this.sprite = sprite;
        this.hp = hp;
        this.fullhp = hp;
        this.moves = moves;
    }
}

var player1=null
var player2=null
var gameOver=false

function spawnP1() {
    let p = characterList[Math.floor(Math.random() * characterList.length)];
    player1 = new Character(p[0], p[1], p[2], p[3]);
    for (i = 0; i < 4; i++) {
        let buttonIdentifier = 'move' + (i+1) + 'Button';
        document.getElementById(buttonIdentifier).innerHTML = player1.moves[i][0];
    };
    document.getElementById('playerSprite').src=player1.sprite;
    $('#playerHealth').attr('max', player1.fullhp);
    $('#playerHealth').val(player1.hp);
}

function spawnP2() {
    let i = characterList[Math.floor(Math.random() * characterList.length)];
    player2 = new Character(i[0], i[1], i[2], i[3]);
    document.getElementById('computerSprite').src=player2.sprite;
    document.getElementById('computerSprite').style.transform="scaleX(-1)"
    $('#computerHealth').attr('max', player2.fullhp);
    $('#computerHealth').val(player2.hp);
    checkIfSame();
}

function checkIfSame() {
    if (player1.name == player2.name) {
        spawnP2();
    } else {return;};
};

function attack(attacker, reciever, move) {
    showGameInfoBox();
    if (attacker.hp <= 0) {
        attacker.hp = 0;
        document.getElementById('gameInfoBox').innerHTML="Game Over! " + attacker.name + " fainted!";
        gameOver=true;
        return;
    }
    let damage = Math.floor(Math.random() * move[2]) + move[1];
    while (damage > move[2]) {
        damage = Math.floor(Math.random() * move[2]) + move[1];
    };
    let missChance = Math.floor(Math.random() * move[4]) + 1;
    if (missChance <= move[3]) {
        damage = 0;
        document.getElementById('gameInfoBox').innerHTML = attacker.name + " did " + move[0].toLowerCase() + "! It missed!";
    } else {
        document.getElementById('gameInfoBox').innerHTML = attacker.name + " did " + move[0].toLowerCase() + "! It did " + damage + " damage!";
    };
    reciever.hp -= damage;
    $('#playerHealth').val(player1.hp);
    $('#computerHealth').val(player2.hp);
    if (reciever.hp <= 0) {
        reciever.hp = 0;
        document.getElementById('gameInfoBox').innerHTML="Game Over! " + reciever.name + " fainted!";
        gameOver=true;
        return;
    }
};

function hideButtons() {
    document.getElementById('move1Button').style.display="none";
    document.getElementById('move2Button').style.display="none";
    document.getElementById('move3Button').style.display="none";
    document.getElementById('move4Button').style.display="none";
    setTimeout(function() {
        if (gameOver) {
            return;
        } else {
        document.getElementById('move1Button').style.display="inline-block";
        document.getElementById('move2Button').style.display="inline-block";
        document.getElementById('move3Button').style.display="inline-block";
        document.getElementById('move4Button').style.display="inline-block";
        hideGameInfoBox();
        };
    }, 2500);
};

function hideGameInfoBox() {
    document.getElementById('gameInfoBox').style.visibility="hidden";
    document.getElementById('gameInfoBox').style.border="none";
};

function showGameInfoBox() {
    document.getElementById('gameInfoBox').style.visibility="visible";
    document.getElementById('gameInfoBox').style.border="solid";
};

setInterval(function() {
    if (gameOver) {
        document.getElementById('move1Button').style.display="none";
        document.getElementById('move2Button').style.display="none";
        document.getElementById('move3Button').style.display="none";
        document.getElementById('move4Button').style.display="none";
    };
}, 16);

setInterval(function() {
    document.getElementById('playerSprite').onmouseenter=function() {
        document.getElementById('descriptionBox').style.visibility="visible";
        document.getElementById('descriptionBox').style.border="solid";
        document.getElementById('descriptionBox').innerHTML = player1.name + "<br>" + "Health: " + player1.hp + " / " + player1.fullhp
    };
        document.getElementById('playerSprite').onmouseleave=function() {
            document.getElementById('descriptionBox').style.visibility="hidden"
        };

    document.getElementById('computerSprite').onmouseenter=function() {
        document.getElementById('descriptionBox').style.visibility="visible";
        document.getElementById('descriptionBox').style.border="solid";
        document.getElementById('descriptionBox').innerHTML = player2.name + "<br>" + "Health: " + player2.hp + " / " + player2.fullhp
    };
        document.getElementById('computerSprite').onmouseleave=function() {
            document.getElementById('descriptionBox').style.visibility="hidden"
        };

    document.getElementById('move1Button').onmouseenter=function() {
        document.getElementById('descriptionBox').style.visibility="visible";
        document.getElementById('descriptionBox').style.border="solid";
        document.getElementById('descriptionBox').innerHTML = player1.moves[0][0] + ": " + player1.moves[0][1] + " - " + player1.moves[0][2] + " damage"
    };
        document.getElementById('move1Button').onmouseleave=function() {
            document.getElementById('descriptionBox').style.visibility="hidden"
        };

        document.getElementById('move2Button').onmouseenter=function() {
            document.getElementById('descriptionBox').style.visibility="visible";
            document.getElementById('descriptionBox').style.border="solid";
            document.getElementById('descriptionBox').innerHTML = player1.moves[1][0] + ": " + player1.moves[1][1] + " - " + player1.moves[1][2] + " damage"
        };
            document.getElementById('move2Button').onmouseleave=function() {
                document.getElementById('descriptionBox').style.visibility="hidden"
            };

    document.getElementById('move3Button').onmouseenter=function() {
        document.getElementById('descriptionBox').style.visibility="visible";
        document.getElementById('descriptionBox').style.border="solid";
        document.getElementById('descriptionBox').innerHTML = player1.moves[2][0] + ": " + player1.moves[2][1] + " - " + player1.moves[2][2] + " damage"
    };
        document.getElementById('move3Button').onmouseleave=function() {
            document.getElementById('descriptionBox').style.visibility="hidden"
        };

    document.getElementById('move4Button').onmouseenter=function() {
        document.getElementById('descriptionBox').style.visibility="visible";
        document.getElementById('descriptionBox').style.border="solid";
        document.getElementById('descriptionBox').innerHTML = player1.moves[3][0] + ": " + player1.moves[3][1] + " - " + player1.moves[3][2] + " damage"
    };
        document.getElementById('move4Button').onmouseleave=function() {
            document.getElementById('descriptionBox').style.visibility="hidden"
        };
}, 16);
