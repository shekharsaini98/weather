import { THEME_CHANGE, IS_SLIDE_SHOW,UPDATE_FILTER } from "./themeTypes"

const initialState = {
    isdark:false,
    sideShow:false,
    postal: '110014',
    ctcode: 'IN',
}

const themeReducer = (state=initialState, action) => {
    switch(action.type){
        case THEME_CHANGE:
            const cngtyp = !(state.isdark);
            return{
                ...state,
                isdark: cngtyp
            }
        case IS_SLIDE_SHOW:
            return{
                ...state,
                sideShow: action.payload
            }
        case UPDATE_FILTER:
            const {postal, ctcode} = action.payload
            return{
                ...state,
                postal,
                ctcode
            }      
        default: return state    
    }

}

export default themeReducer;