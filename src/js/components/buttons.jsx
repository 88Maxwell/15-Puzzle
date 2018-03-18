import React from 'react';

export default class Buttons extends React.Component {

    refresh(){
        alert("refresh That");
    }

    render(){
        let refreshButton = "#refresh";
        let otherButton = "#otherButton";
        return (
            <nav className="l-nav">
                <li><a onClick={this.refresh}>{refreshButton}</a></li>
                <li><a onClick={this.other}>{otherButton}</a></li>
            </nav>
        );
    }
}
