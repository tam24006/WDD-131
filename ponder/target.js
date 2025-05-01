const para1 = document.querySelector('#intro');

let logo = document.querySelector('img');
selectElem.addEventListener('change', changeTheme);

function changeTheme(){
    let current = selectElem.value;
    if (current == "dark"){
        document.body.className = 'dark';
        
        // cahnge body to dark
        // cahnge logo to the new logo

    } else {
        // remove dark class from body
        // cahnge logo back to the orginal loop

    }

}
