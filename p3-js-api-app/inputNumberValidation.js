export function inputNumberValidation(element) {
  // validate input for bet not accepting - , + , .
  element.addEventListener('input',  (event)=>{
  
  //  event.target.value = event.target.value.replace(/[^0-9]/g, "")
  
    
     // remove non-numbers
    let inPutValue = event.target.value.replace(/[^0-9]/g, "");
  
    // remove leading zeros (but keep single zero)
    inPutValue = inPutValue.replace(/^0+(?!$)/, "");
  
    event.target.value = inPutValue;
  })
}