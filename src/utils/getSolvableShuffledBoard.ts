import checkBoardSolvability from "./checkBoardSolvability";
import shufleBoardFisherYates from "./shufleBoardFisherYates";
import getBoardWithStatus from "./getBoardWithStatus";
import type { BoardCell } from "../components/Board";

export default function getSolvableShuffledBoard(targetBoard: BoardCell[][]) {
    let board = shufleBoardFisherYates(targetBoard);

    let isSolved = checkBoardSolvability(board);

    while (!isSolved) {
        board = shufleBoardFisherYates(board);
        isSolved = checkBoardSolvability(board);
    }

    return getBoardWithStatus(board);
}
