<template>
  <div>
    <input type="text" v-model="username" @keyup.enter="connect" placeholder="username">
    <button @click="connect">Connect</button>
  </div>
</template>

<script>
import {io} from 'socket.io-client';
import bad from 'bad-words'
export default {
    props:{
        io: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            username: null,
            socket: this.io,
            }
        },
    created(){
    },
    methods: {
        connect() {
            if(this.username){
                this.socket.emit('joined', this.username);
                this.$emit('joined', this.username)
            }
        }
    }
}
</script>

<style>
</style>