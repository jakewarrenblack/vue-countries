import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home";
import AllCountries from "@/pages/AllCountries";
import Country from "@/pages/Country";
import SubRegion from "@/pages/SubRegions";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/countries/all",
      // snake_case is most common for names
      name: "all_countries",
      component: AllCountries,
    },
    {
      path: "/countries/:country",
      // snake_case is most common for names
      name: "country",
      component: Country,
    },
    {
      path: "/countries/subregion/:subregion",
      // snake_case is most common for names
      name: "sub_region",
      component: SubRegion,
    },
  ],
});
