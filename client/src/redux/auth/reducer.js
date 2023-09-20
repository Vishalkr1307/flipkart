import { getLocalData, postLocalData } from "../../util/localdata"
import { ADD_FORGET_PASSWORD_FAILURE, ADD_FORGET_PASSWORD_REQUEST, ADD_FORGET_PASSWORD_SUCCESS, ADD_LOGIN_FAILURE, ADD_LOGIN_REQUEST, ADD_LOGIN_SUCCESS, ADD_REGISTER_FAILURE, ADD_REGISTER_REQUEST, ADD_REGISTER_SUCCESS, ADD_RESEND_OTP_FAILURE, ADD_RESEND_OTP_REQUEST, ADD_RESEND_OTP_SUCCESS, ADD_RESET_PASSWORD_FAILURE, ADD_RESET_PASSWORD_REQUEST, ADD_RESET_PASSWORD_SUCCESS, ADD_VERIFY_OTP_FAILURE, ADD_VERIFY_OTP_REQUEST, ADD_VERIFY_OTP_SUCCESS } from "./actionType"

const init={
    isLoading:false,
    isAuth:getLocalData("token")?true:false,
    token:getLocalData("token")||"",
    user:{},
    isError:"",
    status:"",
    message:"",
    profile:getLocalData("user")||{},
    isVerify:false,
    isResend:false,
    isForget:false,
    isLogin:false,
    isRegister:false,
    isReset:false,

}

export const auhtReducer=(store=init,{type,payload})=>{
    switch(type){
        case ADD_LOGIN_REQUEST:
            return {...store,isLoading:true}
        case ADD_LOGIN_SUCCESS:
            return {...store,isLoading:false,isLogin:true,user:payload,isError:false}
        case ADD_LOGIN_FAILURE:
            return {...store,isLoading:false,isError:payload}
        case ADD_VERIFY_OTP_REQUEST:
            return {...store,isLoading:true}
        case ADD_VERIFY_OTP_SUCCESS:
            postLocalData("token",payload.token)
            postLocalData("user",payload.user)
            return {...store,isLoading:false,isVerify:true,status:payload.status,message:payload.message,token:payload.token,profile:payload.user,isError:false,isAuth:true}
        case ADD_VERIFY_OTP_FAILURE:
            return {...store,isLoading:false,isError:payload}
        case ADD_RESEND_OTP_REQUEST:
            return {...store,isLoading:true}
        case ADD_RESEND_OTP_SUCCESS:
            return {...store,isLoading:false,isResend:true,user:payload.otpData,status:payload.status}
        case ADD_RESEND_OTP_FAILURE:
            return {...store,isLoading:false,isResend:false,isError:payload}
        case ADD_FORGET_PASSWORD_REQUEST:
            return {...store,isLoading:true}
        case ADD_FORGET_PASSWORD_SUCCESS:
            return {...store,isLoading:false,isForget:true,user:payload}
        case ADD_FORGET_PASSWORD_FAILURE:
            return {...store,isLoading:false,isForget:false,isError:payload}
        case ADD_REGISTER_REQUEST:
            return {...store,isLoading:true}
        case ADD_REGISTER_SUCCESS:
            return {...store,isLoading:false,isRegister:true,user:payload}
        case ADD_REGISTER_FAILURE:
            return {...store,isLoading:false,isRegister:false,isError:payload}
        case ADD_RESET_PASSWORD_REQUEST:
            return {...store,isLoading:true}
        case ADD_RESET_PASSWORD_SUCCESS:
            return {...store,isLoading:true,isReset:true,status:payload}
        case ADD_RESET_PASSWORD_FAILURE:
            return {...store,isLoading:false,isReset:false,isError:payload}

        default:
            return {...store}
    }

}