

$(document).ready(function() {

console.log('index.js at your service!');


const bar = document.getElementById('bar');
const menu = document.getElementById('menu');
const close = document.getElementById('close');
const menuItem = document.getElementsByClassName('menu-item');
const foreground = document.getElementsByClassName('foreground');
const topLid = document.getElementsByClassName('top-lid');
const botLid = document.getElementsByClassName('bot-lid');




bars.onclick = () => {
    if (menu.classList.contains('hello')) { menulist.close(); } 
    else { menulist.open(); }
}

close.onclick = () => {
    if (menu.classList.contains('hello')) { menulist.close(); } 
    else { menulist.open(); }
}

for ( i=0 ; i<menuItem.length ; i++ ) {
    menuItem[i].onclick = () => { menulist.close(); }
}




for ( i=0 ; i<foreground.length ; i++ ) {
    let num = i;
    foreground[num].onmouseover = () => {
        topLid[num].classList.add('show');
        botLid[num].classList.add('show');
    }
}

for ( i=0 ; i<foreground.length ; i++ ) {
    let num = i;
    foreground[i].onmouseout = () => {
        topLid[num].classList.remove('show');
        botLid[num].classList.remove('show');
    }
}





const menulist = {
    open : function() {
            $(bar).fadeOut(200, function() { menu.classList.add('hello'); });
            document.body.classList.add('noscroll');
        },
    close : function() {
            menu.classList.remove('hello'); 
            $(bar).delay(300).fadeIn(200);
            document.body.classList.remove('noscroll');
        }
}





});

// Why? Cuz I'm lazy...
function say(str) { console.log(str); }
function tab(obj) { console.table(obj); }





