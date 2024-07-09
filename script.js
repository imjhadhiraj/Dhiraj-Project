const userTab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather]");
const grantLocationContainer=document.querySelector(".grantLocationContainer");
const searchForm=document.querySelector("[data-SearchForm]");
const loadingContainer=document.querySelector(".loadingContainer");
const weatherInfoContainer=document.querySelector(".weatherInfoContainer");
const invalidCity = document.querySelector(".invalidCity");

let currentTab=userTab;
const API_KEY="3976702549bf5afc7967059d193990b1";
currentTab.classList.add("currentTab");
getfromSessionStorage();

function switchTab(clickedTab){
    if(clickedTab!=currentTab){
        currentTab.classList.remove("currentTab");
        currentTab=clickedTab;
        currentTab.classList.add("currentTab");

        // matlab abhi your weather selected tha, to switching k time ye sab krna pdega
        if(!searchForm.classList.contains("active")){
            weatherInfoContainer.classList.remove("active");
            grantLocationContainer.classList.remove("active"); 
            searchForm.classList.add("active");
        }
        else {
            // pehle search tab pr tha , ab your weather tab visible krna h
            searchForm.classList.remove("active");
            weatherInfoContainer.classList.remove("active");
            invalidCity.classList.remove("active");
            // your weather tab me khud ka weather display krna h
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click",()=> {
    switchTab(userTab);
});
 
searchTab.addEventListener("click",()=> {
    switchTab(searchTab);
});  

// check if session storage ar ealready present in session storage
function getfromSessionStorage(){
    const localCoordinates=sessionStorage.getItem("user-Coordinates");

    if(!localCoordinates){
        grantLocationContainer.classList.add("active");
    }
    else {
       const coordinates = JSON.parse(localCoordinates);
       fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates) {
    const {lat,lon} =coordinates;
    // grantLocation hide
    grantLocationContainer.classList.remove("active");
    // make loader visible
    loadingContainer.classList.add("active");

    // API call
    try {
        const response =await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data=await response.json();

        loadingContainer.classList.remove("active");
        weatherInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        // Error Handling
        loadingContainer.classList.remove("active");
    }
}

function renderWeatherInfo(weatherInfo) {
    // fetch elements
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-CountryIcon]");
    const weatherDesc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const clouds = document.querySelector("[data-clouds]");

    // check if city name is invalid
    if(weatherInfo?.name==undefined){
        invalidCity.classList.add("active");
    }
    else {
        // fetch value and put it in UI elements
        cityName.innerText = weatherInfo?.name;
        countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
        weatherDesc.innerText = weatherInfo?.weather?.[0]?.description;
        weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
        temp.innerText = `${weatherInfo?.main?.temp} °C`;
        windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
        humidity.innerText = `${weatherInfo?.main?.humidity} %`;
        clouds.innerText = `${weatherInfo?.clouds?.all} %`;
    }
}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else {
        alert("No GeoLocation Support");
    }
}

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    }

    sessionStorage.setItem("user-Coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}

const searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName=="") return;

    else {
        fetchSearchWeatherInfo(cityName);
    }
})

async function fetchSearchWeatherInfo(city) {
    loadingContainer.classList.add("active");
    weatherInfoContainer.classList.remove("active");
    grantLocationContainer.classList.remove("active");
    invalidCity.classList.remove("active");

    try {
        const response =await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();

        loadingContainer.classList.remove("active");
        if(data?.name!=undefined){
        weatherInfoContainer.classList.add("active");
        }
        renderWeatherInfo(data); 
    }
    catch(err) {
        // Error Handling 
    }
}