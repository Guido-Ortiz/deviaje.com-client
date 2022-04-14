import React from 'react';
import s from './FlightInfo.module.css';

function FlightInfo({departure, arrival, date, cityD, cityA, timeD, timeA, duration}) {
    
    const depTime = timeD.slice(11, 16)
    const arrTime = timeA.slice(11, 16)
    const fecha = date.slice(0, 10)

    function secondsToString(duration) {
        var hour = Math.floor(duration / 3600);
        hour = (hour < 10)? '0' + hour : hour;
        var minute = Math.floor((duration / 60) % 60);
        minute = (minute < 10)? '0' + minute : minute;
        // var second = duration % 60;
        // second = (second < 10)? '0' + second : second;
        return hour + ':' + minute ;
      }

      const durationTime = secondsToString(duration)

    return (
        <div className={s.grid}>
            <div className={s.payment}>Detail of the purchase</div>
            <div className={s.ciudades}>{departure} - {arrival}</div>
            <div className={s.salida}>DEPARTURE</div>
            <div className={s.fecha}>{fecha}</div>
            <div className={s.aerolinea}>aerolinea</div>
            <div className={s.viaje}>
                <div className={s.ciudad}>
                    <div className={s.city}>{cityD}</div>
                    <div className={s.time}>{depTime}</div>
                </div> 
                <div className={s.ciudad}>--------</div>
                <div className={s.ciudad}>
                    <div className={s.city}>{cityA}</div>
                    <div className={s.time}>{arrTime}</div>
                </div>
                <div className={s.ciudad}>
                    <div className={s.city}>Duration</div>
                    <div className={s.time}>{durationTime}</div>
                </div>
            </div>
            {/* -------- SI TENGO VUELTA --------- */}
            <div className={s.salida}>RETURN</div>
            <div className={s.fecha}>fecha vuelta</div>
            <div className={s.aerolinea}>aerolinea</div>
            <div className={s.viaje}>
                <div className={s.ciudad}>
                    <div className={s.city}>{cityA}</div>
                    <div className={s.time}>salida</div>
                </div> 
                <div className={s.ciudad}>--------</div>
                <div className={s.ciudad}>
                    <div className={s.city}>{cityD}</div>
                    <div className={s.time}>hora</div>
                </div>
                <div className={s.ciudad}>
                    <div className={s.city}>Duration</div>
                    <div className={s.time}>duracion</div>
                </div>
            </div>
        </div>
    );
}

export default FlightInfo;