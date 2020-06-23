import { BoardCell } from "../components/Board";

type Callback = (...args: any[]) => any;

export default (board: BoardCell[][], callback: Callback) =>
    board.map((val, y) => val.map((item, x) => callback(item, y, x)));
