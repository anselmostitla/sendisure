'use client'
import { createContext, useContext, useEffect, useState } from "react"
import { ethers } from 'ethers'


const accountContext = createContext()
export const useAccount = () => {
  return useContext(accountContext)
}

export const AccountProvider = ({children}) => {
  const [account, setAccount] = useState()
  const [network, setNetwork] = useState()
  // const []

  const connectWallet = async () => {
    if(!window.ethereum) return
    if(typeof window.ethereum != undefined && typeof window.ethereum.request != undefined){
      const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
      setAccount(accounts[0])
    }
  }

  const isWalletConnected = async () => {
    if(!window.ethereum) return
    if(typeof window.ethereum != undefined && typeof window.ethereum.request != undefined){
      const accounts = await window.ethereum.request({method: "eth_accounts"})
      setAccount(accounts[0])
    }

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload()
    })

    window.ethereum.on("accountsChanged", async () => {
      await isWalletConnected()
    })
  }

  const getContract = (_address, _abi) => {
    if(!window.ethereum) return
    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(_address, _abi, signer)
    return contract      
  }

  const getSmartContract = (_address, _abi, signerOrProvider) => {
    if(!window.ethereum) return
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      let contract
      if(signerOrProvider == "signer") {
        contract = new ethers.Contract(_address, _abi, provider.getSigner())  
      }
        
      else if(signerOrProvider == "provider") {
        contract = new ethers.Contract(_address, _abi, provider)
      }
      return contract      
    } catch (error) {
      console.log(error)  
    }

  }

  const getNetwork = async() => {
    if(!window.ethereum) return
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const network = await provider.getNetwork()
    setNetwork(network)
  }

  useEffect(() => {
    getNetwork()
    isWalletConnected()
  },[account])


  const data = { account, network, connectWallet, isWalletConnected, getContract, getSmartContract }

  return(
    <accountContext.Provider value = {data}>
      {children}
    </accountContext.Provider>
  )
}