
// nfticket contract addrs
export const contractAddress =
  'erd1qqqqqqqqqqqqqpgq07qlehxyzx5lstz3tn85cle5y22ykntmxvtsz6mzp9';

export const lottoContractAddress =
  'erd1qqqqqqqqqqqqqpgqerdnv0ln5h7f2eqesjaltag0addl207nxvtsfcrjz9';

export const dAppName = 'NFTickets';

export const netProvider= "https://devnet-gateway.elrond.com"

export interface ITicket {
    pool_name: string;
    img:string;
  }

export const tickets:ITicket []=[
  {
      pool_name:'--- Select NFTicket Pool ---',
      img: "./logo_son.png",
  },
    
  {
      pool_name:'TestPool1',
      img: "./egld-nftic.png",
  },
      
  {
      pool_name:'TestPool2',
      img: "./usdc-nftic.png",
    }
  
]

export const LotteryNames={
  Lotto1:'TestLotto1',
  Lotto2:'TestLotto2',
  Lotto3:'TestLotto3'
}





