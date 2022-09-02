//eslint-disable-next-line   @typescript-eslint/no-unused-vars
//import React, { Component }  from 'react';
import React from 'react';
import {
  AuthenticatedRoutesWrapper,
} from '@elrondnetwork/dapp-core/wrappers';
import { useLocation } from 'react-router-dom';
import routes, { routeNames } from 'routes';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { search } = useLocation();
  return (
    <div className='d-flex flex-column flex-fill wrapper'>
      <Navbar />
      <main className='d-flex flex-column flex-grow-1 '>
      <div style={{ 
        backgroundImage: "url(/back3.jpg)",
        backgroundRepeat: 'no-repeat',
        backgroundSize :'cover'
        
      }}>
        <AuthenticatedRoutesWrapper
          routes={routes}
          unlockRoute={`${routeNames.unlock}${search}`}
        >
          {children}
        </AuthenticatedRoutesWrapper>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
