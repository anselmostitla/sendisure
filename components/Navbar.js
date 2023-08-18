'use client'
import { useAccount } from "@/context/account"
import { useEffect, useState } from "react"
import EscrowFactory from '../constants/EscrowFactory.json'
import chainId from '../constants/chainId.json'
import Link from "next/link"



const Navbar = () => {   
  const {account, network, connectWallet, getSmartContract } = useAccount()
  const [isThereAContract, setIsThereAContract] = useState(false)
  

  useEffect(() => {
    getBasics()
  })

  const checkNetwork = async() => {
    
    if(EscrowFactory.network != network?.name){
      await window.ethereum.request({
        method:'wallet_switchEthereumChain',
        // params: [{ chainId: web3.utils.toHex(137) }]
          params: [{ chainId: chainId[EscrowFactory.network] }] // chainId must be in hexadecimal numbers
      })
    }
  }

  const getBasics = async() => {
    if(!window.ethereum) return
    await checkNetwork()

    const contract = await getSmartContract(EscrowFactory.address, EscrowFactory.abi, "provider")
    const idsHistory = await contract.getIdsHistory()
    if(idsHistory.length) setIsThereAContract(true)
    else setIsThereAContract(false)
  }


  return(
    <div className="flex flex-row justify-between shadow-md px-2 py-0 items-center">
      <Link href="/"  className="hover:cursor-pointer flex items-center ">
        <div className="mx-2 text-center py-2">
          <div className="lg:text-3xl md:text-2xl text-xl font-extrabold">SENDI<span className="text-red-700">SURE</span> </div>
          <div className="text-gray-700 text-xs text-right -mr-5 md:uppercase lowercase">EASY CRYPTO PAYMENTS</div>
        </div>
      </Link>
      
      <div className="flex space-x-5">
        {/* <div className="hover:cursor-pointer">Product</div>
        <div className="hover:cursor-pointer">Swap</div>
        <div className="hover:cursor-pointer">Cross-Chain-Swap</div>  */}
      </div>
      <div className="flex items-center space-x-3">
        {
          isThereAContract &&
          <Link href={`/contracts/${account}`} className="mx-3 bg-blue-500 border py-2 px-5 rounded-md text-white
          hover:bg-blue-600 hover:text-lg hover:px-4"
          >
            Dashboard
          </Link>          
        }
        
        <button onClick={() => connectWallet()}
        className="bg-green-500 border border-green-500 text-white py-2 px-2 rounded-md flex space-x-1 items-center
        hover:bg-transparent hover:text-green-500 lg:text-base md:text-sm text-xs">
          {
            account
            ? <div className="flex space-x-1 items-center"><div>{network?.name}</div> <div className="text-sm">|</div><div>{account.slice(0,4) + "..." + account.slice(-3)}</div></div> 
            : <div>{account? account.slice(0,4) + "..." + account.slice(-3) : "Connect Account"}</div>
          }
        </button>
      </div>
    </div>
  )
}

export default Navbar