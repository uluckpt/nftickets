import * as React from 'react';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import {
  Address,
  BytesValue,
  Struct,
  TokenPayment,
  U32Value
  } from '@elrondnetwork/erdjs';
import { lottoContractAddress, LotteryNames } from 'config';
import LottoInfoText from '../LottoInfoText';
import { createInteractor } from '../lottoInteractor';
import { useCallback, useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'

// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
const Lotto2 = () => {

  const [info, setInfo] = useState<Struct>();
  const [status, setStatus] = useState<string>();
  const [quantitiy, setQuantity] = useState(1);

  const { account } = useGetAccountInfo();
  const addressOfUser = new Address(account.address);
  const lottoName=  LotteryNames.Lotto2;
  const lottery_name= BytesValue.fromUTF8(lottoName);

  const isLoggedIn = Boolean(account.address);

  const getData = useCallback( async () => { 
    const interactor = await createInteractor(addressOfUser, new Address(lottoContractAddress));
    const lotteryInfo = await interactor.lotteryInfo( lottoName);
    setInfo(lotteryInfo);

  },[]);

  useEffect(()=>{
    
    getData();

    const interval = setInterval(() => {
      getData()
    },60000);
    return () => clearInterval(interval);
  },[getData])

  const total_tickets = info?.getFieldValue("total_tickets").valueOf();
  const tickets_left= info?.getFieldValue("tickets_left").valueOf() ;
  const current_prize= info?.getFieldValue("prize_pool").valueOf();
  console.log(current_prize)
  const tickets_sold=total_tickets-tickets_left;
  const percnt= Math.round ( (tickets_sold/total_tickets)*100 ); 
  const ticketId= info?.getFieldValue("token_identifier").valueOf();
  const tId = ticketId? ticketId.substring(0,3):"";
  const ticketNonce=info?.getFieldValue("token_nonce").valueOf();
  const ticketPrice=info?.getFieldValue("ticket_price").valueOf();
  const maxEntry=info?.getFieldValue("max_entries_per_user").valueOf();

  const getStatus = useCallback( async () => { 
    const interactor = await createInteractor(addressOfUser, new Address(lottoContractAddress));
    const lotteryStatus = await interactor.lottery_status( lottoName);
    setStatus(lotteryStatus);

  },[]);

  useEffect(()=>{
    
    getStatus();

    const interval = setInterval(() => {
      getStatus()
    },60000);
    return () => clearInterval(interval);
  },[getStatus])

  const isActive = Boolean(status!=="Inactive");

  // join lottrey (buy ticket)

  async function sendBuyTransaction() {
    const interactor = await createInteractor(addressOfUser, new Address(lottoContractAddress));
    const payment = TokenPayment.semiFungible(ticketId, ticketNonce, quantitiy*ticketPrice);
    const ticket_quantity = new U32Value(quantitiy);
    //eslint-disable-next-line   @typescript-eslint/no-unused-vars
    const buyTicket = interactor.buy_ticket( lottery_name, payment,ticket_quantity);
  }


  return (
    
    <div className="card card-lotto bg-crd  my-3 mx-auto ">
      <div className="card-body ">
        <h2 className="card-title b mt-2 ">{ lottoName }</h2>
          <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-success h5">
          {status}
            <span className="visually-hidden">status</span>
          </span>
        <img className=" card-img image-lotto" src="./lotto_card.png" ></img>
        { isActive?(
        <div className ='card-text my-3'>
          <span className='h5 '>Prize </span><span className='badge badgePrize rounded-pill '>
            <span className='h3'>{total_tickets*ticketPrice} </span>
            <span className='h5'>{tId} </span>
          </span>
        </div>
        ):
        null
        }
        <div className='mt-3 '>
          {isLoggedIn ?(
            <div className="input-group ">
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder="amount" 
                  aria-label="amount of ticket" 
                  value = {quantitiy}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  aria-describedby="button-addon1"/>
                  <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-info">
                  ENTER TO WIN
                  <span className="visually-hidden">enter to win</span>
                  </span>
                <button 
                  className="btn btn-outline-warning btn-lg " 
                  type="button" 
                  id="button-addon2"
                  onClick={sendBuyTransaction}
                  disabled={status!=="Running"}
                  >
                  Enter
                  
                </button>
            </div>)
            :
            <LottoInfoText />
          }
        </div>
        <div className="card card-ticket bg-image mt-2">
          <div className="card-body ">
            {(() => {
              switch (status) {
                case 'Running':
                  return(
                  <><div className=' card-text opacity-6 '>Entry Price :<span className='card-text h5 '>{ticketPrice} {tId}</span></div><div className=' card-text opacity-6 '> Max Entry Per Address: {maxEntry}</div><div className=' card-text opacity-6 '>Tickets Left :<span className='card-text h5 '>{tickets_left}</span></div></>)
                case 'Ended':
                  return (
                  <div  className=' card-text text-danger h4 '>AWAITING WINNER ANNONCEMENT</div>)
                case 'Inactive':
                  return (
                  <div  className=' card-text text-danger h5 '>Prize has been sent to winner address.See in below list.</div>)
                default:
                  return null
              }
            })()}
          </div>
        </div>
        { status!=="Inactive" ? (
          <div>
            <ProgressBar striped variant="success" animated now={percnt} label={`${percnt}%`} />
          </div>
          )
          :
          null
        }
      </div>
    </div>
        
  );
}

export default Lotto2;


