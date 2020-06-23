export default (gameState, callback) => gameState.map((val, y) => val.map((item, x) => callback(item, y, x)));
