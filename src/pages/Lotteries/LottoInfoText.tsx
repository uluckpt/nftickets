//import React, { Component }  from 'react';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';


const LottoInfoText = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
      <button
        className="btn btn-warning btn-circle " 
        onClick={handleShow}
        >
        INFO
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Connect Your Wallet To Join Lotteries</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>ABOUT LOTTERIES  </h4>
            <p>Two types lottery available currently. </p>
            <p>1. FIXED PRIZE LOTTERIES : Limitted with supplied total tickets .The prize is fixed. Lottery will be ended when all tickets sold and prize will be sent to winner address directly. </p>
            <p>2. VARIABLE PRIZE LOTTERIES : It is time based lottery . Lottery will be ended when time is up and collected prize will be sent to winner address directly or will be added to next lottery prize if no winner. </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>

       
    )
}
export default LottoInfoText;