import React from 'react';

export default class Navigation extends React.Component {
    render(){
        return (
            <nav className="l-nav">
                <li className="btn" key="start"><a onClick={this.props.startGame}>startGame</a></li>
                <li className="btn" key="break"><a onClick={this.props.breakGame}>breakGame</a></li>
            </nav>
        );
    }
}
