(function () {

var car_images_con = document.querySelector('.thumbInfo'),
    car_images = car_images_con.querySelectorAll('img'),
    car_name = document.querySelector('.modelName'),
    car_price = document.querySelector('.priceInfo'),
    car_details = document.querySelector('.modelDetails');

function makeRequest() {
  httpRequest = new XMLHttpRequest();
  if(!httpRequest){
    alert("Giving up, your browser is way to old");
    return false;
  }
  httpRequest.onreadystatechange = showCarInfo;
  httpRequest.open('GET', 'includes/ajaxQuery.php' + '?model=' + this.id);
  httpRequest.send();
}


function showCarInfo() {
  if(httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200){
    var carInfo = JSON.parse(httpRequest.responseText);

    car_name.firstChild.nodeValue = carInfo.modelName;
    car_price.firstChild.nodeValue = "$" + carInfo.pricing;
    car_details.firstChild.nodeValue = carInfo.modelDetails;

  }
}

function highlightCar() {
  // console.log(this.id);
  [].forEach.call(car_images, function(car_image){
    car_image.classList.add("nonActive"),
    car_image.classList.remove("focusMini");
  });

  this.classList.add("focusMini");
}


[].forEach.call(car_images, function(car_image){
  car_image.addEventListener("click", makeRequest, false),
  car_image.addEventListener("click", highlightCar, false);
});



})();
