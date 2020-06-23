import { BoardCell } from "../components/Board";

type ArrowsFunction = {
    right: () => BoardCell[][];
    left: () => BoardCell[][];
    top: () => BoardCell[][];
    bottom: () => BoardCell[][];
};

export default (key: number, { right, left, top, bottom }: ArrowsFunction) => {
    switch (key) {
        // ---- LEFT -------
        case 37:
            return left();

        // ---- TOP --------
        case 38:
            return top();

        // ---- RIGHT ------
        case 39:
            return right();

        // ---- DOWN -------
        case 40:
            return bottom();
            
        default:
            break;
    }

    throw new Error("mapArrowKey errer");
};
