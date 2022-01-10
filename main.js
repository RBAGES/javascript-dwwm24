var intro = "intro";


var head = document.head;



var header = document.createElement("header");
header.style.border = "1px solid blue";
header.style.backgroundColor = "red";
document.body.appendChild(header);


var Titre1 = document.createElement("H1");
Titre1.innerHTML = "Welcome To Awesome Javascript learning";
Titre1.style.color = "Purple";
Titre1.style.textAlign = "center";
header.appendChild(Titre1);

var check = document.createElement("input");
check.setAttribute("type", "checkbox");
check.setAttribute("id", "checked");
header.appendChild(check);



var checkbox = document.getElementById("checked");

checkbox.addEventListener('change', function() { 
	if (this.checked) {
	 console.log("Checkbox is checked..");
	 document.title = "checkbox"; } 
	 else { 
	 	console.log("Checkbox is not checked.."); 
	} 
}); 



var form = document.createElement("form");
header.appendChild(form);

var textfield = document.createElement("input");
textfield.setAttribute("type", "text");
form.appendChild(textfield);


var submitButton = document.createElement("button");
submitButton.style.color = "green";
submitButton.innerHTML ="CliqueMe";
form.appendChild(submitButton);

var section = document.createElement("section");
section.style.backgroundColor = "Blue";
section.style.border = "1px solid yellow";
section.style.display = "flex";
section.style.justifyContent = "center";
document.body.appendChild(section);


var resultinput = document.createElement("p");
resultinput.innerHTML = textfield.value;
console.log(resultinput);
section.appendChild(resultinput);

var article = document.createElement("article");
article.style.backgroundColor = "Whitesmoke";
article.style.border = "1px solid grey";
article.style.width = "512px";
article.style.height= "512px";
article.style.textAlign = "center";
article.onmouseleave= function () {
	document.title = "chargement";
	article.style.border = "18px solid green";
}
article.onmouseenter = function (){
	document.title = "NewChange";
}
section.appendChild(article);


var img = document.createElement("img");
img.setAttribute("src", "https://soeurtherese.online/wallpaper/SAM_2177.JPG");
img.setAttribute("width", "304");
img.setAttribute("height", "228");
img.setAttribute("alt", "sunset reunion island");
img.onmouseenter = function (){
	article.style.border = "5px solid red";
} ;
img.onmouseleave = function (){
	article.style.border = "3px solid yellow";
} ;


article.appendChild(img);


var para = document.createElement("p");
para.innerHTML = "Yollow ce genre de paragraphe";
article.appendChild(para);











