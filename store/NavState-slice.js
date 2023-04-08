import { createSlice } from "@reduxjs/toolkit";
const NavstateSlice=createSlice({
    name:'NavStateSlice',
    initialState:{
        initState:'',
        currState:null,
        timeOfState:''
    },
    reducers:
    {
        addState(state,action)
        {
            const newState=action.payload;
            state.currState=newState
            console.log('state.initState',state.currState);
            const currentTime=new Date().getTime();
            state.timeOfState=currentTime;
            console.log('state.timeOfState',state.timeOfState);
        }
    }
})
export default NavstateSlice.reducer;
export const NavStateActions=NavstateSlice.actions;