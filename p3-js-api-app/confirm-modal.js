export function confirmModal(message) {
  return new Promise(resolve => {
    const modal = document.getElementById('confirm-modal');
    const confirmContent = document.querySelector('.confirm-content')
    const text = document.getElementById('confirm-message');
    const okBtn = document.getElementById('confirm-ok');
    const cancelBtn = document.getElementById('confirm-cancel');

    const transactionModal = document.querySelector('#transaction-modal');
    transactionModal.querySelectorAll('button').forEach(btn => btn.disabled = true);
    transactionModal.querySelectorAll('input').forEach(input => input.disabled = true);


    text.textContent = message;
    modal.style.display = 'flex';



    setTimeout(() => {
      confirmContent.classList.add('display-alert')
    }, 100)


    function confirmResult(result) {
      transactionModal.querySelectorAll('button').forEach(btn => btn.disabled = false)
      transactionModal.querySelectorAll('input').forEach(input => input.disabled = false);

      confirmContent.classList.remove('display-alert');
      confirmContent.classList.add('hide-alert');
      

      setTimeout(() => {
        modal.style.display = 'none';
        
        confirmContent.classList.remove('hide-alert');
      }, 100);

      
      resolve(result)
    }




    okBtn.onclick = () => confirmResult(true);
    cancelBtn.onclick = () => confirmResult(false);

  });
}