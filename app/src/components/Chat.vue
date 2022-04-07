<template>
  <div>
    <input type="text" v-model="message" @keyup.enter="sendMessage" placeholder="message">
    <button @click="sendMessage">Send</button>
    <hr>
    <!-- <ul ref="list"></ul> -->
    <p v-for="m in messages" :key="m.id" class="message" :class="[m.id == socket.id ? 'own' : [m.id == 'admin' ? 'admin' : 'foreign']]">{{m.id != 'admin' ? m.username+': ' : ''}}{{ m.message }}</p>
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
            message: '',
            socket: this.io,
            messages: [],
            filter: null,
            }
        },
    created(){
        this.filter = new bad();
        // var Filter = require('bad-words');
        // this.filter = new Filter();
        // this.socket = io('ws://localhost:8080');
        console.log(this.socket)
        this.socket.on('message', text => {
            this.messages.push(text);
        });
    },
    methods: {
        sendMessage() {
            this.socket.emit('message', this.filter.clean(this.message));
            this.message = '';
        }
    }
}
</script>

<style>
.message{
    height: 20px;
    padding-left: 5px;
    padding-right: 5px;
    width: max-content;
    display: flex;
    justify-content: center;
}
.own{
    background-color: lightgreen;
}
.foreign{
    background-color: lightblue;
}
.admin{
    font-style: italic;
}
</style>