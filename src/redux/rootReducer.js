import { combineReducers } from "redux";
import themeReducer from "./theme/themeReducer";
import todayReducer from "./weatherToday/weatherTodayReducer";
import weekReducer from './weatherWeek/weatherWeekReducer'

const rootReducer = combineReducers({
    settings:themeReducer,
    todayWeather:todayReducer,
    weekWeather:weekReducer,
})
export default rootReducer;