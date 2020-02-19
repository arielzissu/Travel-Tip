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
        .then(pos =>
            console.log('User position is:', pos.coords))
        .catch(err => {
            console.log('err!!!', err);
        })
}
document.querySelector('.location-adress').addEventListener('click', () => {
    let addressFromUser = document.querySelector('.enter-location-input').value;
    mapService.codeAddress(addressFromUser)
        .then(res => {
            mapService.panTo(res.lat(), res.lng());
            mapService.addMarker({ lat: res.lat(), lng: res.lng() });
            mapService.getWeather(res.lat(), res.lng())
                .then(weather => {
                    const temp = mapService.changeKelvinToCelsius(weather.main.temp);
                    const tempMin = mapService.changeKelvinToCelsius(weather.main.temp_min);
                    const tempMax = mapService.changeKelvinToCelsius(weather.main.temp_max);
                    let strHTML = ``;
                    strHTML += `
                <p>weather(temp): ${temp}, min: ${tempMin} max: ${tempMax}</p>
                <p>wind(speed):${weather.wind.speed} K/Hr</p>
                `;
                    document.querySelector('.weather').innerHTML = strHTML;
                })
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

            mapService.getWeather(32.0149831, 34.4120554)
                .then(weather => {
                    const temp = mapService.changeKelvinToCelsius(weather.main.temp);
                    const tempMin = mapService.changeKelvinToCelsius(weather.main.temp_min);
                    const tempMax = mapService.changeKelvinToCelsius(weather.main.temp_max);
                    let strHTML = ``;
                    strHTML += `
            <p>weather(temp): ${temp}, min: ${tempMin} max: ${tempMax}</p>
            <p>wind(speed):${weather.wind.speed} K/Hr</p>
            `;
                    document.querySelector('.weather').innerHTML = strHTML;
                })
        })
})

// https://arielzissu.github.io/Travel-Tip/


// function myFunction() {
//     var copyText = document.getElementById("myInput");
//     copyText.select();
//     copyText.setSelectionRange(0, 99999)
//     document.execCommand("copy");
//     alert("Copied the text: " + copyText.value);
//   }