const getIndexOfMain = (matrix) => matrix.reduce((acc, row) => [ ...acc, ...row ], []).findIndex((el) => el.main);

const fromMatrixToComputedArr = (matrix) => matrix.reduce((acc, row) => {
    const computedRow = row.map((el) => el.x + el.y * matrix.length + 1);

    return [ ...acc, ...computedRow ];
}, []);

const getInversionCount = (arr, N) => arr.reduce((acc, arrEl, index) => {
    if (arrEl !== N ** 2) {
        const slicedArr = arr.slice(index + 1);

        return (
            acc
                + slicedArr.reduce(
                    (accumulator, elem) => (arrEl < elem && arrEl !== 16 ? accumulator : accumulator + 1),
                    0
                )
        );
    }

    return acc;
}, 0);

const isEven = (number) => Math.floor(number / 2) === number / 2;
const isOdd = (number) => !isEven(number);

export default function checkBoardSolvability(board) {
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
