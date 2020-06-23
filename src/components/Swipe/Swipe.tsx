import React from "react";
import PropTypes from "prop-types";
import { Swipe as SwipeBase } from "react-swipe-component";

type SwipeProps = {
    children: React.ReactNode;
    onChangeGameState: (args: Pick<React.KeyboardEvent, "keyCode">) => any;
};

function Swipe({ children, onChangeGameState }: SwipeProps) {
    const handleSwipeLeftListener = () => onChangeGameState({ keyCode: 37 }); // ---- LEFT -----
    const handleSwipeDownListener = () => onChangeGameState({ keyCode: 40 }); // ---- TOP ------
    const handleSwipeRightListener = () => onChangeGameState({ keyCode: 39 }); // ---- RIGHT ---
    const handleSwipeUpListener = () => onChangeGameState({ keyCode: 38 }); // ---- DOWN -------

    return (
        <SwipeBase
            nodeName="div"
            detectTouch
            // onSwipeEnd={handleSwipeEnd} ???????????????
            onSwipedLeft={handleSwipeLeftListener}
            onSwipedRight={handleSwipeRightListener}
            onSwipedDown={handleSwipeDownListener}
            onSwipedUp={handleSwipeUpListener}
        >
            {children}
        </SwipeBase>
    );
}

Swipe.propTypes = {
    children: PropTypes.node.isRequired,
    onChangeGameState: PropTypes.func.isRequired,
};

export default Swipe;
