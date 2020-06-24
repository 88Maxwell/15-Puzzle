import React, { useReducer, useMemo } from "react";
import getSolvableShuffledBoard from "../../utils/getSolvableShuffledBoard";
import getDefaultBoard from "../../utils/getDefaultBoard";

export type BoardActionType = "BREAK_GAME" | "SET_STATE" | "INIT_GAME";
export type BoardActionTypeConstants = { [key: string]: BoardActionType };
export type BoardAction = {
    type: BoardActionType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any; // TODO remove any
};

export type BoardProviderProps = {
    children: React.ReactNode;
};

export type BoardCell = {
    number: number;
    x: number;
    y: number;
    isMain: boolean;
    isRight: boolean;
};

export type BoardContextValue = {
    state: BoardReducerState;
    dispatch: React.Dispatch<BoardAction>;
};

export type BoardReducerState = {
    enabled: boolean;
    board: BoardCell[][];
};

export type BoardInitialState = {
    enabled: boolean;
    board: BoardCell[][];
};

export const boardActionTypeConstants: BoardActionTypeConstants = {
    BREAK_GAME : "BREAK_GAME",
    SET_STATE  : "SET_STATE",
    INIT_GAME  : "INIT_GAME"
};

export const initialState = {
    enabled : false,
    board   : getDefaultBoard()
};

export const BoardContext = React.createContext<{
    state: BoardInitialState;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch: React.Dispatch<any>; // TODO remove any
}>({
    state    : initialState,
    dispatch : () => null
});

function boardReducer(state: BoardReducerState, action: BoardAction) {
    const { enabled, board } = action.payload || {};

    switch (action.type) {
        case boardActionTypeConstants.INIT_GAME:
            return {
                enabled : true,
                board   : getSolvableShuffledBoard(getDefaultBoard())
            };
        case boardActionTypeConstants.BREAK_GAME:
            return {
                enabled : false,
                board   : getDefaultBoard()
            };
        case boardActionTypeConstants.SET_STATE:
            return { enabled, board };
        default:
            throw new Error();
    }
}

function BoardProvider({ children }: BoardProviderProps) {
    const [ state, dispatch ] = useReducer(boardReducer, initialState);
    const contextValue = useMemo(() => ({ state, dispatch }), [ state, dispatch ]);

    return <BoardContext.Provider value={contextValue}>{children}</BoardContext.Provider>;
}

export default BoardProvider;
