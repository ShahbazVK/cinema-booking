<template>
    <div class="row">
        <div class="col-8">
            <div>
                <div class="screen">
                    <p>MULTIPLEX SCREEN</p>
                </div>
                <div>
                    <div class="row-seats" v-for="(seatsOfIndividualRow,key1) in allSeatsComputed" :key="key1">
                        <p v-if="key1===1"><br><br><br></p>
                        <p class="row-number">{{ key1+1 }}</p>
                        <p :class="`single-seat ${seat===0 && 'sold'} ${seat===1 && 'available'} ${seat===2 && 'selected'}`" @click="seatClicked(key1,key2)" v-for="(seat,key2) in seatsOfIndividualRow" :key="key2">{{ key2+1 }}</p>
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
                        <td class="detail-dynamic">: {{ this.currentMovie.date }}</td>
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
                    <button class="book-button">Book Now!</button>
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
            // seats:[[1,0,1,1,1,1,0,1,0,0],[1,0,1,1,0,1,0,0,0,0],[1,0,1,1,1,1,0,1,0,0],[1,0,1,1,1,1,0,1,0,0],[1,0,1,1,1,0,0,1,0,0],[0,0,1,1,1,1,0,1,0,0],[1,0,1,1,1,1,0,1,0,0],[1,0,1,0,1,1,0,1,0,0],[1,0,1,1,1,1,0,1,0,0],[1,0,1,0,1,1,0,1,1,0]],
            selected:[],
            selectedCount:0,
            publicBookingStatus:publicBookingStatus,
            currentMovie:{},
            // sold:[[3,4],[10],[5,10],[1,10],[1],[7,8,9],[3,10],[1,6,7,8],[9],[2]],
            // available:[[1,2,5,6,7,8,9,10],[1,2,3,4,5,6,7,8,9],[1,2,3,4,6,7,8,9],[2,3,4,5,6,7,8,9],[2,3,4,5,6,10],[1,2,4,5,6,7,8,9],[2,3,4,5,9,10],[1,2,3,4,5,6,7,8,10],[1,2,3,4,5,6,7,8,9,10],[1,3,4,5,6,7,8,9,10]],
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
        }
    },
    computed:{
        allSeatsComputed() {
            const rows = 9;
            const columns = 10;
            // const seats = [];

            for (let i = 0; i < rows; i++) {
                const row = [];
                for (let j = 0; j < columns; j++) {
                    const randomDigit = Math.floor(Math.random() * 2); // Generates either 0 or 1
                    row.push(randomDigit);
                }
                this.seats.push(row);
                this.selected.push([])
            }
            this.seats.push([1,0,0,1,0,1])
            return this.seats;
        },
    },
    async mounted(){
        // console.log(await this.$store.getters.getCurrentMoviesData);
        this.currentMovie= await this.$store.getters.getCurrentMoviesData
        if (this.currentMovie===undefined) this.$router.push('/movies')
        else this.currentMovie=this.currentMovie.filter(movie=>movie.id===parseInt(this.$route.params.id))[0]
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
</style>