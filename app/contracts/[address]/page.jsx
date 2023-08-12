'use client'
import { useAccount } from '../../../context/account'
import Navbar from '../../../components/Navbar'
import Footer from "@/components/footer"
import { useEffect, useState } from 'react'
import {ethers, BigNumber} from 'ethers'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import EscrowFactory from '../../../constants/EscrowFactory.json'



const Contracts = () => {
  const {account, getContract} = useAccount()
  const router = useRouter()

  const [smartContracts, setSmartContracts] = useState([])

  useEffect(() => {
    getSmartContracts()
  },[account])

  const getSmartContracts = async() => {
  
    if(account){
      const currentEscrowFactory = await getContract(EscrowFactory.address, EscrowFactory.abi)
      
      let smartContracts = []    
      const idsHistoryBig = await currentEscrowFactory.getIdsHistory()

      for( var i=0; i< idsHistoryBig.length; i++){
        const currentId = BigNumber.from(idsHistoryBig[i]).toString() 
        
        const currentEscrowContract = await currentEscrowFactory.getContract(currentId)
        smartContracts.push(currentEscrowContract)
      }
      setSmartContracts(smartContracts)      
    }
  }


  return(
    <div>
      <Navbar />
      <main className='min-h-screen flex flex-col w-[80%] mx-auto'>
        
        <div className="text-left text-5xl font-extrabold my-20">
          Smart Contracts
        </div>

        <div className='flex justify-end'>
          <button className='bg-blue-500 rounded-lg px-5 py-3 text-white hover:bg-blue-600' >  
            <Link href='/generate'>
              Create A New Smart Contract
            </Link>
            
          </button>
        </div>

        <div className='bg-gray-300 shadow-sm h-1 my-5'>
        </div>


        <div className="flex flex-wrap w-[100%] mx-auto my-10 mb-20">
          {smartContracts?.map((smartContract) => (
            <div  key={smartContract.contractId}
            className="w-[100%] border-2 p-5 m-2 bg-gray-100"
            >
              <div>Contract Id: {BigNumber.from(smartContract.contractId["_hex"]).toString()}</div>
              {/* <div>Address: {smartContract.contractAddress.slice(0,4) + "..." + smartContract.contractAddress.slice(-5)}</div> */}
              <div>Contract Address: {smartContract.contractAddress}</div>
              <div>Created on: {moment(BigNumber.from(smartContract.createdAt["_hex"])*1000).format("dddd,MMMM Do YYYY")} </div>
              Route: <Link href={`/${smartContract.route}`}  className='text-blue-500'>{`https://www.sendisure.com/${smartContract.route}`}</Link >
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Contracts