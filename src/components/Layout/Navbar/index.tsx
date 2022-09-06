import React from 'react';
import {  logout } from '@elrondnetwork/dapp-core/utils';
import {   useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import { Navbar as BsNavbar, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Navbar = () => {
  const { address } = useGetAccountInfo();

  const handleLogout = () => {
    logout(`${window.location.origin}`);
  };
  const isLoggedIn = Boolean(address);
  
  return (
    <BsNavbar className=' bg-image  border-bottom px-1 py-1' expand="lg">
      <div className='container-fluid'>
        <Link
          className='d-flex align-items-center navbar-brand mr-0'
          to={routeNames.home}
        >
          <img className='nfticket-logo p-1' src="./logo_son.png"/>
          <span className='dapp-name text-muted'>dApp on Elrond Network</span>
        </Link>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />  
        <BsNavbar.Collapse  id="basic-navbar-nav">  
          <Nav className='mx-auto align-items-center'>
            <NavItem>
              <Nav.Link className='text-muted' href="/dashboard">Dashboard</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link className='text-muted' href="/nftickets">NFTickets</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link className='text-muted' href="/lotteries">Lotteries</Nav.Link>
            </NavItem>
          </Nav>
        </BsNavbar.Collapse>
          {isLoggedIn ?(
            <NavItem className="ml-auto">
              <button className='btn btn-warning border-dark text-dark' onClick={handleLogout}>
                Logout
              </button>
            </NavItem>
          ):
            <NavItem>
              <Nav.Link className='btn btn-warning border-dark text-dark' href={'/unlock'}>
                Connect Wallet
              </Nav.Link>
            </NavItem>
          }
      </div>
    </BsNavbar>
  );
};

export default Navbar;
