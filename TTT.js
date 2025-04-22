let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset")
let newGameBtn = document.querySelectorAll(".restart");
let msgContainer = document.querySelector(".msg-container");
let submit= document.querySelector("#submit");
let p1 = document.querySelector("#p1Name");
let p2 = document.querySelector("#p2Name");
let infos =document.querySelector(".info");
let gameBox = document.querySelector(".game");
let name1 ="";
let name2 ="";
let turnP = document.querySelector(".turn")
let body = document.querySelector("body");


function getNames() {
    name1= p1.value;
    name2= p2.value;
};

submit.addEventListener("click",submitName);

submit.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        submitName();
    }
});

function submitName () {
    getNames();
    name1 = name1 || "Player 1";
    name2 = name2 || "Player 2";
    infos.classList.add("hide");
    gameBox.classList.remove("hide");
    turnP.classList.remove("hide");
    turnP.innerText= `${name1}'s Turn`;
    };

    const winPatterns = [
        { pattern: [0, 1, 2], line: "win-0" },
        { pattern: [3, 4, 5], line: "win-1" },
        { pattern: [6, 7, 8], line: "win-2" },
        { pattern: [0, 3, 6], line: "win-3" },
        { pattern: [1, 4, 7], line: "win-4" },
        { pattern: [2, 5, 8], line: "win-5" },
        { pattern: [0, 4, 8], line: "win-6" },
        { pattern: [2, 4, 6], line: "win-7" },
      ];


let turn0= true;// player 0

const winnerPattern = [
    [0,1,2],[3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]
];

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    turnP.innerText= `${name1}'s Turn`;
    turnP.classList.remove("hide");
    winLine.classList.add("hide");
    winLine.classList.remove(line);
};


const restartGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    infos.classList.remove("hide");
    gameBox.classList.add("hide");
    p1.value = "";
    p2.value = "";
    turnP.classList.add("hide");
    winLine.classList.add("hide");
    winLine.classList.remove(line);
};


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn0) {
            box.innerText= "0";
            box.style.color="rgb(128, 0, 0)";
            turn0=false;
            turnP.innerText= `${name2}'s Turn`;
        } else {
            box.innerText ="X";
            box.style.color="black";
            turn0=true;
            turnP.innerText= `${name1}'s Turn`;
        }
        box.disabled=true;

        checkWinner();
    })
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled=true;
    }
};

const enableBoxes = () => {
    for (let box of boxes ) {
        box.disabled= false;
        box.innerText="";
    }
};

// const showWinner =(winner) => {
//     msg.innerText= `Congratulations, Winnner is ${winner}`;
//     msgContainer.classList.remove("hide");
// };

const showWinner = (winner) => {
    if (winner === "It's a Draw!") {
        msg.innerText = winner;
    } else {
        msg.innerText = `Congratulations, Winner is ${winner}`;
    }
    msgContainer.classList.remove("hide");
};

newGameBtn.forEach((btn) => {
    btn.addEventListener("click", restartGame);
  });

const checkWinner =() => {
    someoneWon=false;
    for (let pattern of winnerPattern) {

        let posVal1 =boxes[pattern[0]].innerText;
        let posVal2 =boxes[pattern[1]].innerText;
        let posVal3=boxes[pattern[2]].innerText;

        if (posVal1!="" && posVal2!="" && posVal3!="") {
            if(posVal1 === posVal2 && posVal2===posVal3) {
                if(posVal1 == "0") {
                    showWinner (name1);
                    disableBoxes();
                    turnP.classList.add("hide");
                } else{      
                    showWinner(name2);
                    disableBoxes(); 
                    turnP.classList.add("hide");  
                };
            }
        }
    }
    const allFilled = Array.from(boxes).every(box => box.innerText !== "");
    if (!someoneWon && allFilled) {
        showWinner("It's a Draw!");
        turnP.classList.add("hide");
    }
};


// newGameBtn.addEventListener("click",restartGame);
resetBtn.addEventListener("click",resetGame);

const showinner = (winner) => {
    if (winner === "It's a Draw!") {
        msg.innerText = winner;
    } else {
        msg.innerText = `Congratulations, Winner is ${winner}`;
    }
    msgContainer.classList.remove("hide");
};

// const checkWinner = () => {
//     let someoneWon = false;

//     for (let { pattern, line } of winPatterns) {
//         let [a, b, c] = pattern;
//         let val1 = boxes[a].innerText;
//         let val2 = boxes[b].innerText;
//         let val3 = boxes[c].innerText;

//         if (val1 !== "" && val1 === val2 && val2 === val3) {
//             const winnerName = val1 === "0" ? name1 : name2;
//             showWinner(winnerName);
//             disableBoxes();
//             turnP.classList.add("hide");

//             winLine.className = ""; // Reset classes
//             winLine.classList.add("win-line", line);

//             someoneWon = true;
//             return;
//         }
//     }

//     // ✅ Draw check after trying all win patterns
//     const allFilled = Array.from(boxes).every(box => box.innerText !== "");
//     if (!someoneWon && allFilled) {
//         showWinner("It's a Draw!");
//         turnP.classList.add("hide");
//     }
// };

