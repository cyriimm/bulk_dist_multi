import {
  refreshWalletPublicKeys,
  useBalanceInfo,
  useWallet,
} from '../utils/wallet';
import { useUpdateTokenName } from '../utils/tokens/names';
import { useCallAsync, useSendTransaction } from '../utils/notifications';
import {Account, LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js';
import { abbreviateAddress, sleep } from '../utils/utils';
import {
  refreshAccountInfo,
  useConnectionConfig,
  MAINNET_URL,
} from '../utils/connection';
import { createAndInitializeMint } from '../utils/tokens';
import {Tooltip, Button, Typography} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import CSVReader from "react-csv-reader";

export default function BulkButtons() {
  const wallet = useWallet();
  const updateTokenName = useUpdateTokenName();
  const { endpoint } = useConnectionConfig();
  const balanceInfo = useBalanceInfo(wallet.publicKey);
  const [sendTransaction, sending] = useSendTransaction();
  const callAsync = useCallAsync();
  const [csv, setCsv] = useState([]);

    const [overrideDestinationCheck, setOverrideDestinationCheck] = useState(
        false,
    );

  let { amount } = balanceInfo || {};

    async function makeTransaction2(address,qt,key,mint,decimal) {
        console.log('these are the decimals')
        let number = parseInt(decimal);


        if (new PublicKey(key).equals(wallet.publicKey)){
            number = balanceInfo.decimals;
        }
        console.log(number);
        let amount = Math.round(parseFloat(qt) * 10 ** number);
        console.log(amount);
        if (!amount || amount <= 0) {
            throw new Error('Invalid amount');
        }

        console.log("COIN");
        return wallet.transferToken(
            key,
            new PublicKey(address),
            amount,
            mint,
            number,
            null,
            overrideDestinationCheck,
        );
    }
    async function sendTransactionAuto(address,qt,key,mint,decimal){

        await sleep(50);
        return await sendTransaction(makeTransaction2(address,qt,key,mint,decimal),address+' - '+qt +" " +qt+ '\n',address+' - '+qt +" " +qt+ '\n');

    }


    async function bulkSend() {
        csv.map(line => {
            try {


                setTimeout(async () => {
                    let [address,amount,key,mint,decimal] = line.map(l => {return l.trim()});
                    console.log(address)
                    //coin = coin.toUpperCase();


                    //console.log(kz)
                    console.log('Above is kz')

                    //let key = kz[coin];
                    // @ts-ignore
                    let key_new=new PublicKey(key)
                    console.log('this is the base 58 key below')
                    console.log(key_new.toBase58())
                    // @ts-ignore
                    let mint_new= new PublicKey(mint)
                    //console.log(key.toBase58())
                    console.log('this is the key')
                    //let mint = mints[coin];
                    //console.log(coin)
                    //Key should come from the file

                    if (!address.toLowerCase().startsWith('0x')) {
                        console.log('txn executing  for ', address);
                        setTimeout(function(){

                            sendTransactionAuto(address,amount,key_new,mint_new,decimal)

                        },5000);

                        console.log('txn executed for ', address);
                    }
                }, 5000)
            } catch (e) {
                console.log('problem with address ', e);
            }
        })

    }


    function upload() {

    callAsync(
        bulkSend(),
      {
        onSuccess: async () => {
        },
        successMessage:
          'Success! ',
      },
    );
  }
  const spacing = 24;
  return (
    <div style={{ display: 'flex', marginLeft: spacing }}>
      <Tooltip
        title={
            'Bulk Upload'
        }
      >
        <span>
            <Typography
                variant="h6"
                style={{
                    flexGrow: 1,
                    fontSize: '1rem',
                    cursor: 'pointer',
                }}
                hover={true}
                component="h2"
            >Upload a CSV bulk file
              </Typography>
          <CSVReader onFileLoaded={(data, fileInfo) =>  setCsv(data)  } />
            <br>
            </br>
          <Button
            variant="contained"
            color="primary"
            onClick={upload}
          >Upload
          </Button>
            <br>
            </br>
        </span>
      </Tooltip>
    </div>
  );
}
