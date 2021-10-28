<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide  v-for="item of finalCountriesArray" :key="finalCountriesArray.indexOf(item)" caption="" img-blank img-alt="Blank image">
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            :src="`${item[1]}`"
            alt="image slot"
          >
        </template>
        <p>
          {{ item[0] }}
        </p>
      </b-carousel-slide>      
    </b-carousel>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Carousel',
    data() {
      return {
        slide: 0,
        sliding: null,
        test : [
          'https://picsum.photos/1024/480/?image=55',
          'https://picsum.photos/1024/480/?image=54',
          'https://picsum.photos/1024/480/?image=53',
          'https://picsum.photos/1024/480/?image=52'
        ],
        finalCountries: new Map(),
        finalCountriesArray : [],
        // placeholders: new Map([
        //             [1,'@/assets/carousel/ireland.jpg'],
        //             [2,'@/assets/carousel/ireland.jpg'],
        //             [3,'@/assets/carousel/ireland.jpg'],
        //             [4,'@/assets/carousel/ireland.jpg'],
        //   ]
        // ),
        placeholders: [
          [
            'Ireland',
            '@/assets/carousel/ireland.jpg'
          ],
          [
            'Ireland',
            '@/assets/carousel/ireland.jpg'
          ],
          [
            'Ireland',
            '@/assets/carousel/ireland.jpg'
          ],
          [
            'Ireland',
            '@/assets/carousel/ireland.jpg'
          ]
        ]
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      },
      getRandomCountries(){
        axios.get('https://restcountries.com/v3.1/all').then(response =>{        
            var countries = [];

            for(var i =0; i<4; i++){
              var randomCountry = response.data[Math.floor(Math.random() * response.data.length)]
              countries.push(randomCountry.name.common);
            }

            for(var j=0; j<countries.length; j++){
              this.getImages(countries[j])
            }
        })
        .catch(error => console.log(error))
      },
      async getImages(country){
        var that = this;
          await axios.get(`https://api.unsplash.com/search/photos/?client_id=9LhVwLjJrdIy5jX3svklsUACp0mByDjsrzbJNTZGAqg&query=${country}`)
            .then(function(response){
                  var imageSrc = response.data.results[0].urls.full
                  that.finalCountries.set(country, imageSrc)
                }
            )
            .catch(function(error){
              console.log(error)
              // call to pexels instead
              // unsplash has good photos but rate limited to 50 per hour, pexels is 200
              axios({
                headers: {'Authorization' : '563492ad6f917000010000017537530b7b0b4f148a82df455487e0f1'}
              }).get(`https://api.pexels.com/v1/search?query=test?query=${country}`)
              .then(function(response){
                    console.log(response)               
                  }
              )
              .catch(function(error){
                console.log(error)                              
              })
            })
        this.finalCountriesArray = Array.from(this.finalCountries)
      }
    },
    mounted(){
      this.getRandomCountries(),
      console.log(Array.from(this.placeholders));
      for(var item of this.placeholders){
        console.log(item[0])
        console.log(item[1])
      }
    }
  }
</script>