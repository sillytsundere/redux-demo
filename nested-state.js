const redux = require("redux");
const produce = require('immer').produce;
//immer simplifies handling immutable data structures

const initialState = {
  name: "Neko",
  address: {
    street: "456 Yarn St",
    city: "Meowy",
    state: "Somestate",
  },
};

//define constant for action type
const STREET_UPDATED = "STREET_UPDATED";

//define the action creator, effectively returns action object
const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

// define reducer to handle this action
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
    //   return {
    //     ...state,
    //     address: {
    //       ...state.address,
    //       street: action.payload,
    //     },
    //   };
    return produce(state, (draft) => {
        //produce's first argument is current state
        //second argument is a function which receives a draft copy of the state
        //immer allows us to update the draft state as if state is mutable
        draft.address.street = action.payload //here we are updating the property directly but immer translates it to something like the above
    })
    default: {
      return state;
    }
  }
};

//create the store and dispatch the actions tracking the initial state and the updated state
//create the store
const store = redux.createStore(reducer);
//log the initial state
console.log('Initial State', store.getState());
//subscribe to the store
const unsubscribe = store.subscribe(() => {
    console.log('Updated State', store.getState())
});
//dispatch an action to update the street
store.dispatch(updateStreet('123 Meow Ln'));
//unsubscribe
unsubscribe();