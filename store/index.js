import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import BenefecierReducer from './Benefecier-slice'
import TransferReducer from './Transfer-slice';
import priceReducer from './price-slice'
import langReducer from './lang';
import NavStateSlice from './NavState-slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import storage from 'redux-persist/lib/storage';
import {persistReducer,persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

const rootreducer=combineReducers({
    auth:authReducer,
    Benefecier:BenefecierReducer,
    Transfer:TransferReducer,
    price:priceReducer,
    lang:langReducer,
    navState:NavStateSlice
})
const rootPersistConfig={
    key:'root',
    storage:AsyncStorage,
     whiteList:['lang','auth','navState'],
     //blackList:['Benefecier','Transfer','price']
}
const persistedReducer=persistReducer(rootPersistConfig,rootreducer);
export const store=configureStore({
    reducer:persistedReducer,
    middleware:[thunk]
})

export const persistor=persistStore(store);
