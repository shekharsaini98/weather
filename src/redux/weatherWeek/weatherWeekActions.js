import axios from "axios";
import { WEEK_REQUEST,WEEK_SUCCESS,WEEK_ERROR } from "./weatherWeekTypes";

const weekRequest = () => {
    return {
        type: WEEK_REQUEST
    }
}
const weekSuccess = (todayData)=>{
    return {
        type: WEEK_SUCCESS,
        payload: todayData
    }
}

const weekError = (error) => {
    return {
        type: WEEK_ERROR,
        payload: error
    }
}

export const weekWeather = (setafil) => {
    console.log(setafil);
    const {lat, lon} = setafil
    return async (dispatch) => {
        dispatch(weekRequest());
        await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=892ce3b56d54785b46a8bac9c2eecae7`)
        .then(response => dispatch(weekSuccess(response)))
        .catch(error=>dispatch(weekError(error)))
    }
}
