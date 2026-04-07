import { confirmModal } from "./confirm-modal.js";
import { money } from "./data.js";

export async function resetMoney() {

  let resetMoney = {
    totalMoney: 100,
    debt: 0,
    bankMoney: 0,
    winJackpotPrice: []
  }

  const response = await confirmModal(`🤔Are you sure you want to reset game data❓`)

  
  if (response) {

    
      localStorage.setItem('colorGameMoney', JSON.stringify(resetMoney));
      money.totalMoney = resetMoney.totalMoney;
      money.debt = resetMoney.debt;
      money.bankMoney = resetMoney.bankMoney;
      money.winJackpotPrice = resetMoney.winJackpotPrice;
      
      document.getElementById('money').innerHTML = resetMoney.totalMoney;
  }
  else {
    return;
  }
  

}