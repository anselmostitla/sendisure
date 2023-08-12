
"use client";



import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

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
    const factory = getSmartContract(EscrowFactory.address, EscrowFactory.abi, "provider")
    const route = params.route
    const escrowAddress = await factory.addressAssociateToRoute(route?.toLowerCase())
    if(escrowAddress.toString() != '0x0000000000000000000000000000000000000000'){
      const escrowContract = await getSmartContract(escrowAddress,Escrow.abi, "provider")
      const destinationAddress = await escrowContract.I_RECIPIENT()
      setDestinationAddress(destinationAddress)
      setEscrowAddress(escrowAddress)
      setAreEqualAccounts(String(destinationAddress).toLowerCase() == String(account).toLowerCase())
      menuValues("contract");  
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
  };

  return (
    <div>
      <Navbar />
      <div className="flex ">
        {/* LEFT SECTION - LEFT SECTION - LEFT SECTION  */}

        <div className="w-72 min-h-screen max-h-screen bg-gray-200 shadow-md mt-1 p-5 space-y-2 pt-10">
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
        <div className="w-[100%] py-20 px-20">
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
