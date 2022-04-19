<template>
    <div class="uname-bg">
        <div class="uname-content" style="height: 350px; display:flex; flex-direction:column; justify-content: space-around;">
            <!-- <input autofocus type="text" v-model="username" @keyup.enter="connect" placeholder="username"> -->
            <!-- <button @click="connect">Connect</button> -->
            <div style="display:flex; flex-direction:row; justify-content: space-around; align-items: center">
                <div v-for="r in results" :key="r.name" style="display:flex; flex-direction:column; justify-content: space-around;">
                    <span>{{r.name}}</span>
                    <span class="col-led" :style="{'background-color': r.color}" ></span>
                    <span class="col-led" :style="{'background-color': r.guess}" ></span>
                </div>
            </div>
            <div style="display: flex; justify-content: center;">
                <span class="winlose" :style="{'background-color': win ? 'green' : 'red'}">{{win ? 'Victory' : 'Defeat'}}</span>
            </div>
            <button @click="restart">Restart</button> 
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
        },
        results: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            username: null,
            socket: this.io,
            win: this.getwin(),
            }
        },
    created(){
    },
    methods: {
        getwin(){
        var win = true
            this.results.forEach(r => {
                if(r.color != r.guess){
                    win = false
                }
            });
            return win
        },
        restart(){
            //reload window
            window.location.reload()
            // window.reload()
            // this.socket.emit('restart-game');
        }
    }
}
</script>

<style>
.col-led{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.winlose{
    color: white;
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

</style>