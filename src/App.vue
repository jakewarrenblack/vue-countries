<template>
  <div id="app">
    <NavBar/>    
    <!-- used to replace a component when a navigation event occurs -->
    <!-- if I didn't use this, the search function wouldn't work on a single country page -->
    <!-- the navbar would change the url, but the country wouldn't update -->
    <!-- we need to watch for url changes to force a ui update -->
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar    
  }
}
</script>

<style>
</style>
