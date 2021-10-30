<template>
  <div>
    <Carousel />
    <br />
    <b-container fluid class="bv-example-row mb-3">
      <b-row class="mx-auto w-75">
        <h1>Countries by region</h1>
      </b-row>
      <b-row cols-md="5" cols-sm="1" class=" mx-auto w-75">
        <router-link
          :to="{ name: 'sub_region', params: { subregion: 'europe' } }"
        >
          <b-col>
            <Card title="Europe" body="test" filename="europe.jpg" />
          </b-col>
        </router-link>
        <router-link
          :to="{ name: 'sub_region', params: { subregion: 'africa' } }"
        >
          <b-col>
            <Card title="Africa" body="test" filename="africa.jpg" />
          </b-col>
        </router-link>
        <router-link
          :to="{ name: 'sub_region', params: { subregion: 'asia' } }"
        >
          <b-col>
            <Card title="Asia" body="test" filename="asia.jpg" />
          </b-col>
        </router-link>
        <router-link
          :to="{ name: 'sub_region', params: { subregion: 'america' } }"
        >
          <b-col>
            <Card title="Americas" body="test" filename="americas.jpg" />
          </b-col>
        </router-link>
        <router-link
          :to="{ name: 'sub_region', params: { subregion: 'australia' } }"
        >
          <b-col>
            <Card title="Australia" body="test" filename="australia.jpg" />
          </b-col>
        </router-link>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Carousel from "@/components/Carousel";
import Card from "@/components/Card";
export default {
  name: "Home",
  components: {
    Carousel,
    Card,
  },
};
</script>

<style>
h1 {
  font-family: "Alegreya sans bold";
  padding: 2.5rem 0 2.5rem 15px;
}
.card {
  transition: all ease-in-out 0.2s;
}
.card:hover {
  transform: translateY(-10px);
}
.carousel-caption {
  bottom: 25% !important;
  text-align: left !important;
  font-size: 5rem !important;
  font-family: "Alegreya sans bold" !important;
}

.carousel-item {
  height: 70vh;
}

.carousel-item img {
  height: 100%;
  object-fit: cover;
  /* so you can see the nav easily */
  filter: brightness(0.75);
}
</style>
