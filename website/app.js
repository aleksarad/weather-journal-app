const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKEY = '&appid=e9a60ca9804b0e768b2fdc6316980880';


let today = new Date().toLocaleDateString();
const zipCode = document.getElementById('zip');
const feelings = document.getElementById('feelings');


const getWeatherData = async (url = '') => {
  const weatherData = await fetch(url);

  try {
    if (weatherData.status !== 200) {
      throw new Error("Not 200 response")
    }
    else {
      const data = await weatherData.json();
      return data;
    }
  } catch(error){
    alert('Invalid zipcode');
    return false;
  }
};

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      });
}

const kelvinToF = (num) => {
  const farenheit =  Math.round((num - 273.15) * 9/5 + 32);
  return farenheit + '°F';
};

const updateUI = async () => {
  const request = await fetch('/g');
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById('date').innerHTML = '<strong>Date:</strong> ' + allData.newPost.date;
    document.getElementById('temp').innerHTML = '<strong>Temperature:</strong> ' + kelvinToF(allData.newPost.temp);
    document.getElementById('content').innerHTML = '<strong>Feelings:</strong> ' +  allData.newPost.feelings;
  } catch(error) {
    console.log('error', error);
  }
}


document.getElementById('generate').addEventListener('click', () => {
  getWeatherData(baseURL + zipCode.value + apiKEY).then((data) => {
    postData('/add', {date: today, temperature: data.main.temp, feelings: feelings.value});
    updateUI();
  });
 });

