const daily = document.querySelector('#daily');
const weekly = document.querySelector('#weekly');
const monthly = document.querySelector('#monthly');

let current;
let previous;

let reportPeriod = 'daily';

getHours('data.json', reportPeriod);

async function getHours(url, reportPeriod) {
  try {
    let response = await fetch(url);
    if (!response) {
      throw new Error(`Response status: ${response.status}`);
    }
    let data = await response.json();
    data.forEach((item) => {
      current = item.timeframes[reportPeriod]['current'];
      previous = item.timeframes[reportPeriod]['previous'];
      renderData(current, previous, item.title);
    });
  } catch (error) {
    console.log(error.message);
  }
}

function renderData(current, previous, category) {
  category = category.replace(/\s+/g, '-');
  let currentHrsSuffix = current === 1 ? 'hr' : 'hrs';
  let previousHrsSuffix = previous === 1 ? 'hr' : 'hrs';
  let categoryElement = document.getElementById(category.toLowerCase());

  let h3 = categoryElement.querySelector('.current');
  h3.textContent = `${current + currentHrsSuffix}`;
  let p = categoryElement.querySelector('.previous');
  p.textContent = `Last Week - ${previous + previousHrsSuffix}`;
}

daily.style.color = '#faf9f6';

daily.addEventListener('click', () => {
  reportPeriod = 'daily';
  daily.style.color = '#faf9f6';
  weekly.style.color = 'hsl(235, 45%, 61%)';
  monthly.style.color = 'hsl(235, 45%, 61%)';
  getHours('data.json', reportPeriod);
});
weekly.addEventListener('click', () => {
  reportPeriod = 'weekly';
  daily.style.color = 'hsl(235, 45%, 61%)';
  weekly.style.color = '#faf9f6';
  monthly.style.color = 'hsl(235, 45%, 61%)';
  getHours('data.json', reportPeriod);
});
monthly.addEventListener('click', () => {
  reportPeriod = 'monthly';
  daily.style.color = 'hsl(235, 45%, 61%)';
  weekly.style.color = 'hsl(235, 45%, 61%)';
  monthly.style.color = '#faf9f6';
  getHours('data.json', reportPeriod);
});
