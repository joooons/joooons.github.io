

console.log('logic.js at your service.');
console.log('you have options for showPage();');
console.log('"add"  "view"  "quiz"  "secret"');




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

    // "÷" : '/'
    "÷" : '&#47;'
    
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
        str += '<div class="col-4 col-md-3"></div>';
        str += '<div class="input-group col-8 col-md-9">';
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
    // The INDEX of questionRef refers to each of the question input elements.
    // The VALUE of questionRef refers to the question word card.


const scoreArr = [];

function scoreObj() {
    this.gotMain = 0;
    this.gotAny = 0;
    this.gotThisMany = 0;
    // this.defs = [];
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
        result.word = convertGibberishToHebEnt( $('#add-word').val() );
        $('#output').html( result.word );
    }
    if ( num > 0 ) { if (result.word == '') { return ev.target.value = ''; } }
    if ( num == $('.add-tab').length - 2 ) addBoxFn.addLine();
    $('.add-tab').get(num+1).focus();
    addBoxFn.fillResult();
    addBoxFn.display();

});

$(document).on('submit', '.view-form', function() {
    let start = $('.view-input').get(0).value;
    let end = $('.view-input').get(1).value;
    fillTable(start,end);
});

$(document).on('focusout', '.view-input', function() {
    let start = $('.view-input').get(0).value;
    let end = $('.view-input').get(1).value;
    if ( start < 1 || start > bank.length ) return $('.view-input').get(0).focus();
    if ( end < 1 || end > bank.length ) return $('.view-input').get(1).focus();
    fillTable(start,end);
});


$(document).on('submit', '.quiz-filter', function(ev) {
    let index = indexOfClass(ev.target, 'quiz-filter') + 1;
    if ( index > 3 ) return;
    if ( index == 3 ) { return $('.quiz-start').get(0).focus(); }
    $('.quiz-input').get(index).focus(); 
});

$(document).on('focusout', '.quiz-input', function(ev) {
    let start = $('.quiz-input').get(0).value;
    let end = $('.quiz-input').get(1).value;
    let limit = $('.quiz-input').get(2).value;
    if ( start < 1 || start > bank.length ) return $('.quiz-input').get(0).focus();
    if ( end < 1 || end > bank.length ) $('.quiz-input').get(1).focus();
    if ( limit < 1 || limit > 100 ) return $('.quiz-input').get(2).focus();
});


