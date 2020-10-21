'use strict';
//names of products
var names = [
    'bag',
    'banana',
    'bathroom',
    'boots',
    'breakfast',
    'bubblegum',
    'chair',
    'cthulhu',
    'dog-duck',
    'dragon',
    'pen',
    'pet-sweep',
    'scissors',
    'shark',
    'sweep.png',
    'tauntaun',
    'unicorn',
    'usb.gif',
    'water-can',
    'wine-glass'
]
var randomArray = [];
var rounds = 1; // to keep track of round number from 1-25 
var productsArray = [];

// declare the constructor:
function Product(pName) {
    this.productName = pName.includes('.') ? pName.slice(0, pName.indexOf('.')) : pName; // check if the pName has an extension? , truncate the string and return the name without the extension
    this.productImagePath = pName.includes('.') ? `img/${pName}` : `img/${pName}.jpg`; // check if the pName has an extension  differe of .jpg ... add it as it come, else.. add the .jpg ext.
    this.views = 0;
    this.clicks = 0;
    productsArray.push(this); // add this object to the products Array
}

//create instances of Product:
for (let i = 0; i < names.length; i++) {
    new Product(names[i]);
}

// render three different images at a time..
var img1 = document.getElementById('img1');
var img2 = document.getElementById('img2');
var img3 = document.getElementById('img3');

var product1;
var product2;
var product3;
function renderImages() {

    // get three different random numbers in an array.
    var randArray = getThreeDiffRandom(0, (productsArray.length - 1));


    //pick three random products..
    product1 = productsArray[randArray[0]];
    product2 = productsArray[randArray[1]];
    product3 = productsArray[randArray[2]];
    render();//render them.

    var roundText = document.getElementById('round-text'); // to display the round number.
    roundText.textContent = `   ${rounds}`;

}
renderImages();


// add event listener to the images container ...
var imagesContainer = document.getElementById('imgs');
imagesContainer.addEventListener('click', onImageContainerClick);


// render the results after the last round 
var ulResult = document.getElementById('ul-result');

function renderResults() {

    imagesContainer.removeEventListener('click', onImageContainerClick); //remove the event listener

    for (let i = 0; i < productsArray.length; i++) {
        var li = document.createElement('li');

        var item = productsArray[i];
        li.textContent = `${item.productName} had ${item.clicks} votes, and was seen ${item.views} times.`;
        ulResult.appendChild(li);
    }

}

// display the chart: 
function renderChart() {

    // collect the data
    var dataArray = [[], [], []]; // names , views, clicks

    for (let i = 0; i < productsArray.length; i++) {
        dataArray[0].push(productsArray[i].productName);
        dataArray[1].push(productsArray[i].views);
        dataArray[2].push(productsArray[i].clicks);
    }

    // draw the chart on the canvas element:
    var ctx = document.getElementById('my-chart').getContext('2d');
    var myChart = new Chart(ctx, {  //this code from Chart.js API .. 
        type: 'bar',
        data: {
            labels: dataArray[0],//products name
            datasets: [
                {
                    label: '# of Clicks',
                    data: dataArray[2],                             //clicks
                    backgroundColor: 'rgba(50, 175, 50, 0.6)',
                    borderColor: '#4C5760',
                    borderWidth: 3
                },
                //second label
                {
                    label: '# of Views',
                    data: dataArray[1],                             //clicks
                    backgroundColor: '#4c5c69dc',
                    borderColor: 'rgba(50, 175, 50, 0.719)',
                    borderWidth: 3
                }
            ]
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
    console.log(myChart);
}




// helper functions:
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getThreeDiffRandom(min, max) {
    var rand1 = randomInt(min, max); // return a random index to pick a random object from the products array..
    var rand2 = randomInt(min, max);
    var rand3 = randomInt(min, max);

    //check the randoms numbers are uniques and don't equal to any random number of the last round..
    while (randomArray.includes(rand1) || randomArray.includes(rand2) || randomArray.includes(rand3) || rand2 === rand1 || rand3 === rand2 || rand3 === rand1) {
        rand1 = randomInt(min, max);
        rand2 = randomInt(min, max);
        rand3 = randomInt(min, max);
    }
    randomArray = [rand1, rand2, rand3];


    return randomArray; // return an array of three different random values
}

function render() {

    // render the products' images
    img1.src = product1.productImagePath;
    img2.src = product2.productImagePath;
    img3.src = product3.productImagePath;

    // add views' value to these products.
    product1.views++;
    product2.views++;
    product3.views++;

    // set  the title attribute for  images
    img1.title = product1.productName;
    img2.title = product2.productName;
    img3.title = product3.productName;
}

function onImageContainerClick(event) {

    //check which one was clicked..
    var clickedID = event.target.id;

    if (clickedID !== 'imgs') { // the user didn't click on the images container.

        if (clickedID === 'img1') {
            product1.clicks++;  // increase the clicks value for first image if it was clicked
        }
        else if (clickedID === 'img2') {
            product2.clicks++;
        }
        else if (clickedID === 'img3') {
            product3.clicks++;
        }

        if (rounds === 25) { //check if this was the last round.
            renderResults();//delete the listener and show the results.
            renderChart();
        }
        else {
            rounds++; // increase the rounds value by one
            renderImages(); // render next new three images..
        }
    }

}
