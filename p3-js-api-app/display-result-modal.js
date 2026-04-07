import { setChosenColor } from "./choose-color.js";
import { money, colors } from "./data.js";
import { soundPlay } from "./play-sound.js";


export async function displayModalResult(cohereAnnounce, result, matches, winAmount, chosenColor) {
  
 
  let playAgainHTML = `<button  id="play-again-btn">🎮 Play Again</button>`;
  let jackpotAnnounce = `<p id= "jackpot-message">🎉🎉 You win with jackpot Click Jackpot button to multiply your bet: ${winAmount / 3} multiply upto 100x </p>`
  let jackpotButtonHTML = `<div><button id="jackpot-btn">🎰 Jackpot</button></div>`
 

  let aiResponse = await cohereAnnounce(result, matches, winAmount)

   // display color result
  let colorResult = "";
  result.forEach(color=> colorResult +=`<span class ="result-color" style="background-color:${color.colorCode}">${color.color}</span>` )
    
    // to get the color code from the color data and apply to the background color
   const getColorCode = colors.find(color => {
     return color.color == chosenColor
   })
    

    
    // display modal result
    document.getElementById('result-container-modal').innerHTML =
    `
    <div class = "result-modal-content">
      <h3 id="result-heading">Result</h3>
      <p id="aiText">${aiResponse}</p>
      <div id="result">${colorResult}</div>
      <p id = "modal-money">Money: ${money.totalMoney}</p>
      <span style= "background-color: ${getColorCode.colorCode}" id="color-pick-modal">Your Color</span>
      ${matches ===3? jackpotAnnounce : ""}
      ${matches === 3? jackpotButtonHTML : playAgainHTML}
      
    </div>
    `;

  
    // to display the modal
  document.getElementById('result-container-modal').style.display = "flex"

  
  if (matches === 0) {
    soundPlay("./sounds/failure-1-89170.mp3")
  }

  if (matches > 0) {
    soundPlay("./sounds/you-win-sequence-1.mp3")
  }

  if (matches < 3) {
    document.querySelector('#play-again-btn').addEventListener('click', (event) => {
      setChosenColor(null);

      exitModal(event)
    });
  }
  
 


    

  ///// this code is for jackpot only if player get 3 mathes with his/her color pick
  document.querySelector('#jackpot-btn')?.addEventListener('click', (event) => {
   
    const multiplierList = [5, 10, 20, 50, 100];
    let random = Math.floor(Math.random() * multiplierList.length);
    let multiplier = multiplierList[random];

    const bet = winAmount / 3;
    const jackpotPrice = bet * multiplier;

    money.totalMoney += jackpotPrice;
    localStorage.setItem('colorGameMoney', JSON.stringify(money))
    document.querySelector('#money').innerHTML = money.totalMoney;
    document.querySelector('#modal-money').innerHTML =`Money: ${money.totalMoney}` ;
    
    document.querySelector('#jackpot-message').innerHTML = `🎉🎉 Wow Congratulation! Your bet: <span class = "bet-design">${bet}</span> x <span class = "bet-design">${multiplier}</span> and you win another <span class = "bet-design">${jackpotPrice}</span>. 🎉🎉 `
    
      

  soundPlay('./sounds/congratulations-sfx-442129.mp3')
      
        
    // to remove the jackpot button
    event.target.remove();
   
    // to add the play again button by create it and append.
    const newPlayBtn = document.createElement('button');
    newPlayBtn.innerHTML = "🎮 Play Again";
    newPlayBtn.id = "play-again-btn"
    document.querySelector('#result-container-modal').firstElementChild.appendChild(newPlayBtn);

    // exit the modal when click the play again button
    newPlayBtn.addEventListener('click', (event) => {
        setChosenColor(null);


      exitModal(event)
    });



    })

    
}


 

export function exitModal(event) {


    event.preventDefault();
    event.stopPropagation()
    document.getElementById('result-container-modal').style.display = "none";

    document.querySelectorAll('.color-pick').forEach(btn=>btn.innerHTML = "");
  }