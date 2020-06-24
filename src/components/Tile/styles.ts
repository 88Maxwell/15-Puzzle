import styled from "styled-components";
import { colors } from "../../utils/theame";
import type { TileStatus } from "./Tile";

const { Second, Right, Item } = colors;

type StyledTileProps = {
    status: TileStatus;
};

function setBgColor(status: TileStatus) {
    switch (status) {
        case "default":
            return Item;
        case "main":
            return Second;
        case "right":
            return Right;
        default:
            break;
    }

    throw new Error("setBgColor Error");
}

export default styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 25%;
    height: 25%;
    border: 2.5px solid white;
    font-size: 1rem;
    background-color: ${({ status }: StyledTileProps) => setBgColor(status)};
`;
