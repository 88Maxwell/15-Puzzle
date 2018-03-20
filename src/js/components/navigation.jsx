import React from 'react';

export default class Navigation extends React.Component {

    startGame(){
        this.props.stateSetter(true, this.props.shufleGame).bind(this);
    }

    breakGame(){
        this.props.stateSetter(false, this.props.initGame);
    }

    winGame(){
        alert("Victory");
        this.stateSetter(false);
    }

    render(){
        return (
            <nav className="l-nav">
                <li key="start"><a onClick={this.startGame}>startGame</a></li>
                <li key="break"><a onClick={this.breakGame}>breakGame</a></li>
            </nav>
        );
    }
}
