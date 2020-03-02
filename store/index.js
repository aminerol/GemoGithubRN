import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider, connect, useSelector } from "react-redux";
import thunk from "redux-thunk"
import themeReducer from '../themes/reducer'

export default store = createStore(combineReducers({themeReducer}), applyMiddleware(thunk));