/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, playerActive,gamePlaying;
init();

// we can use querySelector as getter or setter

//querySelector Getter 
//document.querySelector('#current-0').textContent = dice; //In textContent we can't send html tag
//document.querySelector('#current-'+playerActive).innerHTML = '<em>'+dice+'</em>'; // in innerHTML we can send html tag as string 

//querySelector setter 
//var currentS= document.querySelector('#score-0').textContent; // we can use querySelector as getter or setter
//console.log(currentS);

//NextPlayer DRY(Dnt repeat Yourself) code should nt be repeated it is bad practise
function nextPlayer(){
    (playerActive === 0)? playerActive=1 : playerActive=0;
    roundScore=0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

//Roll btn 
document.querySelector('.btn-roll').addEventListener('click', function () {
    
    if(gamePlaying){
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
    
        if(dice !== 1){
            roundScore+=dice;
            document.getElementById('current-'+playerActive).textContent = roundScore;
            }else{
            nextPlayer();
        }   
    }
});

//hold button
document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
        score[0,playerActive]=score[0,playerActive]+roundScore;
        document.getElementById('score-'+playerActive).textContent = score[0,playerActive];
        if(score[0,playerActive]>=20){
            gamePlaying = false;
            document.querySelector('#name-'+playerActive).textContent = 'WINNER';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+playerActive+'-panel').classList.remove('active');
            document.querySelector('.player-'+playerActive+'-panel').classList.add('winner');
        }else{
            nextPlayer();    
        }   
    }
});

//new Btn
document.querySelector('.btn-new').addEventListener('click',init);

//init
function init(){
    score = [0, 0];
    roundScore = 0;
    playerActive = 0;
    gamePlaying = true;
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');    
    document.querySelector('.player-1-panel').classList.remove('active');
}