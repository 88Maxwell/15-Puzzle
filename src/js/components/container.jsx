import React from 'react';
import Navigation from './navigation';
import Item from './item';
import ErrorBoundary from './errorBoundary';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        let gameState = this.initGame()
        this.state = {
            enabled: false,
            wrongItems: [],
            gameState: gameState
        };

        this.startGame = this.startGame.bind(this);
        this.breakGame = this.breakGame.bind(this);
        this.winGame = this.winGame.bind(this);

        this.shufleGame = this.shufleGame.bind(this);
        this.initGame = this.initGame.bind(this);
        this.changeGameState = this.changeGameState.bind(this);
    }

    // ---------------------------------------
    // ------------WORK WITH STATES
    // ---------------------------------------

    stateSetter(enabled, gameState){
        this.setState({
            enabled: enabled,
            wrongItems: this.getWrongItems(gameState) || this.state.wrongItems,
            gameState: gameState || this.state.gameState
        });
    }

    getWrongItems(gameState){        
        let wrongs = [];
        try {
            gameState.forEach((val, y) => val.forEach((item, x) => (!(item.x == x && item.y == y)) ? wrongs.push(item) : null));                             
        } catch (error) { wrongs = null}
        if(wrongs == []) this.winGame();
        return wrongs; 
        
    }

    // ---------------------------------------
    // ------------EVENTS CALLER
    // ---------------------------------------

    startGame(ev){
        this.refs.container.focus();
        this.stateSetter(true, this.shufleGame());
    }

    breakGame(ev){
        this.stateSetter(false, this.initGame());
    }

    changeGameState(ev){
        if (this.state.enabled && ev.keyCode <=40 && ev.keyCode >= 37) {
            this.stateSetter(true, this.swapItems(ev.keyCode));
        }
    }

    winGame(){
        alert("Victory");
        this.stateSetter(false);
    }

    // ---------------------------------------
    // ------------STATES HANDLERS
    // ---------------------------------------

    
    initGame(){
        return this.defaultGameState();
    }

    shufleGame(){
        return this.shufleFisherYates(this.state.gameState);
    }

    swapItems(key){
        try{
            var gameState;
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
        } catch (error) {console.log("error")}
    }

    

    // ---------------------------------------
    // ----------------SOME TOOLS
    // ---------------------------------------

    defaultGameState(){
        let gameState = Array.from(Array(4), (val, y) => Array.from(Array(4), (item, x) => ({y, x})));   
        gameState[3][3].main = true;
        return gameState;
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

    swapHandler(a, b) {
        let gs = this.state.gameState;
        let main;
        gs.forEach((val, y) => 
            val.forEach((item, x) => {
                try {
                    if (item.main) {
                        main = {y, x};
                        throw BreakException;
                    }   
                } catch (error) {}
            })
        );
        let item = {
            y: main.y + b, 
            x: main.x + a
        };        
        if (gs[item.y][item.x] != undefined) {
            return this.swapArrayElem(gs, main, item);            
        }
    }

    swapArrayElem(arr, a, b ){
        let c = arr[a.y][a.x];
        arr[a.y][a.x] = arr[b.y][b.x];
        arr[b.y][b.x] = c;
        return arr;
    }

    // ---------------------------------------
    // ---------RENDERING AND HIM TOOLS
    // ---------------------------------------


    renderItems(){
        return this.state.gameState.map((val, i) => {
            return val.map((item, j) => {
                let number = item.x + item.y * 4 + 1;
                let right = !this.state.wrongItems.includes(item);
                return (
                    <Item 
                        id={number.toString()}
                        main={item.main ? "l-main-item" : ""} 
                        right={right ? "right " : ""} 
                    >
                        {!item.main ? number : ""}
                    </Item>
                );
            });
        });
    }
 
    render(){
        return [
            <h1 className="l-title">15-puzzle</h1>,
            <Navigation
                key="nav"
                startGame={this.startGame}
                breakGame={this.breakGame}
                winGame={this.winGame}
            />,                    
            <div className="l-container-wrapper">
                <div
                    key="container"
                    ref="container"
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