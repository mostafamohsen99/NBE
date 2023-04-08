import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";



const isAuth= ()=>{
    const user=AsyncStorage.getItem("userid")||false;
    return user;
}


const initialAuthState={
    isAuthenticated:false,
    username:null,
    userid:'',
    price:0
}
const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        login(state,action)
        {
            const newuser=action.payload;
            // console.log(newuser);
            state.isAuthenticated=true;
            state.username=newuser.username;
            state.userid=newuser.userid;
            state.price=newuser.price;
            // console.log("username",state.username);
            // console.log("userid",state.userid);
            AsyncStorage.setItem('username',state.username);
            AsyncStorage.setItem('userid',state.userid);
            // console.log("isAuthenticated",state.isAuthenticated)
        },
        logout(state)
        {
            state.isAuthenticated=false;
            state.username='';
            state.userid='';
            AsyncStorage.removeItem('username');
            AsyncStorage.removeItem('userid');
            // console.log("isAuthenticated",state.isAuthenticated)
            // console.log('username',state.username);
            // console.log('userid',state.userid);
        },
    }
})

export default authSlice.reducer;
export const authActions=authSlice.actions;