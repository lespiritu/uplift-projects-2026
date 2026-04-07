export function alertModal(message) {

  
 
  const allInput = document.querySelectorAll('input');
 
  allInput.forEach(input=> input.disabled=true)

  const alertModal = document.querySelector('#alert-modal');
  const alertContent = document.querySelector('.alert-content');
  const alertMessage = document.querySelector('#alert-message');
  const exitAlert = document.querySelector('#exit-alert-modal');


  const allDOMBtn = document.querySelectorAll('button')

  alertModal.style.display = "flex"
  alertMessage.innerHTML = message;

 // RESET animation
  alertContent.classList.remove('display-alert');

setTimeout(() => {
  alertContent.classList.add('display-alert')
  }, 300)


  allDOMBtn.forEach(btn => btn.disabled = true);

  
  
  exitAlert.addEventListener('click', () => {
   
    alertContent.classList.remove('display-alert');

    alertContent.classList.add('hide-alert');
    allDOMBtn.forEach(btn => btn.disabled = false);
    allInput.forEach(input=> input.disabled=false)

    setTimeout(() => {
      alertModal.style.display = "none";
      alertContent.classList.remove('hide-alert');
    }, 300);
    
  })



  
}

