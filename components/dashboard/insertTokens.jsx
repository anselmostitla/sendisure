import { useEffect, useState } from 'react'
import tokens from '../../constants/tokens.json'
import { useAccount } from '@/context/account'
import Escrow from '../../constants/Escrow.json'
import { useParams } from 'next/navigation'



const InsertTokens = ({contractAddress}) => {
  const { account, getContract } = useAccount()

  const [currentTokens, setCurrentTokens] = useState(tokens)
  const [tokensInTheSmartContract, setTokensInTheSmartContract] = useState()
  const [toggleUploadAgain, setToggleUploadAgain] = useState()
  const [failedAttemps, setFailedAttemps] = useState()

  useEffect(() => {
    setTimeout(() => {
      uploadUntilAccount()
    },500)
  },[toggleUploadAgain, account])

  const uploadUntilAccount = () => {
    if(!account && failedAttemps<10){
      setToggleUploadAgain( !toggleUploadAgain )
      setFailedAttemps(failedAttemps+1)
    }
    else if (account) {    
      getBasics()  
    }
  }

  const getBasics = async() => {
    const escrowContract = await getContract(contractAddress, Escrow.abi)
    const tokensInTheSmartContract = await escrowContract.getTokens()
    setTokensInTheSmartContract(tokensInTheSmartContract)

    const tempCurrentTokens = [...currentTokens]
    for (let i = 0; i < tempCurrentTokens.length; i++) {
      if(!tokensInTheSmartContract.includes(tempCurrentTokens[i].symbol)){
        tempCurrentTokens[i].isInSmartContract = !tempCurrentTokens[i].isInSmartContract
      }
    }
    setCurrentTokens(tempCurrentTokens)
  }

  const selectTokens = (i) => {
    const tempTokens = [...currentTokens]
    tempTokens[i].selected = !tempTokens[i].selected
    setCurrentTokens(tempTokens)
  }

  const addTokens = async() => {
    const escrowContract = await getContract(contractAddress, Escrow.abi)
    const tempNames = []
    const tempAddresses = []
    for (const token of currentTokens) {
      if(token.selected){
        tempNames.push(token.symbol)
        tempAddresses.push(token.address)
      }
    }
    // console.log("tempNames: ", tempNames)
    // console.log("tempAddresses: ", tempAddresses)
    await escrowContract.addTokens(tempNames, tempAddresses)
  }


  return(
    <div>
      <div className="bg-pink-200 space-y-5 w-[100%] flex flex-col mx-auto p-20 my-1">
        <div className="text-3xl font-extrabold uppercase text-center">
          Current tokens in which you can receive crypto
        </div>
        <div className='flex'>
          {
            tokensInTheSmartContract?.map((token,i) => (
              <div className='border border-red bg-red-500 text-white px-5 py-2 rounded-xl mx-2' key={i}>
                {token}
              </div>
            ))
          }
        </div>


      </div>
      <div className="bg-pink-200 space-y-5 w-[100%] flex flex-col mx-auto p-20 my-6">
        <div className="text-3xl font-extrabold uppercase text-center">
          Do you want to add more tokens to receive more crypto?
        </div>
        <div className='text-xl pt-10'>
          Select at least one token
        </div>
        <div className="flex flex-wrap py-6">    
          {
            currentTokens?.map((el,i) => (
              el.isInSmartContract &&
              <button className= {`rounded-lg border border-red-500 px-5 py-1 mx-3 my-1 ${currentTokens[i].selected && `bg-red-500 text-white `}`} key={i}
              onClick={() => selectTokens(i)}>
                {el.symbol}
              </button>
            ))
          }
        </div>
        <div className="flex flex-col">
          <span className="text-xs">* You can add as much tokens as you want.</span>
          <span className="text-xs">+ Later, you can add more tokens.</span>          
        </div>

      </div>  
      <div className="flex justify-center my-10">
        <button className={`bg-red-500 rounded-lg text-white font-bold py-6 w-[100%]
        hover:bg-red-600`} onClick={() => addTokens()}>
          Add Selected Tokens
        </button>        
      </div>    
    </div>

    
  )
}

export default InsertTokens