import * as React from 'react';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';

import {
  Address,
  BytesValue,
  Struct,
  TokenPayment,
  U32Value} from '@elrondnetwork/erdjs';
import { lottoContractAddress, LotteryNames } from 'config';
import LottoInfoText from '../LottoInfoText';
import { createInteractor } from '../lottoInteractor';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';

// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
const Lotto3 = () => {

  const [info, setInfo] = useState<Struct>();
  const [status, setStatus] = useState<string>();
  const [currentTime, setCurrentTime] = useState(moment());
  const [quantitiy, setQuantity] = useState(1);

  const { account } = useGetAccountInfo();
  const addressOfUser = new Address(account.address);
  const lottoName=  LotteryNames.Lotto3;
  const lottery_name= BytesValue.fromUTF8(lottoName);

  const isLoggedIn = Boolean(account.address);
  const isActive = Boolean(status!=="Inactive");

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

  const current_prize= info?.getFieldValue("prize_pool").valueOf();
  const ticketId= info?.getFieldValue("token_identifier").valueOf();
  const tId = ticketId? ticketId.substring(0,3):"";
  const ticketNonce=info?.getFieldValue("token_nonce").valueOf();
  const ticketPrice=info?.getFieldValue("ticket_price").valueOf();
  //deadline as timestamp
  const deadline= info?.getFieldValue("deadline").valueOf();

  const isPrizeTransferred = Boolean(current_prize>0);

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

    // join lottery (buy ticket)

  async function sendBuyTransaction() {
    const interactor = await createInteractor(addressOfUser, new Address(lottoContractAddress));
    const payment = TokenPayment.semiFungible(ticketId, ticketNonce, quantitiy*ticketPrice);
    const ticket_quantity = new U32Value(quantitiy);
    //eslint-disable-next-line   @typescript-eslint/no-unused-vars
    const buyTicket = interactor.buy_ticket( lottery_name, payment,ticket_quantity);
  }

  // ***** countdown timer
  //deadline timestamp to date
  const date = new Date(deadline*1000);
  console.log(date)

  //converting to moment date
  const targetTime = moment(date);
  console.log(targetTime)

  //timestamp now
  console.log(new Date().getTime())

  const timeBetween = moment.duration(targetTime.diff(currentTime));

  function addLeadingZeros(num: number, totalLength: number) {
    return(
    num<9?(
     String(num).padStart(totalLength, '0')
     ):
     num);
  }
  
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card card-lotto m-2 ">
      <div className="card-body ">
        <h2 className="card-title b m-2 ">{ lottoName }</h2>
          <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-success h5">
          {status}
            <span className="visually-hidden">status</span>
          </span>
        <img className=" card-img image-lotto" src="./lotto_card.png" ></img>
        { isActive?(
          <div className ='card-text my-3'>
            <span className='h5 '>Current Prize </span><span className='badge badgePrize rounded-pill '>
              <span className='h3'>{current_prize} </span>
              <span className='h5'>{tId} </span>
            </span>
          </div>
          ):
          null
        }
        <div className='mt-3 '>
          { isLoggedIn ?(
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
                  <span className="visually-hidden">unread messages</span>
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
            </div>
            )
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
                  <><div className=' card-text opacity-6 '>Entry Price :
                  <span className='card-text h5 '>{ticketPrice} {tId}</span>
                  </div>
                  <div  className='card-text opacity-6 '>Draw On
                  <h5 className='card-text'>{date.toDateString()}</h5>
                  </div>
                  </>)
                case 'Ended':
                  return (
                  <div  className=' card-text text-danger h4 '>AWAITING WINNER ANNOUNCEMENT</div>)
                case 'Inactive':
                  return (
                    <div className=' '>
                    {isPrizeTransferred? (
                      <div  className=' card-text text-danger h5 '>
                      {current_prize} has been added to next lottery prize pool.
                      </div>)
                    :
                      <div  className=' card-text text-danger h5 '>
                      Prize has been sent to winner address.See in below list.
                      </div>
                    }
                    </div>
                    )
                default:
                  return null
              }
            })()}
            </div>
          </div>
          { status=="Running" ? (
            <div className=' text-center text-light mt-1'>
              {<h5 className=' border rounded bg-success '>
                <span className='  p-1' >{addLeadingZeros(timeBetween.days(),2)} day :</span>
                <span className=' p-1'>{addLeadingZeros(timeBetween.hours(),2)} hr :</span>
                <span className='  p-1'>{addLeadingZeros(timeBetween.minutes(),2)} min :</span>
                <span className='  p-1'>{addLeadingZeros(timeBetween.seconds(),2)} sec</span>
              </h5> 
              }
            </div>
            ):
            null
          }

      </div>
    </div>
        
  );
}

export default Lotto3;


