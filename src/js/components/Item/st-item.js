import styled from "styled-components";
import {Right, Item, Second} from "../st-theame";

function setBgColor(props) {
    switch (props.state) {
        case "default":
            return Item;
        case "main":
            return Second;
        case "right":
            return Right;
    }
}

const Tile = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 25%;
    height: 25%;
    border: 2.5px solid white;
    font-size: 1rem;
    background-color: ${props => setBgColor(props)};
`;

export default Tile;