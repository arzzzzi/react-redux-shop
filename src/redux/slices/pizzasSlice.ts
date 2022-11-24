import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store';


type Item = {
    id: string
    title: string
    price: number
    imageUrl: string
    type: number[]
    size: number[]
    rating: number
}

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface IPizzaState {
    items: Item[]
    status: Status
}

export const fetchPizzas = createAsyncThunk< Item[], Record<string, string>> (
    'pizza/fetchPizzasById', async(params) => {
    const {
        order,
        sortBy,
        category,
        search,
        currentPage
    } = params;
    const { data } = await axios.get<Item[]>(
        `https://62ff808f34344b6431fae5f5.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data 
})

const initialState: IPizzaState = {
    items: [],
    status: Status.LOADING,
};

export const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizzas(state, action: PayloadAction<Item[]>) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.fulfilled, (state, action) => 
            {
            state.items = action.payload
            state.status = Status.SUCCESS
        }
        )
        builder.addCase(fetchPizzas.pending, (state) => 
         {
            state.status = Status.LOADING
            state.items = []
        }
        )
        builder.addCase(fetchPizzas.rejected, (state) => 
         {
            state.status = Status.ERROR
            state.items = []
        }
        )
    }
})

export const selectPizzaData = (state: RootState) => state.pizza

export const { setPizzas } = pizzasSlice.actions

export default pizzasSlice.reducer