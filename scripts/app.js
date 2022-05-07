const cityForm =document.querySelector("form")
const card = document.querySelector(".card")
const details = document.querySelector(".details")
const time =document.querySelector("img.time")
const icon =document.querySelector(".icon img")

const updateUI = (data) =>{
// const cityDetails = data.cityDetails
// const weather = data.weather

//destructure
const {cityDetails,weather} =data

console.log(data.weather);

//update details
details.innerHTML = `<h5 class="my-3">${cityDetails.EnglishName}</h5>
<div class="my-3"> ${weather.WeatherText} </div>
<div class="display-4 my-4">
  <span>${weather.Temperature.Metric.Value}</span>
  <span>&deg;C</span>
</div>`

// update day night 
const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
icon.setAttribute("src",iconSrc)


let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg"
// if (weather.IsDayTime) {
//     timeSrc ="img/day.svg";
// } else {
//     timeSrc ="img/night.svg";
// }
time.setAttribute("src",timeSrc)


//remove d-none
if(card.classList.contains("d-none")){
card.classList.remove("d-none")
}
}

const updateCity = async(city) =>{
 const cityDetails = await getCity(city)
 const weather = await getWeather(cityDetails.Key)

 return {
    cityDetails ,
    weather
 }
}

cityForm.addEventListener("submit" , e =>{
    e.preventDefault()

    //get city value
    const city = cityForm.city.value.trim()
    cityForm.reset()
    //update ui city
    updateCity(city)
    .then(data=>updateUI(data))
    .catch(err=>console.log(err))

    //local  storage
    localStorage.setItem("city", city)
})

if (localStorage.getItem("city")) {
    updateCity(localStorage.getItem("city"))
    .then(data =>updateUI(data))
    .catch(err=>console.log(err))
}