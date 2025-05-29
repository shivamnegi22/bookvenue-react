import Cookies from "js-cookie";
import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
    switch (action.type) {
        case 'resetLoginState':
            return {...state, loginState:action.payload};
        case 'userLoggedIn':
            return {...state, userData:action.payload}
        case 'logout':
            return {...state,userData:null}
                default: 
            return state;
    }
};

const resetLoginState = dispatch => async ( payload ) => {
    dispatch({ type:'resetLoginState', payload})
} 

const userLoggedIn = dispatch => async( payload ) => {
    dispatch({type:'userLoggedIn',payload})
    
    try{
        Cookies.set('USER_TOKEN', payload.token , { expires: 90 })
        return true;
    }
    catch(error){
        console.error(error,'error while loggin in.')
        return false;
    }
}


const logout = dispatch => async(navigate) =>{
    dispatch({type:'logout'})
    
try{
    Cookies.remove('USER_TOKEN')
    return navigate('/');;
}
catch(error){
    console.error(error,'error while logout.')
    Cookies.remove('USER_TOKEN')
    return navigate('/');;
}
    
}


export const { Provider, Context } = createDataContext(
    authReducer,
    {resetLoginState, userLoggedIn, logout},
    {loginState:true,userData:null}
);