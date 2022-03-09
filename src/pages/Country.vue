<template>
  <div style="position: relative; top:5rem;">
    <b-container>
      <b-row cols-md="2" cols-sm="1" align-h="between" class="mx-auto mt-5">
        <b-col>
          <h2 class="region">{{ country[0].continents[0] }}</h2>
          <h1 class="main-head">{{ country[0].name.common }}</h1>
        </b-col>
        <b-col class="d-flex flex-column country-details">
          <h4>Fullname: {{ country[0].name.official }}</h4>

          <ul class="small-country-info">
            <h6 class="small-country-info-header">Currencies:</h6>
            <!-- show commas after every language, .length -1 check is useful for countries with lots of languages, eg. Switzerland -->
            <h6 v-for="currency in currencies" :key="currency">
              {{
                `${
                  currencies.indexOf(currency) == 0 && currencies.length > 1
                    ? currency + ",&nbsp;"
                    : currency
                }`
              }}
            </h6>
          </ul>
          <ul class="small-country-info">
            <h6 class="small-country-info-header">Languages:</h6>
            <h6 v-for="language in languages" :key="language">
              {{
                `${
                  languages.indexOf(language) != languages.length - 1 &&
                  languages.length > 1
                    ? language + ",&nbsp;"
                    : language
                }`
              }}
            </h6>
          </ul>
          <h6>Capital: {{ country[0].capital[0] }}</h6>

          <div
            v-if="this.weatherDescription"
            class="weather d-flex h-100 justify-content-end align-items-end mb-4"
          >
            <div class="w-100 d-flex justify-content-between align-items-end">
              <font-awesome-icon class="fa-icon" :icon="`${this.icon}`" />
              <h4>{{ this.temp + "°C" }}</h4>
              <h4 class="weatherDescription">{{ this.weatherDescription }}</h4>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-img
            class="w-100 hero-image"
            :src="`${heroImageSrc}`"
            fluid
            alt="Responsive image"
          ></b-img>
        </b-col>
      </b-row>

      <b-row>
        <GoogleMap :countryName="country[0].name.common" />
      </b-row>

      <h1 class="mt-5 mb-4" v-if="attractions.length > 0">
        Attractions in {{ country[0].name.common }}
      </h1>

      <paginate
        name="attractions"
        :list="attractions"
        :per="1"
        class="paginate-list"
      >
        <!-- this horizontal card is different from the others, so not using the CountryCard component -->
        <b-row>
          <b-col
            v-for="attraction in paginated('attractions')"
            :key="attraction.xid"
          >
            <CardHorizontal
              :src="`${attraction.image}`"
              :title="`${attraction.title}`"
              :headline="`${attraction.headline}`"
            />
          </b-col>
        </b-row>
      </paginate>
      <b-row
        v-if="attractions.length > 1"
        class="d-flex justify-content-center"
      >
        <paginate-links
          class="mylinks"
          for="attractions"
          :simple="{
            prev: '« Back',
            next: 'Next »',
          }"
        ></paginate-links>
      </b-row>

      <h1 class="mt-5 mb-4" v-if="events.length > 0">
        Events in {{ country[0].name.common }}
      </h1>

      <paginate name="events" :list="events" :per="2" class="paginate-list">
        <b-row
          class="d-flex justify-content-start events-food-row"
          v-if="events.length > 0"
          cols-sm="1"
          cols-md="2"
        >
          <div
            class="d-flex align-items-stretch"
            style="margin-bottom: 2rem"
            v-for="event in paginated('events')"
            :key="event.id"
          >
            <CountryCard
              class="d-flex align-items-stretch"
              :title="event.name"
              :src="`${event.images[0].url}`"
              :venueName="event._embedded.venues[0].name"
              :viewLink="event.url"
            />
          </div>
        </b-row>
      </paginate>

      <b-row v-if="events.length > 2" class="d-flex justify-content-center">
        <paginate-links
          class="mylinks"
          for="events"
          :simple="{
            prev: '« Back',
            next: 'Next »',
          }"
        ></paginate-links>
      </b-row>

      <h1 class="mt-5 mb-4" v-if="foods.length > 0">
        Popular food in {{ country[0].name.common }}
      </h1>
      <b-row
        class="d-flex justify-content-center"
        v-if="foods.length > 0"
        cols-sm="1"
        cols-md="2"
      >
        <div
          class="d-flex align-items-stretch events-food-row"
          style="margin-bottom: 2rem"
          v-for="food in foods"
          :key="food.idMeal"
        >
          <CountryCard
            class="d-flex align-items-stretch"
            :title="food.strMeal"
            :src="food.strMealThumb"
          />
        </div>
      </b-row>

      <!-- the news takes some time to load and then translate to English, so show a loader in the mean time -->
      <!-- otherwise the user might not even know there should be news -->
      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="warning"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        <p>
          News could not be loaded. This message will disappear in
          {{ dismissCountDown }} seconds...
        </p>

        <b-progress
          variant="warning"
          :max="dismissSecs"
          :value="dismissCountDown"
          height="4px"
        ></b-progress>
      </b-alert>

      <div v-if="newsLoading" class="d-flex mt-5 mb-5">
        <h3 class="me-5">News is loading...</h3>
        <div class="loader" />
      </div>

      <h1 class="mt-5 mb-4" v-if="news.length > 0">
        Headlines in {{ country[0].name.common }}
      </h1>
      <b-row
        class="d-flex justify-content-center news-row"
        v-if="news.length > 0"
        cols-sm="1"
        cols-md="2"
      >
        <div
          class="d-flex align-items-stretch"
          style="margin-bottom: 2rem; align-items-stretch"
          v-for="newsItem in news"
          :key="newsItem.headline"
        >
          <CountryCard
            class="d-flex align-items-stretch"
            :title="newsItem.author"
            :headline="newsItem.headline"
            :src="newsItem.image"
          />
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import GoogleMap from "@/components/GoogleMap";
import CountryCard from "@/components/CountryCard";
import CardHorizontal from "@/components/CardHorizontal";

