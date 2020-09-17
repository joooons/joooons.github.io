

console.log('logic.js at your service.');




//  MM      MM    MMMM    MMMMMM    MMMMMM    MMMM    MMMMMM    MM      MMMMMMMM    MMMM    
//  MM      MM  MM    MM  MM    MM    MM    MM    MM  MM    MM  MM      MM        MM    MM  
//  MM      MM  MMMMMMMM  MMMMMM      MM    MMMMMMMM  MMMMMM    MM      MMMMMMMM    MM      
//  MM      MM  MM    MM  MM    MM    MM    MM    MM  MM    MM  MM      MM            MM    
//    MM  MM    MM    MM  MM    MM    MM    MM    MM  MM    MM  MM      MM        MM    MM  
//      MM      MM    MM  MM    MM  MMMMMM  MM    MM  MMMMMM    MMMMMM  MMMMMMMM    MMMM    

var result = {};
    result.word = '';
    result.category = '';
    result.frequency = 0;
    result.arr = [];

const En_to_He = {
    'a' : '&#1488;',
    'A' : '&#1470;',

    'b' : '&#1489;',
    'B' : '&#64305;',
    
    'c' : '&#64299;',
    'C' : '&#64301;',

    'd' : '&#1491;',
    'D' : '&#64307;',

    'e' : '&#1461;',
    'E' : '&#1461;',

    'f' : '&#1496;',
    'F' : '&#64312;',

    'g' : '&#1490;',
    'G' : '&#64306;',

    'h' : '&#1492;',
    'H' : '&#64308;',

    'i' : '&#1460;',
    'I' : '&#1460;',

    'j' : '&#1495;',
    'J' : '&#1498;&#1456;',

    'k' : '&#1499;',
    'K' : '&#64315;',

    'l' : '&#1500;',
    'L' : '&#64316;',

    'm' : '&#1502;',
    'M' : '&#64318;',

    'n' : '&#1504;',
    'N' : '&#64320;',
    
    'o' : '&#1465;',
    'O' : '&#1465;',
    'ø' : '&#1465;',

    'p' : '&#1508;',
    'P' : '&#64324;',

    'q' : '&#1511;',
    'Q' : '&#64327;',

    'r' : '&#1512;',

    't' : '&#1514;',
    'T' : '&#64330;',

    's' : '&#1505;',
    'S' : '&#64321;',

    'u' : '&#1467;',

    'v' : '&#64298;',
    'V' : '&#64300;',

    'w' : '&#1493;',
    'W' : '&#64309;',

    'x' : '&#1510;',
    'X' : '&#64326;',

    'y' : '&#1497;',
    'Y' : '&#64313;',
    // 'y' : 'י',

    'z' : '&#1494;',
    'Z' : '&#64310;',


    '°' : '&#1498;',
    '$' : '&#1498;',

    'π' : '&#1507;',

    'μ' : '&#1501;',

    '#' : '&#1509;',
    "≈" : '&#1509;',

    '!' : '&#1503;',
    '˜' : '&#1503;',
    
    '&' : '&#1451;',
    '‡' : '&#1451;',
    ',' : '&#1462;', 
    "\<" : '&#1462;',

    "\–" : '&#1425;',

    ';' : '&#1464;',
    "\:" : '&#1464;',

    '∂' : '&#1468;',
    '{' : '&nbsp;',
    '}' : '&#1458;',    
    
    "\‘" : '&#1457;',

    "\'" : '&#1463;',
    "\"" : '&#1463;',

    "\[" : '&#1506;',

    "\]" : '&#1456;',
    "\“" : '&#1456;',

    "\/" : '&#64331;',

    "÷" : '/'
    
};

const vowels = [
    'e', 'E', 'i', 'I', 'o', 'O', 'ø', 'u', '&', ',', '\<',
    '\–', ';', '\:', '}', '\‘', "\'", '\"', '\]', '\“', '‡'
]
    
