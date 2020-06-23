import mapBoard from "./mapBoard";

export default function getBoardWithStatus(board) {
    return mapBoard(board, (item, y, x) => ({
        ...item,
        isRight : item.x === x && item.y === y
    }));
}
