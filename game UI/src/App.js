import React from 'react';
import Header from './components/header/Header'

import { GlobalProvider } from './context/GlobalState';

import './App.css';
import { EthAccountInfo } from './components/ETHAccountInfo';
import LotteryCards from './components/cards/index';
import TopSection from './components/topSection/'

function App() {
  return (
    <GlobalProvider>
      <Header />
      {/* <TopSection /> */}
      {/* <LotteryCards /> */}
    </GlobalProvider>
  );
}

export default App;
