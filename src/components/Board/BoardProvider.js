import React, { useReducer, useMemo } from "react";
import PropTypes from "prop-types";
import BoardContext from "./BoardContext";
import getSolvableShuffledBoard from "../../utils/getSolvableShuffledBoard";
import getDefaultBoard from "../../utils/getDefaultBoard";

const boardActionTypes = {
    BREAK_GAME : "BREAK_GAME",
    SET_STATE  : "SET_STATE",
    INIT_GAME  : "INIT_GAME"
};

function boardReducer(state, action) {
    const { enabled, board } = action.payload || {};

    switch (action.type) {
        case boardActionTypes.INIT_GAME:
            return {
                enabled : true,
                board   : getSolvableShuffledBoard(getDefaultBoard())
            };
        case boardActionTypes.BREAK_GAME:
            return {
                enabled : false,
                board   : getDefaultBoard()
            };
        case boardActionTypes.SET_STATE:
            return { enabled, board };
        default:
            throw new Error();
    }
}

function BoardProvider({ children }) {
    const [ state, dispatch ] = useReducer(boardReducer, {
        enabled : false,
        board   : getDefaultBoard()
    });
    const contextValue = useMemo(
        () => ({
            state,
            dispatch,
            actionTypes : boardActionTypes
        }),
        [ state, dispatch ]
    );

    return <BoardContext.Provider value={contextValue}>{children}</BoardContext.Provider>;
}

BoardProvider.propTypes = {
    children : PropTypes.node.isRequired
};

export default BoardProvider;
