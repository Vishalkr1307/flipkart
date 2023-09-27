import { GET_PRODUCT_FAILURE, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS } from "./actionType";
import axios from "axios"

export const getProductRequest=(payload)=>({
    type:GET_PRODUCT_REQUEST,
    payload
})
export const getProductSuccess=(payload)=>({
    type:GET_PRODUCT_SUCCESS,
    payload
})
export const getProductFailure=(payload)=>({
    type:GET_PRODUCT_FAILURE,
    payload
})

export const getProductData=(payload)=>(dispatch)=>{
    dispatch(getProductRequest())
    axios.get("/product",{
        params:{
            category:[...payload]
        }
    }).then((res)=>dispatch(getProductSuccess(res.data))).catch((err)=>dispatch(getProductFailure(err.response.data)))
}