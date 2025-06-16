function togglepaymentDetails(){
    let creditInput = document.querySelector('#creditcardNumber');
    let paypalInput = document.querySelector('#paypalUsernameContainer input');

    let Value = document.querySelector('#paymentMethod').Value;

    paypalInput.required=false;
    creditInput.required=false;
    paypalContainer.classList.add('hide');
    creditCardContainer.classList.add('hide');
    if (Value == 'creditCard'){
        creditCardContainer.classList.remove('hide');
        creditCardContainer.required=true;
    } else if(Value == 'paypal'){
        paypalContainer.classList.remove('hide');
        paypalInput.required=true;
    }

}
 const theForm = document.querySelector('#ch')
 
 
 
 
 
Element.classList.add('classname')
Element.classList.remove('classname')