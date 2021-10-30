<template>
  <div class="d-flex justify-content-center">
    <b-navbar class="w-75 mx-auto" toggleable="lg" type="dark" variant="info">
      <b-navbar-brand class="ms-5" href="#"
        ><img :src="require(`@/assets/restapi-planet.svg`)"
      /></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">
            <router-link :to="{ name: 'home' }">Home</router-link></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'all_countries' }"
              >All</router-link
            ></b-nav-item
          >

          <b-nav-item @click="getRandomCountry()" href="#">Random</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ms-auto me-5">
          <!-- 
          this.$router.push(`/countries/${response.data[0].name.common}`)
          the form's default behaviour is to refresh the page on submit
          i'm preventing this behaviour and calling this function on submit instead
          i did this because the page refresh cleared axios' data and caused it to abort its request
          this preventDefault would break the search on the single country page, if we weren't tying the route's full path to the router-view in App.vue
          In the case of a single country, Vue just sees that we're going from one 'country' component to another 'country' component, so doesn't bother updating
          we have to force it to update based on the change made to the params in the url 
        -->
          <b-nav-form @submit.prevent="search()">
            <b-form-input
              v-model="search_term"
              size="sm"
              class="mr-sm-2"
              placeholder="Country or region"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">
              <font-awesome-icon class="fa-icon" :icon="`${this.icon}`" />
            </b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NavBar",
  data() {
    return {
      search_term: "",
      icon: "search",
    };
  },
  methods: {
    getRandomCountry() {
      axios
        .get("https://restcountries.com/v3.1/all")
        .then((response) => {
          var randomCountry =
            response.data[Math.floor(Math.random() * response.data.length)];

          this.$router.push(`/countries/${randomCountry.name.common}`);
        })
        .catch((error) => console.log(error));
    },
    search() {
      if (!this.search_term) {
        alert("Please enter a search term");
        return;
      }
      // we take the search term and make a request to axios with it,
      // this way, we can see if it's a valid country or not,
      // and our catch will keep us on the current page if something goes wrong

      // we can search for a country or a subregion
      const countrySearch = axios.get(
        `https://restcountries.com/v3.1/name/${this.search_term}/?fullText=true`
      );
      const regionSearch = axios.get(
        `https://restcountries.com/v3.1/subregion/${this.search_term}`
      );
      // promise.allSettled returns a promise which will only resolve after all of our
      // given promises have been fulfilled or rejected
      // so one of our requests can fail, and that's not a problem
      // eg 'europe' is not a valid country name, so it will fail, but it **is** a valid subregion, so let the method keep going if one of our two requests succeeds
      // - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
      Promise.allSettled([countrySearch, regionSearch])
        .then(
          // spread operator allows array of args to be split into multiple arguments
          axios.spread((...responses) => {
            const countryResponse = responses[0];
            const regionResponse = responses[1];

            countryResponse.status == "fulfilled"
              ? this.$router.push(
                  `/countries/${countryResponse.value.data[0].name.common}`
                )
              : "";
            regionResponse.status == "fulfilled"
              ? this.$router.push(`/countries/subregion/${this.search_term}`)
              : "";

            if (
              countryResponse.status != "fulfilled" &&
              regionResponse.status != "fulfilled"
            ) {
              alert("Invalid search term");
              this.search_term = "";
            }
          })
        )
        .catch(function(error) {
          console.log(error);
          alert("Sorry, that country name is invalid.");
        });
    },
  },
};
</script>

<style scoped>
.b-nav-item > router-link-active {
  color: red;
}
form {
  display: flex;
}
a,
.nav-link {
  color: white !important;
}
.nav-link:hover {
  text-decoration: underline;
}

div {
  background: #183a37;
}

.navbar {
  /* overriding some bootstrap nav defaults to style it according to our figma design */
  min-height: 5rem;
  font-family: "Alegreya Sans Bold";
  padding: 2rem 0;

  /* position: absolute !important; */
  /* top: 0 !important;
  z-index: 2 !important; */
  /* width: 100% !important; */
}

.bg-info {
  background: #183a37 !important;
}

@media screen and (min-width: 992px) {
  .navbar {
    position: relative;
  }
  .navbar-brand {
    position: absolute;
    left: 50%;
    margin-left: -50px !important;
    display: block;
  }
  ul.navbar-nav:nth-child(1) {
    position: absolute;
    left: 95%;
    margin-left: -50px !important;
    display: flex;
  }
}
</style>
