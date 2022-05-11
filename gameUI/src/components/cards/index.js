import React, { useEffect, useState } from 'react'
import CardItem from './item'
import './card.css';
import './card-R.css';
import './timer.css';

import {dummyData} from './data';
import { useStore } from '../../context/GlobalState';


const LotteryCards = () => {
    const [{web3,accounts,battleContract,lottoPools},dispatch] = useStore();
    console.log("Pool in Cards",lottoPools );
  
    let lotteryData = dummyData;
    return (
        <div className="lotter-cards-container">
            <div className="row">
            {
                lottoPools.map((data)=> (
                    <CardItem data={data} />
                ))
            }
            </div>
        </div>
    )
}

export default LotteryCards