const addBoxFn = {
    getIndex : (el, str) => {
        for ( i=0 ; i<$(str).length ; i++ ) { if ( el == $(str).get(i)) return i; }
    },
    addLine : () => {
        let index = $('.add-form').length;
        let str = '<form class="no-submit add-form">';
        str += '<div class="form-row form-group">';
        str += '<div class="col-3 col-md-3"></div>';
        str += '<div class="input-group col-9 col-md-9">';
        str += '<input type="text" class="form-control add-tab" placeholder="">';
        str += '<div class="input-group-append">';
        str += '<button type="button" class="btn btn-primary" tabindex="-1" onclick="addBoxFn.removeLine(this)">';
        str += '<b>&#x2715;</b></button></div></div></div></form>';
        $(str).insertAfter( $('.add-form').get(index-2) );
    },
    removeLine : (el) => {
        $(el).parents().eq(2).remove();
        addBoxFn.fillResult();
        addBoxFn.display();
        console.table(result);
    },
    display : () => {        
        let str = JSON.stringify(result);
        $('#total').html(str);
    },
    fillResult : () => {
        let $elem = $('.add-tab');
        let len = $elem.length;
        result.category = $elem.eq(1).val();
        result.frequency = $elem.eq(2).val();
        result.arr = [];
        for ( i=3 ; i<len-2 ; i++ ) {
            result.arr.push( addBoxFn.parse($elem.eq(i).val()) );
        }
    },
    parse : str => {
        let newStr = str.replace( /[,;.]/g, "/");
        newStr = newStr.replace( /[\s\,\;\.\/][\s\,\;\.\/]+/g, "/");
        let arr = newStr.split('/');
        arr.forEach( (val,i) => {
            if (val == '') arr.splice(i,1);
        });
        return arr;
    },
    clear : () => {
        let len = $('.add-tab').length;
        for ( i=0 ; i<len ; i++ ) { $('.add-tab').eq(i).val(''); }
        for ( i=4 ; i< len-1 ; i++ ) {
            let elem = $('.add-tab').eq(4).parents().eq(2);
            elem.remove();
        }
    }
};

const tempBank = [];

const questionRef = [];

const scoreArr = [];

function scoreObj() {
    this.gotMain = 0;
    this.gotAny = 0;
    this.gotThisMany = 0;
    this.defs = [];
    this.alreadyGot = [];
}








//  MMMMMMMM  MM      MM  MMMMMMMM  MM    MM  MMMMMM        MM    MM    MMMM    MM    MM  MMMMMM    MM      MMMMMMMM  MMMMMM      MMMM    
//  MM        MM      MM  MM        MMMM  MM    MM          MM    MM  MM    MM  MMMM  MM  MM    MM  MM      MM        MM    MM  MM    MM  
//  MMMMMMMM  MM      MM  MMMMMMMM  MM  MMMM    MM          MMMMMMMM  MMMMMMMM  MM  MMMM  MM    MM  MM      MMMMMMMM  MMMMMM      MM      
//  MM        MM      MM  MM        MM    MM    MM          MM    MM  MM    MM  MM    MM  MM    MM  MM      MM        MM    MM      MM    
//  MM          MM  MM    MM        MM    MM    MM          MM    MM  MM    MM  MM    MM  MM    MM  MM      MM        MM    MM  MM    MM  
//  MMMMMMMM      MM      MMMMMMMM  MM    MM    MM          MM    MM  MM    MM  MM    MM  MMMMMM    MMMMMM  MMMMMMMM  MM    MM    MMMM    

$(document).on('submit', '.no-submit', function(ev) {
    ev.preventDefault();
});

$(document).on('change', '.add-tab', function(ev) {
    let num = addBoxFn.getIndex(ev.target, '.add-tab');
    if ( num == 0 ) {
        let str = $('#add-word').val();

        let arr = strToSyllableArr(str).reverse();
        str = arr.join('');
        arr = str.split('');
    
        Object.keys(En_to_He).forEach( key => {
            arr.forEach( (char,i) => {
                if ( char == key ) arr[i] = En_to_He[key];
            });
        });
        str = arr.join('');
        result.word = str;
        $('#output').html( str );
    }
    if ( num > 0 ) { if (result.word == '') { return ev.target.value = ''; } }
    if ( num == $('.add-tab').length - 2 ) addBoxFn.addLine();
    $('.add-tab').get(num+1).focus();
    addBoxFn.fillResult();
    addBoxFn.display();

});

