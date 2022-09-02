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
  EnumValue,
  } 
from '@elrondnetwork/erdjs';
import { refreshAccount } from '@elrondnetwork/dapp-core/utils';
import { sendTransactions } from '@elrondnetwork/dapp-core/services';
import { NetworkConfig , ProxyNetworkProvider} from '@elrondnetwork/erdjs-network-providers/out';
import { netProvider } from 'config';

/* eslint @typescript-eslint/no-var-requires: "off" */
const datam = require("./lotto.abi.json");

export async function createInteractor(addressOfUser:Address ,contractAddress?: IAddress): Promise<LottoInteractor> {
  const registry = AbiRegistry.create(datam);
  const abi = new SmartContractAbi(registry, ["Lottery"]);  
  const contract = new SmartContract({ address: contractAddress,abi: abi });
  const user=new Account(addressOfUser);
  const networkProvider = new ProxyNetworkProvider(netProvider);
  const networkConfig = await networkProvider.getNetworkConfig();
  const interactor = new LottoInteractor(user,contract, networkProvider, networkConfig);
  return interactor;
}


export class LottoInteractor {
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
  
    async buy_ticket( lottery_name: BytesValue, payment: TokenPayment,
      ticket_qtty:U64Value): Promise<void> {

      const interaction = <Interaction>this.contract.methodsExplicit
        .buy_ticket([
          lottery_name,
          ticket_qtty
        ])
        .withNonce(this.user.getNonceThenIncrement())
        .withSingleESDTNFTTransfer(payment,this.user.address)
        .withGasLimit(20000000)
        .withChainID(this.networkConfig.ChainID)
      
      const transaction = interaction.check().buildTransaction();

      await refreshAccount();
       //eslint-disable-next-line   @typescript-eslint/no-unused-vars  
      const {sessionId}=await sendTransactions({
        transactions: transaction,
        transactionsDisplayInfo: {
          processingMessage: 'Processing  transaction',
          errorMessage: 'An error has occured during transaction',
          successMessage: 'Transaction Successfull'
        },
        redirectAfterSign: true,
        callbackRoute: '/lotteries',
        
      });
    }

    async lotteryInfo (lotteryName: string): Promise<Struct> {

      const interaction = <Interaction>this.contract.methods.getLotteryInfo([lotteryName]);
      const query = interaction.check().buildQuery();
      const queryResponse = await this.networkProvider.queryContract(query);
      const { firstValue } = this.resultsParser.parseQueryResponse(queryResponse, interaction.getEndpoint());
        // Now let's interpret the results.
      const firstValueAsStruct = <Struct>firstValue;
      return firstValueAsStruct;
    }

    async lottery_status (lotteryName: string):Promise<string> {

      const interaction = <Interaction>this.contract.methods.status([lotteryName]);
      const query = interaction.check().buildQuery();

      const queryResponse = await this.networkProvider.queryContract(query);
      const { firstValue } = this.resultsParser.parseQueryResponse(queryResponse, interaction.getEndpoint());
      const firstValueAsEnum = <EnumValue>firstValue;
      return firstValueAsEnum.name;
    }
    // eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
    async transffered_prize (lotteryName: string) {

      const interaction = <Interaction>this.contract.methods.getTransferredPrize([lotteryName]);
      const query = interaction.check().buildQuery();

      const queryResponse = await this.networkProvider.queryContract(query);
      const { firstValue } = this.resultsParser.parseQueryResponse(queryResponse, interaction.getEndpoint());
      return firstValue;
    }
    // eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
    async ticket_holders (lotteryName: string) {

      const interaction = <Interaction>this.contract.methods.getTicketHolders([lotteryName]);
      const query = interaction.check().buildQuery();

      const queryResponse = await this.networkProvider.queryContract(query);
      const { firstValue } = this.resultsParser.parseQueryResponse(queryResponse, interaction.getEndpoint());
      return firstValue;
    }

}

