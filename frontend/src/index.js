import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

import logger from 'redux-logger'
import thunk from 'redux-thunk';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { allReducers } from './reducers';

require('dotenv').config()

const middleware = [thunk, logger]
const store = createStore(allReducers, applyMiddleware(...middleware))

ReactDOM.render(<BrowserRouter>
					<Provider store={store}>
						<App />
					</Provider>
				</BrowserRouter>,
				document.getElementById('root')
			)






