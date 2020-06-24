import type { BoardCell } from "../components/Board";

export default function shufleBoardFisherYates(board: BoardCell[][]) {
    // eslint-disable-next-line no-plusplus
    for (let i = board.length - 1; i > 0; i--) {
        // eslint-disable-next-line no-plusplus
        for (let j = board.length - 1; j > 0; j--) {
            const m = Math.floor(Math.random() * i);
            const n = Math.floor(Math.random() * j);
            const temp = board[i][j];

            /* eslint-disable */
            board[i][j] = board[m][n];
            board[m][n] = temp;
            /* eslint-enable */
        }
    }

    return board;
}
