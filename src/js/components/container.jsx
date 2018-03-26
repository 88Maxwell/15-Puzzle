import React from 'react';
import Item from './item';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wrongItems: [],
            gameState:  this.defaultGameState()
        };
    
    // ----------------BINDING
        this.shuffleGame = this.shuffleGame.bind(this);
        this.changeGameState = this.changeGameState.bind(this);
    }

    // ---------------------------------------
    // ------------WORK WITH STATES
    // ---------------------------------------

    stateSetter(gameState, wrongs){
        this.setState({
            gameState: gameState || this.state.gameState,
            wrongItems: wrongs || this.state.wrongItems
        });
    }

    getWrongItems(gameState){        
        let wrongs = [];
        try {
            gameState.forEach((val, y) => val.forEach((item, x) => (!(item.x == x && item.y == y)) ? wrongs.push(item) : null));
            return wrongs;         
        } catch (error) {return null;} // set last version of wrongsItems, because (null || [last wrongs cofig])  => [last wrongs cofig]
    }

    // ---------------------------------------
    // ------------EVENTS CALLER
    // ---------------------------------------

    shuffleGame(ev){
        this.refs.container.focus();
        let gs = this.shufleFisherYates(this.state.gameState);
        let wrongs = this.getWrongItems(gs);

        this.stateSetter(gs, wrongs);
    }

    changeGameState(ev){
        if (ev.keyCode <=40 && ev.keyCode >= 37) {
            let gs = this.swapItems(ev.keyCode);
            let wrongs = this.getWrongItems(gs);

            if(wrongs != null)
                if (wrongs.length == 0) {
                    alert("YOU ARE WIN A GAME!!!");
                }             
            
            this.stateSetter(gs, wrongs);
        }
    }

    // ---------------------------------------
    // ------------STATES HANDLERS
    // ---------------------------------------

    swapItems(key){
        let gameState;
        switch (key) {
            //---- LEFT -------
            case 37:
                gameState = this.swapHandler(1, 0);
                break;

            //---- TOP --------
            case 38:
                gameState = this.swapHandler(0, 1);
                break;

            //---- RIGHT ------
            case 39:
                gameState = this.swapHandler(-1, 0);                    
                break;

            //---- DOWN -------
            case 40:
                gameState = this.swapHandler(0, -1);                  
                break;
        }
        return gameState;
    }

    // ---------------------------------------
    // ----------------SOME TOOLS
    // ---------------------------------------

    defaultGameState(){
        let gameState = Array.from(Array(4), (val, y) => Array.from(Array(4), (item, x) => ({y, x})));  
        gameState[3][3].main = true;
        return gameState;
    }

    swapHandler(a, b) {
        let gs = this.state.gameState;
        let main = this.findMain(gs);
        let item = {
            y: main.y + b, 
            x: main.x + a
        };  
        if ((item.y < 4 && item.y > -1) && (item.x < 4 && item.x > -1) ) 
            return this.swapArrayElem(gs, main, item);
    }

    findMain(gs){
        let main;
        try {
            gs.forEach((val, y) => val.forEach((item, x) => {
                if (item.main) {
                    main = {y, x};
                    throw "We are find our main and dont wanna find any more!"
                }
            }));       
        } catch (error) {}
        return main;
    }

    swapArrayElem(arr, a, b ){
        let c = arr[a.y][a.x];
        arr[a.y][a.x] = arr[b.y][b.x];
        arr[b.y][b.x] = c;
        return arr;
    }
  
    shufleFisherYates(arr){ 
        for (let i = arr.length-1 ; i > 0 ; i--) {
            for (let j = arr.length -1; j > 0 ; j--) {
                let m = Math.floor(Math.random()*i);
                let n = Math.floor(Math.random()*j);
                let temp = arr[i][j];
                arr[i][j] = arr[m][n];
                arr[m][n] = temp;
            }
        }
        return arr;
    }

    // ---------------------------------------
    // ---------RENDERING AND HIS TOOLS
    // ---------------------------------------


    renderItems(){
        return this.state.gameState.map((val, i) => {
            return val.map((item, j) => {
                let number = item.x + item.y * 4 + 1;
                let right = !this.state.wrongItems.includes(item);
                return (
                    <Item 
                        key={"item-" + number.toString()}
                        isMain={item.main} 
                        isRight={right} 
                    >
                        {!item.main ? number : ""}
                    </Item>
                );
            });
        });
    }
 
    render(){
        return [
            <h1 
                key="title"
                className="l-title"
            >
                15-puzzle
            </h1>,
            <div 
                onClick={this.shuffleGame} 
                className="btn" 
                key="break"
            >
                #Shuffle
            </div>,

            <div
                key="container"
                ref="container"
                onKeyDown={this.changeGameState}
                tabIndex="0"
                className="l-container"
            >
                {this.renderItems()}                        
            </div>            
        ];
    }
}