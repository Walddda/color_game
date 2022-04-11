export var allcolors = ['green', 'blue', 'red', 'yellow', 'purple', 'orange']

export class Player {
    constructor(id, game){
        console.log(game)
        this.game = game.game
        this.id = id
        game.game.forEach(e => {
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
        console.log('neigh:')
        console.log(this.id)
        let index = this.game.findIndex(x => {
            console.log(x)
            return x.user.id === this.id
        });
        this.position = index
        console.log(index)
        console.log(index == 0 ? this.game.length-1 : index-1 + ' - ' + index + ' - ' + index == this.game.length-1 ? 0 : index+1)
        return [
            this.game[index == 0 ? this.game.length-1 : index-1],
            this.game[index],
            this.game[index == this.game.length-1 ? 0 : index+1]
        ];
    }

    guessColor(guess){
        // if (condition) {
            
        // }
        this.guess = guess;
    }
}