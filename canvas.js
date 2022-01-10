"use strict";
console.log("CANVAS");



var canv = document.createElement("canvas");
canv.classList.add("myCanvas");
canv.width = 800;
canv.height = 500;

var ctx = canv.getContext("2d");
console.log(canv);
ctx.moveTo(0,0);
ctx.lineTo(canv.width, canv.height);
ctx.stroke();

ctx.beginPath();
ctx.arc(295, 50, 40, 0, 2 * Math.PI);
ctx.stroke();

ctx.font = "30px Arial";
ctx.fillText("Hello World", 10, 50);

ctx.font = "30px Arial";
ctx.strokeText("Hello World", 10, 250);

// Create gradient
var grd = ctx.createLinearGradient(0, 0, 200, 0);
grd.addColorStop(0, "red");
grd.addColorStop(1, "white");

// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(10, 300, 150, 80);


document.body.appendChild(canv);





