import { useAccount } from '@/context/account'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Escrow from '../../constants/Escrow.json'

const BtnAddTokens = ({socialNames, socialLinks}) => {
  const {account, getContract} = useAccount()   
  const params = useParams()

  const [toggleUploadAgain, setToggleUploadAgain] = useState(false)
  const [failedAttemps, setFailedAttemps] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      uploadUntilAccount()
    },500)
  },[toggleUploadAgain, account])

  const uploadUntilAccount = () => {
    if(!account && failedAttemps<15){
      setToggleUploadAgain( !toggleUploadAgain )
      setFailedAttemps(failedAttemps+1)
    }
    else if (account) {      
    }
  }



  const addSocials = async() => {
    const escrowContract = await getContract(params.address, Escrow.abi)
    await escrowContract.addSocialLink(socialNames, socialLinks)
  }

  

  return(
    <div className="w-full bg-blue-500 border border-blue-500 rounded-lg py-5 px-5  text-white text-center font-bold
    hover:bg-blue-600"
    onClick={() => addSocials()}
    >
      Add social links to Smart Contract
    </div>
  )
}

export default BtnAddTokens