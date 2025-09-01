let boxes=document.querySelectorAll(".box");
let msg=document.querySelector("#msg");
let msgContainer= document.querySelector(".msg-container");
let newgamebtn= document.querySelector(".newbtn");
let resetbtn= document.querySelector(".reset");
let currentPlayerDisplay = document.querySelector("#current-player");
let playerXWinsDisplay = document.querySelector("#player-x-wins");
let playerOWinsDisplay = document.querySelector("#player-o-wins");
let drawsDisplay = document.querySelector("#draws");

let  turnO=true;
let playerXWins = 0;
let playerOWins = 0;
let draws = 0;

const winpatterns=[ 
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];



  boxes.forEach((box)=>{
   box. addEventListener("click",()=>{
   if(turnO){
    box.innerText="O";
    box.style.color="blue";
     box.style.fontSize="25px";
   
    turnO=false;
   }else{
    box.innerText="X";
    box.style.color="red";
     box.style.fontSize="25px";
    turnO=true;
   }
   box.disabled=true;
   updateCurrentPlayerDisplay();
   checkwinner();
    })
  
  });

  const newGame=()=>{
turnO=true;
    enableboxes();
    msgContainer.classList.add("hide");
    updateCurrentPlayerDisplay();
  }
  const enableboxes=()=>{
    for(let box of boxes){
    box.disabled=false;
    box.innerText="";
    }
  }

  const disabledboxes=()=>{
    for(let box of boxes){
      box.disabled=true;
    }
  }

   const showwinner=(winner)=>{
     msg.innerText=`Winner is ${winner}`;
     msgContainer.classList.remove("hide");
     disabledboxes();
     updateWinCount(winner);
   }
   
const checkwinner = ()=>{  
    for(let pattern of winpatterns){  
      let pos1val=boxes[pattern[0]].innerText;  
         let pos2val=boxes[pattern[1]].innerText;  
            let pos3val=boxes[pattern[2]].innerText;  
  
            if(pos1val!="" && pos2val!="" && pos3val!=""){  
              if(pos1val===pos2val && pos2val===pos3val){  
                console.log("winner",pos1val);  
                showwinner(pos1val)  
                return;  
              }  
            }  
    }  
    checkDraw();
  };

const checkDraw = () => {
  let isDraw = true;
  for (let box of boxes) {
    if (box.innerText === "") {
      isDraw = false;
      break;
    }
  }
  if (isDraw) {
    showDraw();
  }
};

  const showDraw = () => {
  msg.innerText = "It's a Draw!";
  msgContainer.classList.remove("hide");
  disabledboxes();
  updateDrawCount();
};

const updateCurrentPlayerDisplay = () => {
  currentPlayerDisplay.innerText = turnO ? "O" : "X";
};

const updateWinCount = (winner) => {
  if (winner === "X") {
    playerXWins++;
    playerXWinsDisplay.innerText = playerXWins;
  } else if (winner === "O") {
    playerOWins++;
    playerOWinsDisplay.innerText = playerOWins;
  }
};

const updateDrawCount = () => {
  draws++;
  drawsDisplay.innerText = draws;
};
  newgamebtn.addEventListener("click",newGame);

  