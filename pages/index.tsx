import type { NextPage } from 'next';
import { useState } from 'react';
import { useTokenHolders } from '../hooks';

const Home: NextPage = () => {
  // State for storing the entered contract address
  const [contractAddress, setContractAddress] = useState(
    '0xA808B22ffd2c472aD1278088F16D4010E6a54D5F'
  );
  // Call the custom hook `useTokenHolders` with the entered contract address
  const { holders, loading, error } = useTokenHolders(contractAddress);

  return (
    <div className='p-10 flex flex-col items-center'>
      <h1 className='text-3xl font-bold'>ERC20 token holders viewer</h1>
      <h3 className='text-zinc-700'>
        Powered by{' '}
        <a
          href='https://www.ankr.com/advanced-api/'
          target='_blank'
          rel='noreferrer'
          className='cursor-pointer underline'
        >
          Ankr Advanced APIs
        </a>
      </h3>

      <div className='flex flex-col mt-4'>
        <label className='text-zinc-700' htmlFor='wallet-address'>
          ERC20 Token Contract Address
        </label>
        <input
          id='wallet-address'
          type='text'

          // Input value is set to the current contract address
          value={contractAddress}

          // Update contract address state on input change
          onChange={(e) => setContractAddress(e.target.value)}
          className='rounded p-2 w-[400px] border'
          placeholder='Enter a wallet address here'
        />
      </div>

      {loading && (
        <div className='flex flex-col items-center mt-8'>
          <p className='text-zinc-700'>Loading...</p>
        </div>
      )}

      {holders.length > 0 && !loading && (
        <table className='mt-8'>
          <thead className='p-4 border rounded'>
            <tr>
              <th>Address</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {holders.map((holder) => {
              return (
                <tr key={holder.holderAddress} className='border'>
                  <td className='p-2'>{holder.holderAddress}</td>
                  <td className='p-2'>{holder.balance}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {error && (
        <div className='flex flex-col items-center mt-8'>
          <p className='text-red-700'>
            Error: {JSON.stringify(error, null, 2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
