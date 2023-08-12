import { useEffect, useState } from "react"
import BtnAddTokens from "./btnAddTokens"




const AddSocialLinks = ({contractAddress}) => {

  const socialNetworks = ["-- select network -- ","Facebook", "Twitter", "LinkedIn", "Instagram"]

  const socialPlaceholders = {
    "Facebook": "https://www.facebook.com/john.../",
    "Twitter": "https://twitter.com/paul...",
    "LinkedIn": "https://www.linkedin.com/in/smith.../",
    "Instagram": "https://www.instagram.com/michael.../"
  }

  const [inputFields, setInputFields] = useState([0])
  const [socialNames, setSocialNames] = useState([])
  const [socialLinks, setSocialLinks] = useState([])

  useEffect(() => {

  },[socialNames, socialLinks])

  const addInputField = () => {
    const tempInputFields = [...inputFields]
    tempInputFields.push(tempInputFields.length)
    setInputFields(tempInputFields)
  }

  const addSocialName = (e, k) => {
    const tempSocialNames = [...socialNames]
    tempSocialNames[k] = e.target.value
    setSocialNames(tempSocialNames)
  }

  const addSocialLink = (e,k) => {
    const tempSocialLinks = [...socialLinks]
    tempSocialLinks[k] = e.target.value
    setSocialLinks(tempSocialLinks)
  }


  return(
    <div >
        <div className="flex flex-col mx-auto bg-green-500 p-10 rounded-lg space-y-3">
          
          <div className="text-2xl flex justify-center py-5 font-extrabold">ADD AT LEAST ONE SOCIAL NETWORK LINK</div>
          <div className="text-lg flex justify-center py-5">
            Your social network links will be save into your Smart Contract and they will be shown in the web page of your Smart Contract.
          </div>  
          <div>
            By clicking into one of these social links, 
            your users will be taken to your respective social network profile,
            so they will be able to recognize they are in the right page with the right Smart Contract that trully belongs to you. 
          </div>

          <div className="text-lg flex text-left py-5">
            And vice versa, you can add the link to your smart contract, in your different social networks.
          </div>

          {
            inputFields.map((input,k) => (
              <div key={k} className="flex my-2">
                <select onChange={e => addSocialName(e, k)} name="" id="" className="py-3 rounded-lg outline-none px-5 mr-5">
                  {socialNetworks.map((el,i) => (
                    <option key={i} value={el}>{el}</option>
                  ))}
                </select>
                <input onChange={e => addSocialLink(e, k)} placeholder={socialPlaceholders[socialNames[k]]} className="py-3 rounded-lg outline-none px-5 w-full"/>
              </div>              
            ))
          }


          <button onClick={() => addInputField()} className="bg-black border border-black rounded-lg text-white px-5 py-5 hover:bg-gray-800">
            Add another option for social network
          </button>
          {console.log("socialNamesAA: ", socialNames)}
          
          <BtnAddTokens socialNames = {socialNames} socialLinks={socialLinks} />

          <label htmlFor="" className="mt-10 flex justify-center">See preview</label>

        </div>
        
    </div>
  )
}

export default AddSocialLinks