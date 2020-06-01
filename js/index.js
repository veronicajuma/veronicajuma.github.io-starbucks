var map;
var markers = [];
var infoWindow;
function initMap() {
    var losangeles = {
        lat: 34.052235,
        lng:-118.243683
    } 
  map = new google.maps.Map(document.getElementById('map'), {
    center: losangeles,
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'landscape',
        elementType: 'labels',
        stylers: [{visibility: 'off' }]
        },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]
         });
      infoWindow = new google.maps.InfoWindow();  
 searchStores();
} 
function searchStores(){
  var foundStores = [];
var zipCode = document.getElementById('zip-code-input').value;
if(zipCode){
stores.forEach(function (store){
  var postal = store.address.postalCode.substring(0,5);
  if(postal == zipCode){
    foundStores.push(store);
  }
  });
}
else{
  foundStores = stores;
}
clearLocations()
  displayStores(foundStores);
  showStoreMarkers(foundStores);
  setOnClickListener();
  } 
function clearLocations(){
  infoWindow.close();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = 0;

}
function setOnClickListener(){
  var storeElements = document.querySelectorAll('.store-info-container');
  storeElements.forEach(function(elem, index){
    elem.addEventListener('click',function(){
      google.maps.event.trigger(markers[index], 'click');
    })
  });
}
function displayStores(stores){
    var storesHtml = "";
stores.forEach(function(store, index){
var address = store.addressLines;
var phone = store.phoneNumber;
    storesHtml += `
<div class = "stores-list-address">
<div class = "store-container-background">
<div class = "store-info-container">
<div class = "addresses"><span>${address[0]}</span>
<span>${address[1]}</span></div>
<div class = "phone-number"><span><i class="fas fa-phone-alt"></i> ${phone}</span></div>
</div>
<div class = "store-info-number">
<div class = "store-number">${index+1}</div>
</div>
</div>
</div>`
});
document.querySelector('.stores-address').innerHTML = storesHtml;
}
function showStoreMarkers(stores){
    var bounds = new google.maps.LatLngBounds();
    stores.forEach(function(store, index){
            var latlng = new google.maps.LatLng(
                store.coordinates.latitude, 
                store.coordinates.longitude);
                var name = store.name;
                var address = store.addressLines[0];
                var phonenumber = store.phoneNumber;
                var status = store.openStatusText;
                                bounds.extend(latlng);
                createMarker(latlng, name, address,phonenumber,status, index); 
    })
    map.fitBounds(bounds);
}
function createMarker(latlng, name, address,phonenumber,status,index) {
  
  var html =`<div class = "infoWindow">
  <div class = "logo"></div>
  <div class = "store-name">${name}</div>
  <div class =  "status">
   ${status}</a></div>
  <div class = "address">
  <div class = "circle"><i class="fas fa-location-arrow"></i></div>
  <a id = "linking" href = "https://www.google.com/maps/dir/?api=1&destination=${address}">
  ${address}</a></div>
  <div class = "phone">
  <div class = "circle">
  <i class="fas fa-phone-alt"></i>
    </div>${phonenumber}</div>
  </div> `;
    var iconBase = './images/';
    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      //label:`${index+1}`,
        icon: iconBase + 'coffeemug.png'
      
        });
    google.maps.event.addListener(marker, 'click', function() {
      
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
  }