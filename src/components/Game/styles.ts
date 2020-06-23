import styled from "styled-components";
import { colors } from "../../utils/theame";

const { Second, Main, Button, ButtonHover } = colors;

export const Nav = styled.nav`
    display: flex;
`;

export const Btn = styled.button`
    box-sizing: border-box;
    border: none;
    padding: 10px;
    margin: 15px;
    background-color: ${Button};
    color: ${Second};
    cursor: pointer;

    &:hover {
        background-color: ${ButtonHover};
    }
`;

type HasTabIndexStyledSystemProps = {
    tabIndex?: any; // FIXME
};

export const Container = styled.div<HasTabIndexStyledSystemProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    user-select: none;
    width: 40vh;
    height: 40vh;
    background-color: ${Second};
    border: 1px solid ${Main};
    box-shadow: 2px 2px 10px ${Main};
`;
