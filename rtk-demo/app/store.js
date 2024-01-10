const configureStore = require('@reduxjs/toolkit').configureStore;
const cakeReducer = require('../features/cake/cakeSlice');
// import reducer and attach it to store
const icecreamReducer = require('../features/ice-cream/iceCreamSlice')

//invoke function and assign it to a constant, store
//accepts an object as argument
const store = configureStore({
    // here specify all the reducers from slices that belong to features
    reducer: {
        cake: cakeReducer,
        icecream: icecreamReducer,
    }
})

module.exports = store;