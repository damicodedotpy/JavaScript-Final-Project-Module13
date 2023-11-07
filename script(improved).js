const currencies = {
  dollar: {
    uri: 'https://open.er-api.com/v6/latest/USD',
    getValue: (value) => value.rates.ARS,
    paragraph: document.getElementById('dollarValue'),
  },
  bitcoin: {
    uri: 'https://api.coindesk.com/v1/bpi/currentprice.json',
    getValue: (value) => value.bpi.USD.rate,
    paragraph: document.getElementById('bitcoinValue'),
  },
  pesoArgentino: {
    uri: 'https://open.er-api.com/v6/latest/ARS',
    getValue: (value) => value.rates.USD,
    paragraph: document.getElementById('pesoValue'),
  },
};

// This function gets the updated value of a given currency
function getCurrencyValue(currencyKey) {
  const currency = currencies[currencyKey];

  return fetch(currency.uri)
    .then((data) => data.json())
    .then((value) => currency.getValue(value))
    .catch((error) => console.error('Can not get info from API' + error));
}

async function loadCurrency(currencyKey, symbol) {
  const currency = currencies[currencyKey];
  // Create an 'img' element to contain the loading gif animation
  var img = document.createElement('img');
  // Fill the 'img' element with the loading gif animation
  img.src = './src/loading.gif';
  // Add the loading animation meanwhile the next promise is completed
  currency.paragraph.appendChild(img);
  // Get the currency value
  return await getCurrencyValue(currencyKey)
    // Replace the HTML paragraph content with the current value and remove the loading animation
    .then((value) => {
      currency.paragraph.removeChild(img);
      currency.paragraph.textContent = `${symbol} ${value}`;
    })
    // If something goes wrong rise an error
    .catch((error) => console.error('There was an error' + error));
}

// Show dollar current price
loadCurrency('dollar', '$').then();

// Show bitcoin current price
loadCurrency('bitcoin', 'B').then();

// Show peso argentino current price
loadCurrency('pesoArgentino', 'ARS').then();
