import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Item, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk< Item[], SearchPizzaParams> (
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