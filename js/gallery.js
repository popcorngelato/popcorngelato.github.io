document.getElementById("overlay").onclick=()=>{

document.getElementById("overlay").style.display="none";

document.getElementById("music").play();

};

/* INSTAGRAM REAL STYLE STORIES */

/* INSTAGRAM REAL STYLE STORIES */

const stories=[

{
title:"First Meet ",
images:[
"assets/images/story1.jpg",
"assets/images/photo-1.2.jpg",
"assets/images/photo-1.3.jpg",
"assets/images/photo-1.4.jpg"
]
},

{
title:"Memories ✨",
images:[
"assets/images/story2.jpg",
"assets/images/photo-2.1.jpg",
"assets/images/photo-2.2.jpg",
"assets/images/photo-2.3.jpg",
"assets/images/photo-2.4.jpg",
"assets/images/photo-2.5.jpg"
]
},

{
title:"Belakang Kantor ",
images:[
"assets/images/story3.jpg",
"assets/images/photo-3.1.jpg",
"assets/images/photo-3.2.jpg",
"assets/images/photo-3.3.jpg",
"assets/images/photo-3.4.jpg",
"assets/images/photo-3.5.jpg",
"assets/images/photo-3.6.jpg",
"assets/images/photo-3.7.jpg",
"assets/images/photo-3.8.jpg",
"assets/images/photo-3.9.jpg",
"assets/images/photo-3.10.jpg",
"assets/images/photo-3.11.jpg",
"assets/images/photo-3.12.jpg",
"assets/images/photo-3.13.jpg",
"assets/images/photo-3.14.jpg"
]
},

{
title:"Levain w/ Moli ",
images:[
"assets/images/story4.jpg",
"assets/images/photo-4.1.jpg",
"assets/images/photo-4.2.jpg",
"assets/images/photo-4.3.jpg",
"assets/images/photo-4.4.jpg",
"assets/images/photo-4.5.jpg",
"assets/images/photo-4.6.jpg",
"assets/images/photo-4.7.jpg",
"assets/images/photo-4.8.jpg",
"assets/images/photo-4.9.jpg",
"assets/images/photo-4.10.jpg",
"assets/images/photo-4.11.jpg",
"assets/images/photo-4.12.jpg",
"assets/images/photo-4.13.jpg",
"assets/images/photo-4.14.jpg",
"assets/images/photo-4.15.jpg",
"assets/images/photo-4.16.jpg",
"assets/images/photo-4.17.jpg",
"assets/images/photo-4.18.jpg",
"assets/images/photo-4.19.jpg",
"assets/images/photo-4.20.jpg",
"assets/images/photo-4.21.jpg",
"assets/images/photo-4.22.jpg",
"assets/images/photo-4.23.jpg",
"assets/images/photo-4.24.jpg",
"assets/images/photo-4.25.jpg",
]
}

];

let currentStory = 0;
let currentIndex = 0;
let storyTimer = null;
let duration = 5000;
let progress = 0;
let isPaused = false;

function openStory(index){

currentStory = index;
currentIndex = 0;
progress = 0;

document.getElementById("storyViewer").style.display="flex";

createBars();
showStory();

}

function createBars(){

let container=document.getElementById("storyProgress");
container.innerHTML="";

stories[currentStory].images.forEach(()=>{

let bar=document.createElement("div");
bar.className="story-bar";

let fill=document.createElement("div");
fill.className="story-fill";

bar.appendChild(fill);
container.appendChild(bar);

});

}

function showStory(){

stopTimer();

let story = stories[currentStory];

document.getElementById("storyImg").src =
story.images[currentIndex];

document.getElementById("storyTitle").innerHTML =
story.title;

progress = 0;

startProgress();

}

function startProgress(){

let fills=document.querySelectorAll(".story-fill");
let fill=fills[currentIndex];

storyTimer=setInterval(()=>{

if(isPaused) return;

progress += 100/(duration/30);

fill.style.width = progress + "%";

if(progress>=100){

fill.style.width="100%";
nextStory();

}

},30);

}

