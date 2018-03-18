import React from 'react';
import Buttons from './buttons';
import Item from './item';

export default class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameState: this.createGame(4)
        };
    }

    createGame(countInRow){
        let coords = Array.from(new Array(countInRow * countInRow), (val,index) => {
            return {
                x: index % countInRow,
                y: Math.floor(index / countInRow),
                state: false
            };
        });
        coords[15].state = true;
        return { 
            countInRow: countInRow,
            coords: coords
        };
    }

    renderItems(){
        return this.state.gameState.coords.map((val, i) => {
            let key = val.x + val.y * this.state.gameState.countInRow;
            return (
                <Item key={key} square={val.state}>{i+1}</Item>
            );    
        });
    }

    render(){
        return [
            <h1 className="l-title">15-puzzle</h1>,
            <Buttons />,
            <div className="l-container-wrapper">
                <div className="l-container">
                    {this.renderItems()}                        
                </div>            
            </div>
        ];
    }
}