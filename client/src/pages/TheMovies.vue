<template>
    <div class="main">
        <p class="showing">Now Showing In Cinemas!</p>
        <div class="scroll-container" ref="scrollContainer">
            <button class="arrow-button" @click="scrollLeft" style="position: absolute;top: 130px;left: 0px;">&lt;</button>
            <div class="movie-card" v-for="(movie,key) in currentMoviesData" :key="key">
                <img style="cursor: pointer;" @click="this.$router.push(`/movie/booking/${movie.id}`)" class="movie-img" width="300" height="200" :src="movie.img" :alt="movie.name">
            </div>
            <button class="arrow-button" @click="scrollRight" style="position: absolute;top: 130px;right: 0px;">&gt;</button>
        </div>
        <br>
        <div>
            <p class="showing">Upcoming Movies at Nuplex!</p>
        </div>
        <div>
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div v-for="(movie,key) in upcomingMoviesData" :key="key" :class="`carousel-item row justify-content-center ${key===0 && 'active'}`">
                        <img style="border-radius: 30px;" width="1000" height="600" :src="movie.img" class="d-block" alt="...">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        <br>
        <br>
        <br>
    </div>
</template>

<script>
export default{
    components:{
        
    },
    data(){
        return{
            currentMoviesData:[],
            upcomingMoviesData:[],
        }
    },
    methods:{
        scrollLeft() {
            const container = this.$refs.scrollContainer;
            container.scrollBy({
                left: -500,
                behavior: "smooth"
            });
        },
        scrollRight() {
            const container = this.$refs.scrollContainer;
            container.scrollBy({
                left: 500,
                behavior: "smooth"
            });
        }
    },
    async mounted(){
        await this.$store.dispatch('setCurrentMoviesData')
        await this.$store.dispatch('setUpcomingMoviesData')
        this.currentMoviesData= await this.$store.getters.getCurrentMoviesData
        this.upcomingMoviesData= await this.$store.getters.getUpcomingMoviesData
    }
}
</script>
<style scoped>
.scroll-container::-webkit-scrollbar {
  display: none;
}
.scroll-container {
    display: flex;
    overflow-x: auto;
    gap: 20px;
}
.movie-img{
    border-radius: 20px;
}
.main{
    position: relative;
    margin-left: 40px;
    margin-right: 40px;
}
.arrow-button{
    background-color: rgb(121, 117, 117);
    color: white;
    font-weight: bolder;
    border-radius: 25px;
    width: 50px;
    height: 50px;
    border: none;
}
.arrow-button:hover{
    background-color: rgb(192, 188, 188);
}
.showing{
    font-size: 26px;
    font-weight: bolder;
    margin-top: 15px;
}
</style>