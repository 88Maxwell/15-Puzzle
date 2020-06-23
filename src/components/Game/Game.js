import React, { useContext, useRef } from "react";

import Swipe from "../Swipe";
import mapArrowKey from "../../utils/mapArrowKey";
import Tile from "../Tile";
import { Container, Btn, Nav } from "./styles";
import { BoardContext } from "../Board";
import mapBoard from "../../utils/mapBoard";
import getBoardWithStatus from "../../utils/getBoardWithStatus";

function Game() {
    const containerRef = useRef();
    const { state, dispatch, actionTypes: boardActionTypes } = useContext(BoardContext);

    const handleStartGame = () => {
        if (containerRef.current) containerRef.current.focus();

        dispatch({ type: boardActionTypes.INIT_GAME });
    };

    const handleBreakGame = () => dispatch({ type: boardActionTypes.BREAK_GAME });

    const swapArrayElem = (arr, a, b) => {
        const newBoard = mapBoard(state.board, (item) => ({ ...item }));

        [ newBoard[a.y][a.x], newBoard[b.y][b.x] ] = [ { ...newBoard[b.y][b.x] }, newBoard[a.y][a.x] ];

        return newBoard;
    };

    const swapHandler = (offsetX, offsetY) => {
        let main;

        // eslint-disable-next-line
        for (let y = 0; y < state.board.length; y++) {
            // eslint-disable-next-line
            for (let x = 0; x < state.board[y].length; x++) {
                if (state.board[y][x].main) {
                    main = { y, x };
                    break;
                }
            }
        }

        if (!main) throw new Error("findMain error");

        const item = {
            x : main.x + offsetX,
            y : main.y + offsetY
        };

        if (item.y < 4 && item.y > -1 && item.x < 4 && item.x > -1) {
            return swapArrayElem(state.board, main, item);
        }

        return state.board;
    };

    const swapItems = (key) => mapArrowKey(key, {
        top    : () => swapHandler(0, -1),
        bottom : () => swapHandler(0, 1),
        right  : () => swapHandler(1, 0),
        left   : () => swapHandler(-1, 0)
    });

    const handleChangeGameState = (ev) => {
        if (state.enabled && ev.keyCode <= 40 && ev.keyCode >= 37) {
            const board = getBoardWithStatus(swapItems(ev.keyCode));
            const isWin = board.flat(1).every((el) => el.isRight);

            dispatch({
                type    : boardActionTypes.SET_STATE,
                payload : { enabled: !isWin, board }
            });

            // eslint-disable-next-line no-alert
            if (isWin) alert("YOU ARE WIN A GAME!!!");
        }
    };

    const generateItems = () => state.board.map((val) => val.map((item) => {
        const number = item.x + item.y * 4 + 1;

        let tileState = "default";

        if (item.main) tileState = "main";
        else if (item.isRight) tileState = "right";

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
