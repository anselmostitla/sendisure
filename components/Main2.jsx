'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"




const Main = () => {
  const route = useRouter()

  const goToGenerate = () => {    
    route.push('/generate')
  }

  return(
    <div>

      {/* 1ST SECTION (FIRST SECTION) - 1ST SECTION (FIRST SECTION) */}
      <div className="bg-green-500 mt-1 grid grid-cols-2">
        
        {/* left - left - left */}
        <div className="flex flex-col px-10 py-16">
          <div className="text-6xl font-extrabold">
            Making Crypto Payments Less Scary
          </div>    
          <div className="text-xl text-yellow-300 font-semibold pt-10">
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
          <div className="flex flex-col justify-center items-center  my-10">
            <Link href='/generate'>
              <button className="bg-purple-300 border border-purple-400 rounded-lg py-5  
              text-center px-5 text-xl text-black font-bold hover:bg-purple-400">
                {/* <Link href='/generate'>Create Your Own Smart Contracts</Link> */}
                Create Your Own Smart Contracts
              </button>            
            </Link>

          </div>
          

          </div>
            
          <div className="flex justify-center items-center">
            <Image src='/paypay.png' width={500} height={500} alt="My picture"/>
          </div>



      </div>

      {/* SECOND SECTION - SECOND SECTION - SECOND SECTION -  */}
      {/* SECOND SECTION - SECOND SECTION - SECOND SECTION -  */}
      <div className="bg-pink-300 grid grid-cols-2 ">
        
        {/* left - left - left */}
        <div className="w-[100%] rounded-lg p-20 flex justify-center items-center">  
          <Image src='/checking.png' width={400} height={400}  alt="checking"/>    
        </div>

        {/* right - right - right */}
        <div className="w-[100%] px-10 py-16">
          {/* <div className="text-6xl text-purple-900 font-extrabold">
            Fast and Anonymous
          </div> */}
          <div className="text-6xl text-purple-900 font-extrabold">
            Avoid manual error
          </div>
          <div className="py-5 text-xl text-purple-700">
            Your friends wont spent minutes checking and double-checking before sending a 
            cryptocurrency payment to your wallet address.         
          </div>
          <div className="py-3 text-xl text-purple-700">
            Or what about your friends sending a small test transaction just to ensure they are 
            sending to the right person or destination.
          </div>
          <div className="py-3 text-xl text-purple-700">
            Copying and pasting any wallet address is a thing of the past!
          </div> 
          <div className="flex justify-center">
            <Link href="/generate" className="bg-purple-700 border border-purple-800 rounded-lg py-5 my-10 
            text-center px-10 text-2xl text-white font-bold hover:bg-purple-800">
              Get started for free
            </Link>            
          </div>
        </div>

      </div>

      {/* THIRD SECTION - THIRD SECTION - THIRD SECTION -  */}
      {/* THIRD SECTION - THIRD SECTION - THIRD SECTION -  */}
      {/* THIRD SECTION - THIRD SECTION - THIRD SECTION -  */}
      <div className="bg-red-800 grid grid-cols-2">

        {/* left - left - left */}
        <div className="w-[100%] px-10 py-16">
          <div className="text-6xl  font-extrabold text-pink-200">
            Quick and low fees
          </div>    
          <div className="text-xl py-10 text-yellow-300 font-semibold">
            Using and exchange transfer is a secure and convenient way to transfer
            cryptocurrency, but it comes with HIGH FEES and long processing times.
          </div>     
          <div className="flex justify-center">
            <Link href="/generate" className="bg-purple-300 border border-purple-400 rounded-lg py-5 my-10 
            text-center px-10 text-2xl text-black font-bold hover:bg-purple-400">
              Try Sendisure for free
            </Link>            
          </div>
        </div>

        {/* right - right - right */}
        <div className="flex justify-center items-center">
          <Image src='/blockchain.png' width={300} height={300} alt="blockchain"/>
        </div>

      </div>

      {/* FOUR SECTION - FOUR SECTION - FOUR SECTION -  */}
      {/* FOUR SECTION - FOUR SECTION - FOUR SECTION -  */}
      {/* FOUR SECTION - FOUR SECTION - FOUR SECTION -  */}
      {/* FOUR SECTION - FOUR SECTION - FOUR SECTION -  */}
      <div className="bg-gray-100 grid grid-cols-2 ">
        
        {/* left - left - left */}
        <div className="w-[100%] flex justify-center items-center">  
          <Image src='/pros.png' width={350} height={350} alt="pros"/>
        </div>

        {/* right - right - right */}
        <div className="w-[100%] px-10 py-16">
          <div className="text-6xl  font-extrabold py-20">
            Easy for every one and secure
          </div>
          <div className="py-10 text-xl ">
            Creating your own smart contract is a simple web3 transaction,
            with a very low fee.
          </div>
          <div className="flex justify-center">
            <Link href="/generate" className="bg-pink-300 border border-pink-400 rounded-lg py-5 my-10 
            text-center px-10 text-2xl  font-bold hover:bg-pink-400">
              Want to know more
            </Link>            
          </div>
        </div>

      </div>

      {/* FITH SECTION - FITH SECTION - FITH SECTION -  */}
      {/* FITH SECTION - FITH SECTION - FITH SECTION -  */}
      {/* FITH SECTION - FITH SECTION - FITH SECTION -  */}
      {/* FITH SECTION - FITH SECTION - FITH SECTION -  */}
      {/* FITH SECTION - FITH SECTION - FITH SECTION -  */}
      <div className="bg-red-800 grid grid-cols-2 ">

        {/* left - left - left */}
        <div className="w-[100%] px-10 py-16">
          <div className="text-6xl  font-extrabold text-pink-200">
            Why it is secure?
          </div>    
          <div className="text-xl py-10 text-yellow-300 font-semibold">
            {/* Your own Smart Contract will live on the descentralized 
            ethereum blockchain inheriting all the security level of this network.
            No body will centralize the working or operation of your 
            Smart Contract to a particular interest. */}

            <div>
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
          <div className="flex justify-center">
            <Link href="/generate" className="bg-purple-300 border border-purple-400 rounded-lg py-5 my-10 
            text-center px-10 text-2xl text-black font-bold hover:bg-purple-400">
              Try Sendisure for free
            </Link>            
          </div>
        </div>

        {/* right - right - right */}
        <div className="flex flex-col justify-center items-center">
          <div className="text-white text-6xl font-extrabold">Code is Law</div>
          <Image src='/6.-secure.png' width={300} height={300} alt="secure"/>
        </div>

      </div>

      {/* SIXTH  SECTION - SIXTH  SECTION - SIXTH  SECTION -  */}
      {/* SIXTH  SECTION - SIXTH  SECTION - SIXTH  SECTION -  */}
      {/* SIXTH  SECTION - SIXTH  SECTION - SIXTH  SECTION -  */}
      {/* SIXTH  SECTION - SIXTH  SECTION - SIXTH  SECTION -  */}
      {/* SIXTH  SECTION - SIXTH  SECTION - SIXTH  SECTION -  */}
      {/* SIXTH  SECTION - SIXTH  SECTION - SIXTH  SECTION -  */}
      {/* <div className="bg-pink-300 flex "> */}
      <div className="bg-white grid grid-cols-2 ">
        
        {/* left - left - left */}
        <div className="w-[100%] flex justify-center items-center">  
            <Image src='/unknown.png' width={400} height={400} alt="unknown"/>
        </div>

        {/* right - right - right */}
        <div className="w-[100%] px-10 py-16">
          <div className="text-6xl text-purple-900 font-extrabold">
            Would you like to know who you transfer to
          </div>
          <div className="py-10 text-xl text-purple-700">
            When sending a crypto payment, you have no information about the 
            recipient or who they are. This is scary, no...it’s terrifying.       
          </div>
          <div className="py-5 text-xl text-purple-700">
            With Sendisure you don’t have this problem, you can see a person’s username, 
            social media accounts, as identifying information.
          </div>
          <div className="flex justify-center">
            <Link href="/generate" className="bg-purple-700 border border-purple-800 rounded-lg py-5 my-10 
            text-center px-10 text-2xl text-white font-bold hover:bg-purple-800">
              Get started for free
            </Link>            
          </div>
        </div>

      </div>


    </div>
  )
}

export default Main