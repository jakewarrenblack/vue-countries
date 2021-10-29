<template>
  <div class="container">
    <!-- so AllCountries makes the request, and ends up with an array of 250 countries -->
    <!-- then we loop and pass each country into a CountryViewer -->
    <!-- pass a prop like this -->
    <!-- don't know what ccn3 is, but presuming it's unique, so we can use that as the key -->
    <b-container fluid>
      <paginate
        name="countries"
        :list="countries"
        :per="6"
        class="paginate-list"
      >
        <b-row
          class="d-flex justify-content-center"
          cols-sm="1"
          cols-md="3"
          cols-lg="4"
        >
          <CountryViewer
            class="m-2"
            v-for="country in paginated('countries')"
            :key="country.ccn3"
            :country="country"
            :flag="country.flag"
          />
        </b-row>
      </paginate>

      <b-row class="d-flex justify-content-center">
        <paginate-links
          class="w-25 mylinks"
          for="countries"
          :simple="{
            prev: '« Back',
            next: 'Next »',
          }"
        ></paginate-links>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import CountryViewer from "@/components/CountryViewer";
// import {getCountries} from '../classes/Request'

export default {
  // methods:{
  //     getCountries
  // },
  name: "SubRegion",
  components: {
    CountryViewer,
  },
  data() {
    return {
      countries: [],
      paginate: ["countries"],
    };
  },
  mounted() {
    axios
      .get(
        `https://restcountries.com/v3.1/subregion/${this.$route.params.subregion}`
      )
      .then((response) => {
        console.log(response.data);
        // this.countries = response.data
        this.countries = response.data;
      })
      // first parameter of catch is always error, but we can name it whatever we want
      // obviously it just makes sense to call it 'error'
      .catch((error) => console.log(error));
  },
};
</script>

<style scoped>
.mylinks {
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  font-size: 2rem;
  color: rgb(115, 210, 241);
}
.mylinks:hover {
  cursor: pointer;
}
</style>
