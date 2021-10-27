<template>
    <div>
        <b-container>
            <b-row align-h="between" class="mx-auto mt-5">
                <b-col>
                    <h2 class="region">{{ country[0].continents[0] }}</h2>
                    <h1 class="main-head">{{ country[0].name.common }}</h1>
                </b-col>
                <b-col class="d-flex flex-column align-items-end">
                    <h4>Fullname: {{ country[0].name.official }}</h4>
                    <ul class="small-country-info">
                        <h6 class="small-country-info-header">Currencies: </h6>
                        <!-- show commas after every language, .length -1 check is useful for countries with lots of languages, eg. Switzerland -->
                        <h6 v-for="currency in currencies" :key="currency">{{ `${currencies.indexOf(currency) == 0 && currencies.length > 1 ? currency + ', ' : currency}` }} </h6>
                    </ul>
                    <ul class="small-country-info">
                        <h6 class="small-country-info-header">Languages: </h6>
                        <h6 v-for="language in languages" :key="language">{{ `${languages.indexOf(language) != languages.length-1 && languages.length > 1 ? language + ', ' : language}` }} </h6>
                    </ul>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-img class="w-100 hero-image" :src="`${heroImageSrc}`" fluid alt="Responsive image"></b-img>
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
                    <img :src="`${event.images[0].url}`" style="max-height: 20rem; width: 100%;object-fit: cover;" />
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
                    <img :src="`${food.strMealThumb}`" style="max-height: 20rem; width: 100%;object-fit: cover;" />
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
                languageCode: String
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
                    console.log(response.data)

                    var currency = (Object.values(response.data[0].currencies))
                    this.currencies.push((currency[0].name))
                    /* Check if there's a second currency */
                    /* There are no countries with more than 2 currencies */
                    currency[1] ? this.currencies.push(currency[1].name) : ''

                    this.languages = (Object.values(response.data[0].languages))

                    // need this for the translation api
                    this.languageCode = Object.keys(response.data[0].languages)

                    console.log(this.languageCode)
                    
                    this.country = response.data
                    console.log('---------------------------')
                    console.log(this.country)
                    this.getImage(this.country)
                    this.getEvents(this.country[0].cca2)
                    this.getFood(this.country[0].demonyms.eng.m)
                    this.getNews(this.country[0].cca2)
                    
                })
                // first parameter of catch is always error, but we can name it whatever we want
                // obviously it just makes sense to call it 'error'
                .catch(error => console.log(error))
            },
            getImage(country){
                 axios.get(`https://api.unsplash.com/search/photos/?client_id=9LhVwLjJrdIy5jX3svklsUACp0mByDjsrzbJNTZGAqg&query=${country[0].name.common}`)
                .then(response =>{
                    console.log(response.data.results[0].urls.full)
                    this.heroImageSrc = response.data.results[0].urls.full
                })
                .catch(error => console.log(error))
            },
            getEvents(countryCode){
                axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&apikey=3ppB8CLW5dstXgxJirTmtYmcPr1fySNT`)
                .then(response => {
                    console.log(response.data._embedded.events)
                    for(var i=0; i<4; i++){
                        this.events.push(response.data._embedded.events[i])
                    }
                    console.log('++++++++')
                    console.log(this.events)
                })
                .catch(error => console.log(error))
            },
            getFood(demonym){
                axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${demonym}`)
                .then(response => {
                    console.log(response.data.meals)
                    for(var i=0; i<4; i++){
                        this.foods.push(response.data.meals[i])
                    }
                    console.log('++++++++')
                    console.log(this.foods)
                })
                .catch(error => console.log(error))
            },
            getNews(countryCode){
                axios.get(`https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=75e99a70acd44c50bb02cee29552e58c`)
                .then(response => {
                    console.log(response.data.articles)

                    var tempArticles = []

                    for(var i=0; i<4; i++){
                        var obj = {}
                        var headline = (response.data.articles[i].title)
                        var author = response.data.articles[i].source.name
                        var img = response.data.articles[i].urlToImage
                        obj['headline'] = headline
                        obj['author'] = author
                        obj['image'] = img
                        
                        tempArticles.push(obj);
                    }

                    this.news = tempArticles

                    console.log(this.news)
                })
                .catch(error => console.log(error))
            },
            translate(query){
                // -- not all language codes are correct, making adjustment for common languages I notice to be wrong -- //
                this.languageCode.toString() === 'fra' ? this.languageCode = 'fr' : ''
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

                axios.request(options).then(function (response) {
                    console.log(response.data.matches[0].translation);
                    return response.data.matches[0].translation
                }).catch(function (error) {
                    console.error(error);
});
            }
        },
        mounted(){
            this.getCountries()
                
        }
    }
</script>

<style scoped>
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

.hero-image{
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    margin: 2rem 0;
}
</style>
