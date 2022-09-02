/* eslint-disable react/display-name */

import React from 'react';
import {
  faBan,
  faTimes,
  faSackDollar

} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import txStatus from './txStatus';
import { TransactionType } from './types';

interface StatusIconType {
  tx: TransactionType;
 incomingTransaction: boolean;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const StatusIcon = ({ tx }: StatusIconType) => {
  let Icon;
  switch (tx.status) {
    case txStatus.notExecuted:
      Icon = () => <FontAwesomeIcon icon={faBan} className='text-danger' />;
      break;
    case txStatus.fail:
      Icon = () => <FontAwesomeIcon icon={faTimes} className='text-danger' />;
      break;
    case txStatus.success:
      Icon = () => (
        <FontAwesomeIcon
          icon={ faSackDollar} className='text-warning'
        />
      );
      break;
    default:
      Icon = () => (
        
        <FontAwesomeIcon
        icon={ faSackDollar} className='text-dark'
          
        />
      );

  }
  return (
    <i className=' h3 m-3 circle'>
      <Icon />
    </i>
  );
};
export default StatusIcon;
