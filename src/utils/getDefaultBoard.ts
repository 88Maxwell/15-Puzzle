export default function getDefaultBoard() {
    const board = Array.from(Array(4), (val, y) =>
        Array.from(Array(4), (item, x) => ({
            number: x + y * 4 + 1,
            y,
            x,
            isRight: true,
            isMain: false,
        })),
    );

    board[3][3].isMain = true;

    return board;
}
