//import redux
const redux = require("redux");
// import thunk middleware
const thunkMiddleware = require("redux-thunk").thunk;
//require("redux.thunk").default is outdated by this point 01/2023, but in youtube comments for this tutorial i am following i found someone said it works with .thunk
const axios = require("axios");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

//install redux-logger
const reduxLogger = require('redux-logger');
//install logger middleware
const logger = reduxLogger.createLogger();

// define initial state
// object with three properties
const initialState = {
  loading: false,
  users: [],
  error: "",
};

// declare constants for action types
const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

// define action creators
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

// action creator, will return an action
// thunk middleware brings to the table the ability for action creator to return a function instead of an action object
const fetchUsers = () => {
  return function (dispatch) {
    //does not have to be pure, can have side effects, such as async API calls
    //can also dispatch actions, receives dispatch method as its argument
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        // response.data is the users
        const users = response.data.map((user) => user.id);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

//create redux store
const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger));

store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchUsers());
