import React from "react";
import Tile from "./st-item";

export default class Item extends React.Component {
    render() {
        return <Tile state={this.props.state} >{this.props.number}</Tile>;
    }
}
