# Weather Application
This project is the Weather application that allow use to search the weather based on the various selection of the city in USA.

---
## API
1. Openweathermap API
    - Current Weather Data [https://openweathermap.org/current](https://openweathermap.org/current)
    - Daily Forecast 16 days [https://openweathermap.org/forecast16](https://openweathermap.org/forecast16)
    - Weather Maps 2.0 [https://openweathermap.org/api/weather-map-2](https://openweathermap.org/api/weather-map-2)
2. Yelp Fusion API
    - Search businesses [https://docs.developer.yelp.com/reference/v3_business_search](https://docs.developer.yelp.com/reference/v3_business_search)
3. NewsAPI
    - Everything v2 [https://newsapi.org/docs/endpoints/everything](https://newsapi.org/docs/endpoints/everything)
4. Pexels API
    - [https://www.pexels.com/api/documentation/#photos-search](https://www.pexels.com/api/documentation/#photos-search)
---

## Setup
**I did not provide the API key in this Github repository so you need to setup your, here is how.**

### data.js
In `/src/static`, create `data.js` file.\
In that file, ADD following

```javascript
const citylist = [/**CITY LIST YOU WANT TO USE IN YOUR */]
export const uniqueCitylist = Array.from(new Set(citylist));
export const API_KEY = "API_KEY" //API_KEY FROM OPENWEATHERMAP
export const NEWS_API_KEY = "API_KEY" //API_KEY FROM NEWSAPI
export const PEXEL_API_KEY = "API_KEY" //API_KEY FROM PEXEL
```
### proxydata.js
In `/proxyserver`, create `proxydata.js` file.\
In that file, ADD following

```javascript
const apiKey = "API_KEY";//API_KEY FROM YELP
const yelpBaseUrl = "https://api.yelp.com/v3/businesses/search";

module.exports = {
    apiKey,
    yelpBaseUrl,
};
```

---
# Running the project
## Proxyserver
In `/proxyserver` Directory, run
- `npm install` for installing all the dependency
- `node proxy-server.js` for starting the proxyserver
## Frontend
In this Directory, run
- `npm install` for installing all the dependency
- `npm start` for starting the project

open [http://localhost:3000/](http://localhost:3000/)

