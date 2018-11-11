var chosenChar;
var chosenEnemy;
var characterElm;
var enemyElm;
var allCharacterElms = [];
var enemies = [];
var enemiesElm = [];

$(document).ready(function(){
   buildCharSelect();
});

function buildCharSelect() {

    $("#character-select").text = "";

    for(x = 0; x < 4; x++)
    {
        currentChar = window.characters[window.characterList[x]];
        newCharElm = $(
            '<div id="' + currentChar.id + '" class="character col-md-2 mx-auto">' +
            "<h3 class='mt-3 mb-3'>" + currentChar.name + "</h3>" +
            "<img class='image' src='" + currentChar.image + "'>" +
            "<h3 class='mt-3'>" + currentChar.health + "</h3>" +
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
    console.log(typeof chosenChar);
    if(typeof chosenChar === "undefined")
    {
        chooseMain(id);
    }
    else
    {
        chooseEnemy(id);
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
            chosenChar = window.characters[window.characterList[x]];
        }
    }

    console.log(characterElm);
    characterElm.detach();

    console.log(enemies);
    console.log(enemyElm);
    console.log(chosenChar);
}

function chooseEnemy(id) {
    enemyElm = $('#' + id);

    for(x = 0; x < window.characterList.length; x++)
    {
        if(id === window.characters[window.characterList[x]].id)
        {
            chosenEnemy = window.characters[window.characterList[x]];
        }
    }

    for(x = 0; x < enemiesElm.length; x++)
    {
        if(id === enemiesElm[x].attr("id"))
        {
            enemiesElm.splice(x, 1);
        }
    }

    console.log(enemyElm);
    console.log(chosenEnemy);
    console.log(enemiesElm);

    enemyElm.detach();
}