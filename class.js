class Computer {
  constructor(brand, proc) {
    this.compBrand = brand;
    this.compProc = proc;
  }
}

myPc = new Computer("Lenovo", "octocore amd ryzen");
document.getElementById("demo").innerHTML = "My computer is a " + "<strong>" + myPc.compBrand + "</strong>" + " <p><em>"+ myPc.compProc + " is her processor</em></p>";
