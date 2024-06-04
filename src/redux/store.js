import { applyMiddleware, createStore, combineReducers } from "redux"
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga';
import persistReducer from "redux-persist/es/persistReducer";
import storage from 'redux-persist/lib/storage';
import auth from './auth/auth'
import { rootSaga } from './rootSaga'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}
const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];
const rootReducer = combineReducers({
    auth
})
export const store = createStore(persistReducer(persistConfig, rootReducer), applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
