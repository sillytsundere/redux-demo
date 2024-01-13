import { createSlice } from '@reduxjs/toolkit'
// const { cakeActions } = require("../cake/cakeSlice");
import { ordered as cakeOrdered } from '../cake/cakeSlice'

// const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
  numOfIceCreams: 20,
};

const icecreamSlice = createSlice({
  name: "icecream",
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfIceCreams--;
    },
    restocked: (state, action) => {
      state.numOfIceCreams += action.payload;
    },
  },
  //new offer! buy a cake, get an ice cream free, need an Extra Reducer to do this!
  /////
  //two ways to specify extra reducers
  //first way to specify mapping object where key corresponds to an action type from a different slice
  // extraReducers: {
  //     ['cake/ordered']: (state) => {
  //         state.numOfIceCreams-- //mutate state directly as immer is being used under the hood
  //     }
  // } //this way has depreciated and is no longer supported!!!
  /////
  //second way is using a build function
  extraReducers: (builder) => {
    builder.addCase(cakeOrdered, (state) => {
      state.numOfIceCreams--;
    });
  },
});

export default icecreamSlice.reducer;
export const { ordered, restocked } = icecreamSlice.actions;
