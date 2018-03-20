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
    }

    // ---------------------------------------
    // ------------WORK WITH STATES
    // ---------------------------------------

    stateSetter(enabled, gameStateCallback){
        this.setState({
            enabled: enabled,
            wrongItems: gameStateCallback().wrongItems || this.state.wrondItem,
            gameState: gameStateCallback().gameState || this.state.gameState
        });
    }

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
            wrondItem: getwrongItems(gs)
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
    
    getwrongItems(gs){
        return gs.forEach((val, index) => {
            if (val.x*4 + val.y + 1 == index){
                return index;
            }
        });
    }

    // ---------------------------------------
    // ---------RENDERING AND HIM TOOLS
    // ---------------------------------------


    renderItems(){
        return this.state.gameState.map((val, index) => {
            let right = !this.state.wrongItems.includes(index);
            let main = val.main;

            //-------- RIGHT MAIN BLOCK------
            if (right && main) {
                return <Item key={index.toString()} main={main} right="right" />;


            //---------------- RIGHT ITEM BLOCK------
            } else if (right && !main) {
                return <Item key={index.toString()} main={main} right="right" >{index + 1}</Item>

            //-------- NOT RIGHT MAIN BLOCK------
            } else if (!right && main) {
                return <Item key={index.toString()} />;
            
            
            //---------------- NOT RIGHT ITEM BLOCK------
            } else if (!right && !main) {
                return <Item key={index.toString()}>{index + 1}</Item>
            }
        });
    }
 
    render(){
        return [
            <h1 className="l-title">15-puzzle</h1>,
            <Navigation
                initGame={this.initGame}
                shufleGame={this.shufleGame}
                startGame={this.startGame}
                breakGame={this.breakGame}
                stateSetter={this.stateSetter} />,
            <div className="l-container-wrapper">
                <div className="l-container">
                    {this.renderItems()}                        
                </div>            
            </div>
        ];
    }
}