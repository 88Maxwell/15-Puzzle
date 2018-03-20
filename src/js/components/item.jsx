import React from 'react';

export default class Item extends React.Component {
    render(){
        if (this.props.main) {
            return (
                <div key={this.key} className={"item-wrapper " + this.props.right}>
                    <div key={"item" + this.key} className="item l-square"></div>
                </div>
            );
        }else {
            return (
                <div key={this.key} className={"item-wrapper " + this.props.right}>
                    <div key={"item" + this.key} className="item">{this.props.children}</div>
                </div>
            );   
        }
    }
}