export default function getDefaultBoard() {
    const board = Array.from(Array(4), (val, y) => Array.from(Array(4), (item, x) => ({
        y,
        x,
        isRight : true
    })));

    board[3][3].main = true;

    return board;
}
