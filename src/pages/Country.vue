<template>
    <div>
        <b-container>
            <b-row align-h="between" class="mx-auto mt-5">
                <b-col>                    
                    <!-- <font-awesome-icon class="fa-icon" icon="snowflake"/> -->
                    <!-- <font-awesome-icon class="fa-icon" icon="sun"/>
                    <font-awesome-icon class="fa-icon" icon="cloud-sun"/>
                    <font-awesome-icon class="fa-icon" icon="cloud-moon"/>
                    <font-awesome-icon class="fa-icon" icon="cloud"/>
                    <font-awesome-icon class="fa-icon" icon="moon"/>
                    <font-awesome-icon class="fa-icon" icon="cloud-rain"/>
                    <font-awesome-icon class="fa-icon" icon="cloud-showers-heavy"/>
                    <font-awesome-icon class="fa-icon" icon="bolt"/>
                    <font-awesome-icon class="fa-icon" icon="smog"/> -->
                    <h2 class="region">{{ country[0].continents[0] }}</h2>
                    <h1 class="main-head">{{ country[0].name.common }}</h1>
                </b-col>
                <b-col class="d-flex flex-column align-items-end">
                    <h4>Fullname: {{ country[0].name.official }}</h4>

                    <ul class="small-country-info">
                        <h6 class="small-country-info-header">Currencies: </h6>
                        <!-- show commas after every language, .length -1 check is useful for countries with lots of languages, eg. Switzerland -->
                        <h6 v-for="currency in currencies" :key="currency">{{ `${currencies.indexOf(currency) == 0 && currencies.length > 1 ? currency + ',&nbsp;' : currency}` }} </h6>
                    </ul>
                    <ul class="small-country-info">
                        <h6 class="small-country-info-header">Languages: </h6>
                        <h6 v-for="language in languages" :key="language">{{ `${languages.indexOf(language) != languages.length-1 && languages.length > 1 ? language + ',&nbsp;' : language}` }} </h6>
                    </ul>

                    <div v-if="this.weatherDescription" class="d-flex w-60 h-100 justify-content-end align-items-end mb-4">   
                        <div class="w-100 d-flex justify-content-between align-items-end">              
                            <font-awesome-icon class="fa-icon" :icon="`${this.icon}`"/>
                            <h4>{{ this.temp + '°C' }}</h4>
                            <h4 class="weatherDescription">{{ this.weatherDescription }}</h4>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>

                    <b-img class="w-100 hero-image" :src="`${heroImageSrc}`" fluid alt="Responsive image"></b-img>
                </b-col>                
            </b-row>

            <b-row>
                <b-col>   
                    <!-- <div class="d-flex w-25 justify-content-between align-items-center">                 
                        <font-awesome-icon class="fa-icon" :icon="`${this.icon}`"/>
                        <h4>{{ this.temp + '°C' }}</h4>
                        <h4 class="weatherDescription">{{ this.weatherDescription }}</h4>
                    </div> -->
                </b-col>
            </b-row>

            
            <h1 class="mt-5 mb-4" v-if="events.length > 0">Events in {{ country[0].name.common }} </h1>
            <b-row v-if="events.length > 0" cols="2">               
                <div style="margin-bottom: 2rem" v-for="event in events" :key="event.id">
                    <b-col>
                    <b-card
                    img-top
                    tag="article"
                    style=""
                    class="mb-2"
                    >
                    <h2>{{ event.name }} </h2>
                    <img :src="`${event.images[0].url}`" style="height: 20rem; width: 100%;object-fit: cover;" />
                        <h4 style="margin-top: 0.5rem; margin-bottom: 0.5rem">
                        {{ event._embedded.venues[0].name }}
                        </h4>

                        <b-button :href="`${event.url}`" target="_blank" variant="primary">View event</b-button>
                        
                    </b-card>
                    </b-col>
                </div>     
            </b-row>

            <h1 class="mt-5 mb-4" v-if="foods.length > 0">Popular food in {{ country[0].name.common }} </h1>
            <b-row v-if="foods.length > 0" cols="2">               
                <div style="margin-bottom: 2rem" v-for="food in foods" :key="food.idMeal">
                    <b-col>
                    <b-card
                    img-top
                    tag="article"
                    style=";"
                    class="mb-2"
                    >
                    <h2>{{ food.strMeal }} </h2>
                    <img :src="`${food.strMealThumb}`" style="height: 20rem; width: 100%;object-fit: cover;" />
                    </b-card>
                    </b-col>
                </div>     
            </b-row>

            <h1 class="mt-5 mb-4" v-if="news.length > 0">Headlines in {{ country[0].name.common }} </h1>
            <b-row v-if="news.length > 0" cols="2">               
                <div style="margin-bottom: 2rem" v-for="newsItem in news" :key="newsItem.headline">
                    <b-col>
                    <b-card
                    img-top
                    tag="article"
                    style=";"
                    class="mb-2"
                    >
                    <h1>{{ newsItem.author }}</h1>
                    <h4>{{ newsItem.headline }} </h4>
                    <!-- not all news articles have images, show placeholder instead -->
                    <img :src="`${newsItem.image ? newsItem.image : require(`@/assets/placeholder.png`)}`" style="max-height: 20rem; width: 100%;object-fit: cover;" />
                    </b-card>
                    </b-col>
                </div>     
            </b-row>
        </b-container>
    </div>    
