'use client'
import { useAccount } from "@/context/account";
import { useEffect, useState } from "react"
import Escrow from '../constants/Escrow.json'
import { BigNumber } from 'ethers'
import erc20 from '../constants/erc20.json'
import moment from 'moment'




const Hystory = ({contractAddress, toggleHystory, lastTransactionColor}) => {
  const { account, network, getSmartContract} = useAccount()
  
  const [transactions, setTransactions] = useState(true)
  const [yourTransactions, setYourTransactions] = useState(false)
  const [deposites, setDeposites] = useState([])
  const [color, setColor] = useState()
  const [payments, setPayments] = useState()

  useEffect(() => {
    getBasics()
  },[toggleHystory, contractAddress])

  const getDecimals = async (_token) => {
    const tokenContract = await getSmartContract(erc20[network.name][_token].address, erc20.abi, "provider")
    const decimals = await tokenContract.decimals()
    return decimals
  }

  const getBasics = async() => {
    if(!window.ethereum) return
    try {
      const escrowContract = await getSmartContract(contractAddress, Escrow.abi, "provider")
      const nextIdInHex = await escrowContract.getNextId()
      const nextId = BigNumber.from(nextIdInHex["_hex"]).toString()

      const deposites = []
      for (var i=nextId-1; i>= Math.max(0, nextId-15); i--){
        const transaction = {}
        const deposite = await escrowContract.getDeposites(i)
        transaction.id = BigNumber.from(deposite["id"]['_hex']).toString()
        transaction.date = moment(BigNumber.from(deposite["date"]['_hex']).toString()*1000).format("MMMM Do YYYY")
        transaction.user = deposite["user"]
        const decimals = await getDecimals(deposite["token"])
        transaction.amount = BigNumber.from(deposite["amount"]['_hex'])/(1*10**decimals)
        transaction.token = deposite["token"]
        transaction.recipient = deposite["recipient"]
        deposites.push(transaction)
      }
      setDeposites(deposites)    
      setPayments(deposites)
      setColor(lastTransactionColor)
      setTimeout(() => {
        setColor('')
      },1000*60)      
    } catch (error) {
      console.log(error)
    }

  }

  const getTransactions = (filter) => {
    if(filter == undefined) {
      setPayments(deposites)
      setTransactions(true) 
      setYourTransactions(false)
    }
    else if(filter == "account") {
      const payments = []
      for (const deposit of deposites) {
        if(String(deposit.user).toLowerCase() == String(account).toLowerCase()){
          payments.push(deposit)
        }
      }      
      setPayments(payments)      
      setTransactions(false) 
      setYourTransactions(true)
    }
  }

  return(    
    <div className="my-20">
        {(transactions || yourTransactions) &&
        <div className="flex w-[100%] mx-auto mt-5">
          <button onClick={() => ( getTransactions())} 
          className={`lg:text-xl md:text-lg text-sm py-3 px-5 flex justify-start ${transactions? 'bg-green-100':'border border-green-200'}`}>Last transactions</button>
          <button onClick={() => ( getTransactions("account"))} 
          className={`lg:text-xl md:text-lg text-sm py-3 px-5 flex justify-start ${yourTransactions? 'bg-green-100':'border border-green-200'}`}>Your transactions</button>
        </div>
        }

        <div className="flex flex-col w-[100%] mx-auto justify-center overflow-x-auto">    
          <table className="table-auto bg-green-100 w-[100%] ">
            <thead className="">
              <tr className="text-xs ">
                {/* <th scope="col" className="px-6 py-3 text-center "> Transaction Id</th> */}
                <th scope="col" className="px-6 py-3 text-center"> Transfer #</th>
                <th scope="col" className="px-6 py-3 text-center"> Date</th>
                <th scope="col" className="px-6 py-3 text-center">Amount</th>
                <th scope="col" className="px-6 py-3 text-center">Token</th>
                <th scope="col" className="px-6 py-3 text-center ">From</th>
                <th scope="col" className="px-6 py-3 text-center">Destination</th>
              </tr>
            </thead>

            <tbody className="text-xs">
              {
                payments?.map((el,i) => (
                  // (transactions || (yourTransactions && String(el.user).toLowerCase() == String(account).toLowerCase() )) &&
                  <tr className={`${i%2==0? 'bg-green-200':''}`} key={i}>
                    <th scope="col" className={`px-6 py-3 text-center ${i==0 && color}`}>{el.id}</th>
                    <th scope="col" className={`px-6 py-3 text-center ${i==0 && color}`}>{el.date}</th>
                    <th scope="col" className={`px-6 py-3 text-center ${i==0 && color}`}>{el.amount}</th>
                    <th scope="col" className={`px-6 py-3 text-center ${i==0 && color}`}>{el.token}</th>
                    <th scope="col" className={`px-6 py-3 text-center ${i==0 && color}`}>{String(el.user).slice(0,4) + " ... " + String(el.user).slice(-4)}</th>
                    <th scope="col" className={`px-6 py-3 text-center ${i==0 && color}`}>{String(el.recipient).slice(0,4) + " ... " + String(el.recipient).slice(-4)}</th>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        
    </div>
  )
}

export default Hystory