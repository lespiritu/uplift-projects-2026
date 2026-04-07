
import { money, colors, borrowMoney, payDebtFromBank,  cashOutMoney, cashInMoneyFromBank} from "./data.js";
import { displayModalResult } from "./display-result-modal.js";
import { cohereAnnounce } from "./cohere-ai-announcer.js";
import { chosenColor, setChosenColor, betTokenOnColor } from "./choose-color.js";
import { inputNumberValidation } from "./inputNumberValidation.js"
import { resetMoney } from "./reset-money.js";
import { alertModal } from "./alert-modal.js"
import { soundPlay } from "./play-sound.js";




// to put the total money data to the html
let moneyDOM = document.querySelector('#money');
moneyDOM.innerHTML = money.totalMoney;

const inputBet = document.getElementById('bet')

// for input bet validation
inputNumberValidation(inputBet)


// function when clicking the bet buttons
function betByButtons() {
  // code for input bet by clicking the bet button
  document.querySelectorAll('.bet-button').forEach(btn => {
  btn.addEventListener('click', (event) => {
    
    let selectedValue = event.currentTarget.dataset.betValue;
   
    if (money.totalMoney < Number(inputBet.value) + Number(selectedValue) ) {
      alertModal('⚠️ Invalid input!');
      return;
    }

    // this code is if you click the all in button
    if (selectedValue === "allIn") {
      inputBet.value = money.totalMoney;
      
      // if you already chosen a color it will automatic update the bet
      if (chosenColor) {
        betTokenOnColor(chosenColor, event)
      }
      return;
    }

   inputBet.value = Number(inputBet.value) + Number(selectedValue);
    
    if ( chosenColor) {
      betTokenOnColor(chosenColor, event)
    }

  })
})  
}

// invoking function
betByButtons()
 
// function in clicking the colo buttons. player to selec color to bet
function selectingColor() {
  
// This code is to choose the color by clicking the button color.
// calling the function when clicking the color button passing the data set for color
const colorButtons = document.querySelectorAll('.color-pick');

  colorButtons.forEach(btn => {
  btn.addEventListener('click', (event) => {
   
    const selectedColor = event.currentTarget.dataset.color;

    // this code the input bet is blank or input bet is greater than the total money or bet is greater than 1Million
    if (Number(inputBet.value) <= 0 || Number(inputBet.value) > money.totalMoney || Number(inputBet.value) > 1000000) {
      alertModal('⚠️ Invalid bet amount!')
      inputBet.value = "";


      return;
   }

    // this code if you click the bet token, it will be remove
    if (event.target !== event.currentTarget) {
      setChosenColor(null);

      event.currentTarget.innerHTML = "";


      return;
    }



     // sounds code - for drop chip
    if (inputBet.value) {

      soundPlay('./sounds/poker-chip-drop-1.mp3')
   }

    
   betTokenOnColor(selectedColor, event) 
   
    

  

  })
})
}




// invoking function
selectingColor()



function playGame(event) {
  event.stopPropagation()
  event.preventDefault();

  if (!inputBet.value) {
    alertModal('⚠️ Please input your Bet!')
    return;
  }

  if(!chosenColor){
    alertModal('⚠️ Please select a color!')
    return;
  }


  // generate 3 random colors
  const result = [];
  for(let i=0; i<3; i++){
    result.push(colors[Math.floor(Math.random()*colors.length)]);
  }

  // check matches
  const matches = result.filter(color => color.color === chosenColor).length;
  
  // compute the win amount
  let winAmount = (matches * Number(inputBet.value));
  
  // update the money data if player color matches to the result colors or not
  money.totalMoney = matches ? money.totalMoney + winAmount : money.totalMoney - Number(inputBet.value);
  
  // update the money in DOM
  moneyDOM.innerHTML = money.totalMoney;

  // to save data in local storage
  localStorage.setItem('colorGameMoney', JSON.stringify(money))

  // clear the bet text in the input bet field
  inputBet.value = "";
  
  // calling the function to display the Modal with AI Cohere as announcer,
  // color result, how many color matches, win ammount, your chosen color
  displayModalResult(cohereAnnounce, result, matches, winAmount, chosenColor)


 
}

 

// to activate the button to play when click play button
document.querySelector('#playBtn').addEventListener('click', playGame)




    
// to remove value of input of bet
inputBet.addEventListener('focus', () => {
  setChosenColor(null) ;
  document.querySelectorAll('.color-pick').forEach(btn => btn.innerHTML = "");
  inputBet.value = ""


})


document.querySelector('#btn-clear').addEventListener('click', () => {
  inputBet.value = "";
  document.querySelectorAll('.color-pick').forEach(btn => btn.innerHTML = "");
  setChosenColor(null)

})


// This code is for how to play modal

const btnHowToPlay = document.querySelector('#btn-how-to-play');
btnHowToPlay.addEventListener('click', () => {
  document.querySelector('#how-to-play-modal').style.display = "block";
})



// This code and bellow is for transaction modal -----------------------------------------------------------------------------

function displayTotalMoney() {
  const trasactionTotalMoney = document.querySelector('#transaction-total-money');
  trasactionTotalMoney.innerHTML = `₱${money.totalMoney}`
}

displayTotalMoney();


function displayDebtAndBank() {
  const transactionDebt = document.querySelector('#transaction-debt');
  const transactionBank = document.querySelector('#transaction-bank');

  transactionDebt.innerHTML = `Debt Amount: ₱${money.debt}`;
  transactionBank.innerHTML = `Bank Account: ₱${money.bankMoney}`
}

displayDebtAndBank();

// will display the modal
document.querySelector('.transaction-btn').addEventListener('click', () => {
  displayTotalMoney();
  displayDebtAndBank();
  document.querySelector('#transaction-modal').style.display = "block"
})

// will close the modal
document.querySelector('#exit-transaction-modal').addEventListener('click', () => {
  document.querySelector('#transaction-modal').style.display = "none"
})

// event for borrow money
const btnBorrow = document.querySelector('#borrow-btn');
btnBorrow.addEventListener('click', () => {
  borrowMoney();
  displayTotalMoney();
  displayDebtAndBank();
})

// event for pay debt from bank
const btnPayDebt = document.querySelector('#btn-pay-debt')
btnPayDebt.addEventListener('click', () => {
  payDebtFromBank();
  displayDebtAndBank();
})

// declaration for input cash in or cash out
const inputCashInOut = document.querySelector('#input-cash-in-out')
// for input bet validation
inputNumberValidation(inputCashInOut);

// event for cash in from bank
const btnCashIn = document.querySelector('#btn-cash-in');
btnCashIn.addEventListener('click', () => {
  cashInMoneyFromBank(Number(inputCashInOut.value));
  inputCashInOut.value = "";
  displayTotalMoney();
  displayDebtAndBank();
});

// event for cash out to transfer money from account to bank account
const btnCashOut = document.querySelector('#btn-cash-out');
btnCashOut.addEventListener('click', () => {
  cashOutMoney(Number(inputCashInOut.value));
  inputCashInOut.value = "";
  displayTotalMoney();
  displayDebtAndBank();
})

// event to reset game data
const btnReset = document.querySelector('#btn-reset');
btnReset.addEventListener('click', async () => {
  
  await resetMoney();
  displayTotalMoney();
  displayDebtAndBank();
})




// This code is to display how to play modal event
const exitHowToModal = document.querySelector('#exit-how-to-play-modal');
exitHowToModal.addEventListener('click', () => {
  const howToModal = document.querySelector('#how-to-play-modal');
  howToModal.style.display = "none"
});

