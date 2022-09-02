//eslint-disable-next-line   @typescript-eslint/no-unused-vars
import React, { Component }  from 'react';
//import React from 'react';
import {
  useGetNetworkConfig,
  useGetActiveTransactionsStatus
} from '@elrondnetwork/dapp-core/hooks';
import { PageState } from '@elrondnetwork/dapp-core/UI';
import { refreshAccount } from '@elrondnetwork/dapp-core/utils';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { getTransactions } from 'apiRequestsLotto';
import { lottoContractAddress } from 'config';
import TransactionsList from './TransactionsList';
import { StateType } from './types';

const LottoTransactions = () => {
  const {
    network: { apiAddress }
  } = useGetNetworkConfig();
  console.log(apiAddress)
  const { success } = useGetActiveTransactionsStatus();

  const [state, setState] = React.useState<StateType>({
    transactions: [],
    transactionsFetched: undefined
  });
  const contractAddress=lottoContractAddress;
  const fetchData = () => {
      getTransactions({
        apiAddress,
        address: contractAddress,
        timeout: 3000,
        //contractAddress
      }).then(({ data, success: transactionsFetched }) => {
        refreshAccount();
        setState({
          transactions: data,
          transactionsFetched
        });
      });
  };

  React.useEffect(fetchData, [success]);

  const { transactions } = state;

  return transactions?.length > 0 ? (
    <TransactionsList transactions={transactions} />
  ) : (
    <div className='my-5'>
      <PageState
        icon={faExchangeAlt}
        className='text-muted fa-3x'
        title='No Transactions'
      />
    </div>
  );
};

export default LottoTransactions;