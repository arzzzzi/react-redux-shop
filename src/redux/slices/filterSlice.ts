import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {RootState} from '../store'

type Sort = {
    name: string
    sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price' 
}

interface IFilterState  {
    searchValue: string
    categoryId: number
    currentPage: number
    sort: Sort
}

const initialState: IFilterState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'rating',
    }
};

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSortType(state, action: PayloadAction<Sort>) {
            state.sort = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setFilters(state, action: PayloadAction<IFilterState>) {
            if(Object.keys(action.payload)){
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
            state.categoryId = Number(action.payload.categoryId)
            } else {
                state.categoryId = 0;
                state.currentPage = 1;
                state.sort = {
                    name: 'популяроности',
                    sortProperty: 'rating'
                }
            }
        } 
    }
})

export const selectFilter = (state: RootState)  => state.filter

export const selectSort = (state: RootState) => state.filter.sort

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer