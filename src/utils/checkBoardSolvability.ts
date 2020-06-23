import { BoardCell } from "../components/Board";

const getIndexOfMain = (board: BoardCell[][]) =>
    board.reduce((acc, row) => [...acc, ...row], []).findIndex((el) => el.isMain); // TODO move to board.flat(1).findIndex(...)

const fromMatrixToComputedArr = (board: BoardCell[][]) =>
    board.reduce((acc: number[], row) => {
        const computedRow = row.map((el) => el.x + el.y * board.length + 1);

        return [...acc, ...computedRow];
    }, []);

const getInversionCount = (arr: number[], N: number) =>
    arr.reduce((acc, arrEl, index) => {
        if (arrEl !== N ** 2) {
            const slicedArr = arr.slice(index + 1);

            return (
                acc +
                slicedArr.reduce(
                    (accumulator, elem) => (arrEl < elem && arrEl !== 16 ? accumulator : accumulator + 1),
                    0,
                )
            );
        }

        return acc;
    }, 0);

const isEven = (number: number) => Math.floor(number / 2) === number / 2;
const isOdd = (number: number) => !isEven(number);

export default function checkBoardSolvability(board: BoardCell[][]) {
    const N = board.length;
    const indexOfMain = getIndexOfMain(board);
    const computedArr = fromMatrixToComputedArr(board);

    const posOfMainFromBottomAtMatrix = N - Math.floor(indexOfMain / N);
    const inversion = getInversionCount(computedArr, N);

    const conditionOne = isOdd(N) && isEven(inversion);
    const conditionTwo = isEven(N);
    const conditionTwoSubOne = isOdd(posOfMainFromBottomAtMatrix) && isEven(inversion);
    const conditionTwoSubTwo = isEven(posOfMainFromBottomAtMatrix) && isOdd(inversion);

    return conditionOne || (conditionTwo && (conditionTwoSubOne || conditionTwoSubTwo));
}

// const st = [
//     [ { x: 0, y: 3 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 0 } ],
//     [ { x: 0, y: 0 }, { x: 3, y: 2 }, { x: 3, y: 1 }, { x: 3, y: 0 } ],
//     [ { x: 0, y: 1 }, { x: 3, y: 3, main: true }, { x: 0, y: 2 }, { x: 1, y: 1 } ],
//     [ { x: 2, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 2 }, { x: 2, y: 1 } ]
// ];

// const stSec = [
//     [ { x: 1, y: 1 }, { x: 0, y: 3 }, { x: 2, y: 1 }, { x: 1, y: 2 } ],
//     [ { x: 3, y: 1 }, { x: 0, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 3, main: true } ],
//     [ { x: 2, y: 3 }, { x: 1, y: 0 }, { x: 3, y: 2 }, { x: 0, y: 1 } ],
//     [ { x: 1, y: 3 }, { x: 2, y: 0 }, { x: 0, y: 0 }, { x: 3, y: 0 } ]
// ];

// const stThird = [
//     [ { x: 2, y: 0 }, { x: 0, y: 2 }, { x: 0, y: 0 }, { x: 2, y: 3 } ],
//     [ { x: 1, y: 3 }, { x: 2, y: 2 }, { x: 3, y: 0 }, { x: 1, y: 1 } ],
//     [ { x: 0, y: 3 }, { x: 3, y: 3, main: true }, { x: 1, y: 2 }, { x: 3, y: 2 } ],
//     [ { x: 1, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 0, y: 1 } ]
// ];
