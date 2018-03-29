import React from 'react';

export default class Item extends React.Component {
    render(){
        let main = "",
            number = "",
            right = this.props.isRight  ? "right" : "";

        this.props.isMain ? main = "l-main-item" : number = this.props.number;

        return (
            <div
                className={`item ${right} ${main}`}
            >
                {number}
            </div>
        );
    }
}