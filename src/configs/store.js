import {applyMiddleware, createStore} from "redux";
import rootSaga from "../sagas";
import createSagaMiddleWare from 'redux-saga';
import rootReducer from '../reducers';


const sagaMiddleware = createSagaMiddleWare();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga)

export default store;