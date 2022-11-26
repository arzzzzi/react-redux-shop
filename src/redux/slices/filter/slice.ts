import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFilterState, Sort, SortPropertyEnum } from './types';



const initialState: IFilterState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: SortPropertyEnum.RATING_DESC,
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
                    sortProperty: SortPropertyEnum.RATING_DESC
                }
            }
        } 
    }
})

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer