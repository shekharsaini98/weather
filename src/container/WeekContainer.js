import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { weekWeather } from '../redux';

function WeekContainer({setafil,weekWeatherfn,todayCoords, weekData}) {
    const {isdark} = setafil;
    useEffect(() => {
        if(todayCoords){
            weekWeatherfn(todayCoords.coord)
        }
    }, [todayCoords])
    const {weekLoading, weekError, weekWeather} = weekData;
    if(weekLoading && weekWeather.length === 0){
        return(<article className={`${(isdark)?'dark-main':'light-main'}`}>Loading Week Data</article>)
    }
    else if(weekError){
        return(
            <article className={`${(isdark)?'dark-main':'light-main'}`}>
                <h3>Something Wrong<br />Try Again Later</h3>
            </article>
        )
    }
    else if(weekWeather && weekWeather.data){
        return (
            <article className={`${(isdark)?'dark-help':'light-help'} tempnext padd1r`}>
                {
                    weekWeather.data.daily.map((dailydt,index)=>{
                        if(index === 0){
                            return null
                        }
                        const {
                            dt,
                            temp:{min,max},
                            weather:[{description, icon}]
                        } = dailydt
                        return(
                            <div className="tomotemp" key={dt}>
                                <div className="f600">
                                    {new Date(dt * 1000).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'}).substr(0, 10)}
                                </div>
                                <div>
                                    <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="Temp Today" className="" />
                                </div>
                                <div>
                                    <p className="f600">{description}</p>
                                </div>
                                <div className="f600">{Math.round(min-273.15)}/{Math.round(max-273.15)}°C</div>
                            </div>
                        )
                    })
                }
            </article>
        )
    }

}
const mapStateToProps = state => {
    return{
        setafil:state.settings,
        todayCoords:state.todayWeather.todayWeather.data,
        weekData:state.weekWeather
    }
}
const mapDispatchToProps = dispatch => {
    return{
        weekWeatherfn:(todayCoords)=>dispatch(weekWeather(todayCoords))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WeekContainer)
