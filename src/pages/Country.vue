<template>
    <div>
        {{ $route.params.flag }}
        {{ $route.params.country }}
    </div>    
</template>

<script>
    export default{
        name: 'Country',
        mounted(){
            axios.get(`https://restcountries.com/v3.1/name/${this.$route.params.country}/?fullText=true`)
                .then(response =>{
                    console.log(response.data)
                    this.countries = response.data
                })
                // first parameter of catch is always error, but we can name it whatever we want
                // obviously it just makes sense to call it 'error'
                .catch(error => console.log(error))
        }
    }
</script>

<style scoped>

</style>
