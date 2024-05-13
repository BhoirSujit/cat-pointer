var imgmap;
fetch('imgmap.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        imgmap = data;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    function findClosestImageName(targetX, targetY) {
        let closestImage = null;
        let minDistance = Infinity;
    
        imgmap.forEach(imageData => {
            const distance = Math.sqrt((targetX - imageData.x) ** 2 + (targetY - imageData.y) ** 2);
            if (distance < minDistance) {
                minDistance = distance;
                closestImage = imageData.name;
            }
        });
    
        return closestImage;
    }


var contentdiv = document.getElementById('maindiv');
var catimg = document.getElementById('catimg');

window.addEventListener('load', function () {
    var warningMessage = document.getElementById('warning-message');

    if (window.innerWidth > 768) {
        warningMessage.style.display = 'block';
        contentdiv.style.display = 'none'
    }
});

window.onload = function() {
    var img = document.getElementById('catimg');
    var width = img.clientWidth;
    var height = img.clientHeight;
    let deb = document.getElementById("deb");
    deb.innerHTML = 'Width: ' + width + ', Height: ' + height;
  }


contentdiv.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
   
    loadcat(touch.clientX, touch.clientY)
});


contentdiv.addEventListener('mousemove', (e) => {
    loadcat(e.clientX, e.clientY);
});

function normalizeCoord(x, y)
{
    var img = document.getElementById('catimg');
    var w = img.clientWidth;
    var h = img.clientHeight;

    x = (x/w) * 100;
    y = (y/h) * 100;

    return x, y;
}

function getWindowSize() {
    var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    var height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

    return { width: width, height: height };
}


function loadcat(x, y) {
   
    var w = getWindowSize().width;
    var h = getWindowSize().height;

    x = (x/w) * 100;
    y = (y/h) * 100;

    x = (425/100) * x;
    y = (831/100) * y;

    let cimg = findClosestImageName(x, y);
    console.log(x + " " + y);
    let deb = document.getElementById("deb");
    deb.innerHTML = "toched ar " + x + " " + y;
    console.log(cimg);
    catimg.src = "images/"+cimg;
    
   
}



