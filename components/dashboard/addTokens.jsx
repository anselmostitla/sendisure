import { useAccount } from '@/context/account'
import tokens from '../../constants/tokens.json'
import { useEffect, useState } from 'react'
import Escrow from '../../constants/Escrow'
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";


const AddTokens = ({contractAddress}) => {
  const { account, getContract } = useAccount()

  const [active, setActive] = useState([])
  const [escrowContract, setEscrowContract] = useState()
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    getBasics()
  },[])

  const getBasics = async() => {
    if(account) {
      const escrowContract = await getContract(contractAddress, Escrow.abi)
      setEscrowContract(escrowContract)
    }
    
  }

  const toggleSelectedToken = (i) => {
    let activeValues = active
    if (activeValues[i] == "" ) activeValues[i] = false
    activeValues[i] = !activeValues[i]
    setActive(activeValues)
    setToggle(!toggle)
  }

  const addTokens = async () => {
    const selectedTokens = []
    const selectedAddresses = []
    for(var i=0; i<tokens.length; i++){
      if(active[i]) {
        selectedTokens.push(tokens[i].name)
        selectedAddresses.push(tokens[i].address)
      }
    }
    await escrowContract.addTokens( selectedTokens , selectedAddresses)
  }

  return(
    <div>
        
        <div className="bg-yellow-100 w-[100%] mx-auto border rounded-lg my-10 p-10">
          <div className="text-center py-5 text-2xl font-semibold">To start receiving payments in one or more of these tokens, choose the most suitable tokens for you. </div>
          <div className="p-10 flex justify-between">
            {tokens.map((token,i) => (
              <div key={i} onClick={() => toggleSelectedToken(i)} className="flex items-center hover:cursor-pointer">
                {active[i]? <MdRadioButtonChecked/> : <MdRadioButtonUnchecked/>}
                
                <div className="px-2">{token.name}</div>
                
              </div>
            ))}
          </div>
          <button className="bg-blue-500 py-7 my-5 rounded-md text-2xl w-[100%] flex mx-auto justify-center"
          onClick={() => addTokens()}>
            Add selected tokens
          </button>
        </div>
        
    </div>
  )
}

export default AddTokens




