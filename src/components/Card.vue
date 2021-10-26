<template>
    <div class="card" style="width: 12rem;">
        <img class="card-img-top" :src="`${src}`" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>
            <p v-if="body" class="card-text">{{ body }}</p>
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
            src: String
        }
    }
</script>
