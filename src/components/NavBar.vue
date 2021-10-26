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
          <b-form-input v-model="search_term" v-on:keyup.enter="search()" size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button @click="search()" size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
    export default{
        name: 'NavBar',
        data(){
          return{
            search_term: ''
          }
        },
        methods:{
          search(){
            //  if(!this.term){
            //     this.$bvToast.toast('Please enter a search term.', {
            //         title: 'Warning',
            //         variant: 'danger',
            //         toaster: 'b-toaster-top-center',
            //         'autoHideDelay':5000,
            //         solid: true                    
            //     })
            //     return;
            //   }else
              this.$router.push({name: 'country', params: { country: this.search_term}})
          }
        }
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
