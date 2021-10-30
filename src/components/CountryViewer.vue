<template>
  <div class="card" style="">
    <img
      class="card-img-top"
      :src="`${country.flags.png}`"
      alt="Card image cap"
    />
    <div class="card-body">
      <h5 class="card-title">
        <b>Name:</b>
        <router-link
          :to="{ name: 'country', params: { country: country.name.official } }"
        >
          {{ country.name.common }}</router-link
        >
      </h5>
      <h5 class="card-title">
        <b>Capital:</b>
        {{ country.capital[0] }}
      </h5>

      <h5 class="card-title">
        <b>Current time:</b>
        {{ this.time }}
      </h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CountryViewer",
  // the second part of passing a prop
  // in AllCountries: ' :country="countries[0]" '
  props: {
    country: Object,
  },
  data() {
    return {
      time: String,
    };
  },
  methods: {
    getTime() {
      var latlng = this.country.latlng;
      axios
        .get(
          `https://api.ipgeolocation.io/timezone?apiKey=a1313e73c03e4c3288748d57b9e1e1b4&lat=${latlng[0]}&long=${latlng[1]}`
        )
        .then((response) => {
          console.log(response.data);
          console.log(response.data.time_12);
          this.time = response.data.time_12;
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getTime();
  },
};
</script>

<style scoped>
.card {
  border-radius: 1rem !important;
}
.card-img,
.card-img-top {
  border-top-left-radius: calc(1rem - 1px) !important;
  border-top-right-radius: calc(1rem - 1px) !important;
  max-height: 50% !important;
  object-fit: cover !important;
}
.card-body {
  display: flex !important;
  align-items: flex-start !important;
  flex-direction: column !important;
  justify-content: flex-end !important;
  max-height: 60% !important;
}
</style>