export default {
  name: "Country",
  components: {
    GoogleMap,
    CountryCard,
    CardHorizontal,
  },
  created() {
    document.title = "Country";
  },
  data() {
    return {
      country: [],
      currencies: [],
      languages: [],
      heroImageSrc: String,
      events: [],
      paginate2: ["events"],
      foods: [],
      news: [],
      languageCode: String,
      icon: String,
      weatherDescription: String,
      temp: Number,
      newsLoading: false,
      showDismissableAlert: false,
      dismissSecs: 10,
      dismissCountDown: 0,
      mapSrc: String,
      attractions: [],
      paginate: ["attractions", "events"],
    };
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
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    async getCountries() {
      axios
        .get(
          `https://restcountries.com/v3.1/name/${this.$route.params.country}/?fullText=true`
        )
        .then((response) => {
          var currency = Object.values(response.data[0].currencies);
          this.currencies.push(currency[0].name);
          /* Check if there's a second currency */
          /* There are no countries with more than 2 currencies */
          currency[1] ? this.currencies.push(currency[1].name) : "";

          this.languages = Object.values(response.data[0].languages);

          // need this for the translation api
          this.languageCode = Object.keys(response.data[0].languages);

          this.country = response.data;

          //console.log(this.country);

          this.getImage(this.country);
          this.getWeather();
          this.getAttractions();
          this.getEvents(this.country[0].cca2);
          this.getFood(this.country[0].demonyms.eng.m);
          this.getNews(this.country[0].cca2);

          //console.log(this.attractions);
        })
        // first parameter of catch is always error, but we can name it whatever we want
        // obviously it just makes sense to call it 'error'
        .catch((error) => console.log(error));
    },
    // unsplash is sometimes throwing a 403 forbidden, switch to pexels in that case
    async getImage(country) {
      var that = this;
      // if the call to unsplash fails, it will call to pexels instead
      await axios
        .get(
          `https://api.unsplash.com/search/photos/?client_id=9LhVwLjJrdIy5jX3svklsUACp0mByDjsrzbJNTZGAqg&query=${country[0].name.common}`
        )
        .then(function(response) {
          that.heroImageSrc = response.data.results[0].urls.regular;
        })
        .catch(function(error) {
          console.log(error);
          //call to pexels instead
          //unsplash has good photos but rate limited to 50 per hour, pexels is 200
          const URL = `https://api.pexels.com/v1/search?query=${country[0].name.common}&per_page=1&orientation=landscape`;
          const API_KEY = `563492ad6f91700001000001660dc6de6e62494da4a3601ccfc6ecc3`;

          axios
            .get(URL, {
              headers: { Authorization: `Bearer ${API_KEY}` },
            })
            .then((response) => {
              that.heroImageSrc = response.data.photos[0].src.large2x;
            })
            .catch((error) => console.log(error));
        });
    },
    getEvents(countryCode) {
      axios
        .get(
          `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&apikey=3ppB8CLW5dstXgxJirTmtYmcPr1fySNT`
        )
        .then((response) => {
          console.log(response);
          for (var i = 0; i < response.data._embedded.events.length; i++) {
            this.events.push(response.data._embedded.events[i]);
          }
        })
        .catch((error) => console.log(error));
    },
    getFood(demonym) {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${demonym}`)
        .then((response) => {
          for (var i = 0; i < 4; i++) {
            this.foods.push(response.data.meals[i]);
          }
        })
        .catch((error) => console.log(error));
    },
    async getNews(countryCode) {
      var that = this;
      this.newsLoading = true;
      await axios
        .get(
          `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=6b4b9697546d466db802b24a443cf9a6`
        )
        .then((response) => {
          /* I may have to remove this, not sure. */
          /* Don't want it to continue loading if the news is **never** going to load. */
          /* Eg, if there's no news for a country or if the rate limit has been reached. */
          // response.status != "fulfilled" ? (this.newsLoading = false) : "";
          var tempArticles = [];

          //console.log(response.data);
          //console.log(response.data.articles);

          for (var i = 0; i < 4; i++) {
            if (
              response.data.articles[i] == null ||
              response.data.articles[i] == undefined
            ) {
              this.showAlert();
              this.newsLoading = false;
              return;
            }
            var obj = {};
            var isNews = true;
            var headline = response.data.articles[i].title;
            var author = response.data.articles[i].source.name;
            var img = response.data.articles[i].urlToImage;
            obj["isNews"] = isNews;
            obj["headline"] = headline;
            obj["author"] = author;
            obj["image"] = img;

            tempArticles.push(obj);
          }

          //this.news = tempArticles
          //console.log(response);
          //console.log(response.status);

          if (tempArticles.length > 0 && tempArticles != null) {
            if (
              this.languageCode[0].toLowerCase() != "en" &&
              this.languageCode[0].toLowerCase() != "eng"
            ) {
              // console.log('temp articles before translation')
              // console.log(tempArticles)
              this.translate(tempArticles);
              // console.log('tyepeof')
              // console.log(typeof(tempArticles))
            } else {
              this.news = tempArticles;
              this.newsLoading = false;
            }
          }

          //console.log(response);
          //return tempArticles
        })
        .catch(function(error) {
          console.log(error);
          that.newsLoading = false;
          that.showAlert();
          // alert("News could not be loaded");
          return;
        });
    },
    async translate(query) {
      //var that = this;
      // // -- not all language codes are correct, making adjustment for common languages I notice to be wrong -- //
      // this.languageCode[0].toString().toLowerCase() == "fra"
      //   ? (this.languageCode = "fr")
      //   : "";
      // this.languageCode[0].toString().toLowerCase() == "deu"
      //   ? (this.languageCode = "de")
      //   : "";

      // //greek
      // this.languageCode[0].toString().toLowerCase() == "ell"
      //   ? (this.languageCode = "gr")
      //   : "";

      // //chinese
      // this.languageCode[0].toString().toLowerCase() == "zho"
      //   ? (this.languageCode = "ch")
      //   : "";

      // //austria - german
      // this.languageCode[0].toString().toLowerCase() == "bar"
      //   ? (this.languageCode = "de")
      //   : "";

      // mt = machine translation enabled
      // de = an email to reach the user, mainly for commercial stuff

      // loop through the articles
      // Don't waste words if it's already in English
      // The api calculates your rate limit based on the number of words translated

      if (
        query[0] != undefined &&
        query[0] != null &&
        query[0].isNews == true
      ) {
        //console.log('news has reached type check')
        //console.log(query)

        for (var i = 0; i < query.length; i++) {
          //console.log(query[i]["headline"]);
          var options = {
            method: "POST",
            url: "https://microsoft-translator-text.p.rapidapi.com/translate",
            params: {
              "api-version": "3.0",
              to: "en",
              textType: "plain",
              profanityAction: "NoAction",
            },
            headers: {
              "content-type": "application/json",
              "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
              "x-rapidapi-key":
                "b6e8418e67msh608d96d57176776p179c32jsnc45f9e8caf95",
            },
            data: [{ Text: `${query[i]["headline"]}` }],
          };

          await axios
            .request(options)
            .then(function(response) {
              //console.log(response.data[0].translations[0].text);
              query[i]["headline"] = response.data[0].translations[0].text;
              query[i]["headline"] = query[i]["headline"]
                // replace special chars
                .replace("&quot;", '"')
                .replace("&#39;", "'")
                .replace("&quot; ", '"')
                .replace("&#39;;", "'")
                .replace("&#39; ", "'");
            })
            .catch(function(error) {
              console.error(error);
            });
        }

        this.newsLoading = false;
        this.news = query;
      }
      // in this case, it must be an object, so it was passed in from the attractions method
      else {
        var optionsAttr = {
          method: "POST",
          url: "https://microsoft-translator-text.p.rapidapi.com/translate",
          params: {
            "api-version": "3.0",
            to: "en",
            textType: "plain",
            profanityAction: "NoAction",
          },
          headers: {
            "content-type": "application/json",
            "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
            "x-rapidapi-key":
              "b6e8418e67msh608d96d57176776p179c32jsnc45f9e8caf95",
          },
          data: [{ Text: `${query["headline"]}` }],
        };

        await axios
          .request(optionsAttr)
          .then(function(response) {
            //console.log(response.data[0].translations[0].text);
            query["headline"] = response.data[0].translations[0].text;
            query["headline"] = query["headline"]
              // replace special chars
              .replace("&quot;", '"')
              .replace("&#39;", "'")
              .replace("&quot; ", '"')
              .replace("&#39;;", "'")
              .replace("&#39; ", "'");
          })
          .catch(function(error) {
            console.error(error);
          });

        this.attractions.push(query);
        //console.log(query);
        // if (typeof obj == "object") {

        // }
      }

      // console.log("TRANSLATED ATTRACTIONS:");
      // console.log(query);
      // console.log(query[0]);

      //console.log(this.news);
      //   for (var j = 0; j < this.articles.length; j++) {
      //     console.log(this.articles[j]);
      //   }
    },
    getWeather() {
      const icons = new Map([
        // openweathermap icon codes to correspond to fontawesome icon names
        ["01d", "sun"],
        ["01n", "moon"],
        ["02d", "sun"],
        ["02n", "moon"],
        ["03d", "sun"],
        ["03n", "cloud"],
        ["04d", "cloud"],
        ["04n", "cloud"],
        ["09d", "cloud"],
        ["09n", "cloud"],
        ["10d", "cloud"],
        ["10n", "cloud"],
        ["11d", "bolt"],
        ["11n", "bolt"],
        ["13d", "snowflake"],
        ["13n", "snowflake"],
        ["50d", "smog"],
      ]);

      var latlng = this.country[0].latlng;
      //console.log(latlng)
      //console.log(icons)
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&units=metric&appid=c87affa6dd76959b48d86866074f44e4`
        )
        .then((response) => {
          //console.log(response.data)
          var owIcon = response.data.weather[0].icon;
          this.weatherDescription = response.data.weather[0].description;
          this.temp = response.data.main.temp;
          //console.log(owIcon)

          for (let [key, value] of icons.entries()) {
            //console.log(key + value);
            if (key == owIcon) {
              //console.log('MATCH')
              this.icon = value;
            }
          }
        })
        .catch((error) => console.log(error));
    },
    async getAttractions() {
      // I was doing this by coords, but changing to use capitals
      // Coords works for small, densely-populated countries like Ireland or the UK, but not for a country like Australia, for example, where the middle of the country is basically wasteland
      var myAttractions = [];
      var myLatLng = [];

      //console.log("getattractions is running");
      // specififying data from wikidata only, most others seem to often not have names

      // STEP 1 - SEARCH FOR THE PLACENAME
      await axios
        .get(
          `https://api.opentripmap.com/0.1/en/places/geoname?name=${this.country[0].capital[0]}&country=${this.country[0].cca2}&apikey=5ae2e3f221c38a28845f05b6b3406926bcb4694531427c70c317b945`
        )
        .then((response) => {
          //console.log(response);
          myLatLng.push(response.data.lat, response.data.lon);
        })
        .catch((error) => console.log(error));

      // STEP 2 - SEARCH FOR THE ATTRACTIONS
      //var tempAttractions = [];
      //console.log(myLatLng);
      await axios
        .get(
          `https://api.opentripmap.com/0.1/en/places/radius?radius=48280.32&lon=${myLatLng[1]}&lat=${myLatLng[0]}&limit=10&src_geom=wikidata&src_attr=wikidata&limit=10&rate=3&limit=6&apikey=5ae2e3f221c38a28845f05b6b3406926bcb4694531427c70c317b945`
        )
        .then((response) => {
          //console.log(response);
          myAttractions = response.data.features;

          // STEP 3 - DETAILED WIKIPEDIA SEARCH FOR THE ATTRACTIONS
          //  ---------------------inner call ------------------------------

          for (var i = 0; i < 5; i++) {
            axios
              .get(
                `https://api.opentripmap.com/0.1/en/places/xid/${myAttractions[i].properties.xid}?apikey=5ae2e3f221c38a28845f05b6b3406926bcb4694531427c70c317b945`
              )
              .then((response) => {
                //console.log(response);
                //this.attractions.push(response.data);
                var obj = {};
                var headline = response.data.wikipedia_extracts.text;
                var title = response.data.name;
                var img = response.data.preview.source;
                obj["headline"] = headline;
                obj["title"] = title;
                obj["image"] = img;
                //console.log(obj);
                if (
                  this.languageCode[0].toLowerCase() !== "en" &&
                  this.languageCode[0].toLowerCase() !== "eng"
                ) {
                  if (typeof obj == "object") {
                    //this.translate(obj);
                  }
                } else {
                  if (typeof obj == "object") {
                    this.attractions.push(obj);
                  }
                }
              })
              .catch((error) => console.log(error));
          }

          //  ---------------------inner call ------------------------------
        })
        .catch((error) => console.log(error));
    },
  },
  async mounted() {
    await this.getCountries();
    //await this.getNews(this.country[0].cca2)
    //await this.translate(this.getNews(this.country[0].cca2))
  },
};
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Alegreya Sans Bold";
}

