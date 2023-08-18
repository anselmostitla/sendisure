"use client"
import { useEffect, useState } from "react"
import { useAccount } from "@/context/account";
import Hystory from '../History'
import Escrow from '../../constants/Escrow.json'
import erc20 from '../../constants/erc20.json'
import { BigNumber } from "ethers";


const Contract = ({contractAddress, currentAccount}) => {
  const { account, network, getSmartContract } = useAccount()

  const defaultPlaceholder = "Click to see address"
  
  const [token, setToken] = useState("")
  const [amount, setAmount] = useState("")
  const [total, setTotal] = useState()
  const [destinationAddress, setDestinationAddress] = useState()
  const [acceptableTokens, setAcceptableTokens] = useState(["-- Select token --"])
  const [socialLinks, setSocialLinks] = useState([])
  const [showProfiles, setShowProfiles] = useState(false)
  const [toAddress, setToAddress] = useState(defaultPlaceholder)
  const [fromAddress, setFromAddress] = useState(defaultPlaceholder)
  // const [colorAddress, setColorAddress] = useState("text-gray-400")
  const [decimals, setDecimals] = useState(0)
  const [isApproved, setIsApproved] = useState()
  const [sleepingTime, setSleepingTime] = useState(1)
  const [toggleChange, setToggleChange] = useState(false)
  const [amountAuthorized, setAmountAuthorized] = useState(0)
  const loadingMsg = Array(5).fill('.')
  const [position, setPosition] = useState("")

  const [isSendingTransaction, setIsSendingTransaction] = useState(false)
  const [toggleSending, setToggleSending] = useState()
  const [previousNextId, setPreviousNextId] = useState()
  const [toggleHystory, setToggleHystory] = useState(false)
  const [lastTransactionColor, setLastTransactionColor] = useState("")


  useEffect(() => {
    getBasics()
    if(window.ethereum){
      window.ethereum.on("accountsChanged", async () => {
        setFromAddress(defaultPlaceholder)
        setToAddress(defaultPlaceholder)
      })      
    }
  },[contractAddress, currentAccount])

  useEffect(() => {
    setTimeout(() => {
      if( isApproved ){
        if( amountAuthorized >= amount ){
          sendTransaction()
          setSleepingTime(1)
          setPosition("")
        }else {
          setToggleChange(!toggleChange)
          checkAllowance()
        }
      }
    },sleepingTime)
  },[toggleChange])

  useEffect(() => {
    setTimeout(async() => {
      if(isSendingTransaction){
        const nextId = await getNextId()
        if(previousNextId == nextId){
          setToggleSending(!toggleSending)
          getNextId()
        }else if(previousNextId == nextId - 1){
          setToggleHystory(!toggleHystory)
          setIsSendingTransaction(false)
          setSleepingTime(1)
          setPosition("")
          resetInputs()
          setLastTransactionColor('text-red-600')
        }
      }
    },sleepingTime)
  },[toggleSending])


  const getBasics = async() => {
    try {
      const escrowContract = await getSmartContract(contractAddress, Escrow.abi, "provider")
      const destinationAddress = await escrowContract.I_RECIPIENT()
      setDestinationAddress(destinationAddress)

      const socialLinks = await escrowContract?.getSocialLinks()
      setSocialLinks(socialLinks)

      let addedTokens = await escrowContract.getTokens()
      const validTokens = ["--Select token--"]
      for(let i=0; i<addedTokens.length; i++){
        validTokens.push(addedTokens[i])
      }    
      setAcceptableTokens(validTokens)      
    } catch (error) {
      console.log(error)
    }

  }

  const settingAmounts = (e) => {
    const amount = e.target.value
    let fee
    if(amount < 10 ) fee = 0.01
    else if( amount >= 10) fee = 0.005
    setAmount(amount)
    setTotal(Number((amount*(1 + fee)).toFixed(2)))
    
  }

  const settingToken = async (e) => {
    const token = e.target.value
    setToken(token)
    if(token != acceptableTokens[0]){  
      const tokenContract = await getSmartContract(erc20[network.name][token]["address"], erc20.abi, "provider")
      const decimals = await tokenContract.decimals()
      setDecimals(decimals)      
    } else if(token == acceptableTokens[0]){
      setDecimals(0)     
    }
  }

  const aprove = async () => {
    try {
      const tokenContract = await getSmartContract(erc20[network.name][token]["address"], erc20.abi, "signer") 
      const convertedAmount = total*10**decimals      
      await tokenContract.approve(contractAddress, convertedAmount.toString())
      setIsApproved(true)
      setSleepingTime(500)
      setToggleChange(!toggleChange)
      setPosition(0)
    } catch (error) {
      console.log(error)
    }
  }

  const checkAllowance = async() => {
    try {
      const tokenContract = await getSmartContract(erc20[network.name][token]["address"], erc20.abi, "signer")
      // const decimals = await tokenContract.decimals()
      const amountAuthorizedObj = await tokenContract.allowance(account, contractAddress)
      const amountAuthorized = BigNumber.from(amountAuthorizedObj["_hex"]).toString()/(1*10**decimals)
      setAmountAuthorized(amountAuthorized)  
      if( position < loadingMsg.length-1) setPosition(position+1)
      else setPosition(0)
    } catch (error) {
      console.log(error)
    }
  }

  const sendTransaction = async () => {
    try {
      const convertedAmount = amount*10**decimals
      const convertedTotal = total*10**decimals
      const convertedFeeRecipient = (convertedTotal - convertedAmount)/2
      const convertedFeeSendisure = (convertedTotal - convertedAmount - convertedFeeRecipient)
      console.log("total sum: ", convertedAmount + convertedFeeRecipient + convertedFeeSendisure)
      const escrowContract = await getSmartContract(contractAddress, Escrow.abi, "signer")
      const previousNextIdObj = await escrowContract.getNextId()
      const previousNextId = BigNumber.from(previousNextIdObj["_hex"]).toString()

      await escrowContract.toRecipient(token, convertedAmount.toString(), convertedFeeRecipient.toString(), convertedFeeSendisure.toString())

      
      setPreviousNextId(previousNextId)
      setIsSendingTransaction(true)  
      setIsApproved(false)
      setSleepingTime(1000)
      setPosition(0)
      getNextId()
      setToggleSending(!toggleSending)

    } catch (error) {
      console.log(error)
    }
  }

  const getNextId = async () => {
    const escrowContract = await getSmartContract(contractAddress, Escrow.abi, "provider")
    const nextIdObj = await escrowContract.getNextId()
    const nextId = BigNumber.from(nextIdObj["_hex"]).toString()
    if( position < loadingMsg.length-1) setPosition(position+1)
    else setPosition(0)
    return nextId
  }


  const resetInputs = () => {
    setFromAddress(defaultPlaceholder)
    setToAddress(defaultPlaceholder)
    setToken(acceptableTokens[0])
    setAmount("")
  }


  return(
    <div className="">
      <div className=" w-[100%]">
        <div className="lg:text-5xl md:text-4xl text-2xl font-extrabold text-center bg-blue-100 my-5 lg:py-8 md:py-5 py-3">
          SENDISURE Smart Contract
        </div>

        <div className="bg-blue-100 my-5 py-5 flex flex-col lg:px-10 md:px-6 px-4 space-y-5">
          <div className="lg:text-3xl md:text-2xl text-lg font-extrabold mt-10">
            1.- <span className="lg:text-2xl md:text-xl text-base lg:px-3 md:px-2 px-1">FROM and DESTINATION addresses</span>
          </div>
          
          <div className="flex flex-col">
            <div>
              <div className="flex justify-start text-xl py-2 items-center">
                From Address <span className="text-xs px-1 items-center">*</span>
              </div>                   
            </div>

            <div className={`py-2 bg-white flex flex-1 outline-none items-center md:px-5 px-3 lg:text-base md:text-sm text-xs overflow-x-auto
            ${fromAddress != account? "text-gray-400": "text-blue-700"}`} 
            onClick={() => setFromAddress(account || "Please install metamask") }>
              {fromAddress}   
            </div>
          </div>
          

          <div className="flex flex-col">
            <div>
              <div className="flex justify-start text-xl py-2 items-center">
                Destination Address <span className="text-xs px-1 items-center">**</span>
              </div>                   
            </div>

            <div className={`py-2 bg-white flex flex-1 outline-none items-center md:px-5 px-3 lg:text-base md:text-sm text-xs overflow-x-auto
            ${toAddress != destinationAddress? "text-gray-400": "text-green-600"}`} 
            onClick={() => setToAddress(destinationAddress || "Please install metamask...") }>
              {toAddress}
            </div>
          </div>

          
            
            <div className={`flex ${( toAddress != defaultPlaceholder && 
              String(toAddress).toLowerCase() == String(fromAddress).toLowerCase() &&
              String(currentAccount).toLowerCase()==String(destinationAddress).toLowerCase() )? 'flex': 'invisible'}`}>
                Upps! Both Addresses are the same... please, change your current connected account. 
            </div>
          

          <div className="pt-5 pb-3">
            <div className="flex space-x-2 text-xs">
              <div className="w-5 flex justify-end">*</div> <div>This address is the current connected account</div>
            </div>
            <div className="flex space-x-2 text-xs">
              <div className="w-5 flex justify-end">**</div> <div>This is the address of the owner of the Smart Contract</div>
            </div>            
          </div>

          

        </div>

        <div className="flex flex-col mx-auto bg-blue-100 w-[100%] lg:p-10 md:p-6 p-3 rounded-md space-y-5">

          <div className="lg:text-3xl md:text-2xl text-xl text-left py-10 font-extrabold">
            2.- <span className="lg:text-2xl md:text-xl text-lg px-3">SEND YOUR CRYPTO SECURELY</span>
          </div>    
          
          <div className="flex flex-col lg:text-xl md:text-base text-sm">
            <label htmlFor="" className="">Token</label>
            {!account && 
              <input type="text" placeholder="--Select token--" value={token} className="py-2 px-5 outline-none lg:text-base md:text-sm text-xs"/>
            }
            {account &&
              <select onChange={(e) => settingToken(e)} name="token" id="" value={token} className="py-2 outline-none px-5 lg:text-base md:text-sm text-xs" >
                {acceptableTokens.map((token,i) => (     
                  <option value={token} key={i}>
                    {token}
                  </option>
                ))}
              </select>
            }
            

          </div>

          <div className="flex flex-col lg:text-base md:text-sm text-xs ">  
            <label htmlFor="" className="  flex">Amount <span className="text-sm items-start">*</span> </label>
            <input type="number" step='any' placeholder="eg. 100" className="py-2 px-5 outline-none " value={amount} onChange={e => settingAmounts(e)} />
          </div>

          <div className={`${Number(amount)? 'hidden':'flex flex-col '}`}>
            <div className="text-xs">
              * A fee of 0.5% for amounts greater than 10 (of selected token)
            </div>
            <div className="text-xs mt-1">
              * A fee of 1% for amounts less than 10 (of selected token)
            </div>            
          </div>


          <div className={`lg:w-[80%] md:w-[90%] w-[100%] mx-auto lg:text-base md:text-sm text-xs ${Number(amount)? 'flex flex-col':'hidden'}`}>
            {/* <div>Amount to approve to the smart contract</div> */}
            <div>*To proceed, first you need to approve, on your METAMASK <span className="text-red-500 px-1"> { Number(amount)? total : "" } </span>{token}</div>
          </div>

          <div className={`py-7 flex-col ${(isApproved || isSendingTransaction)? 'flex':'invisible'}`}>
            <div className={`text-2xl justify-center ${(isApproved || isSendingTransaction)? 'flex':'invisible'}`}>
              {isApproved? 'Approving Amount': ( isSendingTransaction? 'Sending Transaction':'' )}
            </div>

            <div className={`flex text-6xl justify-center font-extrabold space-x-2 ${position>=0? 'flex':'invisible'}`}>
              {loadingMsg?.map((el,i)=>(
                <div key={i} className={`-mt-7 ${position == i? 'text-black': 'text-gray-300'}`}>{el}</div>
              ))}
            </div>
          </div>


          <button className={`bg-green-500 rounded-md px-5 py-5 text-white text-lg font-semibold 
          ${(isApproved || isSendingTransaction)? 'bg-green-200': 'hover:bg-green-600'}`}
          onClick={() => aprove()} disabled = {isApproved || isSendingTransaction}>
            {/* Send Tokens */}
            Approve
          </button>

          <div className="text-center text-xs pt-5 overflow-x-auto">
            Smart Contract Audited: {contractAddress}
          </div>

        </div>

        {
          !showProfiles &&
          <div className="w-[100%] flex mx-auto justify-end my-2 ">
            <div className="text-xs flex space-x-2">
              <div>Smart Contract Owner: </div>
              <div className="flex flex-col">
                <a href={`${socialLinks[0]}`} target="_blank" className="text-blue-400 hover:underline hover:underline-offset-4">
                  { socialLinks[0]}
                </a>
              </div>
              <div onClick={() => setShowProfiles(true)} className="text-gray-500 hover:cursor-pointer">...see more</div>
            </div>
          </div>          
        }


        {showProfiles && 
          <div className="border rounded-lg p-5 my-3 w-[100%] flex flex-col mx-auto space-y-5">
            <div className="text-2xl font-semibold">
              Smart contract creator social links
            </div>
            <div className="flex flex-col space-y-3 text-gray-600 text-sm">
              {socialLinks.map((el,i) => (
                <a href={`${socialLinks[i]}`} target="_blank" key={i} className="hover:underline hover:underline-offset-4">
                  {socialLinks[i]}
                </a>
              ))}
            </div>
            <div  onClick={() => setShowProfiles(false)} className="flex justify-end text-xs hover:cursor-pointer">see less</div>
          </div>
        }


      </div>     
      <Hystory contractAddress={contractAddress} toggleHystory={toggleHystory} lastTransactionColor={lastTransactionColor}/> 
    </div>

  )
}

export default Contract