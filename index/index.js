
$(document).ready(function () {

    console.log('index.js at your service!');




    const bar = document.getElementById('bar');
    const menu = document.getElementById('menu');
    const close = document.getElementById('close');
    const menuItem = document.getElementsByClassName('menu-item');
    const intro = document.getElementById('intro');
    const bkgdImg = document.getElementsByClassName('bkgd-img');
    const foreground = document.getElementsByClassName('foreground');
    const topLid = document.getElementsByClassName('top-lid');
    const botLid = document.getElementsByClassName('bot-lid');



    // $("#behind").hide();
    document.fonts.ready.then(() => {
        $("#spinner").fadeOut(0, () => {
            $("#behind").fadeIn(1000);
        });
    });

    const menulist = {
        open: function () {
            $(bar).fadeOut(200, function () { menu.classList.add('show'); });
            document.body.classList.add('noscroll');
        },
        close: function () {
            menu.classList.remove('show');
            $(bar).delay(300).fadeIn(200);
            document.body.classList.remove('noscroll');
        }
    }







    window.onresize = () => {
        moveAvatar();
    }

    window.onscroll = () => {
        let H = window.innerHeight;
        // let W = window.innerWidth;
        let Y = window.scrollY;

        if (Y > 0.9 * H) { bar.classList.add('hide'); }
        else { bar.classList.remove('hide'); }

        if (Y > 0) { intro.classList.add('smile'); }
        else { intro.classList.remove('smile'); }
        moveAvatar();
    }

    function moveAvatar() {
        let W = window.innerWidth;
        let Y = window.scrollY;
        if (W > 992) {
            intro.style.backgroundPositionX = (10) + "vw";
            intro.style.backgroundPositionY = (20 + (Y / 20)) + "vh";
        } else {
            intro.style.backgroundPositionX = (20) + "vw";
            intro.style.backgroundPositionY = (45 + (Y / 40)) + "vh";
        }
    }





    bars.onclick = () => {
        if (menu.classList.contains('show')) { menulist.close(); }
        else { menulist.open(); }
    }

    close.onclick = () => {
        if (menu.classList.contains('show')) { menulist.close(); }
        else { menulist.open(); }
    }

    for (i = 0; i < menuItem.length; i++) {
        menuItem[i].onclick = () => { menulist.close(); }
    }




    for (i = 0; i < foreground.length; i++) {
        let num = i;
        foreground[num].onmouseover = () => {
            topLid[num].classList.add('show');
            botLid[num].classList.add('show');
            bkgdImg[num].classList.add('blur');
        }
    }

    for (i = 0; i < foreground.length; i++) {
        let num = i;
        foreground[i].onmouseout = () => {
            topLid[num].classList.remove('show');
            botLid[num].classList.remove('show');
            bkgdImg[num].classList.remove('blur');
        }
    }











});

// Why? Cuz I'm lazy...
function say(str) { console.log(str); }
function tab(obj) { console.table(obj); }






