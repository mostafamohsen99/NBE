import { createSlice } from "@reduxjs/toolkit";


const initialLangState={
    lang:'',
    isFromDrawer:''
}
const langSlice=createSlice({
    name:'language',
    initialState:initialLangState,
    reducers:{
        setLang(state,action)
        {
            const language=action.payload;
            state.lang=language;
            console.log('state.lang',state.lang);
        },
        setIsFromDrawer(state,action)
        {
            const isFromDrawer=action.payload;
           // console.log('isFromDrawerRedux',action.payload);
            state.isFromDrawer=isFromDrawer;
            console.log(state.isFromDrawer);
        }
    }
})
export default langSlice.reducer;
export const langActions=langSlice.actions;