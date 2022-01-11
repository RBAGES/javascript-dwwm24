const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const rayon = canvas.height / 2;
ctx.translate(rayon, rayon);
setInterval(clock, 1000);
var date = new Date();

const timeSelector = document.getElementById("time-select");
//remplissage des options du select
for(let i= -12; i<13;i++){
    var opt = document.createElement('option');
    opt.value = (i<0) ? ""+i : "+"+i;
    opt.innerHTML = (i<0) ? "GMT"+i : "GMT+"+i;
    if(i==0)
        opt.selected="selected";
    timeSelector.appendChild(opt);
}

window.onload= ()=>{
    timeSelector.selectedIndex = 12;
};

function clock() {
    function drawPizza() {
        ctx.beginPath()
        ctx.lineWidth = 15;
        ctx.arc(0, 0, rayon - 10, 0, 2 * Math.PI);
        ctx.fillStyle = "#e6b86a";
        ctx.stroke();
        ctx.fill();

        ctx.beginPath()
        ctx.lineWidth = 20;
        ctx.arc(0, 0, (rayon - 60), 0, 2 * Math.PI);

        ctx.fillStyle = "#f9c637";

        ctx.stroke();
        ctx.fill();
        function jambon(x, y) {
            ctx.fillStyle = "#be1e2d";
            ctx.beginPath();
            ctx.arc(x, y, 35, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
        };
        jambon(100, -50);
        jambon(-70, 200);
        jambon(-180, -70);
        jambon(100, 100);
        jambon(20, -180);
        jambon(-100, 80);
        function olive(a, b) {
            ctx.beginPath();
            ctx.arc(a, b, 20, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillStyle = "#202020";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(a, b, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "#fdd05b";
            ctx.stroke();
            ctx.fill();
        };
        olive(100, -150);
        olive(-100, -180);
        olive(-20, 80);
        olive(180, 20);
        olive(-150, 160);
        olive(0, 0);
        function lettuce(c, d) {
            ctx.rect(c, d, 10, 30);
            ctx.lineJoin = "round";
            ctx.lineWidth = 8;
            ctx.fillStyle = "#00a551"
            ctx.stroke();
            ctx.fill();
        };
        lettuce(-150, -180);
        lettuce(-170, 20);
        lettuce(170, 80);
        lettuce(170, -100);
        lettuce(10, 180);
    }



    function drawNumbers() {
        var ang;
        var num;
        ctx.fillStyle = "black";
        ctx.font = rayon*0.10 + "px arial";
        ctx.textBaseline="middle";
        ctx.textAlign="center";
        for(num = 1; num < 13; num++){
          ang = num * Math.PI / 6;
          ctx.rotate(ang);
          ctx.translate(0, -rayon*0.9);
          ctx.rotate(-ang);
          ctx.fillText(convert(num), 0, 0);
          ctx.rotate(ang);
          ctx.translate(0, rayon*0.9);
          ctx.rotate(-ang);
        }
      }

    
function drawTime(date){
    var now = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));

    var path2 = "./needleminutes.png";
    var path1 = "./needlehours.png";
    var path3 = "./needleseconds.png";

    
    drawHand(hour, rayon*0.5, rayon*0.07, path1);
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(minute, rayon*0.8, rayon*0.07, path2);
    second=(second*Math.PI/30);
    drawHand(second, rayon*0.9, rayon*0.02, path3);
}


function drawHand(pos, length, width, src) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    var img = new Image();
    img.src = src;
    img.width *= 0.9;
    if(src == "./needleseconds.png")
        img.height *= 0.9;
    else
        img.height *= 1.1;

    ctx.drawImage(img,-10,0,img.width,-img.height);
    ctx.rotate(-pos);
    ctx.arc(0, 0, rayon*0.1, 0, 2*Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}
    drawPizza()
    drawNumbers();
    drawTime(date)
    date.setSeconds(date.getSeconds() + 1);
}
clock()

function convert(num) { 
    if(num < 1){ return "";}
    if(num >= 12){ return "XII" + convert(num - 12);}
    if(num >= 11){ return "XI" + convert(num - 11);}
    if(num >= 10){ return "X" + convert(num - 10);}
    if(num >= 9){ return "IX" + convert(num - 9);}
    if(num >= 8){ return "VIII" + convert(num - 8);}
    if(num >= 7){ return "VII" + convert(num - 7);}
    if(num >= 6){ return "VI" + convert(num - 6);}
    if(num >= 5){ return "V" + convert(num - 5);}
    if(num >= 4){ return "IV" + convert(num - 4);}
    if(num >= 3){ return "III" + convert(num - 3);}
    if(num >= 2){ return "II" + convert(num - 2);}
    if(num >= 1){ return "I" + convert(num - 1);}  
  }
  

  timeSelector.addEventListener("change", ()=>{
    var value = timeSelector.options[timeSelector.selectedIndex].value;
    date = calcTime(new Date(),value.toString());
})


 function calcTime(currentDate , offset) {
    var utc = currentDate.getTime() + (currentDate.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000*offset)+3600000);
    return nd;
  }
  
