//eslint-disable-next-line   @typescript-eslint/no-unused-vars
import React, { Component }  from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';



const NfticketInfoText = () => {

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
          <Modal.Title>About NFTickets</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h3>How It Works   </h3>
            <p>NFTickets are  fixed price  SFTs  paired with EGLD or other ESDTs. </p>
            <p>BUY : The contract sends  the paid amount of EGLD/ESDT to the contract,and sends the NFtickets to buyer when Nftickets BOUGHT someone. It is 
            GUARANTEED that NFTickets circulating supply's equivalent EGLD/ESDT allways available in the contract account. </p>
            <p>SELL : NFTickets can be sold ANYTIME to it's paired EGLD/ESDT. The contract sends NFTickets to contract account and sends the EGLD/ESDTs to seller.( 3 %  fees will be applied. ) </p>
            <p>FREE NFTickets : Anyone can claim free NFTickets when availabe. </p>
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
export default NfticketInfoText;