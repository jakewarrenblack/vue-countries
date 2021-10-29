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
    </div>
  </div>
</template>

<script>
export default {
  name: "CountryViewer",
  // the second part of passing a prop
  // in AllCountries: ' :country="countries[0]" '
  props: {
    country: Object,
  },
};
</script>

<style scoped></style>
