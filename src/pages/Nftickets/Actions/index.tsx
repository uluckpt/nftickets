//eslint-disable-next-line   @typescript-eslint/no-unused-vars
import  React, { useCallback } from 'react';

import { useEffect, useState } from 'react';

import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import {
  Address,
  TokenPayment,
  Struct,
  U64Value,
  BytesValue,
 } from '@elrondnetwork/erdjs';
import {  FormatAmount } from '@elrondnetwork/dapp-core/UI';

import { createInteractor } from "../nfticketinteractor";
import {tickets,ITicket,contractAddress} from 'config';
import NfticketInfoText from './NfticketInfoText';

const Actions = () => {

  const [pool, setPool] = useState("--- Select NFTicket Pool ---*./logo_son.png");
  const [quantitiy, setQuantity] = useState(1);
  const [status, setStatus] = useState<Struct>();
  const [ticketInfo, setTicketInfo] = useState<Struct>();
  const [tokenInfo, setTokenInfo] = useState<Struct>();

  const { account } = useGetAccountInfo();
  const addressOfUser = new Address(account.address);

  const ticketsData: ITicket[] = (
    [
      ...tickets,
    ]
    //eslint-disable-next-line   @typescript-eslint/no-explicit-any
    .filter((el: any) => el !== undefined) as any
  );

  const handleChange = (event: { target: { value: string; }; }) => {
    setPool(event.target.value);
    
  };

   // from config
  const myArray = pool.split("*");
  const poolName= myArray[0];
  const poolImg = myArray[1];
  const  pool_name= BytesValue.fromUTF8(poolName);

  // get nfticket info
  
  async function  getData()  { 
    const interactor = await createInteractor(addressOfUser, new Address(contractAddress));
    const ticket_status = await interactor.getNfticketStatus( poolName);
    const ticket_info = await interactor.ticketInfos( poolName);
    const token_info = await interactor.tokenInfos( poolName);

    setStatus(ticket_status);
    setTicketInfo(ticket_info);
    setTokenInfo(token_info);

  }

  useEffect(()=>{
    
    getData();

    const interval = setInterval(() => {
      getData()
    },60000);
    return () => clearInterval(interval);
  },[poolName])

  const circulating_supp = status?.getFieldValue("circulating_supply").valueOf();
  const locked_esdt= status?.getFieldValue("locked_esdt_value").valueOf() ;
  const free_nfticket= status?.getFieldValue("free_tickets_left").valueOf();
  const ticket_id = ticketInfo?.getFieldValue("ticket_id").valueOf();
  const ticket_nonce= ticketInfo?.getFieldValue("ticket_nonce").valueOf() ;
  //eslint-disable-next-line   @typescript-eslint/no-unused-vars
  const ticket_price= ticketInfo?.getFieldValue("ticket_amount").valueOf();
  const token_id = tokenInfo?.getFieldValue("payment_token_id").valueOf();
  const token_nonce= tokenInfo?.getFieldValue("payment_token_nonce").valueOf() ;
  const token_price= tokenInfo?.getFieldValue("payment_token_amount").valueOf();
    
  const ticketPrice=  token_id  ==="EGLD"? token_price/1000000000000000000 : token_price;

  // buy nfTickets

  async function sendBuyTransaction(): Promise<void> {
    const interactor = await createInteractor(addressOfUser, new Address(contractAddress));
    const amount = quantitiy * ticketPrice;
    const payment = token_id==="EGLD"? 
      TokenPayment.egldFromAmount(amount)
      :
      TokenPayment.metaEsdtFromAmount(token_id,token_nonce,amount,2);
    const ticket_quantity = new U64Value(quantitiy);
    //eslint-disable-next-line   @typescript-eslint/no-unused-vars
    const buyTicket =  interactor.buy_ticket( pool_name, payment,ticket_quantity);
    
  }
  // sell nfTickets
  async function sendSellTransaction() {
    const interactor = await createInteractor(addressOfUser, new Address(contractAddress));
    const payment = TokenPayment.semiFungible(ticket_id, ticket_nonce, quantitiy);
    //eslint-disable-next-line   @typescript-eslint/no-unused-vars
    const sellTicket = interactor.sell_ticket( pool_name, payment);
  }

  // claim free nfTickets
  async function sendClaimTransaction() {
    const interactor = await createInteractor(addressOfUser, new Address(contractAddress));
    console.log(pool_name);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const claimTicket = interactor.claimFreeTicket( pool_name);
  }
  

  return (
    <div className="row justify-content-md-center">
      <div className=" card card-dash bg-crd  ">
        <div className="card-body ">
          <select 
            className="form-select form-select-lg text-center mt-2" 
            onChange={handleChange}>
            {ticketsData.map(option => (
            <option  
              key={option.pool_name} 
              value={`${option.pool_name}*${option.img}`}>
            {option.pool_name}
            </option>
            ))}
          </select>
          <img className="card-img card-logo mx-auto my-2" 
            src={poolImg} >
          </img>
          <div className="input-group input-group-lg mx-auto mb-3">
                <button
                  className="btn btn-outline-success btn-lg "
                  type="button"
                  id="button-addon2"
                  onClick={sendBuyTransaction}
                >BUY
                </button>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  aria-label="Amount"
                  value={quantitiy}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  aria-describedby="button-addon2" />
                <button
                  className="btn btn-outline-danger btn-lg "
                  type="button"
                  onClick={sendSellTransaction}
                >SELL
                </button>
          </div>
          <button
                type="button"
                className="btn btn-outline-warning btn-lg btn-block  mb-3 "
                onClick={sendClaimTransaction}
                disabled={free_nfticket < 1}
          >Claim Free NFTicket
          </button>
          <div className="card card-ticket bg-image mb-3">
              {status!==null? (
                <div className="card-body ">
                  <h5 className="card-text">Pair: {ticket_id}/{token_id}</h5>
                  {token_id === "EGLD" ? (
                    <h5 className="card-text">Fixed Price :
                      <FormatAmount
                        value={token_price} />
                    </h5>
                  ) :
                    <h5 className="card-text">Fixed Price: {token_price} </h5>}

                  <h5 className="card-text">Circulating Supply :{circulating_supp} </h5>
                  {token_id === "EGLD" ? (
                    <h5 className="card-text">Locked {token_id} :
                      <FormatAmount
                        value={locked_esdt}
                        showLabel={true} />
                    </h5>
                  ) :
                    <h5 className="card-text">Locked {token_id}: {locked_esdt}</h5>}
                  <h5 className="card-text">Free NFTickets :{free_nfticket}</h5>
                </div>
                  ):
                <div className="card-text my-3">
                    <h4>Learn More</h4>
                    <NfticketInfoText/>
                </div>
              }
          </div>
        </div>   
      </div>
    </div> 

  );
};
export default Actions;