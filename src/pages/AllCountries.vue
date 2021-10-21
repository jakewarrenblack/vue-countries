<template>
    <div class="container">
        <!-- so AllCountries makes the request, and ends up with an array of 250 countries -->
        <!-- then we loop and pass each country into a CountryViewer -->
        <!-- pass a prop like this -->
        <!-- don't know what ccn3 is, but presuming it's unique, so we can use that as the key -->
        <CountryViewer v-for="country in countries" :key="country.ccn3" :country="country" :flag="country.flag" />
    </div>    
</template>

<script>
    // import axios, { Axios } from 'axios'
    import CountryViewer from '@/components/CountryViewer'
    import api from '../classes/Request'

    export default{
        name: 'AllCountries',
        components: {
            CountryViewer
        },
        data(){
            return {
                countries: []
            }
        },
        mounted(){
            this.countries = api.getCountries()
        }
    }
</script>

<style scoped>
    .container{        
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    padding:5rem;
    }
</style>
