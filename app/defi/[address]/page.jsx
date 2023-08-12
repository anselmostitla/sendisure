
"use client";
import Contract from "../../../components/dashboard/contract";
// import AddTokens from "@/components/dashboard/addTokens";
import AddSocialLinks from "@/components/dashboard/addSocialLinks";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import VerifyOwnership from '../../../components/dashboard/verifyOwnership'
import { useAccount } from "@/context/account";
import Escrow from '../../../constants/Escrow.json'
import TutorialToUsers from "@/components/dashboard/tutorialToUsers";
import TutorialsToPartners from "@/components/dashboard/tutorialToPartners";
import InsertTokens from "@/components/dashboard/insertTokens";
import EscrowFactory from '../../../constants/EscrowFactory.json'
import Footer from "@/components/footer";

const Dashboard = () => {
  const { account, getContract } = useAccount()
  const params = useParams();

  const [areEqualAccounts, setAreEqualAccounts] = useState(false)
  const [escrowAddress, setEscrowAddress] = useState()

  const [toggleUploadAgain, setToggleUploadAgain] = useState()
  const [failedAttemps, setFailedAttemps] = useState()

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
        
        getBasics()
    }
  }

  const getBasics = async() => {
    const contract = await getContract(EscrowFactory.address, EscrowFactory.abi)
    const route = params.address

    const escrowAddress = await contract.addressAssociateToRoute(route.toLowerCase())
    setEscrowAddress(escrowAddress)
    console.log("currentContractAddress: ", escrowAddress)

    const escrowContract = await getContract(escrowAddress,Escrow.abi)
    const destinationAddress = await escrowContract.recipient()
    setAreEqualAccounts(String(destinationAddress).toLowerCase() == String(account).toLowerCase())
    
    const defaultTokens = await escrowContract.getDefaultTokens()
    console.log("defaultTokens: ", defaultTokens)
    const defaultAddresses = await escrowContract.getDefaultAddresses()
    console.log("defaultAddresses: ", defaultAddresses)
    
    menuValues("contract");
  }

  const defaultMenuValues = {
    contract: { display: false },
    tutorialToUsers: { display: false },
    ownership: { display: false },
    addTokens: { display: false },
    addsocialLinks: { display: false },
    tutorialsToPartners: { display: false },
  };

  const [menu, setMenu] = useState(defaultMenuValues);

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
            <Contract contractAddress={escrowAddress} />
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

export default Dashboards;
