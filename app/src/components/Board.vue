<template>
  <div>
    <div class="main-board">
        <p v-for="p in players" :key="p">{{p}}</p>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        io: {
            type: Object,
            required: true
        },
        players: Object,
    },
    data() {
        return {
            socket: this.io,
            }
        },
    created(){
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
.main-board{
    padding: 20px 30px 20px 30px;
    height: 100px;
    width: max-content;
    background: linear-gradient(to right, #f8b195, #f67280);
    display: flex;
    justify-content: center;
    align-content: space-between;
    min-width: 300px
}
</style>