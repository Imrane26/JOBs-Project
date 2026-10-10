//actions.js
import { LOGIN,LOGOUT ,STOREUSERDATA} from "./ActionType";
export const login =(data)=>({
    type : LOGIN,
    payload : {
        data : data
    }
});
export const logout =(data)=>({
    type : LOGOUT,
    payload : {
        data : data
    }
})
export const storeUserData=(data)=>({
    type : STOREUSERDATA,
    payload : {
        data : data
    }
})

