import shufleFisherYates from "../../utils/shufleFisherYates";
import isSolvable from "../../utils/checkBoardSolvability";

export const mapBoard = (gameState, callback) => gameState.map((val, y) => val.map((item, x) => callback(item, y, x)));

export const mixStatusToBoard = (gameState) => mapBoard(gameState, (item, y, x) => ({
    ...item,
    isRight : item.x === x && item.y === y
}));

export const genereteDefaultBoard = (xDimension = 4, yDimension = 4) => {
    const board = Array.from(Array(xDimension), (val, y) => Array.from(Array(yDimension), (item, x) => ({
        y,
        x,
        isRight : true
    })));

    board[3][3].main = true;

    return board;
};

export const shuffleBoard = (targetBoard) => {
    let board = shufleFisherYates(targetBoard);

    let isSolved = isSolvable(board);

    while (!isSolved) {
        board = shufleFisherYates(board);
        isSolved = isSolvable(board);
    }

    return mixStatusToBoard(board);
};
