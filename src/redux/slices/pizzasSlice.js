import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasById', async(params, thunkAPI) => {
    const {
        order,
        sortBy,
        category,
        search,
        currentPage
    } = params;
    const { data } = await axios.get(
        `https://62ff808f34344b6431fae5f5.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );

    return data
})

const initialState = {
    items: [],
    status: 'loading',
};

export const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizzas(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers: {
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error'
            state.items = []
        }
    }
})

export const selectPizzaData = (state) => state.pizza

export const { setPizzas } = pizzasSlice.actions

export default pizzasSlice.reducer