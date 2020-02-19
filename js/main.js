console.log('Main!');

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'


locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    mapService.initMap()
        .then(() => {

            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(console.log('INIT MAP ERROR'));

    locService.getPosition()
        .then(pos => {

            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
document.querySelector('.location-adress').addEventListener('click', ()=>{
    let addressFromUser=document.querySelector('.enter-location-input').value;
    console.log(addressFromUser);
})

document.querySelector('.btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    // mapService.panTo(35.6895, 139.6917);
    locService.getPosition.then(resolve => console.log('resolve:///', resolve));
})








            // function codeAddress() {
            //     var input = document.getElementById("address");
            //     var autocomplete = new google.maps.places.Autocomplete(input);
            //     var address = document.getElementById("address").value;
            //     geocoder.geocode({ 'address': address }, function (r, s) {
            //         alert(r[0].geometry.location);
            //     });