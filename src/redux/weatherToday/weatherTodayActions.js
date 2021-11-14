import axios from "axios";
import { TODAY_REQUEST,TODAY_SUCCESS,TODAY_ERROR } from "./weatherTodayTypes";
import { isSlideShow } from "..";

const todayRequest = () => {
    return {
        type: TODAY_REQUEST
    }
}
const todaySuccess = (todayData)=>{
    return {
        type: TODAY_SUCCESS,
        payload: todayData
    }
}

const todayError = (error) => {
    return {
        type: TODAY_ERROR,
        payload: error
    }
}

export const todayWeather = (setafil) => {
    const {postal, ctcode} = setafil
    return async (dispatch) => {
        dispatch(todayRequest());
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${postal},${ctcode}&appid=892ce3b56d54785b46a8bac9c2eecae7`)
        .then(response => dispatch(todaySuccess(response)))
        .then(()=>dispatch(isSlideShow(false)))
        .catch(error=>dispatch(todayError(error)))
    }
}
