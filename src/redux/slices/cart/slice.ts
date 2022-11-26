import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calcTotalPrice } from '../../../utils/calcTotalPrice'
import { getCartFromLS } from '../../../utils/getCartLS'
import {IState, CartItem} from './types'


const {items, totalPrice} = getCartFromLS()

const initialState: IState = {
    items,
    totalPrice,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItems(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) {
                if (findItem.count) {
                    findItem.count--
                } 
            };
            state.totalPrice = calcTotalPrice(state.items)
        },
        removeItems(state, action: PayloadAction<string>) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0
        }
    }
})


export const { addItems, removeItems, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer