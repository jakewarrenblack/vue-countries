<template>
  <div id="app">
    <NavBar />
    <!-- used to replace a component when a navigation event occurs -->
    <!-- if I didn't use this, the search function wouldn't work on a single country page -->
    <!-- the navbar would change the url, but the country wouldn't update -->
    <!-- we need to watch for url changes to force a ui update -->
    <transition name="fade" mode="out-in">
      <router-view :key="$route.fullPath" />
    </transition>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style>
@font-face {
  font-family: "Alegreya Sans Bold";
  src: url("./assets/fonts/AlegreyaSans/AlegreyaSans-Bold.ttf");
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
