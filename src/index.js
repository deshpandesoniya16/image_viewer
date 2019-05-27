import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Profile from './screens/profile/profile'

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Profile />, document.getElementById('root'));

serviceWorker.unregister();
