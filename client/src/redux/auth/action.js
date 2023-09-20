import { ADD_FORGET_PASSWORD_FAILURE, ADD_FORGET_PASSWORD_REQUEST, ADD_FORGET_PASSWORD_SUCCESS, ADD_LOGIN_FAILURE, ADD_LOGIN_REQUEST, ADD_LOGIN_SUCCESS, ADD_REGISTER_FAILURE, ADD_REGISTER_REQUEST, ADD_REGISTER_SUCCESS, ADD_RESEND_OTP_FAILURE, ADD_RESEND_OTP_REQUEST, ADD_RESEND_OTP_SUCCESS, ADD_RESET_PASSWORD_FAILURE, ADD_RESET_PASSWORD_REQUEST, ADD_RESET_PASSWORD_SUCCESS, ADD_VERIFY_OTP_FAILURE, ADD_VERIFY_OTP_REQUEST, ADD_VERIFY_OTP_SUCCESS } from "./actionType";
import axios from "axios"
export const addLoginRequest=(payload)=>({
    type:ADD_LOGIN_REQUEST,
    payload
})
export const addLoginSuccess=(payload)=>({
    type:ADD_LOGIN_SUCCESS,
    payload
})
export const addLoginfailure=(payload)=>({
    type:ADD_LOGIN_FAILURE,
    payload
})
export const addRegisterRequest=(payload)=>({
    type:ADD_REGISTER_REQUEST,
    payload
})
export const addRegisterSuccess=(payload)=>({
    type:ADD_REGISTER_SUCCESS,
    payload
})
export const addRegisterfailure=(payload)=>({
    type:ADD_REGISTER_FAILURE,
    payload
})

export const addOtpRequest=(payload)=>({
    type:ADD_VERIFY_OTP_REQUEST,
    payload
});
export const addOtpSuccess=(payload)=>({
    type:ADD_VERIFY_OTP_SUCCESS,
    payload
});
export const addOtpFailure=(payload)=>({
    type:ADD_VERIFY_OTP_FAILURE,
    payload
});

export const addForgetRequest=(payload)=>({
    type:ADD_FORGET_PASSWORD_REQUEST,
    payload
});
export const addForgetSuccess=(payload)=>({
    type:ADD_FORGET_PASSWORD_SUCCESS,
    payload
});
export const addForgetFailure=(payload)=>({
    type:ADD_FORGET_PASSWORD_FAILURE,
    payload
});
export const addResetRequest=(payload)=>({
    type:ADD_RESET_PASSWORD_REQUEST,
    payload
});
export const addResetSuccess=(payload)=>({
    type:ADD_RESET_PASSWORD_SUCCESS,
    payload
});
export const addResetFailure=(payload)=>({
    type:ADD_RESET_PASSWORD_FAILURE,
    payload
});
export const addResendRequest=(payload)=>({
    type:ADD_RESEND_OTP_REQUEST,
    payload
});
export const addResendSuccess=(payload)=>({
    type:ADD_RESEND_OTP_SUCCESS,
    payload
});
export const addResendFailure=(payload)=>({
    type:ADD_RESEND_OTP_FAILURE,
    payload
});
export const postLoginData=(payload)=>(dispatch)=>{
    dispatch(addLoginRequest())
    axios.post("/auth/login", payload).then((res)=>dispatch(addLoginSuccess(res.data))).catch((err)=>dispatch(addLoginfailure(err.response.data)))
    
}

export const postOtpData=(id,payload)=>(dispatch)=>{
    dispatch(addOtpRequest())
    axios.post(`/auth/verifyotp/${id}`,payload).then((res)=>dispatch(addOtpSuccess(res.data))).catch((err)=>dispatch(addOtpFailure(err.response.data)))

}
export const postForgetData=(payload)=>(dispatch)=>{
    dispatch(addForgetRequest())
    axios.post("/auth/login/forgetpassword",payload).then((res)=>dispatch(addForgetSuccess(res.data))).catch((err)=>dispatch(err.response.data))
}

export const postResetData=(id,payload)=>(dispatch)=>{
    dispatch(addResetRequest())
    axios.patch(`/auth/login/forgetpassword/resetpassword/${id}`,payload).then((res)=>dispatch(addResetSuccess(res.data))).catch((err)=>dispatch(addResetFailure(err.response.data)))

}

export const postRegisterData=(payload)=>(dispatch)=>{
    dispatch(addRegisterRequest())
    axios.post("/auth/register",payload).then((res)=>dispatch(addRegisterSuccess(res.data))).catch((err)=>dispatch(addRegisterfailure(err.response.data)))
}

export const postResendData=(payload)=>(dispatch)=>{
    dispatch(addResendRequest())
    axios.post("/auth/resendotp", payload).then((res)=>dispatch(addResendSuccess(res.data))(res.data)).catch((err)=>dispatch(addResendFailure(err.response.data)));
}