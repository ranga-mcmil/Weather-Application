const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();


const updateUI = (data) => {

    // const cityDets = data.cityDets;
    // const weather = data.weather;

    // Destructuring the data
    const {cityDets, weather} = data


    // update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${data.weather['0'].WeatherText}</div>
        <div class="display-4 my-4">
            <span>${data.weather['0'].Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `

    // Update the night/day images
    let timeSrc = weather['0'].IsDayTime ? 'img/day.svg' : 'img/night.svg'; 
    time.setAttribute('src', timeSrc);

    // Update the icons
    iconSrc = `img/icons/${data.weather['0'].WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc)

    // remove d-none class if present
    if (card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};





cityForm.addEventListener('submit', (e) => {
    //prevent default action
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update UI with new city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city)

})

if(localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}