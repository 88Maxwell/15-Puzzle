import React, { Fragment } from "react";

import shufleFisherYates from "../utils/shufleFisherYates";
import isSolvable from "../utils/checkBoardSolvability";
import { Container, Btn, Nav, Tile } from "./st-game";
import Swipe from "./Swipe";

export default class Game extends React.Component {
    state = {
        enabled    : false,
        wrongItems : [],
        gameState  : this.genereteDefaultGameState()
    };

    handleStartGame = () => {
        if (this.container) {
            this.container.focus();
        }
        const gs = this.generateRandomSolvableGs(this.state.gameState);
        const wrongs = this.getWrongItems(gs);

        this.stateSetter(true, gs, wrongs);
    };

    handleBreakGame = () => {
        this.stateSetter(false, this.genereteDefaultGameState(), []);
    };

    handleChangeGameState = ev => {
        if (this.state.enabled && ev.keyCode <= 40 && ev.keyCode >= 37) {
            const gs = this.swapItems(ev.keyCode);
            const wrongs = this.getWrongItems(gs);

            let enabled = true;

            if (wrongs !== null && wrongs.length === 0) {
                // eslint-disable-next-line
                alert("YOU ARE WIN A GAME!!!");
                enabled = false;
            }

            this.stateSetter(enabled, gs, wrongs);
        }
    };

    getWrongItems(gameState) {
        const wrongs = [];

        if (gameState !== undefined) {
            gameState.forEach((val, y) =>
                val.forEach((item, x) => (!(item.x === x && item.y === y) ? wrongs.push(item) : null))
            );

            return wrongs;
        }

        return null; // set last version of wrongsItems, because (null || [last wrongs cofig])  => [last wrongs cofig]
    }

    setContainerRef = containerRef => (this.container = containerRef);

    swapHandler(a, b) {
        const gs = this.state.gameState;
        const main = this.findMain(gs);
        const item = {
            y : main.y + b,
            x : main.x + a
        };

        if (item.y < 4 && item.y > -1 && (item.x < 4 && item.x > -1)) {
            return this.swapArrayElem(gs, main, item);
        }
    }

    findMain(gs) {
        // eslint-disable-next-line
        for (let y = 0; y < gs.length; y++) {
            // eslint-disable-next-line
            for (let x = 0; x < gs[y].length; x++) {
                if (gs[y][x].main) return { y, x };
            }
        }
    }

    swapArrayElem(arr, a, b) {
        const c = arr[a.y][a.x];

        /* eslint-disable */
        arr[a.y][a.x] = arr[b.y][b.x];
        arr[b.y][b.x] = c;
        /* eslint-enable */

        return arr;
    }

    swapItems(key) {
        let gameState;

        switch (key) {
            // ---- LEFT -------
            case 37:
                gameState = this.swapHandler(-1, 0);
                break;

            // ---- TOP --------
            case 38:
                gameState = this.swapHandler(0, -1);
                break;

            // ---- RIGHT ------
            case 39:
                gameState = this.swapHandler(1, 0);
                break;

            // ---- DOWN -------
            case 40:
                gameState = this.swapHandler(0, 1);
                break;
            default:
                break;
        }

        return gameState;
    }

    stateSetter(enabled, gameState, wrongs) {
        this.setState({
            enabled,
            gameState  : gameState || this.state.gameState,
            wrongItems : wrongs || this.state.wrongItems
        });
    }

    generateRandomSolvableGs = gs => {
        let matrix = shufleFisherYates(gs);

        let isSolved = isSolvable(matrix);

        while (!isSolved) {
            matrix = shufleFisherYates(matrix);
            isSolved = isSolvable(matrix);
        }

        return matrix;
    };

    genereteDefaultGameState() {
        const gameState = Array.from(Array(4), (val, y) => Array.from(Array(4), (item, x) => ({ y, x })));

        gameState[3][3].main = true;

        return gameState;
    }

    generateItems() {
        return this.state.gameState.map(val => {
            return val.map(item => {
                const number = item.x + item.y * 4 + 1;
                const right = !this.state.wrongItems.includes(item);

                let tileState = "default";

                if (item.main) tileState = "main";
                else if (right) tileState = "right";

                return (
                    <Tile key={number} state={tileState}>
                        {number}
                    </Tile>
                );
            });
        });
    }

    render() {
        return (
            <Fragment>
                <h1>15-puzzle</h1>
                <Nav>
                    <Btn onClick={this.handleStartGame}>#shuffleGame</Btn>
                    <Btn onClick={this.handleBreakGame}>#breakGame</Btn>
                </Nav>
                <div>
                    <Swipe onChangeGameState={this.handleChangeGameState}>
                        <Container ref={this.setContainerRef} onKeyDown={this.handleChangeGameState} tabIndex="0">
                            {this.generateItems()}
                        </Container>
                    </Swipe>
                </div>
            </Fragment>
        );
    }
}
