const currentPlayer = document.querySelector(".currentPlayer");

let selected; 
let player = "X";

let positions = [ 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

function init (){
    selected = Array(9).fill(null);
    player = "X";
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

    document.querySelectorAll(".game button").forEach((item) => {
        item.innerHTML = "";
        item.removeEventListener("click", newMove);
        item.addEventListener("click", newMove);
    });
}
init();

function newMove(e){
    const index = e.target.getAttribute("data-i");
    
    if (selected[index]) return; // já marcado

    e.target.innerHTML = player;
    selected[index] = player;

    if (check()) {
        alert(`O JOGADOR '${player}' GANHOU!`);
        init();
        return;
    }

    if (selected.every(item => item)) {
        alert("DEU EMPATE!");
        init();
        return;
    }

    player = player === "X" ? "O" : "X";
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

function check(){
    return positions.some((combination) => {
        return combination.every((index) => selected[index] === player);
    });
}
