 //eslint-disable-next-line   @typescript-eslint/no-unused-vars
import React  from 'react';
import ContractAccount from './ContractAccount';
import UserAccount from './UserAccount';
import {   useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';

// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
const Dashboard = () => {
  const { address } = useGetAccountInfo();
  const isLoggedIn = Boolean(address);
  
  return (

    
    <div className=' d-flex flex-fill align-items-center container '>
      <div className='row align-items-center mb-3'>
        <div className='col align-self-center'>
          <h2 className="text-center b"> Contract Balance</h2>
          <ContractAccount/>
        </div>
        {isLoggedIn ?(
        <div className='col  align-self-center'>
          <h2 className="text-center b">Your Balance</h2>
          <UserAccount/>
        </div>
        ):null}
      </div>
    </div>
   
  );
};

export default Dashboard;
