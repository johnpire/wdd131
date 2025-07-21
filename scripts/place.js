const today = new Date();
const year = document.querySelector("#currentyear");
year.textContent = today.getFullYear();

const lastModified = document.querySelector("#lastModified");
lastModified.textContent = `Last Modification: ${document.lastModified}`;

let temperature = -10;
let windSpeed = 15;
let conditions = "Light Snow";

let windChill = 0;
function calculateWindChill(temp, windSpeed)
{
    return windChill = 13.12 + 0.6215 * temp - 11.37 * (windSpeed ** 0.16) + 0.3965 * temp * (windSpeed ** 0.16)
}

if (temperature <= 10 && windSpeed > 4.8) {
    windChill = calculateWindChill(temperature, windSpeed);
} else {
    windChill = "N/A";
};

document.getElementById("temperature").textContent = `${temperature} °C`;
document.getElementById("conditions").textContent = conditions;
document.getElementById("windSpeed").textContent = `${windSpeed} km/h`;
document.getElementById("windChill").textContent = `${windChill.toFixed(1)} °C`;