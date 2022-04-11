<template>
  <div class="main-content">
    <div class="main-board-d">
        <div class="mb-players">
            <gamesvg :neighbours="neigh" @choose="guess" :time="120" :active="active" :uname="uname"/>
        </div>
        <!-- <div class="colorswitch">
            <p v-for="c in allcolors" :key="c" :style="{'backgroundColor': c} " class="led" @click="guess(c)"></p>
        </div> -->
    </div>
    <!-- <div class="leaderboard">
        <table>
            <tr v-for="p in players" :key="p">
                <td>
                    <u v-if="p.id == socket.id">{{p.username}}</u>
                    <span v-else>{{p.username}}</span>
                </td>
                <td>0</td>
            </tr>
        </table>
    </div> -->
  </div>
</template>

<script>
import {Player, allcolors} from "../models/player.js"
import gamesvg from "./svg.vue"
export default {
    components:{
        gamesvg
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
            neigh: [
                { user: { username: "adshadhudsailhbfhsdkagfhsdghjgkhj", id: "kV6unX3Qxp_MnPxTAAC9" }, color: "red", role: "impostor" },
                { user: { username: "adshadhudsailhbfhsdkagfhsdghjgkhj", id: "kV6unX3Q23_MnPxTAAC9" }, color: "green", role: "player" },
                { user: { username: "user3hdafhdihhuiadhliuahfaiuhflduihdahsdajhiudshuihsdauih", id: "kV6unX3Q45_MnPxTAAC9" }, color: "blue", role: "player" },
                
                ],
            allcolors: allcolors,
            time: 0,
            active: false,
        }
    },
    created(){
        this.socket.on("start-game", (data) => {
            console.log(data);
            this.player = new Player(this.socket.id, data);
            console.log(this.socket.id)
            console.log(this.player)
            console.log(this.player.neighbors);
            this.neigh = this.player.neighbors;
            this.time = 200;
            this.active = true;
        });
    },
    methods: {
        // sendMessage() {
        //     this.socket.emit('message', this.filter.clean(this.message));
        //     this.message = '';
        // }
        guess(c){
            console.log(c)
            // this.player.guessColor(c)
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
.main-board-d{
    /* padding: 20px 30px 20px 30px; */
    /* height: 100px; */
    /* width: 100%; */
    background: linear-gradient(to right, #f8b19581, #f6728081);
    /* align-content: space-between; */
    /* display: flex; */
    /* flex-direction: column; */
    /* min-width: 300px; */
    /* max-width: 70%; */
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