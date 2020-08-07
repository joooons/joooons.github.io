console.log('itwork');

{/* <i class="fas fa-envelope"></i> */}


const main = document.querySelector('#main');
const menu = document.querySelector('#menu');

const icon4 = document.querySelector('i.fa-envelope');
const menuToggle = document.querySelector('#menu-toggle');



const menuWidth = {
    min : '3em',
    max : '200px'
}



// EVENT HANDLERS ________________________________________

// main.onclick = () => { console.log(window.scrollY); }

icon4.onclick = () => { window.scrollTo(0,300); }

document.onwheel = () => {
    let a = Math.floor(window.scrollY);
    let b = "scroll: ";
    // document.querySelector('.container').style.height = window.innerHeight;
    // console.log('window innerheight is ', window.innerHeight);
    document.querySelector('#floatingBox').innerHTML = b + a;
    // console.log(window.scrollY); 
}



menuToggle.onclick = () => {

    menuWidthToggle();
}

window.onresize = () => {
    adjustPageHeight();
}


// FUNCTIONS ____________________________________

menuWidthToggle();

function menuWidthToggle() {
    let a = main.style.paddingLeft;
    let b = menu.style.width;
    // console.log(a,b);
    main.style.paddingLeft = (a == menuWidth.max) ? menuWidth.min : menuWidth.max;
    menu.style.width = (b == menuWidth.max) ? menuWidth.min : menuWidth.max;
}



adjustPageHeight();

function adjustPageHeight() {
    let a = window.innerHeight;
    let b = "height: ";
    // document.querySelector('.container').style.height = window.innerHeight;
    // console.log('window innerheight is ', window.innerHeight);
    document.querySelector('#floatingBox').innerHTML = b + a;
}

