import React from 'react';
import {  logout } from '@elrondnetwork/dapp-core/utils';
import {   useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import { Navbar as BsNavbar, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';
import { ReactComponent as NfticketLogo } from './../../../assets/img/logom.svg';


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Navbar = () => {
  const { address } = useGetAccountInfo();

  const handleLogout = () => {
    logout(`${window.location.origin}`);
  };
  //console.log(window.location.origin);
  const isLoggedIn = Boolean(address);
  

  return (
    <BsNavbar className='bg-image navbar-dark border-bottom px-1 py-1'>
      <div className='container-fluid'>
        <Link
          className='d-flex align-items-center navbar-brand mr-0'
          to={routeNames.home}
        >
          <NfticketLogo className='nfticket-logo' />
          <span className='dapp-name text-muted'>Home</span>
        </Link>

        
        <Nav className='ml-auto'>
          <NavItem>
            <Nav.Link className='text-muted' href="/dashboard">Dashboard</Nav.Link>
          </NavItem>
          <NavItem>
            <Nav.Link className='text-muted' href="/nftickets">NFTickets</Nav.Link>
          </NavItem>
          <NavItem>
            <Nav.Link className='text-muted' href="/lotteries">Lotteries</Nav.Link>
          </NavItem>
          {isLoggedIn ?(
            <NavItem>
              <button className='btn btn-warning border-dark text-dark' onClick={handleLogout}>
                Logout
              </button>
              
            </NavItem>
          ):
            <NavItem>
                
              <Nav.Link className='btn btn-warning border-dar text-dark' href={'/unlock'}>
                Connect Wallet
              </Nav.Link>
              
            </NavItem>
            

          }
        </Nav>
      </div>
    </BsNavbar>
  );
};

export default Navbar;
