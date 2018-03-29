import React from 'react';

export default class Navigation extends React.Component {
    render(){
        return (
            <nav className="l-nav">
                <div className="btn" onClick={this.props.startGame}>#shuffleGame</div>
                <div className="btn" onClick={this.props.breakGame}>#breakGame</div>
            </nav>
        );
    }
}