$(document).on('change', '.quiz-question', function(ev) {
    let ans = ev.target.value;
    let num = $('.quiz-question').length;
    let index = indexOfClass(ev.target, 'quiz-question');
    let ref = questionRef[index];
    let isCorrect = false;
    tempBank[ref].arr.forEach( (list,i) => {
        if ( scoreArr[ref].alreadyGot.includes(i) ) return;
        if ( $('.lex-cat').eq(index).text() != list[0].slice(1) ) return;
        let tempList = [...list].splice(1);
        if (tempList.includes(ans)) {
            isCorrect = true;
            scoreArr[ref].alreadyGot.push(i);
            if ( i == 0 ) scoreArr[ref].gotMain = 1;
            scoreArr[ref].gotAny = 1;
            scoreArr[ref].gotThisMany++;
        }
    });
    if (isCorrect) { 
        ev.target.readOnly = true;
        ev.target.classList.add("bg-success");
        ev.target.classList.add("text-white");
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
// showPage('secret');
function showPage(str) {
    $('#add-page').hide();
    $('#view-page').hide();
    $('#quiz-page').hide();
    $('#secret-page').hide();
    $(`#${str}-page`).show();
}

function splitArrToLines(arrGroup) {
    // The definition of each word is contained in an array of an array.
    // This function puts each array into a separate line.
    let str = '';
    arrGroup.forEach( (arr,i) => { 
        let arrNew = [...arr];
        let first = arrNew.shift();
        if ( first == "@" ) { first = ""; } 
        else { first = `[${first.slice(1)}]&nbsp;&nbsp;`; }
        str += `${i+1}.&nbsp;&nbsp;${first}${arrNew.join(', ')}<br>`; 
    });
    return str;
}

function indexOfClass( elem, className ) {
    let num = $(`.${className}`).length;
    for ( i=0 ; i<num ; i++ ) { if ( elem == $(`.${className}`).get(i) ) return i; }
    return -1;
}

function reverseStr(str) { return str.split('').reverse().join(''); }
    // Not used at the moment

function convertGibberishToHebEnt(text) {
    // let arr = strToSyllableArr(text).reverse();
    // let string = arr.join('');
    // arr = string.split('');

    let arr = strToSyllableArr(text).reverse().join('').split('');
    // let string = arr.join('');
    // arr = string.split('');

    Object.keys(En_to_He).forEach( key => {
        arr.forEach( (char,i) => {
            // if ( char == key ) arr[i] = En_to_He[key];
            if ( char == key ) {
                // arr[i] = String.fromCharCode(En_to_He[key].match(/\d+/)[0]);
                arr[i] = En_to_He[key]; 
                // newArr.push( String.fromCharCode(En_to_He[key].match(/\d+/)[0]) );
            }

        });
    });
    return arr.join('');
}






//    MMMM    MMMMMM    MMMMMM          MMMMMMMM  MM    MM    MMMM    
//  MM    MM  MM    MM  MM    MM        MM        MMMM  MM  MM    MM  
//  MMMMMMMM  MM    MM  MM    MM        MMMMMMMM  MM  MMMM    MM      
//  MM    MM  MM    MM  MM    MM        MM        MM    MM      MM    
//  MM    MM  MM    MM  MM    MM        MM        MM    MM  MM    MM  
//  MM    MM  MMMMMM    MMMMMM          MM        MM    MM    MMMM    



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


initializeViewInputLimits();
function initializeViewInputLimits() {
    $('.view-input').get(0).max = bank.length;
    $('.view-input').get(1).max = bank.length;
    // $('.quiz-input').get(2).max = 100;
}

fillTable(1,1);
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
        str += `<td class="vocab-word hebrew text-left" >${bank[i].word}</td>`;
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

function scrollToTop() { document.documentElement.scrollTop = 0; }



initializeQuizInputLimits();
function initializeQuizInputLimits() {
    $('.quiz-input').get(0).max = bank.length;
    $('.quiz-input').get(1).max = bank.length;
    $('.quiz-input').get(2).max = 100;
}



function resetAnswers(wordIndex) {
    // reset the quiz-question values. Based on orderIndex.
    // reset the readOnly and color changes. Based on orderIndex.
    // reset the scoreArr for that question. Based on wordIndex.
    let list = [];
    questionRef.forEach( (v,i) => { if ( wordIndex == v ) list.push(i); });
    list.forEach( v => {
        $('.quiz-question').eq(v).removeClass('bg-success');
        $('.quiz-question').eq(v).removeClass('text-white');
        $('.quiz-question').eq(v).attr("readOnly", false);
        $('.quiz-question').eq(v).val('');
    });
    scoreArr[wordIndex].gotMain = 0;
    scoreArr[wordIndex].gotAny = 0;
    scoreArr[wordIndex].gotThisMany = 0;
    scoreArr[wordIndex].alreadyGot = [];
    fillScoreBoard();
}

function fillScoreBoard() {
    // Only for the purpose of showing the score at the top.
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
    // Empty the scoreArr and fill it with number of items matching...
    // ...number of items in tempBank.
    // Assumes that tempBank is already filled.
    if (!tempBank.length) return;
    scoreArr.splice(0, scoreArr.length);
    tempBank.forEach( () => { scoreArr.push( new scoreObj() ); });
}

fillTempBank();
function fillTempBank() {
    // Prepare the temporary array that contains the questions and associated data.
    let startNum = parseInt( $('.quiz-input').get(0).value );
    let endNum = parseInt( $('.quiz-input').get(1).value );
    let limit = parseInt( $('.quiz-input').get(2).value );

    removeQuizQuestions();
    tempBank.splice(0, tempBank.length);
    if ( startNum < 1 ) return;
    if ( endNum > bank.length ) return;
    if ( endNum < startNum ) return;
    if ( limit < 1 ) return;
    if ( limit > bank.length ) return;
    for ( i=startNum-1 ; i<endNum ; i++ ) { tempBank.push( {id:i+1,...bank[i]} ); }
    if ( tempBank.length > limit ) {
        let num = tempBank.length - limit;
        tempBank.splice(0,num);
    }
    fillScoreArr();
    addQuizQuestions();
}

function addQuizQuestions() {
    // Adds quiz questions on the screen.
    // Assumes that tempBank is ready.
    let str = '';
    questionRef.splice(0,questionRef.length);

    randomOrderArr(tempBank.length).forEach( (v,i) => {
        str += '<div class="card bg-light mb-3 quiz-card">';
        str += '<div class="card-body">';

        str += '<div class="row">';
        str += '<div class="col col-12 col-md-8">';

        str += '<div class="row">';
        str += '<div class="col col-12 text-right ">';
        str += `<button type="button" class="btn btn-sm btn-primary reset-btn" onclick="resetAnswers(${v})">`;
        // str += '<svg width="1em" height="1em" viewBox="0 0 18 18" class="bi bi-arrow-counterclockwise" fill="currentColor" xmlns="http://www.w3.org/2000/svg">';
        // str += '<path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>';
        // str += '<path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>';
        // str += '</svg>';
        // str += '&#10006;';
        // str += '&olarr;';
        // str += '&#10226;';
        str += 'RESET'
        str += '</button></div>';

        str += '</div>';

        str += '<div class="row mb-3">';
        str += '<div class="col col-12 text-left quiz-word pl-3">';
        // str += `#${tempBank[v].id}&nbsp;&nbsp;&nbsp;&nbsp;`;
        str += `#${i+1}&nbsp;&nbsp;&nbsp;&nbsp;`;
        str += `<span class="hebrew bigger">${tempBank[v].word}</span>`;
        str += `&nbsp;&nbsp;&nbsp;${tempBank[v].category}`;
        str += `&nbsp;&nbsp;&nbsp;${tempBank[v].frequency}`;
        str += `</div>`;
        str += `</div>`;
        // str += `<div class="col col-5 text-right pt-2">`;
        // str += `${tempBank[v].category}&nbsp;&nbsp;&nbsp;${tempBank[v].frequency}</div>`;
        // str += `</div>`;
        let num = tempBank[v].arr.length;

        for ( n=0 ; n<num ; n++ ) {
            questionRef.push(v);
            str += '<form class="no-submit quiz-form">';
            str += '<div class="form-row form-group">';
            // str += `<label for="" class="col-form-label col-1 text-right"></label>`;
            str += '<div class="col col-12">';
            str += '<div class="input-group">';
            str += '<div class="input-group-prepend">';
            str += '<span class="input-group-text bg-muted lex-cat">';
            if (tempBank[v].arr[n][0].charAt(0) == "@") { str += `${tempBank[v].arr[n][0].slice(1)}`; } 
            else { str += ''; }
            str += '</span></div>';
            str += '<input type="text" autocapitalize="none" class="form-control quiz-question">';
            str += '</div></div></div></form>';
        }
        str += '</div>';
        str += '<div class="col col-12 col-md-4 ">';
        str += '<div class="card h-100 bg-light quiz-spoiler">';
        str += '<div class="card-body  text-light ">';
        str += `${splitArrToLines(tempBank[v].arr)}`;
        str += '</div></div></div></div></div></div>';
    });
    $('#quiz-cards').append(str);
    $('.quiz-question').first().focus();
}

function randomOrderArr(length) {
    // returns array with numbers counting from 0 to length, in random order.
    let arr = [];
    for ( i=0 ; i<length ; i++ ) {
        let num = Math.floor( Math.random() * length );        
        findEmptySlot(num);
        function findEmptySlot(n) {
            if (!arr.includes(n)) { arr.push(n); } 
            else { findEmptySlot( (n+1)%length ); }
        }
        if (arr.length >= length) { return arr; }
    }

    // The code below cancels the randomization.
    // arr.forEach( (v,i) => { arr[i] = i; });
    // return arr;
}

function removeQuizQuestions() {
    // Visually remove the question cards from screen.
    let num = $('.quiz-card').length;
    for ( i=0 ; i<num ; i++ ) { $('.quiz-card').eq(0).remove(); }
}






//    MMMM    MMMMMMMM    MMMM    MMMMMM    MMMMMMMM  MMMMMM  
//  MM    MM  MM        MM    MM  MM    MM  MM          MM    
//    MM      MMMMMMMM  MM        MMMMMM    MMMMMMMM    MM    
//      MM    MM        MM        MM    MM  MM          MM    
//  MM    MM  MM        MM    MM  MM    MM  MM          MM    
//    MMMM    MMMMMMMM    MMMM    MM    MM  MMMMMMMM    MM    

$('#secret-input').on("change", () => {
    let str = $('#secret-input').val();
    let arr = [];

    chopchop();
    function chopchop() {
        // This function chop-chops the long string into separate lines...
        // ...stored as separate items in the arr array.
        let num = str.search(/\d\*?\s\d/);
        if ( num <= 0 ) return;
        arr.push( str.slice(0, num + 2 ) );
        str = str.slice(num+2);
        chopchop();
    }
    arr.push(str);

    let final = '';
    arr.forEach( val => {

        let cat = val.match(/\s\w+\.\S*\s/g)[0].replace(/^\s+/, '');
        let word = val.slice(0, val.search(cat) ).replace(/\d+\s/,'');
        let wordHebEnt = convertGibberishToHebEnt( val.slice(0, val.search(cat) ).replace(/\d+\s/,'').replace(' ,',',') );
        let wordHeb = wordHebEnt.match(/\d+/g).map( val => String.fromCharCode(val) ).join('');
        let freq = val.match(/\d+/g)[1];
        let gloss = val.replace(word,'').replace(cat,'').replace(freq,'').replace(/\d+\s+/,'').replace(/\s*$/, '').replace(/[\.\;]/g,',').replace('*','');
        let glossArr  = gloss.split(", ");

        final += `bank.push( {`;
        final += `"word":"${wordHeb}", "category":"${cat}", "frequency":"${freq}",`;
        final += ` "arr":[`;

        let stem = '';
        let click = false;
        glossArr.forEach( (def,i) => {

            if ( cat == 'vb. ') {
                if ( /^[A-Z]/.test(def) ) { stem = def; } 
                else {
                    let buddy = '';
                    if (/^to\s/.test(def)) { buddy = def.slice(3); } 
                    else { buddy = `to ${def}`; }
                    if (click) final += ',';                    
                    final += `["@${stem}", "${def}", "${buddy}"]`;
                    click = true;
                }
            } 
            else {
                if (click) final += ',';
                final += `["@", "${def}"]`;
                click = true;
            }
            
        });
        
        final += `]`;
        final += ` } ); `;
        final += `\n`;
    });

    $('#secret-text').val(final);
});






