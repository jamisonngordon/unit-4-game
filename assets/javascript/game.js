var chosenChar;
var chosenEnemy;
var characterElm;
var enemyElm;
var allCharacterElms = [];
var enemies = [];
var enemiesElm = [];
var attackButton;
var inBattle = false;
var canAttack;

$(document).ready(function(){
   buildCharSelect();
});

function buildCharSelect() {

    chosenChar = undefined;
    chosenEnemy = undefined;
    enemiesElm = [];
    enemies = [];


    inBattle = false;

    $("#end-game").text("");

    for(x = 0; x < 4; x++)
    {
        currentChar = window.characters[window.characterList[x]];
        newCharElm = $(
            '<div id="' + currentChar.id + '" class="character col-md-2 mx-auto">' +
            "<h3 class='mt-3 mb-3'>" + currentChar.name + "</h3>" +
            "<img class='image' src='" + currentChar.image + "'>" +
            "<h3 class='mt-3' id='" + currentChar.id + "-health'>" + currentChar.health + "</h3>" +
            '</div>'
        );

        newCharElm.click(function () {
            chooseCharacter($(this).attr("id"));
        });
        
        //allCharacterElms.push(newCharElm);

        $("#character-select").append(newCharElm);
        
    }

}

function chooseCharacter(id)
{
    if(!inBattle)
    {
        if(typeof chosenChar === "undefined")
        {
            chooseMain(id);
        }
        else
        {
            chooseEnemy(id);
        }
    }
}

function chooseMain(id) {
    console.log("Starting game with: " + id);
    $("#character-phrase").text("Please choose an opponent!");
    
    characterElm = $('#' + id);

    for(x = 0; x < window.characterList.length; x++)
    {
        if(id !== window.characters[window.characterList[x]].id)
        {
            enemies.push(window.characters[window.characterList[x]].id);
            enemiesElm.push($('#' + window.characters[window.characterList[x]].id));
        }
        if(id === window.characters[window.characterList[x]].id)
        {
            chosenChar = JSON.parse(JSON.stringify(window.characters[window.characterList[x]]));
        }
    }

    characterElm.detach();
}

function chooseEnemy(id) {
    enemyElm = $('#' + id);

    for(x = 0; x < window.characterList.length; x++)
    {
        if(id === window.characters[window.characterList[x]].id)
        {
            chosenEnemy = JSON.parse(JSON.stringify(window.characters[window.characterList[x]]));
        }
    }

    for(x = 0; x < enemiesElm.length; x++)
    {
        if(id === enemiesElm[x].attr("id"))
        {
            enemiesElm.splice(x, 1);
        }
    }

    enemyElm.detach();
    
    startBattle();
}

function startBattle() {

    inBattle = true;
    canAttack = true;

    $("#character-phrase").text("Attack your opponent!");
    $("#character-select").html("");

    attackButton = $("<div id='attack-button' class='attack-button col-md-2 mx-auto'>Attack!</div>");

    attackButton.click(function () {
        if(canAttack) {
            attack();
        }
    });

    $("#character-select").append(characterElm);
    $("#character-select").append(attackButton);
    $("#character-select").append(enemyElm);

    canAttack = true;
}

function attack() {
    if(chosenChar.health > 0 && chosenEnemy.health > 0)
    {
        canAttack = false;
        chosenEnemy.health -= chosenChar.attack;
        chosenChar.health -= chosenEnemy.counterAttack;

        $("#character-phrase").text("You attacked for " + chosenChar.attack + " damage");
        $("#" + chosenEnemy.id).find($("#" + chosenEnemy.id + "-health")).text(chosenEnemy.health);

        if(chosenEnemy.health <= 0){
            $("#character-phrase").text("You have defeated " + chosenEnemy.name);
            setTimeout(function () {
                newEnemy();
            }, 2000);
        }
        else {
            setTimeout(function () {
                canAttack = true;
                $("#character-phrase").text("Opponenet attacked for " + chosenEnemy.counterAttack + " damage");
                $("#" + chosenChar.id).find($("#" + chosenChar.id + "-health")).text(chosenChar.health);

                if(chosenChar.health <= 0) {
                    gameOver();
                }
            }, 2000);
        }

        chosenChar.attack += chosenChar.counterAttack;
    }
    else if(chosenChar.health <= 0){
        gameOver();
    }
    else if(chosenEnemy.health <= 0) {
        $("#character-phrase").text("You have defeated " + chosenEnemy.name);
        setTimeout(function () {
            newEnemy();
        }, 2000);
    }
}

function newEnemy() {
    inBattle = false;
    console.log("Entered newEnemy!");
    console.log(enemiesElm);

    enemies.splice(chosenEnemy.id, 1);

    if(enemies.length === 0)
    {
        win();
    }
    else {
        $("#character-phrase").text("Please choose an opponent!");
        $("#character-select").html("");

        for (x = 0; x < enemiesElm.length; x++) {
            enemiesElm[x].click(function () {
                chooseCharacter($(this).attr("id"));
            });
            $("#character-select").append(enemiesElm[x]);
        }
    }
}

function gameOver() {
    $("#character-phrase").html("");
    $("#character-select").html("");

    $("#end-game").text("You loose!");

    setTimeout(function () {
        buildCharSelect();
    }, 3000)
}

function win() {

    $("#character-phrase").html("");
    $("#character-select").html("");

    $("#end-game").text("You win!");

    setTimeout(function () {
        buildCharSelect();
    }, 3000)

}