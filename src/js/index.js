import '../sass/index.scss';

import React from 'react';
import { render } from 'react-dom';


import Game from './components/Game';

render(<Game />, document.getElementsByClassName("l-wrapper")[0]);