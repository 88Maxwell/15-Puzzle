/* eslint-disable import/no-cycle */
import React from "react";
import Tile from "./styles";

export type TileStatus = "default" | "main" | "right";

type TileComponent = {
    children: React.ReactNode;
    status: TileStatus;
};

function TileComponent({ children, status }: TileComponent) {
    return <Tile status={status}>{children}</Tile>;
}

export default TileComponent;
