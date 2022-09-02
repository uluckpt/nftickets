/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
 //eslint-disable-next-line   @typescript-eslint/no-unused-vars
 import React, { Component }  from 'react';
import {
  useGetNetworkConfig
} from '@elrondnetwork/dapp-core/hooks';
import { Trim } from '@elrondnetwork/dapp-core/UI';
import moment from 'moment';
import StatusIcon from './StatusIcon';
import { TransactionType } from './types';
import { lottoContractAddress } from 'config';

function sortByDate(a: TransactionType, b: TransactionType) {
  if (a.timestamp < b.timestamp) {
    return 1;
  }
  if (a.timestamp > b.timestamp) {
    return -1;
  }
  return 0;
}

const fakeSender =
  'erd000000000000000000000000000000000000000000000000000000000a';

const TransactionList = ({
  transactions
}: {
  transactions: TransactionType[];
}) => {
  const { network } = useGetNetworkConfig();
  const incoming = (sender: string) =>
    sender !== fakeSender && sender ===lottoContractAddress;
  
  const sortedTransactions: TransactionType[] = (
    [
      ...transactions,
    ].filter((el: any) => el !== undefined) as any
  ).sort(sortByDate);

  console.log(sortedTransactions)


  return (
    <div className='p-3 mt-3'>
      <h4 className='mb-3 font-weight-normal'>Winners </h4>
      <div className='table-responsive'>
        <table className='transactions table pb-3'>
          <thead>
            <tr className='bg-light'>
              <th className='border-0 font-weight-normal'></th>
              <th className='border-0 font-weight-normal'>Date</th>
              <th className='border-0 font-weight-normal'>Winner Address</th>
              <th className='border-0 font-weight-normal'>Prize</th>
            </tr>
          </thead>
          <tbody data-testid='transactionsList'>
            {sortedTransactions?.map((tx: TransactionType) => {
              
              const incomingTransaction = incoming(tx.receiver);
              const opss=tx.operations?.filter(ii=>ii.sender===lottoContractAddress);

              return (
                <tr key={tx.timestamp} >
                  <td >
                    <div
                        className='transaction-icon bg-light d-flex align-items-center justify-content-center'
                        title={"winner"}
                        
                    >
                      <StatusIcon
                          tx={tx}
                          incomingTransaction={incomingTransaction} />
                    </div>
                  </td>
                  <td >
                    {moment.unix(tx.timestamp).format('MMM Do YYYY, h:mm A')}
                  </td>
                  {React.Children.toArray(
                    opss?.map((item)=>
                    <><td className='transaction-hash' >
                          <a
                            href={`${network.explorerAddress}/transactions/${item.id}`}
                            {...{
                              target: '_blank'
                            }}
                            title='View in Explorer'
                          >
                            <Trim data-testid='txHash' text={item.receiver} />
                          </a>
                        </td><td className='text-right' >

                            {item.value}{"  " }{item.identifier.substring(0,3)}  

                      </td></>
                     )
                  )}
                   
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='d-flex justify-content-center'>
        <a
          href={`${network.explorerAddress}/address/${lottoContractAddress}`}
          {...{
            target: '_blank'
          }}
        >
          See all transactions
        </a>
      </div>
    </div>
  );
};

export default TransactionList;
