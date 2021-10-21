import axios from 'axios';

const COUNTRIES_URL = 'https://restcountries.com/v3.1'

const FOOD_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a='

const NEWS_URL = 'https://newsapi.org/v2/top-headlines?country='
const NEWS_KEY = '75e99a70acd44c50bb02cee29552e58c'

const UNSPLASH_URL = 'https://api.unsplash.com/search/photos/?client_id=9LhVwLjJrdIy5jX3svklsUACp0mByDjsrzbJNTZGAqg&query='

const EVENTS_URL = 'https://app.ticketmaster.com/discovery/v2/events.json?countryCode='
const EVENTS_KEY ='&apikey=3ppB8CLW5dstXgxJirTmtYmcPr1fySNT'

export default {
      getCountries(params = null){        
        axios.get(`${COUNTRIES_URL}/all${params ? params : ''}`)
        .then(response =>{
            console.log(response.data)
            // this.countries = response.data
            return response.data
        })
        // first parameter of catch is always error, but we can name it whatever we want
        // obviously it just makes sense to call it 'error'
        .catch(error => console.log(error))
      },

      getFood(countryCode){
        axios.get(`${FOOD_URL}${countryCode}`)
        .then(response =>{
            console.log(response.data)
            return response.data
        })
        .catch(error => console.log(error))
      },

      getNews(countryCode){
        axios.get(`${NEWS_URL}${countryCode}${NEWS_KEY}`)
        .then(response =>{
            console.log(response.data)
            return response.data
        })
        .catch(error => console.log(error))
      },

      getImage(countryName){
        axios.get(`${UNSPLASH_URL}${countryName}`)
        .then(response =>{
            console.log(response.data)
            return response.data
        })
        .catch(error => console.log(error))
      },

      getEvents(countryCode){
        axios.get(`${EVENTS_URL}${countryCode}${EVENTS_KEY}`)
        .then(response =>{
            console.log(response.data)
            return response.data
        })
        .catch(error => console.log(error))
      }
}