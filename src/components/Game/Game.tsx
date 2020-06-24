import React, { useContext, useRef } from "react";

import Swipe from "../Swipe";
import mapArrowKey from "../../utils/mapArrowKey";
import Tile from "../Tile";
import { Container, Btn, Nav } from "./styles";
import { BoardContext, BoardCell, boardActionTypeConstants } from "../Board";
import mapBoard from "../../utils/mapBoard";
import getBoardWithStatus from "../../utils/getBoardWithStatus";
import { TileStatus } from "../Tile/Tile";
import {} from "styled-components";

type Offset = 1 | 0 | -1;

function Game() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const containerRef: React.RefObject<any> = useRef(null); // TODO  remove any
    const { state, dispatch } = useContext(BoardContext);

    const handleStartGame = () => {
        if (containerRef?.current) containerRef.current.focus();

        dispatch({ type: boardActionTypeConstants.INIT_GAME });
    };

    const handleBreakGame = () => dispatch({ type: boardActionTypeConstants.BREAK_GAME });

    const swapArrayElem = (
        board: BoardCell[][],
        mainCell: Pick<BoardCell, "x" | "y">,
        targetCell: Pick<BoardCell, "x" | "y">
    ) => {
        const newBoard = mapBoard(board, (item) => ({ ...item }));

        [ newBoard[mainCell.y][mainCell.x], newBoard[targetCell.y][targetCell.x] ] = [
            { ...newBoard[targetCell.y][targetCell.x] },
            newBoard[mainCell.y][mainCell.x]
        ];

        return newBoard;
    };

    const swapHandler = (offsetX: Offset, offsetY: Offset) => {
        let main;

        // eslint-disable-next-line
        for (let y = 0; y < state.board.length; y++) {
            // eslint-disable-next-line
            for (let x = 0; x < state.board[y].length; x++) {
                if (state.board[y][x].isMain) {
                    main = { y, x };
                    break;
                }
            }
        }

        if (!main) throw new Error("findMain error");

        const item: Pick<BoardCell, "x" | "y"> = {
            x : main.x + offsetX,
            y : main.y + offsetY
        };

        if (item.y < 4 && item.y > -1 && item.x < 4 && item.x > -1) {
            return swapArrayElem(state.board, main, item);
        }

        return state.board;
    };

    const swapItems = (key: number): BoardCell[][] => mapArrowKey(key, {
        top    : () => swapHandler(0, -1),
        bottom : () => swapHandler(0, 1),
        right  : () => swapHandler(1, 0),
        left   : () => swapHandler(-1, 0)
    });

    const handleChangeGameState = (ev: Pick<React.KeyboardEvent, "keyCode">): void => {
        if (state.enabled && ev.keyCode <= 40 && ev.keyCode >= 37) {
            const board = getBoardWithStatus(swapItems(ev.keyCode));
            const isWin = board.flat(1).every((el) => el.isRight);

            dispatch({
                type    : boardActionTypeConstants.SET_STATE,
                payload : { enabled: !isWin, board }
            });

            // eslint-disable-next-line no-alert
            if (isWin) alert("YOU ARE WIN A GAME!!!");
        }
    };

    const generateItems = () => state.board.map((val: BoardCell[]) => val.map((item: BoardCell) => {
        const number = item.x + item.y * 4 + 1;

        let tileStatus: TileStatus = "default";

        if (item.isMain) tileStatus = "main";
        else if (item.isRight) tileStatus = "right";

        return (
            <Tile key={number} status={tileStatus}>
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
