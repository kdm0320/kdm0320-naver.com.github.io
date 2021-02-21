const weather = document.querySelector(".js-weather");
const COORDS = 'coords';
const API_KEY = 'fc4beeb04db5929463cc473723f138dd';

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `Temparature : ${temperature}\xB0C \n ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}




function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('Cant aceess geo location');
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoards(){
    const loadedCoards = localStorage.getItem(COORDS);
    if(loadedCoards===null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoards);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoards();
}

init();