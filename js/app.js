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

//(1) get the images
var leftImage = document.getElementById('leftImage');
var centerImage = document.querySelector('#centerImage');
var rightImage = document.querySelector('#rightImage');

console.log(leftImage);
console.log(centerImage);
console.log(rightImage);


namesArray = [];
// clicksArray = [];
// viewsArray = [];
// clickTotalArray = [];

Products.all = []; // array of objects

function Products(pName) {
  this.productsName = pName;
  this.imagePath = `assets/${pName}`;
  this.views = 0;
  this.clicks = 0;
  Products.all.push(this);
  namesArray.push(this.productsName);
  // clicksArray.push(this.clicks);
  // viewsArray.push(this.views);
}

//(3_2) instantiate objects for all the products one shot
for (var i = 0; i < names.length; i++) {
  new Products(names[i]);
}

console.log(Products.all);

//(4) render 3 random images

// for (var m = 0; m < Products.all.length; m++) {
var firstArray = [];
var secondArray = [];
var leftProduct, rightProduct, centerProduct;
function render() {
  // do {
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
  //}
  //while (leftProduct[m] === leftProduct[m - 1] || leftProduct[m] === rightProduct[m - 1] || leftProduct[m] === centerProduct[m - 1] || rightProduct[m] === rightProduct[m - 1] || rightProduct[m] === centerProduct[m - 1] || rightProduct[m] === leftProduct[m - 1] || centerProduct[m] === leftProduct[m - 1] || centerProduct[m] === centerProduct[m - 1] || centerProduct[m] === rightProduct[m - 1]);
  secondArray.push(leftProduct.productsName, centerProduct.productsName, rightProduct.productsName);
  console.log(secondArray);

  if (firstArray[1] !== secondArray[1]&&firstArray[1] !== secondArray[2]&&firstArray[1] !== secondArray[3]&&firstArray[2] !== secondArray[1]&&firstArray[2] !== secondArray[2]&&firstArray[2] !== secondArray[3]&&firstArray[3] !== secondArray[1]&&firstArray[3] !== secondArray[2]&&firstArray[3] !== secondArray[3]) {
    firstArray === secondArray;
    console.log(firstArray);
  }
}

render();


var totalClicks = 0;

var imagesSection = document.querySelector('#imagesSection');
imagesSection.addEventListener('click', handleClickonProducts);

function handleClickonProducts(event) {

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
    // clicksArray[i] += Products.all[i].clicks;
    // clicksArray.push(clicksArray);
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

