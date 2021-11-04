<template>
  <div>
    <Carousel />
    <br />
    <b-container fluid class="bv-example-row mb-3">
      <b-row class="mx-auto w-75">
        <h1>Countries by region</h1>
      </b-row>
      <b-row cols-md="5" cols-sm="1" class=" mx-auto w-75">
        <b-col>
          <CountryRegionCard
            style="background:transparent!important"
            title="Europe"
            body="test"
            filename="europe.jpg"
            link="europe"
          />
        </b-col>
        <b-col>
          <CountryRegionCard
            style="background:transparent!important"
            title="Africa"
            body="test"
            filename="africa.jpg"
            link="africa"
          />
        </b-col>
        <b-col>
          <CountryRegionCard
            style="background:transparent!important"
            title="Asia"
            body="test"
            filename="asia.jpg"
            link="asia"
          />
        </b-col>
        <b-col>
          <CountryRegionCard
            style="background:transparent!important"
            title="Americas"
            body="test"
            filename="americas.jpg"
            link="america"
          />
        </b-col>
        <b-col>
          <CountryRegionCard
            style="background:transparent!important"
            title="Australia"
            body="test"
            filename="australia.jpg"
            link="australia"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Carousel from "@/components/Carousel";
import CountryRegionCard from "@/components/CountryRegionCard";
export default {
  name: "Home",
  components: {
    Carousel,
    CountryRegionCard,
  },
  created() {
    document.title = "Home";
  },
};
</script>

<style>
h1 {
  font-family: "Alegreya sans bold";
  padding: 2.5rem 0 2.5rem 15px;
}
.HomeCard {
  transition: all ease-in-out 0.2s;
}

<<<<<<< HEAD
.card {
  background: transparent !important;
}

.region-title,
.carousel-caption p {
  color: white !important;
=======
.card{
  background:transparent!important;
}

.region-title, .carousel-caption p{
  color:white!important;
>>>>>>> 88ef4570808bf8d38454e3b44bad97b3ed128491
}

.HomeCard:hover {
  transform: translateY(-10px);
}
.carousel-caption {
  bottom: 37% !important;
  text-align: left !important;
  font-size: 2.5rem !important;
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

<<<<<<< HEAD
.region-card {
  max-width: 18rem;
=======
.region-card{
  max-width:18rem;
>>>>>>> 88ef4570808bf8d38454e3b44bad97b3ed128491
}

/* phones, tablets */
@media screen and (min-width: 768px) {
  .carousel-caption {
    font-size: 5rem !important;
  }
}
</style>
