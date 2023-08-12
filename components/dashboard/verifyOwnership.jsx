import { useAccount } from "@/context/account"
import { useEffect, useState } from "react"
import Escrow from '../../constants/Escrow.json'
import { useParams } from "next/navigation"




const VerifyOwnership = ({contractAddress}) => {
  const { account, getContract } = useAccount()

  const [socialLinks, setSocialLinks] = useState()

  useEffect(() => {
    getSocialLinks()
  },[])

  const getSocialLinks = async() => {
    const escrowContract = await getContract(contractAddress, Escrow.abi)
    const socialLinks = await escrowContract.getSocialLinks()
    setSocialLinks(socialLinks)
  }

  return(
    <div className=" rounded-lg space-y-7">
      
      <div className="text-center text-3xl font-extrabold ">
        How to check who owns this Smart Contract?
      </div>

      <div className="">
      In order to create a Smart Contract with SENDISURE, it is necessary to provide at least one social 
      profile to associate this Smart Contract to, otherwise it is not possible to generate any contract
      with SENDISURE.
      </div>
      <div>
        To see who this contract belongs to, simply click on one of the social links below. These links will take 
        you to the respective social network whose profile was associated at the creation of this Smart Contract.
      </div>

      <div className="w-[80%] flex flex-col mx-auto">
        { 
          socialLinks?.map((link, i) => (
            <div className="flex" key={i}>
              {i+1}.- <a href={`${socialLinks[i]}`} target="_blank" className="text-blue-400 hover:underline hover:underline-offset-4 hover:cursor-pointer">{link}</a >
              <span className="text-xs">*</span>
            </div>
          ))
        }        
      </div>


      
      <div>
        Once in the respective social profile, there should be a link to this smart contract in the about or contact
        information which will bring you to this Smart Contract.
      </div>

      <div>
      <span className="text-xs">*</span> The links above were taken directly from the Smart Contract
      </div>



    </div>
  )
}

export default VerifyOwnership