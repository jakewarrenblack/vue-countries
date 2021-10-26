<template>
    <div>
        <Carousel/>
        <br>
        <b-container class="bv-example-row mb-3">
            <b-row cols="6">
                <b-col>
                    <Card 
                    title="Europe" 
                    body="test" 
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpicsum.photos%2Fid%2F237%2F536%2F354&f=1&nofb=1" />    
                </b-col>                
                <b-col>
                    <Card 
                    title="Africa" 
                    body="test" 
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpicsum.photos%2Fid%2F237%2F536%2F354&f=1&nofb=1" />
                </b-col>
                <b-col>
                    <Card 
                    title="Asia" 
                    body="test" 
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpicsum.photos%2Fid%2F237%2F536%2F354&f=1&nofb=1" />
                </b-col>
                <b-col>
                    <Card 
                    title="North America" 
                    body="test" 
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpicsum.photos%2Fid%2F237%2F536%2F354&f=1&nofb=1" />
                </b-col>
                <b-col>
                    <Card 
                    title="South America" 
                    body="test" 
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpicsum.photos%2Fid%2F237%2F536%2F354&f=1&nofb=1" />
                </b-col>
                <b-col>
                    <Card 
                    title="Australia" 
                    body="test" 
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpicsum.photos%2Fid%2F237%2F536%2F354&f=1&nofb=1" />
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

<style scoped>

</style>
