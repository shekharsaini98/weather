import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import { todayWeather, updatefilter, weekWeather } from '../redux'
import { ReactComponent as Loader } from '../assets/svg/wind-ani.svg';
import { ReactComponent as Wind } from '../assets/svg/wind.svg';
import { ReactComponent as Humidity } from '../assets/svg/humidity.svg';
import { ReactComponent as Pressure } from '../assets/svg/pressure.svg';
import { ReactComponent as Visibility } from '../assets/svg/visiblity.svg';
import { ReactComponent as Temp } from '../assets/svg/temp.svg';
import { ReactComponent as Sunrise } from '../assets/svg/sunrise.svg';
import { ReactComponent as Sunset } from '../assets/svg/sunset.svg';

function TodayWeather({todayData, updatefilterfn, weekWeatherfn, todayAction, setafil}) {
    useEffect(() => {
        todayAction(setafil);
    }, [])
    const reset = () => {
        const resetData = {postal:'110014', ctcode:'IN'};
        todayAction(resetData);
        updatefilterfn(resetData);
    }
    const {todayLoading, todayError, todayWeather} = todayData
    const {isdark} = setafil
    if(todayLoading && todayWeather.length === 0){
        return(<article className={`${(isdark)?'dark-main':'light-main'} app-status`}><Loader /></article>)
    }
    else if(todayError){
        return(
            <article className={`${(isdark)?'dark-main':'light-main'} app-status`}>
                <h3>404<br/>Wrong Country OR PostalCode</h3>
                <button className={`${(isdark)?'dark-help':'light-help'} themebtn`}  onClick={()=>reset()}>Back To Home</button>
            </article>
        )
    }
    else if(todayWeather && todayWeather.data){
        const {
            coord:{lon,lat},
            weather:[{description,icon}],
            main:{temp,feels_like,temp_min,temp_max,pressure,humidity},
            visibility,
            wind:{speed},
            sys:{country,sunrise,sunset},
            name
        } = todayWeather.data;
        return(
            <>
                <div className="temptoday-box">
                    <div className="temp-icon">
                    <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Temp Today" className="temp-icon-img" />
                    </div>
                    <div className="temp-details">
                    <p className="team-day">Today {`${name}, ${country}`}</p>
                    <p className="temp-num">{Math.round(temp-273.15)}°C | {Math.round((temp-273.15)* 9/5 + 32 )}°F</p>
                    <p className="temp-type">Feels like: {Math.round(feels_like-273.15)}°C ({description})</p>
                    </div>
                </div>
                <div className={`${(isdark)?'dark-help':'light-help'} temp-moredel`}>
                    <div>
                        <p className="m-0 iconsets"><Wind /></p>
                        <p className="m-0 fs08 f600">{speed}km/h</p>
                        <p className="m-0 fs06 fbld">Wind</p>
                    </div>
                    <div>
                        <p className="m-0 iconsets"><Humidity /></p>
                        <p className="m-0 fs08 f600">{humidity}%</p>
                        <p className="m-0 fs06 fbld">Humidity</p>
                    </div>
                    <div>
                        <p className="m-0 iconsets"><Pressure /></p>
                        <p className="m-0 fs08 f600">{pressure}</p>
                        <p className="m-0 fs06 fbld">Pressure</p>
                    </div>
                    <div>
                        <p className="m-0 mt-3 iconsets"><Visibility /></p>
                        <p className="m-0 fs08 f600">{visibility}</p>
                        <p className="m-0 fs06 fbld">Visibility</p>
                    </div>
                    <div>
                        <p className="m-0 mt-3 iconsets"><Temp /></p>
                        <p className="m-0 fs08 f600">{`${Math.round(temp_min-273.15)}°C`}</p>
                        <p className="m-0 fs06 fbld">Temp Min</p>
                    </div>
                    <div>
                        <p className="m-0 mt-3 iconsets"><Temp /></p>
                        <p className="m-0 fs08 f600">{`${Math.round(temp_max-273.15)}°C`}</p>
                        <p className="m-0 fs06 fbld">Temp Max</p>
                    </div>
                    </div>
                    <div className={`${(isdark)?'dark-help':'light-help'} temp-suntime`}>
                    <div>
                        <p className="m-0 iconsets"><Sunrise /></p>
                        <p className="m-0 fs08 f600">{new Date(sunrise * 1000).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'}).substr(11, 8)} AM</p>
                        <p className="m-0 fs06 fbld">Sunrise</p>
                    </div>
                    <div>
                        <p className="m-0 iconsets"><Sunset /></p>
                        <p className="m-0 fs08 f600">{new Date(sunset * 1000).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'}).substr(11, 8)} PM</p>
                        <p className="m-0 fs06 fbld">Sunset</p>
                    </div>
                </div>
            </> 
        )
    }    
}

const mapStateToProps = state =>{
    return{
        todayData:state.todayWeather,
        setafil:state.settings
    }
}
const mapDispatchToProps = dispatch => {
    return{
        todayAction: (setafil)=>dispatch(todayWeather(setafil)),
        updatefilterfn: (filter)=>dispatch(updatefilter(filter)),
        weekWeatherfn: (response)=> dispatch(weekWeather(response))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TodayWeather)
