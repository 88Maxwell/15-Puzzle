import React from 'react';

class Buttons extends React.Component {
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

export default Buttons;