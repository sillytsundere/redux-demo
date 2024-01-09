const redux = require('redux');
const creatStore = redux.createStore;

//define a string constant that indicates the type of the action
//creating a constant will help avoid spelling mistakes when using the action
const CAKE_ORDERED = "CAKE_ORDERED";

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
        quantity: 1
    }
    //use an action creator so that if you hav to change a property name or something else you dont have to go and change it in the action that you passed directly into the dispatch function, by using an action creator that returns the action and passing the action creator into the dispatch function you can just edit the action in one place
}
//action is object with type property, action creator is a function that returns an object
// reducers specify how the app's state changes in response to actions sent to the store
// actions only describe what happened but dont describe how the application's state changes


// state is represented by a single object
// state is an object with property called number of cakes which is a numeric value
const initialState = {
    numOfCakes: 10,
    //when you open the shop in the morning there are 10 cakes on shelf
    // if state object contains more than one property
    anotherProperty: 0
}
//can pass initial state as default value for state parameter in reducer


// (previousState, action) => newState
//reducer: function that accepts state and action as arguments, then returns the next state of the application
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                // always safe to first create copy of state object then change only properties that need to, copy using spread operator, this way other properties remain unchanged
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        default:
            return state
    }
}

//following are all the responsibilities of the reduc store
const store = creatStore(reducer); //create redux store, reducer contains initial state of application
console.log('Initial state', store.getState()); //initial state is logged to console

const unsubscribe = store.subscribe(() => console.log('Update state', store.getState())); //listener set up for the store, anytime the store updates we log the state to the console

store.dispatch(orderCake()); //this dispatches the action orderCake, which then is handled by the reducer that matches the type to the case and once the state is updated the listener above is called which then logs the updated state to the console
store.dispatch(orderCake());
store.dispatch(orderCake());

unsubscribe();

//will always have one store for entire application
//responsibilities
// - holds application state
// - allows access to state via getState()
// - allows state to be updated via dispatch(action)
// - registers listeners via subscribe(listener) - store allows app to register listeners through sub method, accepts function as its argument which is executed anytime the state in the store changes
// - handles unregistering of listeners via the function returned by subscribe(listener) method