import '../sass/index.scss';

import React from 'react';
import { render } from 'react-dom';


import Game from './components/container';

render(<Game />, document.getElementsByClassName("l-wrapper")[0]);
