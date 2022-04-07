<template>
  <div class="main-content">
    <div class="main-board">
        <div v-for="p in data.game" :key="p.user.id" class="playerobj">
            <p :style="[p.user.id != socket.id ? {'backgroundColor': p.color} : {'backgroundColor': 'grey'}]" class="led"></p>
            {{p.user.username}}
        </div>
    </div>
    <div class="leaderboard">
        <table>
            <tr v-for="p in players" :key="p">
                <td>
                    <u v-if="p.id == socket.id">{{p.username}}</u>
                    <span v-else>{{p.username}}</span>
                </td>
                <td>0</td>
            </tr>
        </table>
    </div>
  </div>
</template>

<script>
// import Player from "./models/player.js"
export default {
    props:{
        io: {
            type: Object,
            required: true
        },
        players: Object,
        data: Object,
    },
    data() {
        return {
            socket: this.io,
            player = new Player()
        }
    },
    created(){
        this.socket.on("start-game", (data) => {
            console.log(data);

            // this.gamedata = data;
            // this.gameActive = true
        });
        // this.socket.on('message', text => {
        //     this.messages.push(text);
        // });
    },
    methods: {
        // sendMessage() {
        //     this.socket.emit('message', this.filter.clean(this.message));
        //     this.message = '';
        // }
    }
}
</script>

<style>
.main-content {
    display: flex;
    flex-direction: row;
}
.main-board{
    padding: 20px 30px 20px 30px;
    height: 100px;
    width: max-content;
    background: linear-gradient(to right, #f8b19581, #f6728081);
    display: flex;
    justify-content: space-around;
    /* align-content: space-between; */
    min-width: 300px;
    max-width: 70%;
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
</style>