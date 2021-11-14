import { TODAY_REQUEST,TODAY_SUCCESS,TODAY_ERROR } from "./weatherTodayTypes";

const initialState = {
    todayLoading:true,
    todayWeather:[],
    todayError:'',
}

const todayReducer = (state=initialState, action)=>{
    switch(action.type){
        case TODAY_REQUEST:
            return{
                ...state,
                todayLoading:true
            }
        case TODAY_SUCCESS:
            return{
                ...state,
                todayLoading:false,
                todayWeather:action.payload,
                todayError:''
            }
        case TODAY_ERROR:
            return{
                ...state,
                todayLoading:false,
                todayWeather:[],
                todayError:action.payload,
            }
        default: return state    
    }
}

export default todayReducer