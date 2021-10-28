<template>
    <div class="card" style="">
        <img class="card-img-top" :src="require(`@/assets/${filename}`)" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title text-center">{{ title }}</h5>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'Card',
        // the second part of passing a prop
        // in AllCountries: ' :country="countries[0]" '
        props: {
            title: String,
            body: String,
            filename: String
        }
    }
</script>
<style>
.card{
    filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
    border: none;
}
.card-img-top{
    height: 15rem;
}
.card-title{
    font-family:'Alegreya Sans Bold';
}
</style>
