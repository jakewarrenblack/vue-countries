<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view :key="$route.fullPath" />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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
}
</style>