$(document).on('change', '.view-input', function(ev) {
    let num = $('.view-input').length;
    let index = -1;     // arbitrary -1
    for ( i=0 ; i<num ; i++ ) { if ( ev.target == $('.view-input').get(i) ) { index = i; } }
    index++;
    if (index == num) index = 0;
    $('.view-input').get(index).focus();
    let viewStart = $('.view-input').get(0).value;
    let viewEnd = $('.view-input').get(1).value;
    if ( viewEnd == '' ) viewEnd = bank.length;
    fillTable(viewStart,viewEnd);
    
});

$(document).on('change', '.quiz-form', function(ev) {
    let num = $('.quiz-question').length;
    let index = -1;
    for ( i=0 ; i<num ; i++ ) { if ( ev.target == $('.quiz-question').get(i) ) index = i; }
    index++;
    if ( index == num ) index = 0;
    // $('.quiz-question').get(index).focus();
});

$(document).on('change', '.quiz-question', function(ev) {
    let ans = ev.target.value;

    let num = $('.quiz-question').length;
    let index = -1;
    for ( i=0 ; i<num ; i++ ) { 
        if ( ev.target == $('.quiz-question').get(i) ) index = i; 
    }
    let ref = questionRef[index];
    
    // let range = tempBank[ref].arr.length;
    // console.log(range);

    let isCorrect = false;
    tempBank[ref].arr.forEach( (list,i) => {
        if ( scoreArr[ref].alreadyGot.includes(i) ) return;
        if (list.includes(ans)) {
            isCorrect = true;
            scoreArr[ref].alreadyGot.push(i);
            if ( i == 0 ) scoreArr[ref].gotMain = 1;
            scoreArr[ref].gotAny = 1;
            scoreArr[ref].gotThisMany++;
        }
    });

    if (isCorrect) { 
        ev.target.readOnly = true;
        if ( index == num -1 ) index = -1;
        $('.quiz-question').get(index+1).focus(); 
        fillScoreBoard();
    } 
    else { ev.target.value = ''; }

});



$('#add-push').on('click', ev => {
    showTextArea(result);
    result = {};
    addBoxFn.clear();
    $('#total').select();
    document.execCommand('copy');
    console.log('text copied to clipboard');
});

$('#total').on('click', (ev) => {
	ev.target.select();
	document.execCommand('copy');
    console.log('text copied to clipboard');
});






//    MMMM    MMMMMMMM  MM    MM  MMMMMMMM  MMMMMM      MMMM    MM            MMMMMMMM  MM    MM    MMMM    
//  MM    MM  MM        MMMM  MM  MM        MM    MM  MM    MM  MM            MM        MMMM  MM  MM    MM  
//  MM        MMMMMMMM  MM  MMMM  MMMMMMMM  MMMMMM    MMMMMMMM  MM            MMMMMMMM  MM  MMMM    MM      
//  MM  MMMM  MM        MM    MM  MM        MM    MM  MM    MM  MM            MM        MM    MM      MM    
//  MM    MM  MM        MM    MM  MM        MM    MM  MM    MM  MM            MM        MM    MM  MM    MM  
//    MMMM    MMMMMMMM  MM    MM  MMMMMMMM  MM    MM  MM    MM  MMMMMM        MM        MM    MM    MMMM    

    


showPage('quiz');
function showPage(str) {
    $('#add-page').hide();
    $('#view-page').hide();
    $('#quiz-page').hide();
    $(`#${str}-page`).show();
}

function splitArrToLines(arrGroup) {
    // The definition of each word is contained in an array of an array.
    // This function puts each array into a separate line.
    let str = '';
    arrGroup.forEach( (arr,i) => { str += `${i+1}.&nbsp;&nbsp;${arr.join(', ')}<br>`; });
    return str;
}









