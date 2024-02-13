const api = {
  key: "3ee32176fbc4070662893138e0e9dea6",
  base: "https://api.openweathermap.org/data/2.5/"
}
const cityInput = document.querySelector('#city-input');
const botaoSearch= document.querySelector('#SearchBtn');

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#humidity");
const windElement = document.querySelector("#wind");

const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");
 
const container = document.querySelector(".container");

  const getWeatherData = async (city) => {
    const apiWeatherURL = `${api.base}weather?q=${city}&lang=pt_br&units=metric&APPID=${api.key}`;
    console.log(apiWeatherURL);

    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    console.log(data);
  
    return data;
  };

const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");
};

const showWeatherData = async (city) => {
  hideInformation();

  const data = await getWeatherData(city);

  if (data.cod !== 200) {
    showErrorMessage();
    return;
  }

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );

  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed} km/h`;

  if (data.main.temp > 15) {
    container.style.backgroundImage = `url("assets/img/cold.jpg")`;
  } else {
    container.style.backgroundImage = `url("assets/img/warm.jpg")`;
  }

  weatherContainer.classList.remove("hide");
};

botaoSearch.addEventListener("click", function(event) {
  event.preventDefault();
  const city = cityInput.value;
  showWeatherData(city);
});

cityInput.addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    const city = event.target.value;
    showWeatherData(city);
  }
});