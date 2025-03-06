import { toyReducer } from "./reducers/toy.reducer.js";
import { combineReducers, configureStore, compose } from '@reduxjs/toolkit';


const rootReducer = combineReducers({
    toyModule: toyReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = configureStore({
    reducer: rootReducer, composeEnhancers
});