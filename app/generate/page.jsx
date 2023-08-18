'use client'
import Navbar from "@/components/Navbar"
import { useEffect, useState } from "react"
import tokens from '../../constants/tokens.json'
import { useAccount } from "@/context/account"
import EscrowFactory from '../../constants/EscrowFactory.json'
import { useRouter } from "next/navigation"
import Footer from "@/components/footer"
import { MdClose } from "react-icons/md";
import erc20 from "../../constants/erc20.json"
import Link from "next/link"




const Generate = () => {
  const { account, getContract, network } = useAccount()
  const router = useRouter()

  const defaultSocials = [{"name":"facebook", "link":"", "active":false, "placeholder":"https://..." },
                  {"name":"twitter", "link":"", "active":false, "placeholder":"https://..." },
                  {"name":"linkedin", "link":"", "active":false, "placeholder":"https://..." },
                  {"name":"instagram", "link":"", "active":false, "placeholder":"https://..." },
                  {"name":"tiktok", "link":"", "active":false, "placeholder":"https://..." },
                  {"name":"pinterest", "link":"", "active":false, "placeholder":"https://..." },
                  {"name":"tumblr", "link":"", "active":false, "placeholder":"https://..." },
                  {"name":"Reddit", "link":"", "active":false, "placeholder":"https://..." },
                  {"name":"snapchat", "link":"", "active":false, "placeholder":"https://..." },
                  {"name":"discord", "link":"", "active":false, "placeholder":"https://..." },
                  {"name":"wechat", "link":"", "active":false, "placeholder":"https://..." },
                  {"name":"twitch", "link":"", "active":false, "placeholder":"https://..." },]

  const [socials, setSocials] = useState(defaultSocials)
  const [selectedSocials, setSelectedSocials] = useState([])   
  const [personalRoute, setPersonalRoute] = useState("")
  const [isRouteInUse, setIsRouteInUse] = useState()
  const [routeOk, setRouteOk] = useState(true)
  const [notAuthorizedCharacter, setNotAuthorizedCharacter] = useState()
  const [buttonMsgModal, setButtonMsgModal] = useState("invisible")
  const [toggleNewContractCreated, setToggleNewContractCreated] = useState(false)
  const [numContractsBefore, setNumContractsBefore] = useState()
  const [someSocialFieldMissing, setSomeSocialFieldMissing] = useState(false)
  const [loading, setLoading] = useState()
  const [dots, setDots] = useState()
  const [sleepingTime, setSleepingTime ] = useState(1)


  // This part executes at the begining and after a new smart contract is created
  // ****************************************************************************
  useEffect(() => {
    setTimeout(()=>{
      uploadUntilRecentSmartContract()
    },sleepingTime)
  },[toggleNewContractCreated])

  const uploadUntilRecentSmartContract = async() => { 
    if(account && loading){     
      const factory = await getContract(EscrowFactory.address, EscrowFactory.abi)
      const idsHistoryAfter = await factory.getIdsHistory()
      

      if(numContractsBefore == idsHistoryAfter.length){
        setToggleNewContractCreated(!toggleNewContractCreated)
        increaseDots(1000)
      }
      else{
        setLoading(false)
        for (let i = 1; i < 20; i++) {
          increaseDots(500*i)
        }
        killDots(1000*20)
        setSleepingTime(1)
        router.push(`/contracts/${account}`)
      }
    }
  }
  // ****************************************************************************

  const increaseDots = (time) => {
    setTimeout(()=> {
      if(dots == 4) setDots(0) 
      else setDots(dots+1)
    }, time)
  }

  const killDots = (time) => {
    setTimeout(()=> {
      setDots()
    },time)
  }

  const selectSocialProfile = (i) => {
    const tempSocials = [...socials]
    tempSocials[i].active = !tempSocials[i].active 
    setSocials(tempSocials)

    const onlySocialsSelected = tempSocials.filter(social => social.active == true)
    setSelectedSocials(onlySocialsSelected)
  }


  const addSocialUrl = (e,i) => {
    e.preventDefault()
    const tempSocials = [...socials]
    tempSocials[i].link = e.target.value
    setSocials(tempSocials)
  }


  const createContract = async() => {
    setTimeout(() => {
      setButtonMsgModal('invisible')
    }, 4000);    

    if(!account) return setButtonMsgModal('flex')
    if(!routeOk || personalRoute.length == 0 || isRouteInUse ) return setButtonMsgModal('flex')
    if(selectedSocials?.length === 0) return setButtonMsgModal('flex')
    setSomeSocialFieldMissing(false)
    for (const social of selectedSocials) {
      if(!social["link"].includes("http")){
        setButtonMsgModal('flex')
        setSomeSocialFieldMissing(true)
        return 
      }
    }
    
    const factoryContract = await getContract(EscrowFactory.address, EscrowFactory.abi)
    const tempSelectedSocials = [...selectedSocials]
    const tempNames = []
    const tempLinks = []
    for (const social of tempSelectedSocials) {
      tempNames.push(social.name)
      tempLinks.push(social.link)
    }

    const initialTokens = ["USDT", "USDC", "EURS"]
    const initialTokenAddresses = []
    for (let i = 0; i < initialTokens.length; i++) {
      const token = initialTokens[i];
      initialTokenAddresses[i] = erc20[network.name][token]["address"]
    }

    // get Num of contracts before creating one
    const idsHistoryBefore = await factoryContract.getIdsHistory()
    setNumContractsBefore(idsHistoryBefore.length)

    try {
      setDots(0)
      await factoryContract.create(tempNames, tempLinks, personalRoute, personalRoute.toLowerCase(),
      initialTokens, initialTokenAddresses)
      setToggleNewContractCreated(!toggleNewContractCreated)   
      setLoading(true)   
      setSleepingTime(500)
    } catch (error) {
      console.log("error creating smart contract: ", error)
    }
  }


  const checkAvailability = async(e) => {
    e.preventDefault()
    const routeName = e.target.value

    if(!account) return

    if(isRoutePosible(e)){
      setRouteOk(true)

      const contract = await getContract(EscrowFactory.address, EscrowFactory.abi)
      const isRouteInUse = await contract.isRouteInUse(routeName.toString().toLowerCase())
      
      if(isRouteInUse){
        setIsRouteInUse(true)
      }
      else{
        setIsRouteInUse(false)
      }
    }else{
      setRouteOk(false)
    }
    
  }


  const isRoutePosible = (e) => {
    
    let characters = "°|¬!#$%&/()=?'¡¿´¨¨*+~[{^}]``,;:.-_ \\"
    characters += '"' 
    
    const routeName = e?.target.value
    
    for (const symbol of characters) {
      if (routeName?.includes(symbol)) {
        setNotAuthorizedCharacter(symbol)
        if(symbol === " ") {setNotAuthorizedCharacter("White space")}
        return false
      }
    }
    return true
  }


  

  return(
    <div>
      <Navbar />

      <div className="lg:text-5xl md:text-4xl text-3xl font-bold text-center py-10">
        WELCOME!
      </div>
      <div className="text-2xl font-semibold text-center py-5 md:px-0 px-3">
        Two simple steps to start creating your own Smart Contract
      </div>

      <div className="bg-pink-200 space-y-5 lg:w-[70%] md:w-[80%] w-[95%] flex flex-col mx-auto py-16 lg:px-10 md:px-5 px-3 my-10">
        <div className="lg:text-3xl md:text-2xl text-xl font-extrabold uppercase text-left pb-5">
          1.- Choose a personalize route
        </div>
        <div className="lg:text-base md:text-sm sm:text-xs md:px-0 px-1">      
          This is the place where your users will find your Smart Contract.
          It can be your name, 
          brandname, tagline or a favorite phrase.
        </div>


        <div className="flex md:text-base text-xs">
          <div className="md:pl-5 pl-2 py-4 outline-none bg-white">
            {/* www.sendisure.com/ */}
            https://sendisure.vercel.app/
          </div>     
          <input type="text" placeholder="name or brandname or tagline or favorite phrase" onChange={(e) => (setPersonalRoute(e.target.value), checkAvailability(e))}
          className="pl-0 pr-5 py-4 outline-none w-full text-gray-500"/>
        </div>

        { (account && (personalRoute.length >0) && routeOk) &&
          <div> {isRouteInUse? <div className="text-red-600"> Already in use </div>: <div className="text-green-600"> Available </div>}</div>
        }
        { (account && !routeOk) && <div className="text-blue-700"> Contains inadecuate character:  <span className="text-red-600">{notAuthorizedCharacter}</span> </div>}
        { (!account && personalRoute.length >0) && <div className="text-red-600">PLEASE CONNECT YOUR WALLET ACCOUNT...</div> }

      </div>

      {/* SOCIAL PROFILES - SOCIAL PROFILES - SOCIAL PROFILES - SOCIAL PROFILES - SOCIAL PROFILES -  */}
      <div className="bg-pink-200 space-y-5 lg:w-[70%] md:w-[80%] w-[95%] flex flex-col mx-auto py-16 lg:px-10 md:px-5 px-2 my-10">
        <div className="lg:text-3xl md:text-2xl text-xl font-extrabold uppercase text-left pb-5">
          2.- Add at least one social network
        </div>
        <div className="lg:text-lg md:text-base text-sm">
          In order to create a Smart Contract it is important to include at least one of your social profiles.
        </div>

        <div className="py-5 lg:text-lg md:text-base text-sm">
          Please click on each one you want to add.
        </div> 

        <div className="flex flex-wrap">
          {
            socials.map((el,i) => (
              <button className={`lg:text-base md:text-sm text-xs border border-red-600 rounded-xl px-3 py-1 mx-1 my-1 ${el.active && `bg-red-500 text-white` }`}
                      onClick={() => selectSocialProfile(i)} key={i}>
                {el.name}
              </button>
            ))
          }
        </div>

        <div>
          {
              socials?.map((el,i) => (
                  el.active && 
                  <div className="flex flex-col py-3 space-y-2" key={i} >
                    <label className="lg:text-base md:text-sm text-xs ">{el.name.toUpperCase()} (please enter your {el.name} profile url)</label>
                    <div className="flex">
                      <input className="outline-none px-5 py-3 flex-1 lg:text-base md:text-sm text-xs" placeholder={el.placeholder} onChange={(e) => addSocialUrl(e,i)}
                      value={el.link}/>
                      <div className="outline-none text-center bg-white py-3 px-5 items-center" onClick={() => selectSocialProfile(i)}>
                        <MdClose className="text-red-700 text-2xl hover:cursor-pointer" />
                      </div>                      
                    </div>

                  </div>                  
            ))
          }
        </div>


        <div className="flex flex-col">
          <span className="text-xs">* You can add as much social profiles as you want.</span>
          <span className="text-xs">+ Later, you can add more social profiles directly to your Smart Contract.</span>          
        </div>

      </div>

      <div className="flex flex-col justify-center mx-auto my-20">
        <div className="flex justify-center">
          <button className={`bg-red-500 rounded-lg text-white lg:text-xl md:text-lg text-base font-bold lg:py-6 md:py-5 py-4 md:w-[70%] w-[95%]
          hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed`} onClick={() => createContract()} disabled={dots>=0} >
            {account? "Create Smart Contract" : "CONNECT ACCOUNT"}      
          </button>            
        </div>

        <div className={`${buttonMsgModal} flex justify-center py-5 text-blue-700 font-bold`}>
          {
            account
            ? personalRoute.length == 0 || !routeOk || isRouteInUse
              ? <div> Something is wrong with the personalized route! </div>
              : (selectedSocials.length == 0 || someSocialFieldMissing ) && <div className="text-green-600">Missing social profile</div>

            // else
            : <div className="text-center">PLEASE CONNECT YOUR WALLET ACCOUNT</div>
          }
        </div>
        
        <div className={`${loading? "flex": "invisible"} flex justify-center font-semibold`}>
          {[".",".",".",".","."].map((el,i) => (
            <div key={i} className={`text-5xl ${i==dots? "text-gray-800":"text-gray-300"}`}>{el}</div>
          ))}
        </div> 

         
      </div>
      
      <Footer />
    </div>
  )
}

export default Generate