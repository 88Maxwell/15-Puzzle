import styled from "styled-components";
import { colors } from "../../utils/theame";

const { Second, Right, Item } = colors;

function setBgColor({ state }) {
    switch (state) {
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
    transition-timing-function: ease;
    transition-delay: 1s;
    transition-property: all;
    width: 25%;
    height: 25%;
    border: 2.5px solid white;
    font-size: 1rem;
    background-color: ${setBgColor};
`;
