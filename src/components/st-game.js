import styled from 'styled-components';
import { Second, Main,  Button, ButtonHover, Right, Item } from './st-theame';

export const Nav = styled.nav`
    display: flex;
`;

export const Btn = styled.div`
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

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 40vh;
    height: 40vh;
    background-color: ${Second};
    border: 1px solid ${Main};
    box-shadow: 2px 2px 10px ${Main};
`;

function setBgColor(props) {
    switch (props.state) {
        case 'default':
            return Item;
        case 'main':
            return Second;
        case 'right':
            return Right;
        default:
            break;
    }
}

export const Tile = styled.div`
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
