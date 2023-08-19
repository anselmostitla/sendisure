
"use client";



import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { MdMenu } from 'react-icons/md';

import { useAccount } from "@/context/account";
import Escrow from '../../constants/Escrow.json'

import VerifyOwnership from "../../components/dashboard/verifyOwnership";
import AddSocialLinks from "@/components/dashboard/addSocialLinks";
import Contract from "../../components/dashboard/contract"
import TutorialToUsers from "@/components/dashboard/tutorialToUsers";
import TutorialsToPartners from "@/components/dashboard/tutorialToPartners";
import InsertTokens from "@/components/dashboard/insertTokens";
import EscrowFactory from '../../constants/EscrowFactory.json'
import Footer from "@/components/footer";

const Dashboard = () => {
  const { account, getSmartContract } = useAccount()
  const params = useParams();
  const router = useRouter()

  const defaultMenuValues = {
    contract: { display: false },
    tutorialToUsers: { display: false },
    ownership: { display: false },
    addTokens: { display: false },
    addsocialLinks: { display: false },
    tutorialsToPartners: { display: false },
  };

  const [destinationAddress, setDestinationAddress] = useState();
  const [areEqualAccounts, setAreEqualAccounts] = useState(false)
  const [ColorForEqualAccounts, setColorForEqualAccounts] = useState('text-white');
  const [escrowAddress, setEscrowAddress] = useState()
  const [menu, setMenu] = useState(defaultMenuValues);  
  const [attemps, setAttemps] = useState()
  const [openMenu, setOpenMenu] = useState(false);   

  useEffect(() => {
    uploadUntilAccount()
  },[attemps])

  useEffect(() => {
    getEscrowAddress()
  },[])

  const uploadUntilAccount = () => {
    setTimeout(()=>{
      if(!account){
        setAttemps(attemps+1)
      }else if(account) getEsentials()
    },500)
  }

  const getEsentials = async () => {
    // const factory = getSmartContract(EscrowFactory.address, EscrowFactory.abi, "provider")
    // const route = params.route
    // const escrowAddress = await factory.addressAssociateToRoute(route?.toLowerCase())
    
    if(escrowAddress?.toString() != '0x0000000000000000000000000000000000000000' && escrowAddress != undefined){
      // setEscrowAddress(escrowAddress)
      // menuValues("contract");
      // const escrowContract = await getSmartContract(escrowAddress,Escrow.abi, "provider")
      // const destinationAddress = await escrowContract.I_RECIPIENT()
      setAreEqualAccounts(String(destinationAddress).toLowerCase() == String(account).toLowerCase())
    }
  }

  const getEscrowAddress = async() => {
    menuValues("contract"); 
    if(!window.ethereum) return
    const factory = getSmartContract(EscrowFactory.address, EscrowFactory.abi, "provider")
    const route = params.route
    const escrowAddress = await factory.addressAssociateToRoute(route?.toLowerCase())
    if(escrowAddress.toString() != '0x0000000000000000000000000000000000000000'){
      const escrowContract = await getSmartContract(escrowAddress,Escrow.abi, "provider")
      const destinationAddress = await escrowContract.I_RECIPIENT()
      setDestinationAddress(destinationAddress)
      setEscrowAddress(escrowAddress)
      setAreEqualAccounts(String(destinationAddress).toLowerCase() == String(account).toLowerCase())
      // menuValues("contract");  
    } else {
      router.push('/')
    }
  }

  const checkIfAccountsAreEqual = () => {
    if(account && escrowAddress){
      const areEqualAccounts = String(destinationAddress).toLowerCase() == String(account).toLowerCase()
      setAreEqualAccounts(areEqualAccounts)
      if(areEqualAccounts){
        setColorForEqualAccounts('text-red-500')
      }
    }
  }


  const menuValues = (element) => {
    const tempMenu = { ...defaultMenuValues };
    tempMenu[element]["display"] = true;
    setMenu(tempMenu);
    if(element != "contract") setOpenMenu(!openMenu)
  };

  return (
    <div>
      <Navbar />
      <div className="lg:hidden flex justify-between md:px-3 px-2 py-2 lg:text-base md:text-sm text-xs items-center">
        <div className="flex lg:px-5 md:justify-start md:space-x-5">
          <div onClick={() => menuValues("contract")} className="hover:cursor-pointer">Smart Contract</div>
          <div onClick={() => menuValues("tutorialToUsers")} className="md:flex hidden">Tutorials</div>
          <div className="md:flex hidden">Verify Ownership</div>
          <div className="md:flex hidden">Add tokens</div>
          <div className="md:flex hidden">Add social links</div>
          <div className="md:flex hidden">Docs</div>          
        </div>

        <div><MdMenu className="md:hidden flex w-6 h-6" onClick={() => setOpenMenu(!openMenu)}/></div>
      </div>
      {
        openMenu && 
        <div className="absolute right-1 bg-gray-100 p-2 rounded-lg flex flex-col justify-end text-sm md:hidden">
          <div onClick={() => menuValues("tutorialToUsers")} className="hover:cursor-pointer">Tutorials</div>
          <div onClick={() => menuValues("ownership")} className="hover:cursor-pointer">Verify Ownership</div>
          <div onClick={() => menuValues("addTokens")} className="hover:cursor-pointer">Add tokens</div>
          <div onClick={() => menuValues("addsocialLinks")} className="hover:cursor-pointer">Add social links</div>
          <div onClick={() => menuValues("tutorialsToPartners")} className="hover:cursor-pointer">Tutorials</div> 
        </div>
      }


      <div className="flex">
        {/* LEFT SECTION - LEFT SECTION - LEFT SECTION  */}

        <div className="w-72  bg-gray-200 shadow-md mt-1 p-5 space-y-2 pt-10 lg:flex lg:flex-col hidden">
          <div
            className={`hover:cursor-pointer hover:bg-gray-300 px-5 py-1 ${
              menu.contract.display && `bg-gray-300`
            }`}
            onClick={() => menuValues("contract")}
          >
            Smart Contract
          </div>
          <div
            className={`hover:cursor-pointer hover:bg-gray-300 px-5 py-1 ${
              menu.tutorialToUsers.display && `bg-gray-300`
            }`}
            onClick={() => menuValues("tutorialToUsers")}
          >
            Tutorials
          </div>
          <div
            className={`hover:cursor-pointer hover:bg-gray-300 px-5 py-1 ${
              menu.ownership.display && `bg-gray-300`
            }`}
            onClick={() => menuValues("ownership")}
          >
            Verify Ownership
          </div>

          {
            areEqualAccounts && 
            <section>
              <div className="font-bold pt-10">Partners:</div>
              <div className="space-y-2 px-3">
              
                <button className={`hover:bg-gray-300 px-5 py-1 ${menu.addTokens.display && `bg-gray-300`}`} onClick={() => menuValues("addTokens")}>
                  Add tokens
                </button>
                
                <button className={`hover:bg-gray-300 px-5 py-1 ${menu.addsocialLinks.display && `bg-gray-300`}`} onClick={() => menuValues("addsocialLinks")}>
                  Add social links
                </button>
                
                <button className={`hover:bg-gray-300 px-5 py-1 ${menu.tutorialsToPartners.display && `bg-gray-300`}`} onClick={() => menuValues("tutorialsToPartners")}>
                  Tutorials
                </button>   
              
              </div>
            </section>
          }

        </div>

        {/* RIGHT SECTION - RIGHT SECTION - RIGHT SECTION  */}
        
        <div className="w-[100%] py-20 lg:px-20 md:px-10 px-2">
          {menu.contract.display && (
            <Contract contractAddress={escrowAddress} currentAccount={account} />
          )}
          {menu.tutorialToUsers.display && (
            <TutorialToUsers contractAddress={escrowAddress} />
          )}
          {menu.ownership.display && (
            <VerifyOwnership contractAddress={escrowAddress} />
          )}
          {menu.addTokens.display && (
            <InsertTokens contractAddress={escrowAddress} />
          )}
          {menu.addsocialLinks.display && (
            <AddSocialLinks contractAddress={escrowAddress} />
          )}
          {menu.tutorialsToPartners.display && (
            <TutorialsToPartners contractAddress={escrowAddress} />
          )}
        </div>
        
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
