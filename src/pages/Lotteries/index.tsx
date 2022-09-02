//eslint-disable-next-line   @typescript-eslint/no-unused-vars
import React, { Component }  from 'react';
//import React from 'react';
import Lotto1 from './Lotto1';
import Lotto2 from './Lotto2';
import Lotto3 from './Lotto3';
import LottoTransactions from './LottoTransactions';

const Lottery = () => {
  return (
    <div className='container  py-2'>
      
      <div className='row'>
        <div className='col-12 col-md-10 mx-auto'>
        <div className='text-center m-2'>
          <h1>Lotteries</h1>  
        </div>  
          <div className='row'>
          <Lotto1 />
          <Lotto2 />
          <Lotto3 />
          </div>
          <LottoTransactions />
        </div>
      </div>
    </div>
  );
};

export default Lottery;
