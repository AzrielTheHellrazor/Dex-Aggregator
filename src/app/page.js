"use client"
import Connect from "./components/Connect.js"
import SearchTrade from "./components/SearchTrade.js"
import { Contract } from "ethers";
import { useEffect, useState } from "react";
import blockchain from "./blockchain.json";

export default function Home() {
  /* initialDexes
  {
    name:
    address:
    contract: undefined
  }
  */
  const initialDexes = blockchain.dexes.map(dex => (
    {
      ...dex,
      ...{ contract: undefined },
    }
  ));
  const [signer, setSigner] = useState(undefined);
  const [dexes, setDexes] = useState(initialDexes);
  const [trade, setTrade] = useState(undefined);
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    if (signer) {
      const newDexes = blockchain.dexes.map(dex => (
        {
          ...dex,
          ...{ contract: new Contract(dex.address, blockchain.dexAbi, signer) },
        }
      ));
      setDexes(newDexes);
    }
  }, [signer]);

  return (<>
    (signer = (
    <SearchTrade
      dexes={dexes}
      signer={signer}
      setTrade={setTrade}
      setToken={setToken} />
    ) : <Connect setSigner={setSigner} />)
  </>
  );
}
