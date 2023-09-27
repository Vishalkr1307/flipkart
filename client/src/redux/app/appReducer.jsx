import { GET_PRODUCT_FAILURE, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS } from "./actionType"

const init={
    loading: false,
    product:[],
    error:""
}

export const appReducer=(store=init,{type,payload})=>{
    switch(type){
        case GET_PRODUCT_REQUEST:
            return {...store,loading:true}
        case GET_PRODUCT_SUCCESS:
            return {...store,loading:false,product:payload}
        case GET_PRODUCT_FAILURE:
            return {...store,error:payload}
        default:
            return {...store}
        

    }
}