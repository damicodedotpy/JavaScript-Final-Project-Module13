var paragraphBitcoin = document.getElementById("bitcoinValue");
var paragraphDollar = document.getElementById("dollarValue");
var paragraphPesoArg = document.getElementById("pesoValue");




// This function gets the updated value of a given currency
function getCurrencyValue(currencyName) {
    // Get value of dollar currency
    if (currencyName === "dollar") {
        return fetch("https://open.er-api.com/v6/latest/USD")
        .then(data => data.json())
        .then(value => value.rates.ARS)
        .catch(error => console.error("Can not get info from API" + error))
    // Get value of bitcoin criptocurrency
    } else if (currencyName === "bitcoin"){
        return fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then(data => data.json())
        .then(value => value.bpi.USD.rate)
        .catch(error => console.error("Can not get info from API" + error))
    // Get value of peso argentino currency
    } else if (currencyName === "pesoArgentino") {
        return fetch("https://open.er-api.com/v6/latest/ARS")
        .then(data => data.json())
        .then(value => value.rates.USD)
        .catch(error => console.error("Can not get info from API" + error))
    }
}

// This function fill up the HTML paragraph of the dollar value and adds a GIF animation meanwhile the process is completed
async function updateDollarHTMLValue() {
    // Create an 'img' element to contain the loading gif animation
    var img = document.createElement("img")
    // Fill the 'img' element with the loading gif animation
    img.src = "./src/loading.gif";
    // Add the loading animation meanwhile the next promise is completed
    paragraphDollar.appendChild(img);
    // Get the currency value
    return await getCurrencyValue("dollar")
    // Replace the HTML paragraph content with the current value and remove the loading animation
    .then(value => {
        paragraphDollar.textContent = `$ ${value}`
        paragraphDollar.removeChild("img")
    })
    // If something goes wrong rise an error
    .catch(error => console.error("There was an error" + error))
}

// This function fill up the HTML paragraph of the bitcoin value and adds a GIF animation meanwhile the process is completed
async function updateBitcoinHTMLValue() {
    // Create an 'img' element to contain the loading gif animation
    var img = document.createElement("img")
    // Fill the 'img' element with the loading gif animation
    img.src = "./src/loading.gif";
    // Add the loading animation meanwhile the next promise is completed
    paragraphBitcoin.appendChild(img);
    // Get the currency value
    return await getCurrencyValue("bitcoin")
    // Replace the HTML paragraph content with the current value and remove the loading animation
    .then(value => {
        paragraphBitcoin.textContent = `B ${value}`
        paragraphBitcoin.removeChild("img")
    })
    // If something goes wrong rise an error
    .catch(error => console.error("There was an error" + error))
}

// This function fill up the HTML paragraph of the peso argentino value and adds a GIF animation meanwhile the process is completed
async function updatePesoArgHTMLValue() {
    // Create an 'img' element to contain the loading gif animation
    var img = document.createElement("img")
    // Fill the 'img' element with the loading gif animation
    img.src = "./src/loading.gif";
    // Add the loading animation meanwhile the next promise is completed
    paragraphPesoArg.appendChild(img)
    // Get the currency value
    return await getCurrencyValue("pesoArgentino")
    // Replace the HTML paragraph content with the current value and remove the loading animation
    .then(value => {
        paragraphPesoArg.textContent = `ARS ${value}`
        paragraphPesoArg.removeChild("img")
    })
    // If something goes wrong rise an error
    .catch(error => console.error("There was an error" + error))
}




// Show bitcoin current price
updateBitcoinHTMLValue()

// Show peso argentino current price
updatePesoArgHTMLValue()

// Show dollar current price
updateDollarHTMLValue()





