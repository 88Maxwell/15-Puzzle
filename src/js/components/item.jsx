import React from 'react';

export default class Item extends React.Component {
    render(){
        if (this.props.square) {
            return (
                <div className="item-wrapper" key={this.props.number}>
                    <div className="item l-square" key={this.props.key}></div>
                </div>
            );
        } else {
            return (
                <div className="item-wrapper" key={this.props.number}>
                    <div className="item" key={this.props.key}>{this.props.children}</div>
                </div>
            );   
        }
    }
}