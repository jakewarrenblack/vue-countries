<template>
    <div>
        <Carousel/>
        <br>
        <b-container fluid class="bv-example-row mb-3">
            <b-row cols="5" class=" mx-auto w-75">
                <b-col>
                    <Card 
                    title="Europe" 
                    body="test" 
                    filename="europe.jpg" />
                </b-col>                
                <b-col>
                    <Card 
                    title="Africa" 
                    body="test" 
                    filename="africa.jpg" />
                </b-col>
                <b-col>
                    <Card 
                    title="Asia" 
                    body="test" 
                    filename="asia.jpg" />
                </b-col>
                <b-col>
                    <Card 
                    title="Americas" 
                    body="test" 
                    filename="americas.jpg" />
                </b-col>
                <b-col>
                    <Card 
                    title="Australia" 
                    body="test" 
                    filename="australia.jpg" />
                </b-col>
            </b-row>
        </b-container>
    </div>    
</template>

<script>
import Carousel from '@/components/Carousel'
import Card from '@/components/Card'
    export default{
        name: 'Home',
        components:{
            Carousel,
            Card
        }
    }
</script>

<style>
.carousel-caption{
    bottom: 25%!important;
    text-align: left!important;
    font-size: 5rem!important;
    font-family: 'Alegreya sans bold'!important;
}

.carousel-item{
    height:70vh;
}

.carousel-item img{
    max-height:100%;
    object-fit: cover;
}
</style>
