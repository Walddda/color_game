<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "./components/HelloWorld.vue";
import Chat from "./components/Chat.vue";
import Board from "./components/Board.vue";

</script>

<template>
  <div>
    <board :io="socket" :players="players"/>
    <chat :io="socket"/>
    <chat :io="socket"/>
  </div>
</template>

<script>
import {io} from 'socket.io-client';
export default {
  components: {
    HelloWorld,
    Chat,
    Board,
  },
  data() {
    return {
      socket: null,
      players: {},
    }
  },
  created() {
    this.socket = io('ws://localhost:8080');
    // console.log(this.socket.clients)
    this.socket.on('new-user', id => {
      this.players[id] = "User "+(Object.keys(this.players).length+1);
    })
    this.socket.on('user-lost', id => {
      delete this.players[id]
    })
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
