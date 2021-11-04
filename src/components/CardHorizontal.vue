<template>
  <b-card no-body class="overflow-hidden attraction-card" style="">
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img
          class="rounded-0"
          :src="
            `${
              src != null && src != undefined
                ? src
                : require(`@/assets/placeholder.png`)
            }`
          "
          alt="Image"
        />
      </b-col>
      <b-col md="6">
        <b-card-body :title="`${title}`">
          <b-card-text>
            {{ headline }}
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: "CardHorizontal",
  props: {
    src: String,
    title: String,
    headline: String,
  },
};
</script>

<style scoped>
@media screen and (min-width: 768px) {
  .attraction-card {
    max-height: 25rem;
  }

  img {
    height: 100%;
    object-fit: cover;
  }
}
</style>
