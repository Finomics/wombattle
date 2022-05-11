import React, { useEffect, useCallback, useState } from "react";
import "./header.css";
// import AOS from "aos";
import Logo from '../../images/logo.jpg';
import { loadBlockchain } from '../../store/asyncActions';
import { useStore } from '../../context/GlobalState'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { approve } from '../../store/asyncActions';
import ModalBox from '../modal/index'
// import {getTimeAsync} from '../../store/asyncActions'



function Header() {
  // AOS.init();
  const [{ web3, accounts, claim, purchased, battleContract, tokenContract, allowance }, dispatch] = useStore();

  useEffect(async () => {
    if (battleContract != null) {
      

    }
  }, [battleContract])
  console.log("this is for contract", battleContract)
  console.log("this is for purchased", purchased);
  const [open, setOpen] = React.useState(false);

  const sendRequest = useCallback(async () => {
    loadBlockchain(dispatch);
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleApprove = async () => {
    try {
      await approve(tokenContract, accounts, dispatch);
    }
    catch (error) {
      console.log("error", error)
    }
  }

  return (
    <div className="container">
      <header
        className="header"
      >
        {/* <a href="/" >
          
        </a> */}
        <img src={Logo} className="logo" width={100} />
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>
        <ul className="menu" style={{ fontSize: "15px" }}>
          {web3 == null ?
            <li className="navLink connect" onClick={sendRequest}>
              <a>Connect wallet</a>
            </li>
            : ""}
          {/* {
            allowance <= 0 && web3 != null ?
              <li className="navLink connect" onClick={handleApprove}>
                <a>Approve</a>
              </li> : ""
          } */}
          {/* <li className="navLink whitepaper" onClick={handleOpen}>
            <a href="#white-paper">Craate Lottery Pool</a>
          </li> */}
          <li className="navLink whitepaper">
            <a href="#white-paper">White Paper</a>
          </li>
          <li className="navLink whitepaper" >
            <a href="https://t.me/welsicorgitoken" target="_blank">Join Telegram</a>
          </li>
        </ul>
      </header>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ModalBox />
      </Modal>
    </div>
  );
}

export default Header;
