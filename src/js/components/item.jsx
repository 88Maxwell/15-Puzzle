import React from 'react';

export default class Item extends React.Component {
    render(){
        if (this.props.main) {
            return (
                <div key={this.key} className="item-wrapper" >
                    <div 
                        key={"item-" + this.key}
                        className={"item l-main-item " + this.props.right}
                    >
                    </div>
                </div>
            );
        }else {
            return (
                <div key={this.key} className="item-wrapper ">
                    <div 
                        key={"item-" + this.key} 
                        className={"item " + this.props.right}
                    >
                            {this.props.children}
                    </div>
                </div>
            );   
        }
    }
}