/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import React  from 'react';
import Actions from './Actions';
import Transactions from './Transactions';
import { contractAddress } from 'config';
//import Login from 'pages/Login';


const Dashboard = () => {
  return (
    <div className='container py-2'>
      <div className='row '>
        <div className='col-12  mx-auto'>
          <div className='text-center m-2'>
            <h1>NFTickets </h1>  
          </div>  
          <Actions/>
          <Transactions/>
          <div className='text-center m-2 '>
            <span className='opacity-6 mr-1'>NFTickets Contract address:</span>
            <span data-testid='contractAddress'> {contractAddress}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
