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
* A **store** that holds the state of your application
* An **action** that describes what happened in the application
* A **reducer** which handles the action and decides how to update the state

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

* if current count is x, the new count will always be `x-1` when the action is `CAKE_ORDERED`.

to update the state of your application, write pure reducers

The app is subscribed to the store, but cannot directly update the state(in the store), so it dispatches an action that, once dispatched, is handled by a reducer which handles the action and updates the current state, once the state is updated it is passed on to the application because the app is subscribed to the store.