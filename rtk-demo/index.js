const store = require('./app/store');
//import cake actions
const cakeActions = require('./features/cake/cakeSlice').cakeActions;
const icecreamActions = require('./features/ice-cream/iceCreamSlice').icecreamActions;

//log the initial state in the console
console.log('Initial State', store.getState());

//subscribe to updates in the store
const unsubscribe = store.subscribe(() => {
    console.log('Updated State', store.getState())
})

//dispatch actions
store.dispatch(cakeActions.ordered())
store.dispatch(cakeActions.ordered())
store.dispatch(cakeActions.ordered())
store.dispatch(cakeActions.restocked(3))

//dispatch icecream actions
store.dispatch(icecreamActions.ordered())
store.dispatch(icecreamActions.ordered())
store.dispatch(icecreamActions.restocked(2))

//unsubscribe
unsubscribe();