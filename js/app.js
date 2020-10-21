//(1) get the images
var leftImage = document.getElementById('leftImage');
var centerImage = document.querySelector('#centerImage');
var rightImage = document.querySelector('#rightImage');
var imagesSection = document.querySelector('#imagesSection');
imagesSection.addEventListener('click', handleClickonProducts);

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
var names = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'
];
// lenght= 20
// 0 to 19
console.log(leftImage);
console.log(centerImage);
console.log(rightImage);

var randomArray = [];
namesArray = [];

Products.all = []; // array of objects
// declare the constructor:
function Products(pName) {
  this.productsName = pName;
  this.imagePath = `assets/${pName}`;
  this.views = 0;
  this.clicks = 0;
  Products.all.push(this);
  namesArray.push(this.productsName);
}

//(3_2) instantiate objects for all the products one shot
for (var i = 0; i < names.length; i++) {
  new Products(names[i]);
}

console.log(Products.all);


//(4) render 3 random images
var leftProduct, rightProduct, centerProduct;

function render() {

  do {
    leftProduct = Products.all[randomNumber(0, Products.all.length - 1)];
    centerProduct = Products.all[randomNumber(0, Products.all.length - 1)];
    rightProduct = Products.all[randomNumber(0, Products.all.length - 1)];
    console.log(leftProduct);
    console.log(centerProduct);
    console.log(rightProduct);

    leftImage.setAttribute('src', leftProduct.imagePath);
    leftImage.setAttribute('alt', leftProduct.productsName);
    leftImage.setAttribute('title', leftProduct.productsName);

    rightImage.setAttribute('src', rightProduct.imagePath);
    rightImage.setAttribute('alt', rightProduct.productsName);
    rightImage.setAttribute('title', rightProduct.productsName);

    centerImage.setAttribute('src', centerProduct.imagePath);
    centerImage.setAttribute('alt', centerProduct.productsName);
    centerImage.setAttribute('title', centerProduct.productsName);
  }
  while (centerProduct === rightProduct || centerProduct === leftProduct || leftProduct === rightProduct);
  console.log(leftProduct);
  console.log(rightProduct);
  console.log(centerProduct);

  leftImage.setAttribute('src', leftProduct.imagePath);
  leftImage.setAttribute('alt', leftProduct.productsName);
  leftImage.setAttribute('title', leftProduct.productsName);

  rightImage.setAttribute('src', rightProduct.imagePath);
  rightImage.setAttribute('alt', rightProduct.productsName);
  rightImage.setAttribute('title', rightProduct.productsName);

  centerImage.setAttribute('src', centerProduct.imagePath);
  centerImage.setAttribute('alt', centerProduct.productsName);
  centerImage.setAttribute('title', centerProduct.productsName);

}
render();

var totalClicks = 0;

function handleClickonProducts(event) {
// event.preventDefault();
  console.log(event.target.id);

  if (totalClicks < 25) {
    if (event.target.id !== 'imagesSection') {
      totalClicks++;
      console.log(totalClicks);
      rightProduct.views++;
      leftProduct.views++;
      centerProduct.views++;

      if (event.target.id === 'leftImage') {
        leftProduct.clicks++;

      }
      if (event.target.id === 'rightImage') {
        rightProduct.clicks++;
      }
      if (event.target.id === 'centerImage') {
        centerProduct.clicks++;
      }
      render();
    }

  } else if (totalClicks === 25) {
    // renderSummary();
    document.getElementById('BUTTON').addEventListener('click', renderSummary);
    console.log(totalClicks);
    renderChart();
  }

}

// render the results after the last round
// eslint-disable-next-line no-unused-vars
function renderSummary() {
  imagesSection.removeEventListener('click', handleClickonProducts);
  console.log('you selected 25 times already!!');
  var ulE1 = document.getElementById('finalResults');
  for (var i = 0; i < Products.all.length; i++) {
    var liE = document.createElement('li');
    ulE1.appendChild(liE);
    liE.textContent = `${Products.all[i].productsName} has ${Products.all[i].clicks} clicks and ${Products.all[i].views} views`;
  }
}


//helper functions
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var vote = [];
var click = [];

//CHART
function renderChart() {
  for (i = 0; i < Products.all.length; i++) {
    vote.push(Products.all[i].views);
    for (var j = 0; j < Products.all.length; j++) {

      click.push(Products.all[j].clicks);
    }

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: namesArray,
        datasets: [{
          label: '# of clicks',
          data: click,
          backgroundColor:
            'rgba(255, 99, 132, 0.2)',

          borderColor:
            'rgba(255, 99, 132, 1)',

          borderWidth: 3
        },
        {
          label: '# of Views',
          data: vote,
          backgroundColor:
            'rgba(255, 99, 132, 0.2)',

          borderColor:
            'rgba(255, 99, 132, 1)',

          borderWidth: 3
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}


function getImg() {
  var imagesString = JSON.stringify(Images.all);
  localStorage.setItem('Images', imagesString);
}

function secondTime() {

  var ImagesString = localStorage.getItem('Images');
  var ImagesARR = JSON.parse(ImagesString);
  if (ImagesARR) {
    Images.all = ImagesARR;
  }
}
console.log(Images.all);
secondTime();
/// second function
function getClicks() {
  var clicksString = JSON.stringify(totalClicks);
  localStorage.setItem('clicks', clicksString);
}

function clicksSecond() {
  var clicksString = localStorage.getItem('clicks');
  var ClicksA = JSON.parse(clicksString);
  if (ClicksA) {
    totalClicks = ClicksA;
  }

} console.log(totalClicks);
clicksSecond();


