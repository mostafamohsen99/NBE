import { createSlice } from "@reduxjs/toolkit";
const PriceSlice=createSlice({
    name:'price',
    initialState:
    {
        initialPrice:0
    },
    reducers:
    {
        addPrice(state,action)
        {
            const newPrice=action.payload;
            state.initialPrice=newPrice.updatedPrice;
            console.log('state.initialPrice',state.initialPrice);
        }
    }
})
export const PriceActions=PriceSlice.actions;
export default PriceSlice.reducer;