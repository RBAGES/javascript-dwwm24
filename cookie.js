var c = document.getElementById('canvas');
var ctx = c.getContext('2d');


ctx.beginPath();
ctx.fillStyle = "orange";
ctx.arc(300, 300, 300, 0, 2 * Math.PI);
ctx.stroke();