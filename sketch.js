let dataBar = []; // Buat Variabel Global 
let dataPie = [2756, 234,435,5456];
let colors = ['crimson','darksalmon', 'salmon', 'lightcoral','indianred'];
let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRYNZ2LjG-ysDGaMrb7zFDoIBU7WzJNHS4wpvu_LVJEkfSh1OMxcFjH-6d7OglgceiqFtwfryMYTUN4/pub?output=csv';

let urlAPI = "https://api.openweathermap.org/data/2.5/weather?q=Lampung&appid=9a1765dee6fcc1aee1d513b42746e100&units=metric";
let dataSheet;

let xData;
let yData;

function preload(){
  dataSheet = loadTable(url, 'csv', 'header');
  dataAPI = loadJSON(urlAPI);

}

function infoCuaca(x, y, data, fontsize){
  textSize(fontsize)
  fill('white')
  stroke("white")
  text(data.name, posX = x, posY = y)
  text("Cuaca = "+ data.weather[0].main, posX = x, posY = y + fontsize)
  text("Suhu = "+ data.main.temp, posX = x , posY = y + 2*fontsize)
  text("Kecepatan angin = "+ data.wind.speed, posX = x, posY = y + 3*fontsize)

 }


function linePlot(xData, yData){
      var maxX = max(xData);
      var minX = min(xData);
      var maxY = max(yData);
      var minY = min(yData);
      var w = (windowWidth/2) / (xData.length-1);
  for (var i=0; i < xData.length; i++){
      var x1 = map(xData[i], minX, maxX, 0, windowWidth/2 );
      var x2 = map(xData[i+1], minX, maxX, 0, windowWidth/2 );
      var y1 = map(yData[i], minY, maxY, 0, windowHeight/2 );
      var y2 = map(yData[i+1], minY, maxY, 0, windowHeight/2 );
 
  line(i*w, windowHeight - y1, (i+1)*w, windowHeight - y2);
  ellipse(i*w,windowHeight - y1, 10, 10)
    }
  }

function barPlot(dataBar){
  stroke(0,255,0);
  fill('red');
  var maxBar = max(dataBar);
  var w = (windowWidth/2) / dataBar.length;
  
  for (var i=0; i<dataBar.length;i++){
    var dat = map(dataBar[i], 0, maxBar, 0, windowHeight/2 )
    rect(i*w, windowHeight/2 - dat, w, dat)
 
  }
 }

 function persentase(arr){
  var tot = 0;
  for (var i=0; i<arr.length;i++){
    tot = tot + arr[i]
  }
 
  var per = []
  for (var i=0; i<arr.length;i++){
    per[i] = arr[i] / tot
  }
  return per
 }

 function piePlot(dataPie){
  let diameter = windowHeight / 3;
  let lastAngle = 0;
  var dataPer = persentase(dataPie);
  strokeWeight(4);

  for (let i = 0; i < dataPer.length; i++) {
    var angles = dataPer[i] * 360;
  fill(colors[i])
  arc(
    windowWidth * 3 / 4,
    windowHeight * 1 / 4,
    diameter,
    diameter,
    lastAngle,
    lastAngle + radians(angles)
  );
    lastAngle += radians(angles);
  }
 }

function setup() {
    // put setup code here
    createCanvas(windowWidth, windowHeight);
    for (var i = 0; i < 100; i++){
        dataBar[i] = random(0,100);
    } 
    xData = dataSheet.getColumn('x');
    yData = dataSheet.getColumn('y');

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    // put drawing code here
    background(20)
    stroke(255,255,255)

    strokeWeight(4);
    line(windowWidth/2, 0, windowWidth/2, windowHeight)
    line(0, windowHeight/2, windowWidth, windowHeight/2)
    
    strokeWeight(2);
    barPlot(dataBar);
    piePlot(dataPie);

    linePlot(xData, yData);
    infoCuaca( windowWidth * 3 / 5, windowHeight * 3 / 4, dataAPI, windowWidth/40);
  }