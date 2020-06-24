import type { BoardCell } from "../components/Board";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => any; // TODO remove any

export default (board: BoardCell[][], callback: Callback) => board
    .map((val, y) => val.map((item, x) => callback(item, y, x)));
