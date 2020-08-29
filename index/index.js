

$(document).ready(function() {

console.log('index.js at your service!');

const bars = document.getElementById('bars');
const menu = document.getElementById('menu');




bars.onclick = () => {
    if (menu.classList.contains('hello')) { menu.classList.remove('hello'); } 
    else { menu.classList.add('hello'); }
}





});


function say(str) { console.log(str); }
function tab(obj) { console.table(obj); }






