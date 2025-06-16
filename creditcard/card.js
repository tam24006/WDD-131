// document.querySelector('#credit-card').addEventListener('submit', submitHandler);


// function submitHandler(event) {
//     event.preventDefault();
//     displayError('');
//     const cardNum = this.cardNumber.value;
  
//     let errorMsg = '';
  
//     if (isNaN(cardNum)) {
//       errorMsg += 'Card number is not a valid number\n';
//     } else if (!isCardNumberValid(cardNum)) {
//       errorMsg += 'Card number is not a valid card number\n';
//     }
  
//     const month = parseInt(this.cardMonth.value);
//     const year = parseInt(this.cardYear.value);
//     const today = new Date();
//     const expDate = new Date(year, month - 1);
  
//     if (expDate <= today) {
//       errorMsg += 'Card expiration date must be in the future\n';
//     }
  
//     if (errorMsg) {
//       displayError(errorMsg);
//       return false;
//     }
  
//     return true;
//   }

//   function displayError(msg) {
//     document.querySelector('.errorMsg').textContent = msg;
//   }
  
//   function isCardNumberValid(number) {
//     return number === '1234123412341234';
//   }




  function isCardNumberValid(number) {
	// normally we would contact a credit card service...but we don't know how to do that yet. So to keep things simple we will only accept one number
	return number === '1234123412341234'
}
function displayError(msg) {
	// display error message
	document.querySelector('.errorMsg').innerHTML = msg
}
function submitHandler(event) {
	event.preventDefault()
	let errorMsg = ''
	console.log(this.cardNumber.value)
	// clear any previous errors
	displayError('')
	// check credit card number
	if (isNaN(this.cardNumber.value)) {
		// it is not a valid number
		errorMsg += 'Card number is not a valid number\n'
	} else if (!isCardNumberValid(this.cardNumber.value)) {
		// it is a number, but is it valid?
		errorMsg += 'Card number is not a valid card number\n'
	}
	if (errorMsg !== '') {
		// there was an error. stop the form and display the errors.
		displayError(errorMsg)
		return false
	}
	return true
}

document.querySelector('#credit-card').addEventListener('submit', submitHandler)
