import { configureStore } from '@reduxjs/toolkit'
//install logger
// const reduxLogger = require('redux-logger');

// import reducer and attach it to store
// const cakeReducer = require('../features/cake/cakeSlice');
import cakeReducer from '../features/cake/cakeSlice'
// const icecreamReducer = require('../features/ice-cream/iceCreamSlice');
import icecreamReducer from '../features/ice-cream/iceCreamSlice'
// const userReducer = require('../features/users/userSlice');
import userReducer from '../features/users/userSlice'

//create instance of logger
// const logger = reduxLogger.createLogger();

//invoke function and assign it to a constant, store
//accepts an object as argument
const store = configureStore({
    // here specify all the reducers from slices that belong to features
    reducer: {
        cake: cakeReducer,
        icecream: icecreamReducer,
        users: userReducer
    },
    //specify middleware property, after reducer, in configure store to apply logger middleware
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    //receives function as its argument
    //in ftn body implicitly return getDefaultMiddleware and concatenate the list with our logger middleware
    //this is done because by default the configure store function adds some middleware to redux store setup automatically, so to the list of default middleware we append the logger middleware
})

export default store;