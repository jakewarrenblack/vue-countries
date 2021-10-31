<template>
  <b-col>
    <b-card img-top tag="article" style="" class="mb-2">
      <h1 style="height:20%;">{{ title }}</h1>
      <h4 v-if="headline" style="height:20%;">{{ headline }}</h4>
      <!-- not all news articles have images, show placeholder instead -->
      <div style="height:55%; padding-top:0.5rem">
        <img
          :src="`${src ? src : require(`@/assets/placeholder.png`)}`"
          style="height:100%; width: 100%;object-fit: cover;"
        />
      </div>

      <h4 v-if="venueName" style="margin-top: 0.5rem; margin-bottom: 0.5rem">
        {{ venueName }}
      </h4>

      <b-button
        v-if="viewLink"
        :href="`${viewLink}`"
        target="_blank"
        variant="primary"
        >View event</b-button
      >
    </b-card>
  </b-col>
</template>

<script>
export default {
  name: "CountryCard",
  props: {
    title: String,
    /* this should be optional, only a news card has a headline */
    headline: String,
    src: String,
    /* should only be shown in the case of an event card */
    venueName: String,
    viewLink: String,
  },
};
</script>
