import React from "react";
import PropTypes from "prop-types";
import Tile from "./styles";

function TileComponent({ children, state }) {
    return <Tile state={state}>{children}</Tile>;
}

TileComponent.propTypes = {
    state    : PropTypes.oneOf([ "default", "main", "right" ]).isRequired,
    children : PropTypes.node.isRequired
};

export default TileComponent;
