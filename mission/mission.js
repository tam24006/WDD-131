let selectElem = document.querySelector('select');
let logo_EM = document.querySelector('img');

selectElem.addEventListener('change', changeTheme);

function changeTheme(){
    let current = selectElem.value;
    if(current == "dark"){
        //change body to dark
        document.body.className="dark";

        //change logo to new dark logo
        logo_EM.setAttribute('src',"./image/byui-logo_dark.png")
    }
    else if (current == 'light'){
        //change body from black to white
        document.body.className='white';
        //change logo to old logo
        logo_EM.setAttribute('src','./images/byui-logo_blue.png')
    }
}
