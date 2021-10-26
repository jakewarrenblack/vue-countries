<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand class="ms-5" href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
         <b-nav-item href="#"> <router-link :to="{name: 'home'}">Home</router-link></b-nav-item>
        <b-nav-item href="#"><router-link :to="{name: 'all_countries'}">All</router-link></b-nav-item>
        
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ms-auto me-5">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
    export default{
        name: 'NavBar'
    }
</script>

<style scoped>
.b-nav-item >router-link-active{
    color: red;
}
form{
    display: flex;
}
</style>
