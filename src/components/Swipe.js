import React from "react";
import { Swipe } from "react-swipe-component";
import PropTypes from "prop-types";

export default class Demo extends React.Component {
    static propTypes = {
        children          : PropTypes.node.isRequired,
        onChangeGameState : PropTypes.func.isRequired
    };

    // ---- LEFT -------
    handleSwipeLeftListener = () => this.props.onChangeGameState({ keyCode: 37 });

    // ---- TOP -------
    handleSwipeDownListener = () => this.props.onChangeGameState({ keyCode: 40 });

    // ---- RIGHT -----
    handleSwipeRightListener = () => this.props.onChangeGameState({ keyCode: 39 });

    // ---- DOWN ------
    handleSwipeUpListener = () => this.props.onChangeGameState({ keyCode: 38 });

    render() {
        const { children } = this.props;

        return (
            <Swipe
                nodeName="div"
                detectTouch
                onSwipeEnd={this.handleSwipeEnd}
                onSwipedLeft={this.handleSwipeLeftListener}
                onSwipedRight={this.handleSwipeRightListener}
                onSwipedDown={this.handleSwipeDownListener}
                onSwipedUp={this.handleSwipeUpListener}
            >
                {children}
            </Swipe>
        );
    }
}
