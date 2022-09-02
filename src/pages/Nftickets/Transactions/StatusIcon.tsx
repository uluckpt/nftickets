/* eslint-disable react/display-name */

import React from 'react';
import {
  faArrowUp,
  faArrowDown,
  faBan,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import txStatus from './txStatus';
import { TransactionType } from './types';

interface StatusIconType {
  tx: TransactionType;
  incomingTransaction: boolean;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const StatusIcon = ({ tx, incomingTransaction }: StatusIconType) => {
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
          icon={incomingTransaction ? faArrowUp : faArrowDown}
          className='text-secondary'
        />
      );
      break;
    default:
      Icon = () => (
        
        <FontAwesomeIcon
          icon={incomingTransaction ? faArrowUp : faArrowDown}
          className='text-secondary' 
          
        />
      );

  }
  return (
    <i className='m-3 circle'>
      <Icon />
    </i>
  );
};
export default StatusIcon;