h1 {
  padding-left: 0;
}

.w-60 {
  width: 60% !important;
}

.main-head {
  font-size: 4rem;
  margin-bottom: 0;
  padding-bottom: 0;
}

.small-country-info {
  list-style: none;
  display: flex;
  align-items: center;
  padding-left: 0;
}
.small-country-info-header {
  margin-right: 0.25rem;
}
ul {
  margin-bottom: 0;
}

.country-details {
  align-items: flex-start;
}

.hero-image {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 11px;
  margin: 2rem 0;
  width: 100%;
  height: 25rem;
  object-fit: cover;
}

.fa-icon {
  font-size: 2.5rem;
}

.weatherDescription {
  text-transform: capitalize;
}

.loader {
  margin-left: 0.5rem;
  border: 1rem solid #fefefe;
  border-top: 16px solid #29ec29;
  border-radius: 50%;
  width: 0.25rem;
  height: 0.25rem;
  animation: spin 2s linear infinite;
}

/* for the loader */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.weather {
  width: 100%;
}

/* .attraction-card {
  max-height: none;
} */

/* phones, tablets */
@media screen and (min-width: 768px) {
  .weather {
    width: 60%;
  }
  .main-head {
    font-size: 8rem;
  }
  .country-details {
    align-items: flex-end;
  }
  .attraction-card {
    max-height: 25rem;
  }
  .paginate-links {
    width: 25% !important;
  }
  .hero-image {
    height: 45rem;
  }
}

.mylinks {
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  font-size: 2rem;
  color: var(--highlight) !important;
}
.mylinks:hover {
  cursor: pointer;
}

.paginate-links {
  margin-left: 0 !important;
  padding-left: 0 !important;
  width: 100%;
}

.paginate-list {
  padding-left: 0;
  padding-right: 0;
}

.carousel-caption p {
  margin-bottom: 0;
}

.fa-icon {
  color: var(--cloud) !important;
}
</style>