//    MMMM    MMMMMM    MMMMMM          MMMMMMMM  MM    MM    MMMM    
//  MM    MM  MM    MM  MM    MM        MM        MMMM  MM  MM    MM  
//  MMMMMMMM  MM    MM  MM    MM        MMMMMMMM  MM  MMMM    MM      
//  MM    MM  MM    MM  MM    MM        MM        MM    MM      MM    
//  MM    MM  MM    MM  MM    MM        MM        MM    MM  MM    MM  
//  MM    MM  MMMMMM    MMMMMM          MM        MM    MM    MMMM    

// function reverseStr(str) { return str.split('').reverse().join(''); }
    // Not used at the moment

function strToSyllableArr(str) {
    let arr = str.split('');
    let newArr = [];
    arr.forEach( (char, i) => {
        if ( !vowels.includes(char) ) {
            let temp = char;
            doThis(i+1);
            newArr.push(temp);
            function doThis(num) {
                if ( num >= arr.length ) return;
                if ( vowels.includes(arr[num]) ) {
                    temp += arr[num];
                    doThis(num+1);
                }
            }
        }
    });
    ScootTheDagh(newArr);
    function ScootTheDagh(arr) {
        if ( arr[0] == '∂' ) {
            arr.push(arr.shift());
            arr.push(arr.shift());
        }
    }
    return newArr;
}

function showTextArea(obj) {
    // let str = `bank[x] = ${JSON.stringify(obj)};`;
    let text = JSON.stringify(obj);
    let str = `bank.push( ${text} );`;
    $('#total').html(str);
    $('#output').html(obj.word);
}






function showHE(a,b) {
    // Temporarily useful function that shows all html entities between the
    // specified range.
    let str = '';
    if (!b) { str += `${a} &nbsp;&nbsp;&nbsp;&#${a};&#10;`; } 
    else if ( a < b ) {
        for ( i=a ; i<=b ; i++ ) { str += `${i} &nbsp;&nbsp;&nbsp;&#${i};&#10;`; }
    }
    $('#total').html(str);
    // showHE(1488, 1522);
    // showHE(64285, 64334);
}








//  MM      MM  MMMMMM  MMMMMMMM  MM      MM        MMMMMMMM  MM    MM    MMMM    
//  MM      MM    MM    MM        MM      MM        MM        MMMM  MM  MM    MM  
//  MM      MM    MM    MMMMMMMM  MM      MM        MMMMMMMM  MM  MMMM    MM      
//  MM      MM    MM    MM        MM  MM  MM        MM        MM    MM      MM    
//    MM  MM      MM    MM        MM  MM  MM        MM        MM    MM  MM    MM  
//      MM      MMMMMM  MMMMMMMM    MM  MM          MM        MM    MM    MMMM    



fillTable();
function fillTable(start, end) {
    if ( start == undefined ) start = 1;
    if ( start < 1 ) start = 1;
    if ( start >= bank.length ) start = bank.length-1;
    if ( end == undefined ) end = bank.length;
    if ( end >= bank.length ) end = bank.length;

    let num = $('.vocab-row').length;
    for ( i=0 ; i<num ; i++ ) { $('.vocab-row').eq(0).remove(); }
    for ( i=start-1 ; i<end ; i++ ) { 
        let arrText = splitArrToLines(bank[i].arr);
        let str = '<tr class="vocab-row">';
        str += `<th class="vocab-id" scope="row">${i+1}</th>`;
        str += `<td class="vocab-word hebrew text-right" >${bank[i].word}</td>`;
        str += `<td class="vocab-category" >${bank[i].category}</td>`;
        str += `<td class="vocab-frequency" >${bank[i].frequency}</td>`;
        str += `<td class="vocab-definitions" >${arrText}</td>`;
        str += '</tr>';
        $('.vocab-table').append(str);
    }
}











