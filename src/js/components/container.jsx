import React from 'react';
import Navigation from './navigation';
import Item from './item';
import ErrorBoundary from './errorBoundary';


export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enabled: false,
            wrongItems: this.initGame().wrongItems,
            gameState: this.initGame().gameState
        };

        this.startGame = this.startGame.bind(this);
        this.breakGame = this.breakGame.bind(this);
        this.winGame = this.winGame.bind(this);

        this.shufleGame = this.shufleGame.bind(this);
        this.initGame = this.initGame.bind(this);
    }

    // ---------------------------------------
    // ------------WORK WITH STATES
    // ---------------------------------------

    stateSetter(enabled, gameStateCallback){
        let gsc = gameStateCallback();
        this.setState({
            enabled: enabled,
            wrongItems: gsc.wrongItems || this.state.wrongItem,
            gameState: gsc.gameState || this.state.gameState
        });
    }

    startGame(){
        this.stateSetter(true, this.shufleGame);
    }

    breakGame(){
        this.stateSetter(false, this.initGame);
    }

    winGame(){
        alert("Victory");
        this.stateSetter(false);
    }

    // ---------------------------------------
    // ------------STATES HANDLERS
    // ---------------------------------------

    
    initGame(){
        return {
            gameState: this.defaultGameState(),
            wrongItems: []
        };
        
    }

    shufleGame(){
        let gs = this.state.gameState.sort(() => 0.5 - Math.random());
        return {
            gameState: gs,
            wrongItems: this.getWrongItems(gs)
        };
    }

    

    // ---------------------------------------
    // ----------------SOME TOOLS
    // ---------------------------------------

    defaultGameState(){
        let gameState = Array.from(new Array(15), (val,index) => {
            return {
                    x: index % 4,
                    y: Math.floor(index / 4),
                    main: null
                }
            });
        gameState.push({x: 3, y: 3, main: true});
        return gameState;
    }
    
    getWrongItems(gameState){
        let wrongs = []
        gameState.forEach((val, index) => {
            if (val.x + val.y * 4 + 1 != index+1){
                wrongs.push(index);
            }
        });
        return wrongs;
    }

    // ---------------------------------------
    // ---------RENDERING AND HIM TOOLS
    // ---------------------------------------


    renderItems(){
        return this.state.gameState.map((val, index) => {
            let right = !this.state.wrongItems.includes(index);
            let main = val.main;
            let number;
            
            number = !main ? val.x + val.y * 4 + 1 : "";
            right = right ? "right" : "";
            
            return (
                <Item 
                    key={index.toString()}
                    main={main} 
                    right={right} 
                >
                    {number}
                </Item>
                );
        });
    }
 
    render(){
        return [
            <h1 className="l-title">15-puzzle</h1>,
            <Navigation
                startGame={this.startGame}
                breakGame={this.breakGame}
                winGame={this.winGame}
            />,
            <div className="l-container-wrapper">
                <div className="l-container">
                    {this.renderItems()}                        
                </div>            
            </div>
        ];
    }
}