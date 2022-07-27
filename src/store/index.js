import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { apiReducer } from "./reducers/All.reducer";

const rootReducer = combineReducers({
  apiReducer,
});

const middleware = applyMiddleware(thunk);

export const store = createStore(rootReducer, middleware);
