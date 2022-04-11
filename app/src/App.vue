<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "./components/HelloWorld.vue";
import Chat from "./components/Chat.vue";
import Board from "./components/Board.vue";
import BoardDesign from "./components/Board_design.vue";
import Username from "./components/Username.vue";

</script>

<template>
  <div>
    <username :io="socket" v-if="!username" @joined="x => username = x"/>
    <board :io="socket" :players="players" :data="gamedata" :uname="username"/>
    <!-- <board-design :io="socket" :players="players" :data="gamedata" :uname="username"/> -->
    <chat v-if="username" :io="socket"/>
    <button v-if="admin && !gameActive" @click="startGameCall">Start</button>
  </div>
</template>

<script>
import {io} from 'socket.io-client';
export default {
  components: {
    HelloWorld,
    Chat,
    Board,
    BoardDesign
  },
  data() {
    return {
      socket: null,
      players: {},
      username: null,
      admin: false,
      gameActive: false,
      gamedata: {}
    }
  },
  created() {
    this.socket = io('ws://localhost:8080');
    this.socket.on("disconnect", (reason) => {
      this.username = false
    });
    this.socket.on("roomData", (data) => {
      console.log(data)
      this.players = data.users
      console.log(this.players[0])
      if(this.players[0].id == this.socket.id){
        this.admin = true
      }
    });
    this.socket.on("start-game", (data) => {
      console.log(data);
      this.gamedata = data;
      this.gameActive = true
    });
  },
  methods: {
    startGameCall(){
      this.socket.emit('start-game-call', '')
    }
  }
}
</script>
<style>
/* @import url('https://fonts.cdnfonts.com/css/amoitar'); */
#app {
  /* font-family: 'Amoitar', sans-serif; */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
