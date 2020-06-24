import mapBoard from "./mapBoard";
import type { BoardCell } from "../components/Board";

export default function getBoardWithStatus(board: BoardCell[][]) {
    return mapBoard(board, (item, y, x) => ({
        ...item,
        isRight : item.x === x && item.y === y
    }));
}
