import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import Game from "./components/Game";
import * as serviceWorker from "./serviceWorker";

window.addEventListener("appinstalled", () => {
    console.log("a2hs installed");
});

ReactDOM.render(<Game />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
