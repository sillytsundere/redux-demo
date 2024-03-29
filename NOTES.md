# Redux notes

## Three Core Concepts

Cake shop has
-Shop: stores cakes on a shelf
-Shopkeeper: behind the counter
-Customer: at the store entrance

Activities
-Customer: Order a cake
-Shopkeeper: Box a cake from the shelf, update inventory, recipt to keep track of stock, give to customer to take home

First Concept is what is known as the store

In Redux the "Store" safely holds the state of your application
-the shop, holding the current cakes

Second Concept is what is termed as an "Action" in redux
-customer making an order, an action describes what happened

Third concept is called a Reducer
-the reducer ties the store and actions together
-Shopkeeper, keeping track of state and updating them when actions happen

Three Core concepts are:

- A **store** that holds the state of your application
- An **action** that describes what happened in the application
- A **reducer** which handles the action and decides how to update the state

## Three fundamental principals

### First Principal

"The global state of your application is stored as an object inside a single store"

- maintain our application state in a single object which would be managed by the redux store

* in cake shop example, keep track of number of cakes on shelf
  `{
    numberOfCakes: 10
}`

### Second Principal

"The only way to change the state is to dispatch an object that describes what happened"

- To update the state of your app, you need to let redux know about that with an action
- you are not allowed to directly update the state object

* in cake shop example, you cant just take the cake directly off the shelf, instead must scan the qr code and make an order, action is CAKE_ORDERED
  `{
    type:`CAKE_ORDERED`
}`

* state is read only and the only way to change thr state is to emmit an action which is an object describing wat happened

### Third Principal

"To specify how the state tree is updated based on actions, you write pure reducers"

- pure reducers are basically pure functions that take the previous state and an action as parameters(input) and return the next state
  `Reducer - (previous state, action) => newState`
  the reducer being a pure function instead of updating the previous state should return a new state

* in cake shop example the shopkeeper is the reducer and when you order a cake the shopkeeper will take one off the shelf, reduce his cake count by one, print a recipt and hand you the cake

```
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                numOfCakes: state.numOfCakes - 1
            }
    }
}
```

function that accepts the current state and action as parameters, based on what action type is a new state object is returned.
in above scenario, the type is `CAKE_ORDERED`, so we reduce cake count by one and return that new count. and this behavior will always remain the same for a given input

- if current count is x, the new count will always be `x-1` when the action is `CAKE_ORDERED`.

to update the state of your application, write pure reducers

The app is subscribed to the store, but cannot directly update the state(in the store), so it dispatches an action that, once dispatched, is handled by a reducer which handles the action and updates the current state, once the state is updated it is passed on to the application because the app is subscribed to the store.

## Middleware

Middleware is the suggested way to extend redux with custom functionality.

It provides a third-party extension point between dispatching an action and the moment it reaches the reducer.

Use middleware for logging, crash reporting, performing asynchronous tasks, etc.

Will use redux Logger, which logs all information related to redux in your application

Steps to use middleware in redux:

- import applyMiddleware
- pass applyMiddleware as an argument to createStore
- pass in the middleware to the applyMiddleware method

middleware will extend redux with additional functionality

## Actions

Synchronous Actions: as soon as an action was dispatched, the state was immediately updated

Async Actions: asynchronous API calls to fetch data from an endpoint and use that data in your application

My asynchronous app

- fetches a list of users from an API end point and stores it in the redux store

Define state, actions and reducers:

State

```
state = {
    loading: true,
    data: [],
    error: '',
}
```

loading: display a loading spinner in your component
data: list of users
error: display error to the user

Actions

FETCH_USERS_REQUESTED-fetch list of users

FETCH_USERS_SUCCEEDED-fetched successfully

FETCH_USERS_FAILED-error when fetching data

Reducers

case: FETCH_USERS_REQUESTED
loading: true

case: FETCH_USERS_SUCCEEDED
loading: false
users: data (from API)

case: FETCH_USERS_FAILED
loading:false
error: error (from API)

## Async Action creators

axios

- requests to an API endpoint

redux-thunk

- define async action creators
- is essentially a middleware we will be applying to redux store

## Redux Concerns

- Redux requires too much boilerplate code
- for every state transition we define:
  - Action
  - Action object
  - Action creator
  - Switch statement in reducer
- A lot of other packages have to be installed to work with redux
  - redux-thunk (needed for async actions)
  - Immer(handling nested state updates)
  - Redux-devtools(help debug redux applciations)
- there was a need to improve the developer experience for redux

Resulted in creation of **Redux Toolkit** Library

## Redux Toolkit

Redux Toolkit is the official, oninionated, batteries-included toolset for efficient Redux development

- Abstract over setup process
- Handle over most common use cases
- Include some useful utilities

\*Slice is a redux convention, the entire application state is split into slices and managed individually

- createSlice() under the hood uses the immer library
- redux toolkit handles the state updation on my behalf

### Basic how to use redux toolkit

- create a feature slice using createSlice() function
  - which generates the actions and reducers
- perform direct mutations on state
  - totally okay, with immer being used under the hood
- create the store using the configureStore() function
  - and attach reducer
- dispatch actions on the store using store.dispatch()
- inspect the state using store.getState()
- listen to changes using store.subscribe()

\*with redux toolkit the configure store function handles combining reducers together under the hood, so we dont have to do it like how its done in basic redux, with combineReducers()

\*redux toolkit will code the action type for us

- under the hood redux toolkit will take the string from the slice name as the first part of the action type, and the key of each reducer function as the second part

\*each reducer can update only its portion of the application state, however it can respond to any action dispatched in the application **With Redux Toolkit that doesn't happen!**

\*by default, reducers from one createSlice() will only respond to the action types generated by the same slice - if you want a slice to respond to other action types besides the types it has generated you''ll need to make use of Extra Reducers

### Extra Reducers

Extra Reducers are additional reducers apart from the reducer geenrated by createSlice

# React-Redux

\*provide the store at the top of the component tree because the provider component uses react context under the hood and will provide the store to every component in your app

\*to read data from the redux store in a react component we use the useSelector() hook
-useSelector() hook is used to get hold of any state that is maintained in the redux store

-useDispatch() hook used to dispatch an action with react redux

\*store only as much state as you need in the redux store, everything else can be local component state
