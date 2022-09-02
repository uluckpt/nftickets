import  React, { useEffect, useState } from 'react';
import {  FormatAmount } from '@elrondnetwork/dapp-core/UI';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import {  NonFungibleTokenOfAccountOnNetwork, ProxyNetworkProvider } from '@elrondnetwork/erdjs-network-providers/out';
import { Address } from '@elrondnetwork/erdjs/out';
import { netProvider,  } from 'config';

// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
const UserAccount = () => {
  const [data, setData] = React.useState<NonFungibleTokenOfAccountOnNetwork[] >();
  const [tokenList,setTokenList]= useState<IToken[]>();

  interface IToken {
    id: string;
    balance:number;
  }
  
  const { account } = useGetAccountInfo();
  const addressOfUser = new Address(account.address);
  const networkProvider = new ProxyNetworkProvider(netProvider);
  const user_egld_balance= account.balance;
  const userTokenData:IToken[]=[];

  const balances = async () => { 

    const userNfts= await networkProvider.getNonFungibleTokensOfAccount(addressOfUser);
    
    const userToken= await networkProvider.getFungibleTokensOfAccount(addressOfUser);

    for (let i = 0; i < userToken.length; i++) {

      const tokenDef=  await networkProvider.getDefinitionOfFungibleToken ( userToken[i]?.identifier)

      const tokens:IToken={
        id: userToken[i].identifier,
        balance: userToken[i].balance.toNumber()/10**tokenDef.decimals,
      }
      userTokenData.push(tokens)
    }
    const userTokenList: IToken[] = (
      [
        ...userTokenData,
      ]
       //eslint-disable-next-line  @typescript-eslint/no-explicit-any
      .filter((el: any) => el !== undefined ) as any
    );

    setData( userNfts);
    setTokenList(userTokenList)

  };
  console.log(tokenList)
  useEffect(()=>{

    balances()

  },[user_egld_balance])

  return (

    <div className='  py-1' data-testid='topInfo'>
      <div className='mb-1'>
        <h5 className='text-center '>
        <FormatAmount
          value={account.balance} /></h5>
      </div>
      <div className=' mt-1'>
        <h5 className='text-start'>Your Tokens </h5>
      </div>
      <div className='table-responsive '>
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
                  <td className='token-balance'>{token.balance}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='table-responsive mt-1 '>
      <h5 className='text-start'>Your NFTs :</h5>
        <table className='nfts table pb-3'>
          <thead>
            <tr className=''>
              <th className='border-0 font-weight-normal'>Id</th>
              <th className='border-0 font-weight-normal'>Balance</th>
            </tr>
          </thead>
          <tbody data-testid='transactionsList'>
            {data?.map((nft) => {
              return (
                <tr key={nft.identifier  }>
                  <td className='nft-id'> {nft.identifier}</td>
                  <td className='nft-balance'> {nft.supply.toNumber()}</td> 
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className ='text'>address :{account.address}</p>
    </div>
  );
};

export default UserAccount;

