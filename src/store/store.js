import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducer";
import merchants from './reducers/merchants'

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const rootReducer = combineReducers({
  reducer, merchants
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
