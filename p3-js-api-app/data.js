import { alertModal } from "./alert-modal.js";


export let money = JSON.parse(localStorage.getItem('colorGameMoney')) ||{
  totalMoney: 100,
  debt: 0,
  bankMoney: 0,
  winJackpotPrice: []
};



export function borrowMoney() {

  if (money.totalMoney >= 500) {
    alertModal(`⚠️ You cannot borrow money since you have ${money.totalMoney} in your account.`)
    return;
  }
  const updatedData = { totalMoney: money.totalMoney += 500, debt: money.debt += 500}

  money = { ...money, ...updatedData };
  
  localStorage.setItem('colorGameMoney', JSON.stringify(money))
  document.querySelector('#money').innerHTML = money.totalMoney;


  alertModal(`😎 You have borrowed ${500} and added to your current Money. Your Current Money: ${money.totalMoney} and your debt: ${money.debt}`)
  

}


export function payDebtFromBank() {

  if (money.debt === 0) {
    return;
  }

  if (money.debt > money.bankMoney) {
    alertModal(`⚠️ Sorry! you don't have enough money to your bank to pay your debt. bank money: ${money.bankMoney}, debt: ${money.debt}`)
    return;
  }
  const updatedData = { debt: 0, bankMoney: money.bankMoney -= money.debt };

  money = {...money, ...updatedData};
  localStorage.setItem('colorGameMoney', JSON.stringify(money));

  alertModal(`😎 You paid your debt. And your updated bank money is ${money.bankMoney}. Thank you!`)


}


export function cashOutMoney(inputMoneyOut) {

    if (!inputMoneyOut) {
    alertModal(`⚠️ Please enter amount in input box!`)
    return;
  }



  if (inputMoneyOut > money.totalMoney) {

    alertModal(`⚠️ Invalid input! You cannot money greater that your current money. Input bellow or equal to your Money: ${money.totalMoney}`)
    return;
  }

  const updatedData = { bankMoney: money.bankMoney += inputMoneyOut, totalMoney: money.totalMoney -= inputMoneyOut };
  money = { ...money, ...updatedData };
  localStorage.setItem('colorGameMoney', JSON.stringify(money));
  alertModal(`😎 You transfer ${inputMoneyOut} to your bank account. Your current money is ${money.totalMoney} and your bank money is ${money.bankMoney}. Thank you!`)
  document.querySelector('#money').innerHTML = money.totalMoney;

}


export function cashInMoneyFromBank(inputInMoney) {
  
  if (inputInMoney > money.bankMoney) {

    alertModal(`⚠️ Invalid input! Make sure you input equal or less than to your bank money. Thank you!`)
    return;
  }

  if (!inputInMoney) {
    alertModal(`⚠️ Please enter amount in input box!`)
    return;
  }


  const updataData = { bankMoney: money.bankMoney -= inputInMoney, totalMoney: money.totalMoney += inputInMoney };

  money = { ...money, ...updataData }
  
  localStorage.setItem('colorGameMoney', JSON.stringify(money));
  alertModal(`😎 You cash-in ${inputInMoney} from your bank account. Your current money is ${money.totalMoney} and your bank money is ${money.bankMoney}. Thank you!`);
   document.querySelector('#money').innerHTML = money.totalMoney;

}

export const colors = [
  { color: 'red', colorCode: "#eb3030" },
  { color: "yellow", colorCode: "#ffff34" },
  { color: 'white', colorCode: "#e9e9e9" },
  { color: "blue", colorCode: "#004aeb" },
  { color: "green", colorCode: "#00a732" },
  { color: "pink", colorCode: "#ff6291" }
];

