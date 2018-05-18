import styled from "styled-components";
import {Second, Button, ButtonHover} from "../st-theame";

const Nav = styled.nav`
    display: flex;
`;

const Btn = styled.div`
    box-sizing: border-box;
    border: none;
    padding: 10px;
    margin: 30px;
    background-color: ${Button};
    color: ${Second};
    cursor: pointer;

    &:hover {
        background-color: ${ButtonHover};
    }
`;

Nav.Btn = Btn;

export default Nav;
