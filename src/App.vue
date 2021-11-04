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

@font-face {
  font-family: "Open Sans Regular";
  src: url("./assets/fonts/OpenSans/OpenSans-Regular.ttf");
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

<<<<<<< HEAD
:root {
  --navbar: #181a3a;
  --white: #f0f0f0;
  --highlight: #39d0ea;
  --bgColor: #0f1016;
  --cardColor: #2d2078;
}

:root.dark-theme {
  --navbar: #183a37;
  --white: white;
  --highlight: #1f7584;
  --bgColor: white;
=======
:root{
    --navbar: #181a3a;
    --white:#f0f0f0;
    --highlight:#39d0ea;
    --bgColor:#0f1016;
    --cardColor:#2d2078;
}

:root.dark-theme{
    --navbar:#183a37;
    --white:white;
    --highlight: #1f7584;
    --bgColor: white;
>>>>>>> 88ef4570808bf8d38454e3b44bad97b3ed128491
}
</style>
