"use client"
import { useState } from 'react';
import { Contract } from 'ethers';
import blockchain from "../blockchain.json";

export default function SearchTrade({ dexes, signer, setTrade, setToken }) {
    const [tokenIn, setTokenIn] = useState("");
    const [tokenOut, setTokenOut] = useState("");
    const [amountOut, setAmountOut] = useState("");

    const search = async e => {
        e.preventDefault();
        const calls = dexes.map(dex => (
            dex.contract.getAmountsIn(
                amountOut,
                [tokenIn, tokenOut]
            )

        ));
        const quotes = await Promise.all(calls);
        const trades = quotes.map((quote, i) => (
            {
                address: dexes[i].address,
                amountIn: quote[0],
                amountOut,
                tokenIn,
                tokenOut,
            }
        ));
        trades.sort((trade1, trade2) => (trade1.amountIn < trade2.amountIn ? -1 : 1))
        console.log(trades[0].amountIn.toString());
        console.log(trades[0].amountIn.address);
        console.log(trades[1].amountIn.toString());
        console.log(trades[2].amountIn.toString());
        setTrade(trades[0]);
        const token = new Contract(tokenIn, blockchain.erc20Abi, signer);
        setTokenIn(token)
    }
    return (
        <form onSubmit={search}>
            <div className="form-floating">
                <input
                    type="text"
                    className="form-control"
                    id="tokenIn"
                    placeholder="0xUi899..."
                    onChange={e => setTokenIn(e.target.value)}
                    value={tokenIn}
                />
                <label htmlFor="tokenIn">Address of token sold</label>
            </div>
            <div className="form-floating">
                <input
                    type="text"
                    className="form-control"
                    id="tokenOut"
                    placeholder="0xUi899..."
                    onChange={e => setTokenOut(e.target.value)}
                    value={tokenOut}
                />
                <label htmlFor="tokenOut">Address of token bought</label>
            </div>
            <div className="form-floating">
                <input
                    type="text"
                    className="form-control"
                    id="amountOut"
                    placeholder="0xUi899..."
                    onChange={e => setAmountOut(e.target.value)}
                    value={amountOut}
                />
                <label htmlFor="amountOut">Address of token amount</label>
            </div>
            <button type="submit" className='buton-class'>Submit</button>
        </form>
    );
}