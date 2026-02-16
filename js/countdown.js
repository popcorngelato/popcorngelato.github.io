const target=new Date("Feb 20, 2026 22:00:00").getTime();

setInterval(()=>{

let now=new Date().getTime();

let diff=target-now;

document.getElementById("days").innerHTML=Math.floor(diff/86400000);
document.getElementById("hours").innerHTML=Math.floor(diff/3600000)%24;
document.getElementById("minutes").innerHTML=Math.floor(diff/60000)%60;
document.getElementById("seconds").innerHTML=Math.floor(diff/1000)%60;

if(diff<0){

let lock=document.getElementById("lock");

lock.innerHTML="🔓";

lock.onclick=()=>location="password.html";

}

},1000);
