//eslint-disable-next-line   @typescript-eslint/no-unused-vars
import React  from 'react';


import {
  Account,
  Address,
  IAddress,
  BytesValue,
  Interaction,
  SmartContract,
  TokenPayment,
  TransactionWatcher,
  Struct,
  ResultsParser,
  U64Value,
  AbiRegistry,
  SmartContractAbi,
  } 
from '@elrondnetwork/erdjs';
import { sendTransactions } from '@elrondnetwork/dapp-core/services';
import { NetworkConfig , ProxyNetworkProvider} from '@elrondnetwork/erdjs-network-providers/out';
import { refreshAccount } from '@elrondnetwork/dapp-core/utils';
import {  netProvider } from 'config';



/* eslint @typescript-eslint/no-var-requires: "off" */
const datam = require("./nf_tickets.abi.json");
//console.log(datam);

export async function createInteractor(addressOfUser:Address ,contractAddress?: IAddress): Promise<NfticketInteractor> {
    const registry = AbiRegistry.create(datam);
    const abi = new SmartContractAbi(registry, ["Lottery"]);  
    const contract = new SmartContract({ address: contractAddress,abi: abi });
    const user=new Account(addressOfUser);
    const networkProvider = new ProxyNetworkProvider(netProvider);
    const networkConfig = await networkProvider.getNetworkConfig();
    const interactor = new NfticketInteractor(user,contract, networkProvider, networkConfig);
    return interactor;
}

export class NfticketInteractor {
    private readonly user: Account;
    private readonly contract: SmartContract;
    private readonly networkProvider: ProxyNetworkProvider;
    private readonly networkConfig: NetworkConfig;
    private readonly transactionWatcher: TransactionWatcher;
    private readonly resultsParser: ResultsParser;


    constructor(user: Account,contract: SmartContract, networkProvider: ProxyNetworkProvider,
      networkConfig: NetworkConfig,) {
        this.user = user;
        this.contract = contract;
        this.networkProvider = networkProvider;
        this.networkConfig = networkConfig;
        this.transactionWatcher = new TransactionWatcher(networkProvider);
        this.resultsParser = new ResultsParser();
    }

    
  
    async buy_ticket( pool_name: BytesValue, amount: TokenPayment,
      ticket_qtty:U64Value): Promise<void> {

      const interaction = <Interaction>this.contract.methodsExplicit
        .buy_ticket([
          pool_name,
          ticket_qtty
        ])
        .withGasLimit(5000000)
        .withValue(amount)
        .withNonce(this.user.getNonceThenIncrement())
        .withChainID(this.networkConfig.ChainID);
      
      const transaction = interaction.check().buildTransaction();

      await refreshAccount();
      //eslint-disable-next-line   @typescript-eslint/no-unused-vars
      const {sessionId} = await sendTransactions({
        transactions: transaction,
        transactionsDisplayInfo: {
          processingMessage: 'Buying NFTickets.Please wait...',
          errorMessage: 'An error has occured during transaction',
          successMessage: 'You bought NFTickets.' 
        },
        redirectAfterSign: true,
        callbackRoute: '/nftickets'
      });
      
    }

    async sell_ticket( pool_name: BytesValue, payment: TokenPayment ): Promise<void> {

      const interaction = <Interaction>this.contract.methodsExplicit
        .sell_ticket([
          pool_name
        ])
        .withNonce(this.user.getNonceThenIncrement())
        .withSingleESDTNFTTransfer(payment,this.user.address)
        .withGasLimit(20000000)
        .withChainID(this.networkConfig.ChainID)
      
      const transaction = interaction.check().buildTransaction();
  
      await refreshAccount();
      //eslint-disable-next-line   @typescript-eslint/no-unused-vars
      const {sessionId} = await sendTransactions({
        transactions: transaction,
        transactionsDisplayInfo: {
          processingMessage: 'Selling NFTickets.Please wait...',
          errorMessage: 'An error has occured during transaction',
          successMessage: 'You sold NFTickets'
        },
        redirectAfterSign: true,
        callbackRoute: '/nftickets'
      });
  
    }

    async claimFreeTicket( pool_name: BytesValue): Promise<void> {

      const interaction = <Interaction>this.contract.methodsExplicit
        .claimFreeTicket([
          pool_name
        ])
        .withNonce(this.user.getNonceThenIncrement())
        .withGasLimit(20000000)
        .withChainID(this.networkConfig.ChainID)

      const transaction = interaction.check().buildTransaction();

      await refreshAccount();

      await sendTransactions({
        transactions: transaction,
        transactionsDisplayInfo: {
          processingMessage: 'Claiming Free NFTickets',
          errorMessage: 'An error has occured during transaction',
          successMessage: 'Free NFTickets received.'
        },
        redirectAfterSign: false,
        callbackRoute: '/nftickets'
      });
  
    }

    async getNfticketStatus (poolName: string): Promise<Struct> {

      const interaction = <Interaction>this.contract.methods.getPoolInfo([poolName]);
      const query = interaction.check().buildQuery();

      const queryResponse = await this.networkProvider.queryContract(query);
      const { firstValue } = this.resultsParser.parseQueryResponse(queryResponse, interaction.getEndpoint());

        // Now let's interpret the results.
      const firstValueAsStruct = <Struct>firstValue;
      return firstValueAsStruct;
    }
    
    async ticketInfos (poolName: string):Promise<Struct> {

      const interaction = <Interaction>this.contract.methods.getTicketInfo([poolName]);
      const query = interaction.check().buildQuery();

      const queryResponse = await this.networkProvider.queryContract(query);
      const { firstValue } = this.resultsParser.parseQueryResponse(queryResponse, interaction.getEndpoint());

      const firstValueAsStruct = <Struct>firstValue;
      return firstValueAsStruct;
    }

    async tokenInfos (poolName: string):Promise<Struct> {

      const interaction = <Interaction>this.contract.methods.getPaymentTokenInfo([poolName]);
      const query = interaction.check().buildQuery();

      const queryResponse = await this.networkProvider.queryContract(query);
      const { firstValue } = this.resultsParser.parseQueryResponse(queryResponse, interaction.getEndpoint());

      const firstValueAsStruct = <Struct>firstValue;
      return firstValueAsStruct;
    }
    

    
}

