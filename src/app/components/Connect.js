import './Connect.css';
import { useState } from 'react';
import { ethers } from "ethers";

export default function Connect({ setSigner }) {
    const [error, setError] = useState(undefined);
    const connect = async () => {
        if (!window.ethereum) {
            setError("you need to install metamask");
            return;
        }
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            setSigner(signer);
        } catch {
            setError("You need to accept the connection request of Metamask")
        }

    }
    return (
        <div className="text-center">
            <button className="connect-button" onClick={connect}>Connect</button>
            {error && <div className=''>{error}</div>}
        </div>
    );
}