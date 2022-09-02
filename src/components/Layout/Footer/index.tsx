import React  from 'react';
import { ReactComponent as HeartIcon } from '../../../assets/img/heart.svg';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Footer = () => {
  return (
    <footer className='text-center mt-2 mb-3'>
      <div>
        
        <a
          {...{
            target: '_blank'
          }}
          className='d-flex align-items-center'
          href='https://elrond.com/'
        >
          Made with <HeartIcon className='mx-1' /> by Precious NFTs.
        </a>
      </div>
    </footer>
  );
};

export default Footer;
