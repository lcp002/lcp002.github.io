
let characterList = [
    [
        "Lando", "lando.png", 75, [ //Increased health
            ["Tackle", 1, 30, 50, 100,], //Move Name, Minimum Damage, Maximum Damage, Lower Miss Value, Higher Miss Value
            ["Holy Blessing", 75, 75, 50, 100,],
            ["Holy Blessing", 75, 75, 50, 100,], //Nerfed bite
            ["Holy Blessing", 75, 75, 50, 100,], //Example of a Healing Move
        ],
    ],
    [
        "Lee", "lee.png", 100, [
            ["Tackle", 1, 5, 0, 100,],
            ["Kick", 5, 10, 0, 100,],
            ["Bite", 10, 50, 5, 100,],
            ["Rage", 1, 100, 10, 100,],
        ],
    ],
    [
        "Shandra", "mom.png", 100, [
            ["Tackle", 1, 5, 0, 100,],
            ["Kick", 5, 10, 0, 100,],
            ["Bite", 10, 50, 5, 100,],
            ["Rage", 1, 100, 10, 100,],
        ],
    ],
    [
        "Hayden", "hayden.png", 100, [
            ["Tackle", 1, 5, 0, 100,],
            ["Kick", 5, 10, 0, 100,],
            ["Bite", 10, 50, 5, 100,],
            ["Rage", 1, 100, 10, 100,],
        ],
    ],
    [
        "Wheaton", "wheaton.png", 100, [
            ["Tackle", 1, 5, 0, 100,],
            ["Kick", 5, 10, 0, 100,],
            ["Bite", 10, 50, 5, 100,],
            ["Rage", 1, 100, 10, 100,],
        ],
    ],
];

$(document).ready(function() {
    spawnP1();
    spawnP2();
    hideGameInfoBox();
    createLadder();
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

function createLadder() { //Create an array with a ladder of characters to kill
    let ladder = [];
    for (i = 0; i < 3; i++) {
        let randInt = Math.floor(Math.random() * characterList.length);
        ladder.push(characterList[randInt]);
    }
    console.log(ladder);
}

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
    } else {
        return;
    };
};

