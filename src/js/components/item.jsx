import React from 'react';

export default class Item extends React.Component {
    render(){
        let main = this.props.isMain  ? "l-main-item" : "";
        let right = this.props.isRight  ? "right" : "" ;
        return (
            <div
                className={`item ${right} ${main}`}
            >
                {this.props.children}
            </div>
        );
    }
}