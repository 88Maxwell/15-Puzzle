// old version
import React from 'react';
import Navigation from './navigation';
import Item from './item';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        let gameState = this.defaultGameState();
        this.state = {
            enabled: false,
            wrongItems: [],
            gameState: gameState
        };
    
        // ----------------BINDING
        this.startGame = this.startGame.bind(this);
        this.breakGame = this.breakGame.bind(this);
        this.changeGameState = this.changeGameState.bind(this);
    }

    // ---------------------------------------
    // ------------WORK WITH STATES
    // ---------------------------------------

    stateSetter(enabled, gameState, wrongs){
        this.setState({
            enabled: enabled,
            gameState: gameState || this.state.gameState,
            wrongItems: wrongs || this.state.wrongItems
        });
    }

    getWrongItems(gameState){        
        let wrongs = [];
        if (gameState != undefined) {
            gameState.forEach((val, y) => val.forEach((item, x) => (!(item.x == x && item.y == y)) ? wrongs.push(item) : null));
            return wrongs;
        } else return null; // set last version of wrongsItems, because (null || [last wrongs cofig])  => [last wrongs cofig]
    }

    // ---------------------------------------
    // ------------EVENTS CALLER
    // ---------------------------------------

    startGame(ev){
        this.container.focus();
        let gs = this.shufleFisherYates(this.state.gameState);
        let wrongs = this.getWrongItems(gs);

        this.stateSetter(true, gs, wrongs);
    }

    breakGame(ev){
        this.stateSetter(false, this.defaultGameState(), []) ;
    }

    changeGameState(ev){
        if (this.state.enabled && ev.keyCode <=40 && ev.keyCode >= 37) {
            let gs = this.swapItems(ev.keyCode),
                wrongs = this.getWrongItems(gs),
                enabled = true;

            if(wrongs != null && wrongs.length == 0){
                alert("YOU ARE WIN A GAME!!!");
                enabled = false;
            }
            
            this.stateSetter(enabled, gs, wrongs);
        }
    }

    swapItems(key){
        let gameState;
        switch (key) {
            //---- LEFT -------
            case 37:
                gameState = this.swapHandler(-1, 0);                    
                break;

            //---- TOP --------
            case 38:
                gameState = this.swapHandler(0, -1);                  
                break;

            //---- RIGHT ------
            case 39:
                gameState = this.swapHandler(1, 0);
                break;

            //---- DOWN -------
            case 40:
                gameState = this.swapHandler(0, 1);
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

        if ((item.y < 4 && item.y > -1) && (item.x < 4 && item.x > -1) ) return this.swapArrayElem(gs, main, item);
    }

    findMain(gs){
        for (let y = 0; y < gs.length; y++) 
            for (let x = 0; x < gs[y].length; x++)
                if (gs[y][x].main) return {y, x};
    }

    swapArrayElem(arr, a, b){
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
                        key={`item-${number.toString()}`}
                        isMain={item.main} 
                        isRight={right}
                        number={number}
                    >
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

            <Navigation
                key="nav"
                startGame={this.startGame}
                breakGame={this.breakGame}
            />,    

            <div
                key="container-wrapper"         
                className="l-container-wrapper"
            >
                <div
                    ref={(input) => { this.container = input; }}
                    onKeyDown={this.changeGameState}
                    tabIndex="0"
                    className="l-container"
                >
                    {this.renderItems()}                        
                </div>
            </div>
        ];
    }
}