</template>

<script>
    import axios from 'axios'
    export default{
        name: 'Country',
        data(){
            return {
                country: [],
                currencies: [],
                languages: [],
                heroImageSrc: String,
                events: [],
                foods: [],
                news: [],
                languageCode: String,
                icon: String,
                weatherDescription: String,
                temp: Number
            }
        },
        // I was forcing a ui update this way, but switched to passing a :key to the router-view in App.vue

        // beforeRouteUpdate(to, from, next){
        //     console.log('ROUTE UPDATE')
        //     console.log('TO: ' + to)
        //     console.log('FROM: ' + from)
        //     console.log(next)
        //     ///this.$route.params.country = to.params.country
        //     console.log('PARAMS')
        //     next()
        // },
        methods: {
            getCountries(){
                axios.get(`https://restcountries.com/v3.1/name/${this.$route.params.country}/?fullText=true`)
                .then(response =>{

                    var currency = (Object.values(response.data[0].currencies))
                    this.currencies.push((currency[0].name))
                    /* Check if there's a second currency */
                    /* There are no countries with more than 2 currencies */
                    currency[1] ? this.currencies.push(currency[1].name) : ''

                    this.languages = (Object.values(response.data[0].languages))

                    // need this for the translation api
                    this.languageCode = Object.keys(response.data[0].languages)
                    
                    this.country = response.data
                    this.getImage(this.country)
                    this.getEvents(this.country[0].cca2)
                    this.getFood(this.country[0].demonyms.eng.m)
                    this.getNews(this.country[0].cca2)
                    this.getWeather();
                    
                })
                // first parameter of catch is always error, but we can name it whatever we want
                // obviously it just makes sense to call it 'error'
                .catch(error => console.log(error))
            },
            getImage(country){
                 axios.get(`https://api.unsplash.com/search/photos/?client_id=9LhVwLjJrdIy5jX3svklsUACp0mByDjsrzbJNTZGAqg&query=${country[0].name.common}`)
                .then(response =>{
                    this.heroImageSrc = response.data.results[0].urls.full
                })
                .catch(error => console.log(error))
            },
            getEvents(countryCode){
                axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&apikey=3ppB8CLW5dstXgxJirTmtYmcPr1fySNT`)
                .then(response => {
                    for(var i=0; i<4; i++){
                        this.events.push(response.data._embedded.events[i])
                    }
                })
                .catch(error => console.log(error))
            },
            getFood(demonym){
                axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${demonym}`)
                .then(response => {
                    for(var i=0; i<4; i++){
                        this.foods.push(response.data.meals[i])
                    }
                })
                .catch(error => console.log(error))
            },
            getNews(countryCode){
                axios.get(`https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=75e99a70acd44c50bb02cee29552e58c`)
                .then(response => {

                    var tempArticles = []

                    for(var i=0; i<4; i++){
                        var obj = {}
                        var headline = (response.data.articles[i].title)
                        var author = response.data.articles[i].source.name
                        var img = response.data.articles[i].urlToImage
                        obj['headline'] = this.translate(headline)
                        obj['author'] = author
                        obj['image'] = img
                        
                        tempArticles.push(obj);
                    }

                    this.news = tempArticles

                    console.log(this.news)
                })
                .catch(error => console.log(error))
            },
            async translate(query){
                // -- not all language codes are correct, making adjustment for common languages I notice to be wrong -- //
                this.languageCode.toString().toLowerCase() === 'fra' ? this.languageCode = 'fr' : ''
                this.languageCode.toString().toLowerCase() === 'deu' ? this.languageCode = 'de' : ''
                // mt = machine translation enabled
                // de = an email to reach the user, mainly for commercial stuff
                var options = {
                method: 'GET',
                url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/api/get',
                params: {langpair: `${this.languageCode}|en`, q: `${query}`, mt: '1', onlyprivate: '0', de: 'a@b.c'},
                headers: {
                    'x-rapidapi-host': 'translated-mymemory---translation-memory.p.rapidapi.com',
                    'x-rapidapi-key': 'b6e8418e67msh608d96d57176776p179c32jsnc45f9e8caf95'
                }
                };

                await axios.request(options).then(function (response) {
                    console.log(response.data)
                    console.log(response.data.matches[0].translation)
                    return response.data.matches[0].translation
                }).catch(function (error) {
                    console.error(error);
                });
            },
            getWeather(){
                const icons = new Map([
                    ['01d','sun'],
                    ['01n','moon'],
                    ['02d','sun'],
                    ['02n','moon'],
                    ['03d','sun'],
                    ['03n','cloud'],
                    ['04d','cloud'],
                    ['04n','cloud'],
                    ['09d','cloud'],
                    ['09n','cloud'],
                    ['10d','cloud'],
                    ['10n','cloud'],
                    ['11d','bolt'],
                    ['11n','bolt'],
                    ['13d','snowflake'],
                    ['13n','snowflake'],
                    ['50d','smog']
                ]
                );

                var latlng = this.country[0].latlng
                console.log(latlng)
                console.log(icons)
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&units=metric&appid=c87affa6dd76959b48d86866074f44e4`)
                .then(response => {
                    console.log(response.data)
                    var owIcon = response.data.weather[0].icon;
                    this.weatherDescription = response.data.weather[0].description;
                    this.temp = response.data.main.temp
                    console.log(owIcon)

                    for(let [key, value] of icons.entries()){
                        console.log(key + value);
                        if(key == owIcon){
                            console.log('MATCH')
                            this.icon = value;
                        }
                    }
                })
                .catch(error => console.log(error))
                
            }
        },
        mounted(){
            this.getCountries()
                
        }
    }
</script>

<style scoped>
h1,h2,h3,h4,h5,h6{
    font-family: 'Alegreya Sans Bold';
}
.w-60{
    width: 60%!important;
}

.main-head{
    font-size:8rem;
}
.region{
    color: #1F7584;
}
.small-country-info{
    list-style: none;
    display: flex;
    align-items:center;
    padding-left:0;
}
.small-country-info-header{
    margin-right: 0.25rem;
}
ul{
    margin-bottom:0;
}

.hero-image{
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    margin: 2rem 0;
}

.fa-icon{
    font-size:2.5rem;
}

.weatherDescription{
    text-transform:capitalize;
}
</style>
