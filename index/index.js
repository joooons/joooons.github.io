

$(document).ready(function() {

console.log('index.js at your service!');


const bar = document.getElementById('bar');
const menu = document.getElementById('menu');
const close = document.getElementById('close');




bars.onclick = () => {
    if (menu.classList.contains('hello')) { 
        menu.classList.remove('hello'); 
        $(bar).delay(1000).fadeIn();
    } 
    else { 
        $(bar).fadeOut(400, function() {
            menu.classList.add('hello'); 
        });
    }
}

close.onclick = () => {
    if (menu.classList.contains('hello')) { 
        menu.classList.remove('hello'); 
        $(bar).delay(1000).fadeIn();
    } 
    else { 
        $(bar).fadeOut(400, function() {
            menu.classList.add('hello'); 
        });
    }
}




});

// Why? Cuz I'm lazy...
function say(str) { console.log(str); }
function tab(obj) { console.table(obj); }






