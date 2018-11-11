var chosenChar;
var enemies = [];

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
            startGame($(this).attr("id"));
        });
        
        enemies.push(currentChar.id);

        $("#character-select").append(newCharElm);
        
    }


}

function startGame(id)
{
    console.log("Starting game with: " + id);
    $("#character-phrase").text("Please choose an opponent!");
    
    $(("#" + id)).remove();
    enemies.splice(enemies.indexOf(id), 1);
    console.log(enemies);

    for(x = 0; x < window.characters.length; x++)
    {
        if(id === window.characters[x].name)
        {
            chosenChar = window.characters[x];
        }
    }
}
