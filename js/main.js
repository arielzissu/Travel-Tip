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
    .catch(err => {
        console.log('User position is:', pos.coords);
            console.log('err!!!', err);
        })
}
document.querySelector('.location-adress').addEventListener('click', () => {
    let addressFromUser = document.querySelector('.enter-location-input').value;
    mapService.codeAddress(addressFromUser)
        .then(res => {
            // console.log(res.toJSON.lat, ' ', res.toJSON.lng)
            // console.log(res)
            // for (let key in res) {
            //     console.log(key, ':', res[key]())
            // }
            mapService.panTo(res.lat(), res.lng());
            mapService.addMarker({ lat: res.lat(), lng: res.lng() });
        });
});

document.querySelector('.btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    locService.getPosition()
        .then(res => res.coords)
        .then(coords => {
            console.log('coordsssss', coords);
            mapService.panTo(coords.latitude, coords.longitude);
            mapService.addMarker({ lat: coords.latitude, lng: coords.longitude });
        })
})


document.querySelector('.weather').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    mapService.getWeather(32.0149831, 34.4120554)
        .then(weather => {
            const temp = mapService.changeKelvinToCelsius(weather.main.temp);
            const tempMin = mapService.changeKelvinToCelsius(weather.main.temp_min);
            const tempMax = mapService.changeKelvinToCelsius(weather.main.temp_max);
            let strHTML = ``;
            strHTML += `
            <p>weather(temp): ${temp}, min: ${tempMin} max: ${tempMax}</p>
            <p>wind(speed):${weather.wind.speed}</p>
            `;
            document.querySelector('.weather').innerHTML = strHTML;
        })
});