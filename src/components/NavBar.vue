<template>
    <div>
        <router-link :to="{name: 'home'}">Home</router-link> | 
        <router-link :to="{name: 'all_countries'}">All</router-link>
    </div>    
</template>

<script>
    export default{
        name: 'NavBar'
    }
</script>

<style scoped>
div{
    display: flex;
    justify-content: center;
    padding: 1rem;
    font-size: 1.5rem;
    font-family: 'Arial';
    font-weight: bold;
    background: rgb(153, 225, 127);
    margin: 0;
    padding: 0;
    padding: 2rem;
}
router-link-active{
    margin:12px;
}
</style>
