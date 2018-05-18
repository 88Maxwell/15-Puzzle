import React from 'react';
import Nav from "./st-navigation";

export default class Navigation extends React.Component {
    render(){
        return (
            <Nav>
                <Nav.Btn onClick={this.props.startGame}>#shuffleGame</Nav.Btn>
                <Nav.Btn onClick={this.props.breakGame}>#breakGame</Nav.Btn>
            </Nav>
        );
    }
}
