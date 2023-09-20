
import {legacy_createStore,compose, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import { auhtReducer } from "./auth/reducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer=combineReducers({
    auth:auhtReducer

})




export const store=legacy_createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))