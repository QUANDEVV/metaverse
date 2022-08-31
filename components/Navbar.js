import { useEffect, useState } from "react";
import { useMetamask, useAddress, useDisconnect } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import { ethers } from "ethers";

export default function Navbar() {
  const [popupState, setPopupState] = useState(false);
  const [balanceState, setBalanceState] = useState("");
  const [networkState, setNetworkState] = useState("");
  const connectMetaMask = useMetamask();
  const address = useAddress();
  const disconnectToWallet = useDisconnect();
  
  const onTriggerPopup = () => setPopupState(!popupState);

  useEffect(() => {
    const handleBalance = async () => {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      // console.log(provider)
      const accounts = await provider.send('eth_requestAccounts', []);
      // console.log(accounts)
      const balance = await provider.getBalance(accounts[0]);
      // console.log(balance)
      const network = await provider._network.name;
      setBalanceState(ethers.utils.formatEther(balance));
      setNetworkState(network);
    }
    handleBalance();
  },[])

  // console.log(balanceState)
  // console.log(networkState)

  const handleDisconnect = () => {
    disconnectToWallet();
    onTriggerPopup();
  }

  return (
    <>
      <header className="border border-l-0 border-r-0 bg-[#1B2129] border-white/10 h-[7vh] flex items-center justify-center fixed top-0 left-0 right-0 opacity-100 z-[2000]">
        <nav className="flex items-center justify-between w-10/12  lg:w-11/12 m-auto">
            <Link href={`/`} passHref><a className="flex items-center"><Image src={`https://raw.githubusercontent.com/thirdweb-dev/typescript-sdk/main/logo.svg`} alt='thirdweb/logo' width={45} height={43} priority decoding="async" objectFit="contain" /> <span className="text-2xl text-slate-300 font-bold ml-2">METAVAS</span></a></Link>
        </nav>
      </header>
     
    </>
  );
};