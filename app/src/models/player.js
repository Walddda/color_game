class Player {
    constructor(id, game){
        this.game = game
        game.users.forEach(e => {
            if(e.id == id){
                this.username = e.username;
                this.color = e.color;
                this.role = e.role;
            }
        });
        this.neighbors = this.getNeighbors();
        console.log(this.toString())
    }

    getNeighbors(){
        let index = game.users.findIndex(x => x.id ===this.id);
        this.position = index
        if (index == 0) {
            
        }
        return neighbors = [
            game.users[index == 0 ? this.game.users.length : index-1],
            game.users[index],
            game.users[index == this.game.users.length ? 0 : index+1]
        ];
    }
}