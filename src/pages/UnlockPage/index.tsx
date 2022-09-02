 //eslint-disable-next-line   @typescript-eslint/no-unused-vars
 import React, { Component }  from 'react';
 import { useLocation } from "react-router-dom";
import { useGetLoginInfo } from '@elrondnetwork/dapp-core/hooks';
import {
  ExtensionLoginButton,
  WebWalletLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton,
  
} from '@elrondnetwork/dapp-core/UI';
import { routeNames } from 'routes';

export const UnlockRoute: () => JSX.Element = () => {

  const location = useLocation();
  console.log(location.pathname)
  
  const { isLoggedIn } = useGetLoginInfo();

  React.useEffect(() => {
    if (isLoggedIn) {
      window.location.href = routeNames.nftickets;
    }
  }, [isLoggedIn]);

  return (
    <div className='home d-flex flex-fill align-items-center '>
      <div className='m-auto' data-testid='unlockPage'>
        <div className='card card-lotto bg-crd  my-3 '>
          <div className='card-body  py-4 px-2 px-sm-2 mx-lg-4'>
            <h4 className='text-center'>Pick a Login Method</h4>
            <div className="row row-cols-1 row-cols-md-1 m-2 g-4">
            <div className="card border-warning rounded shadow p-1 mb-1 text-center m-2 ">
              <div className="card-body bg-image">
                <ExtensionLoginButton
                  buttonClassName='border-dark bg-warning text-dark'
                  callbackRoute={routeNames.nftickets }
                  loginButtonText={'Extension'}
                />
              </div>
            </div>
            <div className="card border-warning rounded shadow p-1 mb-1  text-center m-2">
              <div className="card-body bg-image">
                <WebWalletLoginButton
                  buttonClassName='border-dark bg-warning text-dark' 
                  callbackRoute={routeNames.nftickets}
                  loginButtonText={'Web wallet'}
                />
              </div>
            </div>
            <div className="card border-warning rounded shadow p-1 mb-1 text-center m-2">
              <div className="card-body bg-image  ">
                <LedgerLoginButton
                  buttonClassName=' border-dark bg-warning text-dark'
                  loginButtonText={'Ledger'}
                  callbackRoute={routeNames.nftickets}
                  className={'test-class_name'}
                />
              </div>
            </div>
            <div className="card border-warning rounded shadow p-1 mb-1 text-center m-2">
              <div className="card-body bg-image">
                <WalletConnectLoginButton
                  buttonClassName='border-dark bg-warning text-dark'
                  callbackRoute={routeNames.nftickets}
                />
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockRoute;
