import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
//import async thunk
// const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk;
import axios from "axios";

type User = {
  id: number
  name: string
}

type InitialState = {
  loading: boolean
  users: User[]
  error: string
}

const initialState: InitialState = {
  loading: false,
  users: [],
  error: "",
};

// Generated pending, fulfilled and rejected action types
// createAsyncThunk accepts an action type as its first argument and a callback function as its second argument
// second argument, callback function, will contain the async logic and return a promise
export const fetchUsers = createAsyncThunk("user/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  } catch (error: any) {
    // throw new Error(error.message);
    return rejectWithValue(error.message || 'Something went wrong');
  }
  // return axios
  // .get("https://jsonplaceholder.typicode.com/users")
  // .then((response) => response.data.map((user) => user.id))
  // //don't need catch block as error is handled
});
// createAsyncThunk will dispatch the promise lifecycle actions we can listen to using extra reducers
//lifecycles incluse pending, fulfilled and rejected

//createAsyncThunk under the hood makes use of the redux-thunk library
// this means redux-thunk is applied as middleware under the hood

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message || 'Something went wrong'
    });
  },
});

export default userSlice.reducer;
