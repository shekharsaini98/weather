import { WEEK_REQUEST,WEEK_SUCCESS,WEEK_ERROR } from "./weatherWeekTypes";

const initialState = {
    weekLoading:true,
    weekWeather:[],
    weekError:'',
}

const weekReducer = (state=initialState, action)=>{
    switch(action.type){
        case WEEK_REQUEST:
            return{
                ...state,
                weekLoading:true
            }
        case WEEK_SUCCESS:
            return{
                ...state,
                weekLoading:false,
                weekWeather:action.payload,
                weekError:''
            }
        case WEEK_ERROR:
            return{
                ...state,
                weekLoading:false,
                weekWeather:[],
                weekError:action.payload,
            }
        default: return state    
    }
}

export default weekReducer