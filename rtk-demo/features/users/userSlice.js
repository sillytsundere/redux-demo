const createSlice = require('@reduxjs/toolkit').createSlice;
//import async thunk
const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk;
const axios = require('axios');

console.log('createAsyncThunk', createAsyncThunk);

const initialState = {
    loading: false,
    users: [],
    error: '',
}

// Generated pending, fulfilled and rejected action types
// createAsyncThunk accepts an action type as its first argument and a callback function as its second argument
// second argument, callback function, will contain the async logic and return a promise
const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        return response.data.map((user) => user.id);
    } catch (error) {
        throw new Error(error.message);
    }
    // return axios
    // .get("https://jsonplaceholder.typicode.com/users")
    // .then((response) => response.data.map((user) => user.id))
    // //don't need catch block as error is handled
})
// createAsyncThunk will dispatch the promise lifecycle actions we can listen to using extra reducers
//lifecycles incluse pending, fulfilled and rejected

//createAsyncThunk under the hood makes use of the redux-thunk library
// this means redux-thunk is applied as middleware under the hood

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = '';
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.error.message;
        })
    }
})

module.exports = userSlice.reducer;
module.exports.fetchUsers = fetchUsers;