function stopTimer(){

if(storyTimer){
clearInterval(storyTimer);
storyTimer=null;
}

}

function nextStory(){

stopTimer();

let fills=document.querySelectorAll(".story-fill");
if(fills[currentIndex]){
fills[currentIndex].style.width="100%";
}

currentIndex++;

if(currentIndex >= stories[currentStory].images.length){

currentStory++;

if(currentStory >= stories.length){

closeStory();
return;

}

currentIndex=0;
createBars();

}

showStory();

}

function prevStory(){

stopTimer();

if(currentIndex>0){

currentIndex--;

}else{

if(currentStory>0){

currentStory--;
currentIndex=stories[currentStory].images.length-1;
createBars();

}

}

let fills=document.querySelectorAll(".story-fill");
fills.forEach((f,i)=>{
if(i<currentIndex) f.style.width="100%";
else f.style.width="0%";
});

showStory();

}

function closeStory(){

stopTimer();
document.getElementById("storyViewer").style.display="none";

}

let viewer = document.getElementById("storyViewer");

viewer.addEventListener("click", function(e){

let screenWidth = window.innerWidth;

if(e.clientX < screenWidth/2){
prevStory();
}else{
nextStory();
}

});

viewer.addEventListener("mousedown", ()=>{
isPaused = true;
});

viewer.addEventListener("mouseup", ()=>{
isPaused = false;
});

viewer.addEventListener("touchstart", ()=>{
isPaused = true;
});

viewer.addEventListener("touchend", ()=>{
isPaused = false;
});

function openGrid(){

let viewer=document.getElementById("postViewer");

viewer.style.display="flex";

document.getElementById("postImg").src="assets/images/grid.png";

viewer.onclick=()=>viewer.style.display="none";

}

/* =========================
   DM POPUP CHAT STYLE FINAL
   ========================= */

let messages = [

`Happy Birthday Iko `,

`Hari ini adalah hari spesialmu...
Dan aku cuma ingin kamu tahu
betapa berharganya kamu buat aku.`,

`aku ada kata-kata buat km.`,

`"So when the days come, I want you to know that I'm grateful, for every moment, every chaos, every, every calm, for every version of u that stay.

and when the days come, i want u to know that I LOVE U:) not in the goodbyes we fear but in the days we work together, we live together.`,

`and if one day my names, only passes through your memory. let it arrive like dusk,quiet, warm, and full of gratitude.`,

`and if time takes us to driven roads, REMEMBER THIS, we were not just passing through each other life.
WE WERE CHAPTERS, WE WERE SHELTERS, AND WE WERE HOME."`,

`Terima kasih sudah hadir di hidupku.
Semoga semua impianmu tercapai.
Aku akan selalu ada untukmu.`,

`from friend, lover, or -`

];

let typingInterval;
let currentMsg = 0;

function openDM(){

let modal = document.getElementById("dmModal");
let container = document.getElementById("dmText");

modal.style.display = "flex";

container.innerHTML = "";

currentMsg = 0;

showNextMessage();

}

function showNextMessage(){

if(currentMsg >= messages.length) return;

let container = document.getElementById("dmText");

let bubble = document.createElement("div");

bubble.className = "msg left";

container.appendChild(bubble);

let text = messages[currentMsg];

let i = 0;

typingInterval = setInterval(()=>{

if(i < text.length){

if(text.charAt(i) == "\n"){
bubble.innerHTML += "<br>";
}else{
bubble.innerHTML += text.charAt(i);
}

container.scrollTop = container.scrollHeight;

i++;

}else{

clearInterval(typingInterval);

currentMsg++;

setTimeout(showNextMessage, 500);

}

},30);

}

function closeDM(){

document.getElementById("dmModal").style.display="none";

clearInterval(typingInterval);

}
