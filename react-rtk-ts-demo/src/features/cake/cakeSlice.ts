import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
    numOfCakes: number
}

const initialState: InitialState = {
    numOfCakes: 10
}

const cakeSlice = createSlice({
    //specify name for this slice
    name: 'cake',
    //specify initial state for this slice
    initialState, //use ES6 shorthand to specify both key and value since they are the same
    //specify reducer function
    reducers: {
        //specify individual state transitions
        ordered: (state) => {
            //with redux toolkit we don't have to explicitly return the new state and we can directly mutate the state
            state.numOfCakes--
        },
        restocked: (state, action: PayloadAction<number>) => {
            state.numOfCakes += action.payload
        }
    },
})
// createSlice will automatically generate action creators with same names as reducer functions i've written, ordered and restocked
// also returns main reducer function i can provide to my redux store

//export the reducer
export default cakeSlice.reducer;
//export the action creators
export const { ordered, restocked } = cakeSlice.actions;
//this takes care of; defining an action type constant, action object, action creator, the switch statements in the reducer and handling immutable updates in the reducer