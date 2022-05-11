import React, { useEffect, useState, useRef } from "react";
import { useStore } from '../../context/GlobalState';
import {joinLotto,drawWinner} from '../../store/asyncActions';


const CardItem = ({ data }) => {

    const [{ web3, accounts, claim, battleContract,allowance }, dispatch] = useStore();
    const [endTime, setEndTime] = useState(0)
    console.log("allowance",allowance)
    const getTimeAsync = async () => {
        if (battleContract != null && battleContract != undefined) {

            //   const start = +await contract.methods.vestingStart().call();
            //   const duration = +await contract.methods.vestingDuration().call();
            let receipt = data.tmeeStamp;
            setEndTime(receipt * 1000)
        }
    }
    // const [{lastBlock,currentReward , halvePeriod, blockInADay},dispatch] = useStore();
    // console.log("Timestamp in timer",lastBlock);

    let time = parseInt(555 + 2592000);
    let dt = new Date(time * 1000);
    // console.log("date",dt);

    let unixTimestamp = parseInt(9900444732000);
    //Since JavaScript works in milliseconds, you should convert
    // >>>>>>> Stashed changes
    // the time into milliseconds by multiplying it by 1000.
    let date = new Date(unixTimestamp * 1000);

    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();
    let dates = date.getDate();
    // let locateString = date.toLocaleDateString()
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    // Will display time in 11:10:22 format
    // let formatTime =  month + ' ' + dates + ', '  + year + ' ' + hours + ': ' + ' ' + minutes.substr(-2) + ':' + seconds.substr(-2) ;
    let formatTime = dt;
    // let formatTime = locateString;
    let stringyDate = formatTime.toString();

    // const [{accounts ,contract,dappsList}, dispatch] = useStore();
    const [timerDays, setTimerDays] = useState("00");
    const [timerHours, setTimerHours] = useState("00");
    const [timerMinutes, setTimerMinutes] = useState("00");
    const [timerSeconds, setTimerSeconds] = useState("00");

    let interval = useRef();

    // const [{ , currentReward , halvePeriod},] = useStore()
    let lqnBlock = 55 / 2;

    const startTimer = () => {
        const countdownDate = new Date("June 2, 2021 00:00:00").getTime();
        // const countdownDate = new Date(stringyDate).getTime();
        let newTime = data.timestamp *1000
        interval = setInterval(() => {
            const now = new Date().getTime();
       
            // let checkTime  = now - newTime;
            const distance = newTime - now
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(interval.current);
            } else {
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        }, 1000);
    };

    useEffect(() => {
        if (battleContract != null && battleContract != undefined) {
            startTimer();

        }
        getTimeAsync()
        return () => {
            clearInterval(interval.current);
        };
    });
    const handleJoin = async() => {
        try{
            let receipt = await joinLotto(battleContract,data._poolId,data._contributionAmount,accounts,dispatch)
        }
        catch(error) {
            console.log("error",error)
        }
        
    }

    const handleDraw = async() => {
        try{
            let receipt = await drawWinner(battleContract,data._poolId,accounts,dispatch)
        }
        catch(error) {
            console.log("error",error)
        }
        
    }
    return (
        <div>
            <div className="column">
                <div className="card">
                <>
      <div className="display-timer">
      <div style={{marginBottom: '-20px'}}>
            <span className="timer-num-two-heading" >
              LOTTO POOL ENDS IN
  
            </span>
          </div>
        <div className="timer-flex">
          {/* <div className="d-two">
            <span className="timer-num one">
              <b>{timerDays} Days </b>
            </span>

          </div> */}
          <div className="">
            <span className="timer-num" style={{marginLeft:"10px" }}>
              <b>  {timerHours} :</b>
            </span>
          </div>
          <div className="">
            <span className="timer-num two" >
              <b>{timerMinutes} : </b>
            </span>
          </div>
          <div className="">
            <span className="timer-num two">
              <b>{timerSeconds}</b>
            </span>
          </div>
      

        </div>
      </div>

      <div className="btn-div"></div>

    </>
                    <div className="lottercard-top-container">
                        <h3 className="lottercard-current-part">Current participants: {data._currentParticipants}</h3>
                        <h3 className="lottercard-max-part">Max participants: {data._maxParticipants}</h3>
                    </div>

                    <h2 className="lottercard-contribution-heading">Contribution amount: {data._contributionAmount /10e17}</h2>
                    <div className="lottercard-btn-container">
                        <button className="lottercard-draw-btn" onClick={handleDraw}>
                            Draw Winner
                    </button>
                    {
                        allowance <=0 ? 
                        <button className="lottercard-lotto-btn-disabled"  disabled>
                        Enter Lotto
                </button> :
                    <button className="lottercard-lotto-btn" onClick={handleJoin} >
                    Enter Lotto
            </button>
                    }
                    
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CardItem
