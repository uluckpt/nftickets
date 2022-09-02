import axios from 'axios';

interface GetLatestTransactionsType {
  apiAddress: string;
  address: string;
  //function:string;
  //contractAddress: string;
  timeout: number;
  page?: number;
  url?: string;
}

const fetchTransactions = (url: string) =>
  async function getTransactions({
    apiAddress,
    address,
    //function,
    //contractAddress,
    //receiver,
    timeout
  }: GetLatestTransactionsType) {
    try {
      const { data } = await axios.get(`${apiAddress}${url}`, {
        params: {
          //sender: address,
          receiver: address,
          status:"success",
          function:"determine_winner",
          withOperations:"true",
          condition: 'must',
          size: 5
        },
        timeout
      });
      console.log(data)
      return {
        data: data,
        success: data !== undefined
      };
    } catch (err) {
      return {
        success: false
      };
    }
  };

export const getTransactions = fetchTransactions('/transactions');
export const getTransactionsCount = fetchTransactions('/transactions/count');
