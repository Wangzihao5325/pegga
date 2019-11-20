import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import testReducer from './reducers/testReducer';
import userReducer from './reducers/userReducer';
import assetsReducer from './reducers/assetsReducer';
import otcStateReducer from './reducers/otcStateReducer';
import adListReducer from './reducers/adListReducer';
import orderListReducer from './reducers/orderListReducer';
import countryCodeReducer from './reducers/countryCodeReducer';
import storageReducer from './reducers/storageReducer';

const rootReducer = combineReducers({
    test: testReducer,
    user: userReducer,
    assets: assetsReducer,
    otcState: otcStateReducer,
    adList: adListReducer,
    orderList: orderListReducer,
    country: countryCodeReducer,
    storage: storageReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;