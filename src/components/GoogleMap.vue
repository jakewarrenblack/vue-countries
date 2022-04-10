<template>
  <b-col>
    <iframe
      width="100%"
      height="auto"
      style="border:0; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 11px;
        margin: 2rem 0;
        height: 40rem;"
      loading="lazy"
      allowfullscreen
      :src="
        `https://www.google.com/maps/embed/v1/place?key=AIzaSyDZsVIH2Ih31ik3Xq7a9ZIJBv-JkbKIDGA%20%20%20%20
        &q=${countryName}`
      "
    >
    </iframe>
  </b-col>
</template>

<script>
export default {
  name: "GoogleMap",
  props: {
    countryName: String,
  },
};
</script>
