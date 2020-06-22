import React, { useReducer, useRef } from "react";

import Swipe from "../Swipe";
import mapArrowKey from "../../utils/mapArrowKey";
import Tile from "../Tile";
import { Container, Btn, Nav } from "./styles";
import { gameActionTypes, gameInitialState, gameReducer } from "./Game.reducer";
import { getWrongItems } from "./Game.utils";

function Game() {
    const [ state, dispatch ] = useReducer(gameReducer, gameInitialState);
    const containerRef = useRef();

    const handleStartGame = () => {
        if (containerRef.current) containerRef.current.focus();

        dispatch({ type: gameActionTypes.INIT_GAME });
    };

    const handleBreakGame = () => dispatch({ type: gameActionTypes.BREAK_GAME });

    const swapArrayElem = (arr, a, b) => {
        const newArr = JSON.parse(JSON.stringify(arr));
        const c = newArr[a.y][a.x];

        /* eslint-disable */
        newArr[a.y][a.x] = { ...newArr[b.y][b.x] };
        newArr[b.y][b.x] = { ...c };
        /* eslint-enable */

        return newArr;
    };

    const swapHandler = (a, b) => {
        let main;

        // eslint-disable-next-line
        for (let y = 0; y < state.gameState.length; y++) {
            // eslint-disable-next-line
            for (let x = 0; x < state.gameState[y].length; x++) {
                if (state.gameState[y][x].main) {
                    main = { y, x };
                    break;
                }
            }
        }

        if (!main) throw new Error("findMain error");

        const item = {
            x : main.x + a,
            y : main.y + b
        };

        if (item.y < 4 && item.y > -1 && item.x < 4 && item.x > -1) {
            return swapArrayElem(state.gameState, main, item);
        }

        return undefined;
    };

    const swapItems = (key) => mapArrowKey(key, {
        top    : () => swapHandler(0, -1),
        bottom : () => swapHandler(0, 1),
        right  : () => swapHandler(1, 0),
        left   : () => swapHandler(-1, 0)
    });

    const handleChangeGameState = (ev) => {
        if (state.enabled && ev.keyCode <= 40 && ev.keyCode >= 37) {
            const gs = swapItems(ev.keyCode);
            const wrongs = getWrongItems(gs);

            let enabled = true;

            if (wrongs !== null && wrongs.length === 0) {
                // eslint-disable-next-line
                alert("YOU ARE WIN A GAME!!!");
                enabled = false;
            }

            dispatch({
                type    : gameActionTypes.SET_STATE,
                payload : {
                    enabled,
                    wrongItems : wrongs || state.wrongItems,
                    gameState  : gs || state.gameState
                }
            });
        }
    };

    const generateItems = () => state.gameState.map((val) => val.map((item) => {
        const number = item.x + item.y * 4 + 1;
        const right = !state.wrongItems.find((el) => item.x === el.x && item.y === el.y);

        let tileState = "default";

        if (item.main) tileState = "main";
        else if (right) tileState = "right";

        return (
            <Tile key={number} state={tileState}>
                {number}
            </Tile>
        );
    }));

    return (
        <>
            <h1>15-puzzle</h1>
            <Nav>
                <Btn onClick={handleStartGame}>#shuffleGame</Btn>
                <Btn onClick={handleBreakGame}>#breakGame</Btn>
            </Nav>
            <div>
                <Swipe onChangeGameState={handleChangeGameState}>
                    <Container ref={containerRef} onKeyDown={handleChangeGameState} tabIndex="0">
                        {generateItems()}
                    </Container>
                </Swipe>
            </div>
        </>
    );
}

export default Game;
