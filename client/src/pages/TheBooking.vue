<template>
    <div class="row">
        <div class="col-8">
            <div>
                <div class="screen">
                    <p>MULTIPLEX SCREEN</p>
                </div>
                <div>
                    <div class="row-seats" v-for="(seatsOfIndividualRow,key1) in this.seats" :key="key1">
                        <p v-if="key1===1"><br><br><br></p>
                        <p class="row-number">{{ key1+1 }}</p>
                        <p :class="`single-seat ${seat===this.userId && 'bought-by-me'} ${seat!==1 && seat!==2 && 'sold'} ${seat===1 && 'available'} ${seat===2 && 'selected'}`" @click="seatClicked(key1,key2)" v-for="(seat,key2) in seatsOfIndividualRow" :key="key2">{{ key2+1 }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="this.currentMovie" class="col-4">
            <div class="booking-details">
                <table>
                    <tr>
                        <td class="detail-label">Movie</td>
                        <td class="detail-dynamic">: {{ this.currentMovie.name }}</td>
                    </tr>
                    <tr>
                        <td class="detail-label">Time</td>
                        <td class="detail-dynamic">: 21 Dec 2023, 09:00 P.M.</td>
                    </tr>
                    <tr>
                        <td class="detail-label">Per Ticket</td>
                        <td class="detail-dynamic">: {{ currentMovie.price }}$</td>
                    </tr>
                    <tr>
                        <td class="detail-label">Tickets</td>
                        <td class="detail-dynamic">: {{ selectedCount }}</td>
                    </tr>
                    <tr>
                        <td class="detail-label">Total</td>
                        <td class="detail-dynamic">: {{ selectedCount * currentMovie.price }}$</td>
                    </tr>
                </table>
                <!-- <p><span class="detail-label">Movie</span> <span class="detail-dynamic">:Money Heist</span></p>
                <p><span class="detail-label">Time</span> <span class="detail-dynamic"></span></p>
                <p><span class="detail-label">Tickets</span> <span class="detail-dynamic">:10</span></p>
                <p><span class="detail-label">Total</span> <span class="detail-dynamic">:50$</span></p> -->
                <br>
                <div>
                    <button @click="bookTickets" class="book-button">Book Now!</button>
                </div>
                <div style="margin-top: 2rem;">
                    <div style="display: flex;">
                        <div class="seat-description available"></div>
                        <p style="display: inline;">Available</p>
                    </div>
                    <div style="display: flex;">
                        <div class="seat-description sold"></div>
                        <p>Sold</p>
                    </div>
                    <div style="display: flex;">
                        <div class="seat-description selected"></div>
                        <p>Selected</p>
                    </div>
                    <div style="display: flex;">
                        <div class="seat-description bought-by-me"></div>
                        <p>Previously booked by me</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {publicBookingStatus, userBookingStatus} from '../enums'
export default {
    data(){
        return{
            seats:[],
            selected:[],
            selectedCount:0,
            publicBookingStatus:publicBookingStatus,
            currentMovie:{},
            allBookedMovies:[],
            previouslyBookedSeats:[],
            userId:localStorage.getItem("userId")
        }
    },
    methods:{
        seatClicked(row,col){
            if (this.seats[row][col]===publicBookingStatus.available) {
                this.seats[row][col]=publicBookingStatus.selected
                this.selected[row][col]=userBookingStatus.selected
                this.selectedCount+=1
            }
            else if (this.seats[row][col]===publicBookingStatus.selected) {
                this.seats[row][col]=1
                this.selected[row][col]=userBookingStatus.unselected
                this.selectedCount-=1
            }
        },
        async bookTickets(){
            for (let i = 0; i < this.seats.length; i++) {
                for (let j = 0; j < 10; j++) {
                    if (this.seats[i][j] && (this.seats[i][j] === 2)){
                        this.seats[i][j] = localStorage.getItem("userId")
                    }
                }                
            }
            await this.$store.dispatch("bookSeats",{movie:this.$route.params.name,seats:this.seats})
        }
    },
    computed:{
    },
    async mounted(){
        this.currentMovie = await this.$store.dispatch("specificMovieInfo",this.$route.params.name)
        // this.allBookedMovies = await this.$store.dispatch("specificMovieSeats",this.$route.params.name)
        // for (let index = 0; index < this.allBookedMovies.length; index++) {
        //     if (this.allBookedMovies[index][0]===this.$route.params.name){
        //         this.previouslyBookedSeats = this.allBookedMovies[index]
        //         console.log(this.previouslyBookedSeats)
        //     }
        // }
        this.seats= this.currentMovie.seats
        for (let index = 0; index < this.seats.length; index++) {
            this.selected.push([])
        }
    }
}
</script>

<style scoped>
.single-seat{
    background-color: gainsboro;
    color: rgb(0, 0, 0);
    text-align: center;
    width: 2rem;
    height: 2rem;
    margin-right: 0.4rem;
    padding-top: 4px;
    border-radius: 6px;
    cursor: pointer;
}
.row-seats{
    display: flex;
    justify-content: center;
}
.row-number{
    color: white;
    margin-right: 8px;
    padding-top: 4px;
    font-weight: bold;
}
.screen{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
}
.screen > p{
    background-color: orange;
    width: 60%;
    text-align: center;
    padding: 0.5rem;
    font-weight: 500;
    font-size: larger;
    letter-spacing: 2px;
    border-radius: 6px;
}
.booking-details{
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.book-button{
    padding: 0.5rem;
    border-radius: 0.5rem;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
    font-weight: bold;
    background-color: orange;
    color: white;
}
.detail-label{
    color: orange;
    font-weight: bolder;
}
.detail-dynamic{
    color: white;
    font-weight: bold;
}
table tr td{
    padding-bottom: 1rem;
}
.seat-description{
    height: 1.7rem; 
    width: 1.5rem;
    margin-right: 0.8rem;
    border-radius: 6px;
}
.available{
    background-color: gainsboro;
}
.sold{
    background-color: red;
    color: white;
}
.selected{
    background-color:#6fff02;
}
.bought-by-me{
    background-color:#853e9b;
}
</style>