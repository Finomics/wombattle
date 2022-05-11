import React, { useEffect, useCallback, useState } from "react";
import "./secondHeader.css";
// import AOS from "aos";
import { loadBlockchain } from '../../store/asyncActions';
import { useStore } from '../../context/GlobalState'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { approve } from '../../store/asyncActions';
import ModalBox from '../modal/index';

// import {getTimeAsync} from '../../store/asyncActions'



function SecondNav() {
    // AOS.init();
    const [{ web3, accounts, claim, purchased, battleContract, tokenContract, allowance }, dispatch] = useStore();

    useEffect(async () => {
        if (battleContract != null) {
            // await  getTimeAsync(contract, dispatch)

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
        <div className="second-container">
            <div className="helpeer-heading-container ">
                <p className="helpeer-heading">
                    Lottery Helpers

    </p>
            </div>
            <div className="ul-container">
                <ul className="ul">
                    {web3 == null ?
                        <li className="a connect" onClick={sendRequest}>
                            <a>Connect wallet</a>
                        </li>
                        :
                        <li className="a connected" >
                            <a> Connected</a>
                        </li>
                    }

                    {
                        allowance <= 0 && web3 != null ?
                            <li className="a connect" onClick={handleApprove}>
                                Approve
                </li> : <li className="a connected" >
                                Approved
            </li>
                    }
                    {/* <li className="a connect" onClick={handleApprove}>
                        Approve
            </li> */}
                    <li className="a connect" onClick={handleOpen} >Create Pools</li>
                </ul>
            </div>
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

export default SecondNav;
