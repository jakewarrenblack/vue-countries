<template>
  <div style="position: relative; top:8rem;" class="container">
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
          class="d-flex justify-content-center mt-4"
          cols-sm="1"
          cols-md="3"
          cols-lg="4"
        >
          <CountryRegionCard
            class="m-2"
            v-for="country in paginated('countries')"
            :key="country.ccn3"
            :country="country"
          />
        </b-row>
      </paginate>
      <!-- <paginate-links
        for="countries"
        :async="true"
        :limit="2"
        :show-step-links="true"
      /> -->

      <b-row class="d-flex justify-content-center">
        <paginate-links
          class="mylinks"
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
import CountryRegionCard from "@/components/CountryRegionCard";
// import {getCountries} from '../classes/Request'

export default {
  // methods:{
  //     getCountries
  // },
  name: "AllCountries",
  components: {
    CountryRegionCard,
  },
  created() {
    document.title = "All Countries";
  },
  data() {
    return {
      countries: [],
      paginate: ["countries"],
    };
  },
  methods: {
    getCountries() {
      axios
        .get("https://restcountries.com/v3.1/all")
        .then((response) => {
          //console.log(response.data);
          this.countries = response.data;
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getCountries();
  },
};
</script>

<style scoped>
/* phones, tablets */
@media screen and (min-width: 768px) {
  .paginate-links {
    width: 25% !important;
  }
}
.mylinks {
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  font-size: 2rem;
  color: #1f7584;
}
.mylinks:hover {
  cursor: pointer;
}
.paginate-list {
  padding-left: 0 !important;
}

.paginate-links {
  margin-left: 0 !important;
  padding-left: 0 !important;
  width: 100%;
}
</style>
