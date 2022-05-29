
let characterList = [
    [
        "Lando", "lando.png", 100, [
            ["Tackle", 1, 5,],
            ["Kick", 5, 10,],
            ["Bite", 10, 50,],
            ["Rage", 1, 100,],
        ],
    ],
    [
        "Lee", "lee.png", 100, [
            ["Tackle", 1, 5,],
            ["Kick", 5, 10,],
            ["Bite", 10, 50,],
            ["Rage", 1, 100,],
        ],
    ],
    [
        "Shandra", "mom.png", 100, [
            ["Tackle", 1, 5,],
            ["Kick", 5, 10,],
            ["Bite", 10, 50,],
            ["Rage", 1, 100,],
        ],
    ],
    [
        "Hayden", "hayden.png", 100, [
            ["Tackle", 1, 5,],
            ["Kick", 5, 10,],
            ["Bite", 10, 50,],
            ["Rage", 1, 100,],
        ],
    ],
];

$(document).ready(function() {
    spawnP1();
    spawnP2();
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
    if (attacker.hp <= 0) {
        document.getElementById('descriptionBox').innerHTML="Game Over! " + attacker.name + " fainted!";
        return;
    }
    let damage = Math.floor(Math.random() * move[2]) + move[1];
    while (damage > move[2]) {
        damage = Math.floor(Math.random() * move[2]) + move[1];
    };
    document.getElementById('descriptionBox').innerHTML = attacker.name + " did " + move[0].toLowerCase() + "! It did " + damage + " damage!";
    reciever.hp -= damage;
    $('#playerHealth').val(player1.hp);
    $('#computerHealth').val(player2.hp);
};

