import React from 'react';

export default class Item extends React.Component {
    render(){
        return (
            <div
                // key={"item-" + this.props.id}
                className="item-wrapper"
            >
                <div 
                    className={"item " + this.props.right + this.props.main}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}