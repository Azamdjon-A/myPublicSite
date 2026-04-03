let display = document.getElementById('show')
let main = document.getElementById('main')
let text = ''
let textIndex = []
let numbers = []
let inputOperator = []
const operator = ['*', '/', '+', '-']
let isWhiteTheme = true

function theme(){
    if(isWhiteTheme){
        document.documentElement.style.setProperty('--background', 'lightgray')
        document.body.style.background = 'white';
    }
    else{
        document.documentElement.style.setProperty('--background', 'white')
        document.body.style.background = 'rgb(80 80 80)';
    }
    isWhiteTheme = !isWhiteTheme;
}

function bt(val){
    if(text === '' && operator.includes(val)) return // начало со знака
    if(val === 'AC') {text = ''} // очистка
    else {
        let lastChar = text.slice(-1);
        if(operator.includes(lastChar) && operator.includes(val)) // замена последнего мат. знака
            { text = text.slice(0, -1) + val; }
        else{text += val;}
    } 
    showText()
}

function backspace(){ 
    text = text.slice(0, -1)
    showText()
}

function indexing(str){
    textIndex = []
    let t = ''
    for(let i=0; i<str.length; i++){
        let el = str[i];
        if(el==='-' && (i===0 || operator.includes(str[i-1]))){
            t += el
        }
        else if(operator.includes(el)){
            if(t!=='') textIndex.push(Number(t));
            textIndex.push(el);
            t='';
        }
        else{
            t+=el;
        }
    }
    if(t!=='') textIndex.push(Number(t));
}

function result(){
    if(text.length < 1) return // пустой ввод

    let exists = false
    for(let i=1; i<text.length; i++){
        if(operator.includes(text[i])) {exists = true; break;}
    }
    if(!exists) return // нет знаков

    if(operator.includes(text.slice(-1))) {text = text.slice(0, -1)} // удаляет последний мат. знак

    indexing(text) // индексируем элементы строки
    
    while(textIndex.some(el => el === '*' || el === '/')){  // все * и /
        for(let i=0; i<textIndex.length; i++){
            if(textIndex[i] === '*'){
                let a = textIndex[i-1] * textIndex[i+1];
                textIndex.splice(i-1, 3, a);
                break;
            }
            if(textIndex[i] === '/'){
                if(textIndex[i+1] !==0){
                    let a = textIndex[i-1] / textIndex[i+1];
                    textIndex.splice(i-1, 3, a);
                    break;
                }else{
                    text = 'ошибка';
                    display.innerText = text;
                    text = '';
                    return;
                }
            }
        }
    }

    while(textIndex.some(el => el === '+' || el === '-')){  // все + и -
        for(let i=0; i<textIndex.length; i++){
            if(textIndex[i] === '+'){
                let a = Number(textIndex[i-1]) + Number(textIndex[i+1]);
                textIndex.splice(i-1, 3, a);
                break;
            }
            if(textIndex[i] === '-'){
                let a = Number(textIndex[i-1]) - Number(textIndex[i+1]);
                textIndex.splice(i-1, 3, a);
                break;
            }
        }
    }

    text = (Math.round(textIndex[0]*100)/100).toString()
    showText()
    textIndex = []
}

function showText(){
    let output = ''
    let count = 1
    console.log(text)
    for(let i = 0; i<text.length; i++){
        if(operator.includes(text[text.length-1-i])){
            output = ' ' + text[text.length-1-i] + ' ' + output;
            count = 1
            continue;
        }else{
            if(text[text.length-1-i] === '.') {
                output = text[text.length-1-i] + output;
                continue
            }
            output = text[text.length-1-i] + output;
            if(count % 3 === 0 && i<text.length-1) {output = ' ' + output}
            count++;
        }
    }
    display.innerText = output
}