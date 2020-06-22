import {
    generateRandomSolvableGameState,
    genereteDefaultGameState,
    getWrongItems
} from "./Game.utils";

export const gameInitialState = {
    enabled    : false,
    wrongItems : [],
    gameState  : genereteDefaultGameState()
};

export const gameActionTypes = {
    BREAK_GAME : "BREAK_GAME",
    SET_STATE  : "SET_STATE",
    INIT_GAME  : "INIT_GAME"
};

export function gameReducer(state, action) {
    const { enabled, wrongItems, gameState } = action.payload || {};

    switch (action.type) {
        case gameActionTypes.INIT_GAME:
            // eslint-disable-next-line no-case-declarations
            const gs = generateRandomSolvableGameState();

            return {
                enabled    : true,
                wrongItems : getWrongItems(gs),
                gameState  : gs
            };
        case gameActionTypes.BREAK_GAME:
            return {
                enabled    : false,
                wrongItems : this.genereteDefaultGameState(),
                gameState  : []
            };
        case gameActionTypes.SET_STATE:
            return { enabled, wrongItems, gameState };
        default:
            throw new Error();
    }
}
