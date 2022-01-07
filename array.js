const cars = ["Saab", "Volvo", "BMW"];
var divDemo = document.getElementById("demo");
divDemo.innerHTML = "<strong>Dans mon garage il y a :</strong> " + cars;


var paragraphe1 = document.createElement("p");
paragraphe1.innerHTML = "<strong>La premiere voiture est une:  </strong>" + cars[0];
divDemo.appendChild(paragraphe1);

var paragraphe2 = document.createElement("p");
paragraphe2.innerHTML = " <strong>La seconde voiture est une: </strong>" + cars[1];
divDemo.appendChild(paragraphe2);

var paragraphe3 = document.createElement("p");
paragraphe3.innerHTML = "<strong>La troisieme voiture est une: </strong>" + cars[2];
divDemo.appendChild(paragraphe3);