//    MMMMMM    MM    MM  MMMMMM  MMMMMMMMMM        MMMMMMMM  MM    MM    MMMM    
//  MM      MM  MM    MM    MM          MM          MM        MMMM  MM  MM    MM  
//  MM      MM  MM    MM    MM        MM            MMMMMMMM  MM  MMMM    MM      
//  MM  MM  MM  MM    MM    MM      MM              MM        MM    MM      MM    
//  MM    MM    MM    MM    MM    MM                MM        MM    MM  MM    MM  
//    MMMM  MM    MMMM    MMMMMM  MMMMMMMMMM        MM        MM    MM    MMMM    

function scrollToTop() {
    document.documentElement.scrollTop = 0;
}


function fillScoreBoard() {
    let total = scoreArr.length;
    let gotAny = 0;
    let gotMain = 0;
    let gotThisMany = 0;
    let totalQ = questionRef.length;
    scoreArr.forEach( obj => {
        gotAny += obj.gotAny;
        gotMain += obj.gotMain;
        gotThisMany += obj.gotThisMany;
    });
    $('#got-any').text(`${gotAny} out of ${total} questions answered.`);
    // $('#got-main').text(`You found the main definition for ${gotMain} questions.`);
    $('#got-this-many').text(`${gotThisMany} out of ${totalQ} total definitions found.`);
}



function fillScoreArr() {
    if (!tempBank.length) return;
    scoreArr.splice(0, scoreArr.length);
    tempBank.forEach( () => { scoreArr.push( new scoreObj() ); });
}

function fillTempBank() {
    let startNum = $('.quiz-input').get(0).value;
    let endNum = $('.quiz-input').get(1).value;
    removeQuizQuestions();
    if ( startNum < 1 ) return;
    if ( endNum > bank.length ) return;
    if ( endNum < startNum ) return;
    // console.log(startNum,endNum);
    tempBank.splice(0, tempBank.length);
    for ( i=startNum-1 ; i<endNum ; i++ ) { tempBank.push( bank[i] ); }
    fillScoreArr();
    addQuizQuestions();
}

function addQuizQuestions() {
    let str = '';
    questionRef.splice(0,questionRef.length);
    let loop = new Array(tempBank.length).fill(0);
    loop.forEach( (v,i) => {
        str += '<div class="card bg-light mb-3 quiz-card">';
        str += '<div class="card-body">';
        str += '<div class="row">';
        str += '<div class="col col-12 col-md-8">';
        str += '<div class="row mb-3">';
        str += '<div class="col col-2 text-right quiz-word ">';
        str += `${i+1}.</div>`;
        str += `<div class="col col-5 hebrew bigger">${tempBank[i].word}</div>`;
        str += `<div class="col col-2 text-right">${tempBank[i].category}</div>`;
        str += `<div class="col col-3 text-right">${tempBank[i].frequency}</div></div>`;

        let num = tempBank[i].arr.length;

        for ( n=0 ; n<num ; n++ ) {
            questionRef.push(i);
            str += '<form class="no-submit quiz-form">';
            str += '<div class="form-row form-group">';
            str += `<label for="" class="col-form-label col-2 text-right"></label>`;
            str += '<div class="col-10">';
            str += '<div class="input-group">';
            str += '<input type="text" class="form-control quiz-question">';
            str += '<div class="input-group-append">';
            str += '<span class="input-group-text bg-primary">';
            str += '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check check-answer" fill="white" xmlns="http://www.w3.org/2000/svg">';
            str += '<path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>';
            str += '</svg></span>';
            str += '</div></div>';
            str += '</div></div></form>';
        }
        str += '</div>';
        str += '<div class="col col-12 col-md-4">';
        str += '<div class="card h-100 ">';
        str += '<div class="card-body bg-light text-light quiz-spoiler">';
        str += `${splitArrToLines(tempBank[i].arr)}`;
        str += '</div></div></div>';
        str += '</div></div></div>';
    });
    $('#quiz-cards').append(str);
}


function removeQuizQuestions() {
    let num = $('.quiz-card').length;
    for ( i=0 ; i<num ; i++ ) { $('.quiz-card').eq(0).remove(); }
}
