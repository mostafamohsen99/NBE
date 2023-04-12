import { createSlice } from "@reduxjs/toolkit";
const TransferSlice=createSlice({
    name:'Transfer',
    initialState:{
        items:[]
    },
    reducers:{
        addTransfer(state,action)
        {
            const newItem=action.payload;
            state.items.push({
                id:newItem.id,
                typeofTransfer:newItem.typeofTransfer,
                transferFrom:newItem.transferFrom,
                transferTo:newItem.transferTo,
                amount:newItem.amount,
                reason:newItem.reason,
                date:newItem.date,
                img:newItem.img
            })
         //  console.log("state",state.items);
          // console.log('aded')
        },
        removeTransfer(state)
        {
            state.items=[];
        }
    }
})
export const TransferActions=TransferSlice.actions;
export default TransferSlice.reducer;