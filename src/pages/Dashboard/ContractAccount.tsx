import  React, { useEffect, useState } from 'react';
import {  FormatAmount,Trim } from '@elrondnetwork/dapp-core/UI';
import { NonFungibleTokenOfAccountOnNetwork, ProxyNetworkProvider } from '@elrondnetwork/erdjs-network-providers/out';
import {  Address } from '@elrondnetwork/erdjs/out';
import { contractAddress , netProvider } from 'config';
import { getAccountBalance } from '@elrondnetwork/dapp-core/utils';
import { useGetNetworkConfig } from '@elrondnetwork/dapp-core/hooks';

// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
const ContractAccount = () => {
  const [nft, setNft] = React.useState<NonFungibleTokenOfAccountOnNetwork[] >();
  const [bal,setBal]= useState("");
  const [tokenList,setTokenList]= useState<IToken[]>([{id:"",balance:0}]);

  const { network } = useGetNetworkConfig();
  const networkProvider = new ProxyNetworkProvider(netProvider);
  const adressOfContract= new Address(contractAddress);
  const contractTokenData:IToken[]=[];

  interface IToken {
    id: string;
    balance:number;
  }

  const balances = async () => { 

    const contractEglds=await getAccountBalance(contractAddress)
    const contractNfts= await networkProvider.getNonFungibleTokensOfAccount(adressOfContract);
    const contractTokens= await networkProvider.getFungibleTokensOfAccount(adressOfContract);

    for (let i = 0; i < contractTokens.length; i++) {

      const tokenDef=  await networkProvider.getDefinitionOfFungibleToken ( contractTokens[i]?.identifier)
      
      const tokens:IToken={
        id: contractTokens[i].identifier,
        balance: contractTokens[i].balance.toNumber()/10**tokenDef.decimals,
      }
      
      contractTokenData.push(tokens)

    }
    const contractTokenList: IToken[] = (
      [
        ...contractTokenData,
      ]
      //eslint-disable-next-line  @typescript-eslint/no-explicit-any
      .filter((el: any) => el !== undefined) as any
    );

    setNft( contractNfts);
    setBal(contractEglds);
    setTokenList(contractTokenList)

  };

  useEffect(()=>{
    
    balances()

  },[bal])
  
  return (
    <div className=" card-responsive card-dashboard my-2 ">
      <div className="card-body ">
        <div className='  py-1' >
          <div className=' mt-1'>
            <h5 className='text-center'>
              <FormatAmount
              value={bal} />
            </h5>
          </div>
          <div className='table-responsive '>
            <h5 className='text-start'>NFTickets </h5>
            <table className='nfts table pb-3'>
              <thead>
                <tr className=''>
                  <th className='border-0 font-weight-normal'>Id</th>
                  <th className='border-0 font-weight-normal'>Balance</th>
                </tr>
              </thead>
              <tbody className='nfticketsList'>
                {nft?.map((blc) => {
                  return (
                    <tr key={blc.identifier  }>
                      <td className='nft-id'> {blc.identifier}</td>
                      <td className='nft-balance'> {blc.supply.toNumber()}</td> 
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className='table-responsive '>
            <h5 className='text-start'>Tokens </h5>
            <table className='tokens table pb-3'>
              <thead>
                <tr className=''>
                  <th className='border-0 font-weight-normal'>Id</th>
                  <th className='border-0 font-weight-normal'>Balance</th>
                </tr>
              </thead>
              <tbody className='tokenList'>
                {tokenList?.map(token => {
                  return (
                    <tr key={token.id}>
                      <td className='token-id'> {token.id}</td>
                      <td className='token-balance'>{(token.balance)} </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className ='text-start'>address : 
            <a
              href={`${network.explorerAddress}/accounts/${contractAddress}`}
                {...{
                  target: '_blank'
                }}
              title='View in Explorer'
              >
              <Trim text={contractAddress} />
            </a>
          </p>
        </div>
      </div>
    </div>
        
   );
  };

export default ContractAccount;

