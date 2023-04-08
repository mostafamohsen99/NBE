import { createSlice } from "@reduxjs/toolkit";
const BenefecierSlice=createSlice({
    name:'Benefecier',
    initialState:{
        items:[]
    },
    reducers:{
        addBenefecier(state,action)
        {
            const newItem=action.payload;
            state.items.push({
                id:newItem.id,
                img:newItem.imageUri,
                phonenumber:newItem.phonenumber,
                price:newItem.price,
                Firstname:newItem.firstname,
                lastname:newItem.lastname,
                bankbranch:newItem.Bankbranch,
                accountNumber:newItem.Accountnumber,
                email:newItem.email
            })
        },
        removeBeneficiers(state)
        {
            state.items=[];
        }
    }
})
export const BenefecierActions=BenefecierSlice.actions;
export default BenefecierSlice.reducer;