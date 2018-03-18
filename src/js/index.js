import '../sass/index.scss';

import React from 'react';
import { render } from 'react-dom';


import Container from './components/container';
import ErrorBoundary from './components/errorBoundary';


render( <ErrorBoundary><Container /></ErrorBoundary> , document.getElementsByClassName("l-wrapper")[0]);
