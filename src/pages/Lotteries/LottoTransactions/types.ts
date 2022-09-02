interface ScResultType {
  callType: string;
  gasLimit: number;
  gasPrice: number;
  nonce: number;
  prevTxHash: string;
  receiver?: string;
  sender: string;
  value: string;
  data?: string;
  returnMessage?: string;
}

export interface OperationsType {
  id:string;
  identifier:string;
  sender:string;
  receiver:string;
  value:string;
  name:string;
}

type TxStatusType = 'pending' | 'notExecuted' | 'success' | 'fail';

export interface TransactionType {
  fee?: string;
  blockHash: string;
  data: string;
  gasLimit: number;
  gasPrice: number;
  gasUsed: string;
  txHash: string;
  miniBlockHash: string;
  nonce: number;
  receiver: string;
  receiverShard: number;
  round: number;
  sender: string;
  senderShard: number;
  signature: string;
  status: TxStatusType;
  timestamp: number;
  value: string;
  scResults?: ScResultType[];
  operations:OperationsType[];
}

export interface StateType {
  transactions: TransactionType[];
  transactionsFetched: boolean | undefined;
}
