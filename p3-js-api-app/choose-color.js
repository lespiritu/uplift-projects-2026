export let chosenColor = null;


export function setChosenColor(color){
  chosenColor = color;
}

// function to choose color to bet
export function betTokenOnColor(color, event) {

  


  event.preventDefault();
  event.stopPropagation();
  const inputBet = document.querySelector('#bet');
  

  
  chosenColor = color;

  // to clear the inner text for each color button
  document.querySelectorAll('.color-pick').forEach(btn=>btn.innerHTML = "");
 
  if (inputBet.value) {

    
    
    let tokenClass = "";

    switch ((inputBet.value).length) {
      case 1: tokenClass = "piso-bet"
      break;
    
      case 2: tokenClass = "ten-bet"
      break;
    
      case 3: tokenClass = "hundred-bet"
      break;
    
      case 4: tokenClass = "thousand-bet"
      break;
      default: tokenClass ="ten-th-bet"
    }

    // to put the element of bet token inside the color button
    document.querySelector(`.${color}`).innerHTML = `<div class= "token-bet ${tokenClass}" >${inputBet.value}</div>`;
    
    
  }

}