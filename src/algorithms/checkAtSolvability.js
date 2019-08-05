/* eslint-disable no-param-reassign */

export default matrix => {
    const N = matrix.length;
    const indexOfMain = getIndexOfMain(matrix);
    const computedArr = fromMatrixToComputedArr(matrix);

    const posOfMainFromBottomAtMatrix = N - Math.floor(indexOfMain / N);
    const inversion = getInversionCount(computedArr, indexOfMain);

    const conditionOne = isOdd(N) && isEven(inversion);
    const conditionTwo = isEven(N);
    const conditionTwoSubOne = isOdd(posOfMainFromBottomAtMatrix) && isEven(inversion);
    const conditionTwoSubTwo = isEven(posOfMainFromBottomAtMatrix) && isOdd(inversion);

    console.log("conditionTwoSubOne: ", conditionTwoSubOne);
    console.log("conditionTwoSubTwo: ", conditionTwoSubTwo);

    return conditionOne || (conditionTwo && (conditionTwoSubOne || conditionTwoSubTwo));
};

const getIndexOfMain = matrix => matrix.reduce((acc, row) => [ ...acc, ...row ], []).findIndex(el => el.main);

const fromMatrixToComputedArr = matrix =>
    matrix.reduce((acc, row) => [ ...acc, ...row.map((el, index) => el.x + el.y * index + 1) ], []);

const getInversionCount = (arr, indexOfMain) => {
    return arr.reduce(
        (acc, el, index) =>
            acc + arr.slice(index).reduce((accum, elem) => (el > elem && index !== indexOfMain ? accum : ++accum)),
        0
    );
};

const isEven = number => Math.floor(number / 2) === number / 2;
const isOdd = number => !isEven(number);
