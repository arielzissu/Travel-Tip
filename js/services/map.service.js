export default {
    initMap,
    addMarker,
    panTo,
    getWeather,
    changeKelvinToCelsius,
    codeAddress,
    getMapCenter
}


var map;
var geocoder;

function getMapCenter(){
    return map.getCenter();
}


export function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            map = new google.maps.Map(
                document.querySelector('#map'), {
                    center: { lat, lng },
                    zoom: 15
                })
            console.log('Map!', map);
        })
        .then(() => {
            geocoder = new google.maps.Geocoder();
            console.log(`geocoder`, geocoder);


        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    map.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyCBd9raFzGobWUFtQoZXQ-qRIjUqlMb0uw';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);
    var elGeoApi = document.createElement('script');
    elGeoApi.src = `https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=key=${API_KEY}`;
    elGeoApi.async = true;
    document.body.append(elGeoApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


function getWeather(lat, lon) {
    const KEY_WEATHER = `2179c7e02719bb029f4f83eca7af25b7`;
    // console.log(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY_WEATHER}`);
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY_WEATHER}`)
        .then(res => {
            // console.log('123', res.data);
            return res.data;
        });
}


function changeKelvinToCelsius(temp) {
    temp = +temp;
    console.log('temp0000: ', (((temp - 273.15)).toFixed(2) + '\xB0C'));
    return (((temp - 273.15)).toFixed(2) + '\xB0C');
}


function codeAddress(addressFromUser) {
    return new Promise(resolve => {
        geocoder.geocode({ 'address': addressFromUser }, function(resaults) {
            // alert(resaults)
            resolve(resaults[0].geometry.location)
                // resolve(resaults)
        })
    })
}