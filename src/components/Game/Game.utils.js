import shufleFisherYates from "../../utils/shufleFisherYates";
import isSolvable from "../../utils/checkBoardSolvability";

export const genereteDefaultGameState = () => {
    const gameState = Array.from(Array(4), (val, y) => Array.from(Array(4), (item, x) => ({ y, x })));

    gameState[3][3].main = true;

    return gameState;
};

export const getWrongItems = (gameState) => {
    const wrongs = [];

    if (gameState !== undefined) {
        // eslint-disable-next-line max-len
        gameState.forEach((val, y) => val.forEach((item, x) => (!(item.x === x && item.y === y) ? wrongs.push(item) : null)));

        return wrongs;
    }

    return null; // set last version of wrongsItems, because (null || [last wrongs cofig])  => [last wrongs cofig]
};

export const generateRandomSolvableGameState = () => {
    let matrix = shufleFisherYates(genereteDefaultGameState());

    let isSolved = isSolvable(matrix);

    while (!isSolved) {
        matrix = shufleFisherYates(matrix);
        isSolved = isSolvable(matrix);
    }

    return matrix;
};
