import styled from "styled-components";
import {Second, Main} from "./st-theame";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    user-select: none;
    width: 40vh;
    height: 40vh;
    background-color: Second;
    border: 1px solid Main;
    box-shadow: 2px 2px 10px Main;
`;

export default Container;
