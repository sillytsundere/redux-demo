const redux = require("redux");
const creatStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

//install redux-logger
const reduxLogger = require('redux-logger');
//install logger middleware
const logger = reduxLogger.createLogger();

//define a string constant that indicates the type of the action
//creating a constant will help avoid spelling mistakes when using the action
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

//define action
//action is an object with a type property
// action objects are not just restrcted to the type property, other than type, structure is completely up to you
//can have another property that is an object or a simple property that has a string
// impliment an action creator
// action creator creates an action
// a function that returns an action
function orderCake() {
  return {
    //action is defined and then returned in action creator
    type: CAKE_ORDERED,
    payload: 1,
  };
  //use an action creator so that if you hav to change a property name or something else you dont have to go and change it in the action that you passed directly into the dispatch function, by using an action creator that returns the action and passing the action creator into the dispatch function you can just edit the action in one place
}
//action is object with type property, action creator is a function that returns an object
// reducers specify how the app's state changes in response to actions sent to the store
// actions only describe what happened but dont describe how the application's state changes

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

// state is represented by a single object
// state is an object with property called number of cakes which is a numeric value
// const initialState = {
//     numOfCakes: 10,
//     //when you open the shop in the morning there are 10 cakes on shelf
//     // if state object contains more than one property
//     numOfIceCreams: 20,
//     anotherProperty: 0
// }
//can pass initial state as default value for state parameter in reducer
const initialCakeState = {
  numOfCakes: 10,
};
const initialIceCreamState = {
  numOfIceCreams: 20,
};

// (previousState, action) => newState
//reducer: function that accepts state and action as arguments, then returns the next state of the application
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        // always safe to first create copy of state object then change only properties that need to, copy using spread operator, this way other properties remain unchanged
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};
//now each of the reducers is managing its own part of the application global state
//the state parameter is different for every reducer and corresponds to the part of the state it manages
//when app grows in size you can split the reducers in separate files and keep them completely independent and managing different features

//when you have more than one reducer, you need to combine them using the redux method combineReducers because the createStore method only takes one reducer as a parameter
const rootReducer = combineReducers({
    //this method accepts an object and each key:value pair corresponds to a reducer
    cake: cakeReducer,
    iceCream: iceCreamReducer
})
// with this, when we dispatch an action both reducers will receive the action but reducers that dont have anything to do with it will ignore it

//following are all the responsibilities of the reduc store
const store = creatStore(rootReducer, applyMiddleware(logger)); //create redux store, reducer contains initial state of application
//apply middleware, can pass in as many as app requires
console.log("Initial state", store.getState()); //initial state is logged to console

const unsubscribe = store.subscribe(() => {}
//   console.log("Update state", store.getState())
//logger middleware will handle this
); //listener set up for the store, anytime the store updates we log the state to the console

// store.dispatch(orderCake()); //this dispatches the action orderCake, which then is handled by the reducer that matches the type to the case and once the state is updated the listener above is called which then logs the updated state to the console
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
// bind action creators function turns an obj whose values are action creators into an object with the same keys but with every action creator wrapped into a dispatch call so they may be invoked directly
// not really necessary
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(2);

unsubscribe();

//will always have one store for entire application
//responsibilities
// - holds application state
// - allows access to state via getState()
// - allows state to be updated via dispatch(action)
// - registers listeners via subscribe(listener) - store allows app to register listeners through sub method, accepts function as its argument which is executed anytime the state in the store changes
// - handles unregistering of listeners via the function returned by subscribe(listener) method

//separate shopkeepers(reducers) help with scalability, help narrow doen problems when they do arise
