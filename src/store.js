import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const env = process.env.NODE_ENV;
let store;

if (env === "development") {
	store = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(...middleware),
			window.__REDUX_DEVTOOLS_EXTENSION__
			? window.__REDUX_DEVTOOLS_EXTENSION__ &&
				window.__REDUX_DEVTOOLS_EXTENSION__()
			: f => f
		)
	);
} else {
	store = createStore(
		rootReducer,
		initialState,
		compose(applyMiddleware(...middleware))
	);
}

export default store;