function attack(attacker, reciever, move) { //why the hell are players attacking themselves when facing lando??? It happens when his health goes over his max health
    showGameInfoBox();
    if (attacker.hp <= 0) {
        attacker.hp = 0;
        document.getElementById('gameInfoBox').innerHTML="Game Over! " + attacker.name + " fainted!";
        gameOver=true;
        return;
    }

    if (attacker.hp > attacker.fullhp) {
        attacker.hp = attacker.fullhp
        if (attacker = player1) {
            $('#playerHealth').val(attacker.hp);
        } else {
            $('#computerHealth').val(attacker.hp);
        };
    };

    animateMove(attacker, reciever, move);

    let damage = Math.floor(Math.random() * move[2]) + move[1];
    while (damage > move[2]) {
        damage = Math.floor(Math.random() * move[2]) + move[1];
    };
    let missChance = Math.floor(Math.random() * move[4]) + 1;

    switch (move[0]) {
        case "Holy Blessing":
            if (missChance <= move[3]) {
                damage = 0;
                document.getElementById('gameInfoBox').innerHTML = attacker.name + " did " + move[0].toLowerCase() + "! It missed!";
            } else {
                document.getElementById('gameInfoBox').innerHTML = attacker.name + " healed for " + damage + " health!"
                attacker.hp += damage;
                $('#playerHealth').val(player1.hp);
                $('#computerHealth').val(player2.hp);
            };
            break;

        default:
            if (missChance <= move[3]) {
                damage = 0;
                document.getElementById('gameInfoBox').innerHTML = attacker.name + " did " + move[0].toLowerCase() + "! It missed!";
            } else {
                document.getElementById('gameInfoBox').innerHTML = attacker.name + " did " + move[0].toLowerCase() + "! It did " + damage + " damage!";
                reciever.hp -= damage;
                $('#playerHealth').val(player1.hp);
                $('#computerHealth').val(player2.hp);
            };
            break;
    };
    
    if (attacker.hp > attacker.fullhp) {
        attacker.hp = attacker.fullhp
        if (attacker = player1) {
            $('#playerHealth').val(attacker.hp);
        } else {
            $('#computerHealth').val(attacker.hp);
        };
    };

    if (reciever.hp <= 0) {
        reciever.hp = 0;
        document.getElementById('gameInfoBox').innerHTML="Game Over! " + reciever.name + " fainted!";
        gameOver=true;
        return;
    };
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
        if (player1.hp <= 0) {
            $('#playerSprite').animate({opacity: '0'}, 'slow');
        } else if (player2.hp <= 0) {
            $('#computerSprite').animate({opacity: '0'}, 'slow');
        }
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

function animateMove(attacker, reciever, move) {
    let direction = 1;
    let animationDirection = 1;
    let attackSide = null;
    let receiveSide = null;
    let moveDistance = 0;
    switch (move[0]) {
        case 'Tackle':
            moveDistance=215;
            if (attacker.name == player1.name) {
                direction = direction; 
                attackSide = '#playerSprite'; 
                receiveSide = '#computerSprite';
            } else if (attacker.name == player2.name) {
                direction *= -1; 
                attackSide = '#computerSprite'; 
                receiveSide = '#playerSprite';
            };
            moveDistance *= direction;
            moveDistance = String(moveDistance+'%');
            $(attackSide).animate({left: moveDistance});
            $(attackSide).animate({left: "0%"});
            $(receiveSide).animate({height: '275px', width: '275px', top: '25px'});
            $(receiveSide).animate({height: '300px', width: '300px', top: '0px'});
            break;

        case 'Kick':
            moveDistance=215;
            if (attacker.name == player1.name) {direction = direction; attackSide = '#playerSprite'; receiveSide = '#computerSprite';} else {direction *= -1; attackSide = '#computerSprite'; receiveSide = '#playerSprite'};
            moveDistance *= direction;
            moveDistance = String(moveDistance+'%');
            $(attackSide).animate({left: moveDistance});
            $(attackSide).animate({left: "0%"});
            $(receiveSide).animate({height: '275px', width: '275px', top: '25px'});
            $(receiveSide).animate({height: '300px', width: '300px', top: '0px'});
            break;

        case 'Bite':
            moveDistance=215;
            if (attacker.name == player1.name) {direction = direction; attackSide = '#playerSprite'; receiveSide = '#computerSprite';} else {direction *= -1; attackSide = '#computerSprite'; receiveSide = '#playerSprite'};
            moveDistance *= direction;
            moveDistance = String(moveDistance+'%');
            $(attackSide).animate({left: moveDistance});
            $(attackSide).animate({left: "0%"});
            $(receiveSide).animate({height: '275px', width: '275px', top: '25px'});
            $(receiveSide).animate({height: '300px', width: '300px', top: '0px'});
            break;

        case 'Rage':
            moveDistance=215;
            if (attacker.name == player1.name) {direction = direction; attackSide = '#playerSprite'; receiveSide = '#computerSprite';} else {direction *= -1; attackSide = '#computerSprite'; receiveSide = '#playerSprite'};
            moveDistance *= direction;
            moveDistance = String(moveDistance+'%');
            $(attackSide).animate({left: moveDistance});
            $(attackSide).animate({left: "0%"});
            $(receiveSide).animate({height: '275px', width: '275px', top: '25px'});
            $(receiveSide).animate({height: '300px', width: '300px', top: '0px'});
            break;

        case 'Holy Blessing':
            if (attacker.name == player1.name) {
                attackSide = '#playerSprite'; 
            } else {
                attackSide = '#computerSprite'; 
            };
            $(attackSide).animate({height: '+=30px', width: '+=30px', top: '-=30px'});
            $(attackSide).animate({height: '-=30px', width: '-=30px', top: '+=30px'});
            break;

        };
}

