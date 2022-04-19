<template>
<div class="main-content">
    <!-- {{player ? player.sum : ''}} -->
    <div class="main-board">
        <div class="mb-players">
            <gamesvg :neighbours="neigh" @choose="guess" :time="time" :active="active" :paused="paused" :uname="uname"/>
        </div>
    </div>
</div>
</template>

<script>
import {Player, allcolors} from "../models/player.js"
import gamesvg from "./svg.vue"
export default {
    components:{
        gamesvg,
    },
    props:{
        io: {
            type: Object,
            required: true
        },
        players: Object,
        data: Object,
        uname: String,
    },
    data() {
        return {
            socket: this.io,
            player: null,
            neigh: [],
            allcolors: allcolors,
            paused: false,
            time: 0,
            active: false,
            interval: null,
        }
    },
    created(){
        this.socket.on("start-game", (data) => {
            console.log('start:')
            console.log(data);
            this.player = new Player(this.socket.id, data);
            console.log(this.socket.id)
            // console.log(this.player)
            // console.log(this.player.neighbors);
            this.neigh = this.player.neighbors;
            this.time = data.time;
            this.active = true;
            this.interval = setInterval(this.countdown, 1000)
        });
        this.socket.on("end-game", () =>{
            // alert("alerta")
            // this.player.guessColor()
            this.socket.emit('end-game-res', this.player)
        })
    },
    methods: {
        guess(c){
            this.player.guessColor(c)
        },
        countdown(){
            if(this.time >= 1){
            this.time = this.time - 1
            }else{
                clearInterval(this.interval)
                this.paused = true
            }
            // console.log('count mf')
        }
    }
}
</script>

<style>
.main-content {
    display: flex;
    flex-direction: row;
    width: 100%;
}
.main-board{
    background: linear-gradient(to right, #f8b19581, #f6728081);
}
.mb-players{
    display: flex;
    justify-content: space-around;
}
.led{
    width:10px;
    height:10px;
    border-radius: 50%;
    border: black solid 1px;
}
.playerobj{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}
.colorswitch{
    display: flex;
    justify-content: space-around;
}
.colorswitch .led{
    cursor: pointer;
}
</style>