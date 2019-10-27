export default (key, { right, left, top, bottom })  => {
    switch (key) {
        // ---- LEFT -------
        case 37:
            return left();

        // ---- TOP --------
        case 38:
            return top();

        // ---- RIGHT ------
        case 39:
            return right();

        // ---- DOWN -------
        case 40:
            return bottom();
        default:
            break;
    }
};
