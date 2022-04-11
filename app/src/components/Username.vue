<template>
    <div class="uname-bg">
        <div class="uname-content">
            <input autofocus type="text" v-model="username" @keyup.enter="connect" placeholder="username">
            <button @click="connect">Connect</button>
        </div>
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
.uname-bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.444);
    /* opacity: 0.5; */
    z-index: 1;
}
.uname-content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 200px;
    background-color: #fff;
    border-radius: 5px;
    z-index: 2;
    /* opacity: 1; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
}
.uname-content input{
    /* width: 80%; */
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 16px;
    outline: none;
}
.uname-content button{
    /* width: 80%; */
    margin-top: 20px;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 16px;
    outline: none;
    background-color: rgb(255, 0, 191);
    cursor: pointer;
}
</style>