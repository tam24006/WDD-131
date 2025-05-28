// let selectElem = document.querySelector('select');
// let logo_EM = document.querySelector('img');

// selectElem.addEventListener('change', changeTheme);

// function changeTheme(){
//     let current = selectElem.value;
//     if(current == "dark"){
//         //change body to dark
//         document.body.className="dark";

//         //change logo to new dark logo
//         logo_EM.setAttribute('src',"./image/byui-logo_dark.png")
//     }
//     else if (current == 'light'){
//         //change body from black to white
//         document.body.className='white';
//         //change logo to old logo
//         logo_EM.setAttribute('src','./images/byui-logo_blue.png')
//     }
// }



const themeSelector = document.querySelector('#theme');

// replace with code to select dropdown element out of the HTML (Hint: document.querySelector)

function changeTheme() {
// check to see what the current value of our select is.
// The current value is conveniently found in themeSelector.value!
    console.log(themeSelector.value);

    if (themeSelector.value === 'dark') {
        document.querySelector('body').classList.add('dark');
        document.querySelector('img').src = 'byui-logo_white.png';
    } else {
        document.querySelector('body').classList.remove('dark');
        document.querySelector('img').src = 'byui-logo_blue.webp';
    }
}

// add an event listener to the themeSelector element here.
// Use the changeTheme function as the event handler function.
themeSelector.addEventListener('change', changeTheme);