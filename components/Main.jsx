'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"
// import Info from "../constants/Info.json"
import { useEffect, useState } from "react"




const Main = () => {
  // const route = useRouter()

  // const goToGenerate = () => {    
  //   route.push('/generate')
  // }
  const baseUrl = "www.sendisure.com/"
  const urls = ["Jhon", "Harris", "Roberts", "AlvaEdison"]
  const urlColors = ["text-red-500", "text-yellow-500", "text-blue-500", "text-purple-500"]
  const [url, setUrl] = useState(urls[0]);
  const [index, setIndex] = useState(0);  

  useEffect(()=> {
    setTimeout(() => {
      setUrl(urls[index])
      if(index < 3) setIndex(index+1) 
      else setIndex(0)  
    },4000)
  },[index])



  return(
    <div>

      {/* 1ST SECTION (FIRST SECTION) - 1ST SECTION (FIRST SECTION) */}
      <div className="bg-green-500 mt-1 grid md:grid-cols-2 grid-cols-1  ">
        
        {/* left - left - left */}
        <div className="flex flex-col px-10 lg:py-16 md:py-10 py-5">
          <div className="lg:text-6xl md:text-5xl text-3xl font-extrabold">
            Making Crypto Payments Less Scary
          </div>    
          <div className="lg:text-xl md:text-xl text-lg text-yellow-300 font-semibold pt-10">
            Make easy peer to peer crypto transfers by getting your own 
            Smart Contract and start receiving payments 
            from family, friends, clients and people all over the world.
            {/* with no errors when copying and pasting any wallet address, 
            plus it's free and secure. */}

            {/* Be an early adopter creating your own Smart Contract to start receiving payments 
            from family, friends, clients and people all over the world, with no errors 
            when copying and pasting any wallet address. */}
            {/* without copying any wallet address. */}
          </div>    
          {/* <div className="text-xl text-yellow-300 font-semibold py-2">
            Copying and pasting any wallet address is a thing of the past!
          </div>  */}
          {/* <div className="text-xl text-yellow-300 font-semibold py-2">
            Plus it's free and secure.
          </div>  */}
          <div className="flex flex-col justify-center items-center  mt-10 w-full ">
            <Link href='/generate' className="w-full">
              <button className="bg-purple-300 border border-purple-400 rounded-lg lg:p-5 md:p-4 p-3 w-full
              text-center lg:text-xl md:text-lg text-xs text-black font-bold hover:bg-purple-400">
                {/* <Link href='/generate'>Create Your Own Smart Contracts</Link> */}
                Create Your Own Smart Contracts
              </button>            
            </Link>

          </div>
          

        </div>
            
        <div className="flex justify-center items-center ">
          <Image src='/paypay.png' width={500} height={500} alt="My picture"/>
        </div>



      </div>

      {/* SECOND SECTION - SECOND SECTION - SECOND SECTION -  */}
      {/* SECOND SECTION - SECOND SECTION - SECOND SECTION -  */}
      <div className="bg-pink-300 grid md:grid-cols-2 grid-cols-1">
        
        {/* left - left - left */}
        <div className="w-[100%] rounded-lg p-20 md:flex hidden justify-center items-center">  
          <Image src='/checking.png' width={400} height={400}  alt="checking"/>    
        </div>

        {/* right - right - right */}
        <div className="w-[100%] px-10 lg:py-16 md:py-10 py-5">
          {/* <div className="text-6xl text-purple-900 font-extrabold">
            Fast and Anonymous
          </div> */}
          <div className="md:text-6xl text-5xl text-purple-900 font-extrabold">
            Avoid manual error
          </div>
          <div className="py-5 lg:text-xl md:text-lg text-base text-purple-700">
            Your friends wont spent minutes checking and double-checking before sending a 
            cryptocurrency payment to your wallet address.         
          </div>
          <div className="py-3 lg:text-xl md:text-lg text-base text-purple-700">
            Or what about your friends sending a small test transaction just to ensure they are 
            sending to the right person or destination.
          </div>
          <div className="py-3 lg:text-xl md:text-lg text-base text-purple-700">
            Copying and pasting any wallet address is a thing of the past!
          </div> 
          <div className="flex justify-center w-full">
            <Link href="/generate" className="bg-purple-700 border border-purple-800 rounded-lg md:py-5 py-4 mt-10 w-full
            text-center px-10 md:text-2xl text-xs text-white font-bold hover:bg-purple-800">
              Get started for free
            </Link>            
          </div>
        </div>

        <div className="w-[100%] rounded-lg p-20 md:hidden flex justify-center items-center">  
          <Image src='/checking.png' width={400} height={400}  alt="checking"/>    
        </div>

      </div>

      <div className="bg-gray-900 text-white flex px-5 justify-between  py-10
      md:flex-row  flex-col  lg:text-lg md:text-base text-base">
          <div className="lg:w-80 md:w-60 w-70  lg:m-1 my-5 space-y-5 mx-auto">
            <div className="lg:text-6xl md:text-5xl text-2xl font-bold">Right Destination</div>
            <div>You don't have to copy and paste a dificult to recognize wallet address,</div>
            <div>And then check and check... if your are giving the right addres to your depositors.</div>
          </div>

          <div className="lg:w-80 md:w-60 w-70 lg:m-1 my-5 mx-auto space-y-5">
            <div className="lg:text-6xl md:text-5xl text-2xl font-bold">Personal Link</div>
            <div>Better you just have to give an easy to identify URL or LINK of your smart contract</div>
            <div>{baseUrl}<span className={`${urlColors[index]}`}>{url}</span></div>   
          </div>

          <div className="lg:w-80 md:w-60 w-70 lg:m-1 my-5 space-y-5 mx-auto">
          <div className="lg:text-6xl md:text-5xl text-2xl font-bold">A simple click</div>
            <div>
              Your depositor just need to select the token and the amount.
            </div>
            <div>
            </div>
              And after the click of a button... your smart contract will pursue automatically the transfer to your wallet address.
          </div>
      </div>

      {/* THIRD SECTION - THIRD SECTION - THIRD SECTION -  */}
      {/* THIRD SECTION - THIRD SECTION - THIRD SECTION -  */}
      {/* THIRD SECTION - THIRD SECTION - THIRD SECTION -  */}
      <div className="bg-red-800 grid md:grid-cols-2 grid-cols-1 ">

        {/* left - left - left */}
        <div className="w-[100%] px-10 py-10 lg:space-y-12 md:space-y-9 space-y-6">
          <div className="lg:text-6xl md:text-5xl text-3xl py-5  font-extrabold text-pink-200">
            Quick and low fees
          </div>    
          <div className="lg:text-xl md:text-lg text-base  text-yellow-300 font-semibold">
            For each transaction, your depositor will pay 0.5% of the total amount transferred as commision fee.
          </div>     
          <div className="lg:text-xl md:text-lg text-base  text-yellow-300 font-semibold">
            Of this commision fee, your smart contract will compensate you with a 50%. That is, a 0.25% of the total amount transferred
            will be rewarded and send to your wallet addres.
          </div>
          <div className="flex justify-center w-full py-5">
            <Link href="/generate" className="bg-purple-300 border border-purple-400 rounded-lg lg:p-5 md:p-4 p-3 w-full
            text-center px-10 lg:text-2xl md:text-xl text-sm text-black font-bold hover:bg-purple-400">
              Try Sendisure for free
            </Link>            
          </div>
        </div>

        {/* right - right - right */}
        <div className="flex justify-center items-center mb-10">
          <Image src='/blockchain.png' width={300} height={300} alt="blockchain"/>
        </div>

      </div>

      {/* FOUR SECTION - FOUR SECTION - FOUR SECTION -  */}
      {/* FOUR SECTION - FOUR SECTION - FOUR SECTION -  */}
      {/* FOUR SECTION - FOUR SECTION - FOUR SECTION -  */}
      {/* FOUR SECTION - FOUR SECTION - FOUR SECTION -  */}
      <div className="bg-gray-100 grid md:grid-cols-2 grid-cols-1">
        
        {/* left - left - left */}
        <div className="w-[100%] justify-center items-center md:flex hidden">  
          <Image src='/pros.png' width={350} height={350} alt="pros" className="p-10"/>
        </div>

        {/* right - right - right */}
        <div className="w-[100%] px-10 py-16">
          <div className="lg:text-6xl md:text-6xl text-4xl font-extrabold py-20">
            Easy for every one and secure
          </div>
          <div className="py-10 lg:text-2xl md:text-xl sm:text-lg">
            Creating your own smart contract is a simple web3 transaction,
            with a very low fee.
          </div>
          <div className="flex justify-center w-full">
            <Link href="/generate" className="bg-pink-300 border border-pink-400 rounded-lg py-5 my-10 w-full
            text-center px-10 lg:text-2xl md:text-xl text-sm font-bold hover:bg-pink-400">
              Want to know more
            </Link>            
          </div>
        </div>

        <div className="w-[100%] flex justify-center items-center md:hidden">  
          <Image src='/pros.png' width={350} height={350} alt="pros" className="p-10"/>
        </div>

      </div>

      {/* FITH SECTION - FITH SECTION - FITH SECTION -  */}
      {/* FITH SECTION - FITH SECTION - FITH SECTION -  */}
      {/* FITH SECTION - FITH SECTION - FITH SECTION -  */}
      {/* FITH SECTION - FITH SECTION - FITH SECTION -  */}
      {/* FITH SECTION - FITH SECTION - FITH SECTION -  */}
      <div className="bg-red-800 grid md:grid-cols-2 sm:grid-cols-1">

        {/* left - left - left */}
        <div className="w-[100%] px-10 lg:py-16 md:py-10 py-5">
          <div className="lg:text-6xl md:text-5xl text-4xl font-extrabold text-pink-200">
            Why it is secure?
          </div>    
          <div className="text-xl lg:py-10 md:py-6 py-4 text-yellow-300 font-semibold">
            {/* Your own Smart Contract will live on the descentralized 
            ethereum blockchain inheriting all the security level of this network.
            No body will centralize the working or operation of your 
            Smart Contract to a particular interest. */}

            <div className="lg:text-base md:text-sm text-xs">
              A Smart Contract is a descentralize computational program that lives and 
              executes automatically on the ethereum blockchain inheriting from there
              the security level, and no entity can control or modify the Smart Contrac 
              for a specific interest or
              purpuse other than, in this case peer to peer crypto transfers.
            </div>
            {/* A Smart Contract is a set of rules, a descentralize software, that lives on the 
            enthereum blockchain an is executed there automatically, inheriting
            all the security level of the blockchain and no entity will work the 
            Smart Contract to a specific interest or purpuse other than Making
            easy crypto payments. */}
          </div>     
          <div className="flex justify-center w-full">
            <Link href="/generate" className="bg-purple-300 border border-purple-400 rounded-lg lg:py-5 md:py-4 py-3 lg:my-10 md:my-6 my-3 w-full
            text-center px-10 md:text-2xl text-sm text-black font-bold hover:bg-purple-400">
              Try Sendisure for free
            </Link>            
          </div>
        </div>

        {/* right - right - right */}
        <div className="flex flex-col justify-center items-center py-5">
            <div className="text-white lg:text-6xl md:text-5xl text-4xl font-extrabold lg:py-5 md:py-5 py-5">Code is Law</div>
            <Image src='/6.-secure.png' width={300} height={300} alt="secure" />            
        </div>

      </div>

      {/* SIXTH  SECTION - SIXTH  SECTION - SIXTH  SECTION -  */}
      {/* SIXTH  SECTION - SIXTH  SECTION - SIXTH  SECTION -  */}
      {/* SIXTH  SECTION - SIXTH  SECTION - SIXTH  SECTION -  */}
      {/* SIXTH  SECTION - SIXTH  SECTION - SIXTH  SECTION -  */}
      {/* SIXTH  SECTION - SIXTH  SECTION - SIXTH  SECTION -  */}
      {/* SIXTH  SECTION - SIXTH  SECTION - SIXTH  SECTION -  */}
      {/* <div className="bg-pink-300 flex "> */}
      <div className="bg-white grid md:grid-cols-2 grid-cols-1">
        
        {/* left - left - left */}
        <div className="w-[100%] md:flex hidden justify-center items-center ">  
            <Image src='/unknown.png' width={400} height={400} alt="unknown"/>
        </div>

        {/* right - right - right */}
        <div className="w-[100%] px-10 py-16">
          <div className="md:text-6xl text-3xl  text-purple-900 font-extrabold">
            Would you like to know who you transfer to
          </div>
          <div className="py-10 lg:text-xl md:text-lg text-base text-purple-700">
            When sending a crypto payment, you have no information about the 
            recipient or who they are. This is scary, no...it’s terrifying.       
          </div>
          <div className="py-5 lg:text-xl md:text-lg text-base text-purple-700">
            With Sendisure you don’t have this problem, you can see a person’s username, 
            social media accounts, as identifying information.
          </div>
          <div className="flex justify-center w-full">
            <Link href="/generate" className="bg-purple-700 border border-purple-800 rounded-lg py-5 my-10 w-full
            text-center px-10 lg:text-2xl md:text-xl text-sm text-white font-bold hover:bg-purple-800">
              Get started for free
            </Link>            
          </div>
        </div>

        <div className="w-[100%] md:hidden flex justify-center items-center p-5">  
            <Image src='/unknown.png' width={400} height={400} alt="unknown" className="mx-auto"/>
        </div>

      </div>


    </div>
  )
}

export default Main