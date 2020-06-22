export default arr => {
    // eslint-disable-next-line no-plusplus
    for (let i = arr.length - 1; i > 0; i--) {
        // eslint-disable-next-line no-plusplus
        for (let j = arr.length - 1; j > 0; j--) {
            const m = Math.floor(Math.random() * i);
            const n = Math.floor(Math.random() * j);
            const temp = arr[i][j];

            /* eslint-disable */
            arr[i][j] = arr[m][n];
            arr[m][n] = temp;
            /* eslint-enable */
        }
    }

    return arr;
};

