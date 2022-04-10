<template>
  <router-link
    :to="
      `${
        country
          ? '/countries/' + country.name.official
          : '/countries/subregion/' + (title == 'Americas' ? 'america' : title)
      }`
    "
  >
    <div
      :class="`${!country ? 'card region-card' : 'card'}`"
      :style="`${country ? 'width:18rem' : 'border:none; filter:none;'}`"
    >
      <div class="card-body">
        <div
          :class="
            `${country ? 'country-header-contain' : 'region-header-contain'}`
          "
        >
          <div
            :class="`${country ? 'country-img-contain' : 'region-img-contain'}`"
          >
            <img
              :class="`${country ? 'country-card-img-top' : 'card-img-top'}`"
              :src="
                !this.country
                  ? require(`@/assets/${filename}`)
                  : `${country.flags.png}`
              "
              alt="Card image cap"
            />
          </div>
          <div :class="`${!country ? 'region-title-contain' : ''}`">
            <b v-if="country">Name:</b>
            <h5 :class="`${country ? 'card-title' : 'region-title'}`">
              {{ !country ? title : country.name.official }}
            </h5>
          </div>
        </div>
        <hr v-if="country" />
        <b v-if="country">Capital:</b>
        <p v-if="country" class="card-copy ">
          {{ country.capital[0] }}
        </p>
        <hr v-if="country" />
        <b v-if="country">Current time:</b>
        <p v-if="country" class="card-copy ">{{ this.time }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
import axios from "axios";
export default {
  name: "CountryRegionCard",
  props: {
    title: String,
    link: String,
    body: String,
    filename: String,
    /* might not be passed, depending on if we're using this card
    for the homepage or for the all countries page */
    country: Object,
    time: String,
  },
  mounted() {
    this.country ? this.getTime() : "";
  },
  methods: {
    getTime() {
      var latlng = this.country.latlng;
      axios
        .get(
          `https://api.ipgeolocation.io/timezone?apiKey=a1313e73c03e4c3288748d57b9e1e1b4&lat=${latlng[0]}&long=${latlng[1]}`
        )
        .then((response) => {
          //console.log(response.data);
          //console.log(response.data.time_12);
          this.time = response.data.time_12;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
<style>
.card {
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  border: none;
  margin-bottom: 2rem;
}

.card-img-top {
  height: 15rem;
}

.country-card-img-top {
  height: 10rem;
}

.card-title {
  font-family: "Alegreya Sans Bold";
}

.card-copy {
  font-family: "Open Sans Regular";
  padding: 0;
  color: black;
}

.card-body {
  padding: 0.8rem;
}

.country-header-contain {
  display: flex;
  align-items: center;
  height: 40%;
}

.country-img-contain {
  width: 40%;
  margin-right: 1rem;
  height: min-content;
}

.country-img-contain img {
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 100%;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
}
hr {
  margin-top: 0.25;
  margin-bottom: 0.25;
}
a.m-2 {
  display: flex;
  align-items: stretch;
}

/* specific to region/homepage */
.region-card {
  border: none;
  filter: none;
  transition: all ease-in-out 0.3s;
}
.region-card:hover {
  transform: translateY(-10px);
}

.region-title {
  color: white;
  font-size: 3rem;
  font-family: "Alegreya Sans Bold";
}

.region-title-contain {
  position: relative;
}

.region-img-contain {
  position: absolute;
  width: 100%;
  height: 100%;
  position: absolute;
}

.region-img-contain img {
  width: 100%;
  height: 100%;
  border-radius: 14%;
  width: 100%;
  filter: brightness(0.7);
  height: 100%;
  box-shadow: 2px 2px 3px 0px rgba(50, 50, 50, 0.75);
}

.region-header-contain {
  width: 100%;
  height: 100%;
  height: 13rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background: var(--cardColor);
  color: var(--text);
}
</style>
