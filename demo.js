//array of words
const words = [
    "dark",
    "light",
    "dream",
    "amazing",
    "thunder",
    "hell",
    "sky",
    "wonder",
    "amazing",
    "country",
    "twon",
    "union",
    "light",
    "planet",
    "spring",
    "score",
    "window",
    "tall",
    "small",
    "hungry",
];
// setting levels 
const levels = {
    "Easy":5,
    "Normal":3,
    "Hard":2,
};
//default level 
let defaultLevelName ="Normal";// change level
let defaultLevelSeconds = levels[defaultLevelName];
//catch selector 
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upComingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot =document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let startAgain=document.querySelector("button").onclick=function(){
    window.location.reload()
};
let message= document.createElement("div");
message.className="disc";
let divText = document.createTextNode(
    "you have 3 second to go to the next level if you falid on any part of the game you will lose !!");
    message.appendChild(divText);
let countainer = document.querySelector(".container");
countainer.after(message)
//setting level name + seconds + score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML= defaultLevelSeconds;
timeLeftSpan.innerHTML=defaultLevelSeconds;
scoreTotal.innerHTML=words.length;
//disaple past event 
input.onpaste = function(){
    return false;
};
//start game
startButton.onclick= function(){
    this.remove();
    input.focus();
    message.remove()
    //generate word function
    genWords()
};
function genWords (){
    //get random word from array 
    let randomWord = words[Math.floor(Math.random() * words.length)];
    //get word index
    let wordIndex = words.indexOf(randomWord);
    //remove index from array 
    words.splice(wordIndex, 1);
    //show the random word
    theWord.innerHTML = randomWord;
    //empty up coming words
    upComingWords.innerHTML= "";
    //generate upcoming words
    for (let i = 0 ; i <words.length;i++){
        //create div element
        let div = document.createElement("div");
        let txt =document.createTextNode(words[i]);
        div.appendChild(txt);
        upComingWords.appendChild(div)
    }
    // call start play function
    startPlay()
}
function startPlay(){
    timeLeftSpan.innerHTML=defaultLevelSeconds;
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML === "0") {
            //stop timer
            clearInterval(start);
            //compare words
            if(theWord.innerHTML.toLowerCase()===input.value.toLowerCase()){
                //empety input field
                input.value='';
                //increase score
                scoreGot.innerHTML++;
                if (words.length > 0) {
                    //call genrate word function
                    genWords();
                }else{
                    let span = document.createElement("span");
                    span.className="good";
                    let spanText = document.createTextNode("Congratulitons :)");
                    span.appendChild(spanText);
                    finishMessage.appendChild(span);
                    
                }
            }else{
                let span = document.createElement("span");
                span.className="bad";
                let spanText = document.createTextNode("Game Over");
                span.appendChild(spanText);
                finishMessage.appendChild(span);

            }
        }
    },1000)
    
}

