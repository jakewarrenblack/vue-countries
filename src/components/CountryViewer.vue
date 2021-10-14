<template>
    <div class="countryContain">
        <p class="flag">{{ country.flag}}</p>
        <div class="nameContainer"><b>Name:</b><router-link :to="{name: 'country', params: {country: country.name.official}}"> {{ country.name.common }}</router-link></div>        
        <div><b>Capital:</b> {{country.capital[0] }}</div>
    </div>    
</template>

<script>
    export default{
        name: 'CountryViewer',
        // the second part of passing a prop
        // in AllCountries: ' :country="countries[0]" '
        props: {
            country: Object
        }
    }
</script>

<style scoped>
.countryContain{
    display: flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
    background: #f4f4f4;
    padding: 2rem;
    border-radius: 1rem;
    width: 15rem;
    min-height:12rem;
    font-size: 1.2rem;
    font-family: 'Arial';
    margin: 1rem;
}

.flag{
    margin: 0;
    margin-bottom: 0px;
    font-size: 4rem;
    margin-bottom: 0.5rem;
}

.nameContainer{
    margin-bottom:0.5rem;
    display:flex;
    justify-content: center;
}

</style>
