
import { MdLanguage, } from "react-icons/md";
import { SocialIcon } from 'react-social-icons';


const Footer = () => {
  return(
    <div>
      {/* <div className="bg-white h-10">

      </div> */}
      <div className="bg-gray-200 shadow-lg md:flex flex-col justify-between items-center px-5 my-1 py-5 md:space-y-0 space-y-5">
        <div className="lg:text-4xl md:text-3xl text-lg flex">
          <div className="text-black font-extrabold">
            SENDI
          </div>
          <div className="text-red-700 font-extrabold">
            SURE
          </div>
        </div>

        <div className="flex space-x-7 justify-between">
          <div className="flex space-x-2">
            <div> <SocialIcon style={{ height: 25, width: 25 }} url="https://facebook.com/anselmostitla" target='blank'/>  </div>
            <div> <SocialIcon style={{ height: 25, width: 25 }} url="https://twitter.com/AnselmoTitla" target='blank' /></div>
            <div> <SocialIcon style={{ height: 25, width: 25 }} url="https://linkedin.com/in/anselmotitla" target='blank' /> </div>
            <div> <SocialIcon style={{ height: 25, width: 25 }} url='https://www.instagram.com/anselmostitla/' target='blank' /> </div>
            <div> <SocialIcon style={{ height: 25, width: 25 }} url='https://www.instagram.com/anselmostitla/' target='blank' /> </div>
          </div>
          <div className="flex space-x-1 items-center">
            <MdLanguage />
            <div> English </div>
          </div>        
        </div>

      </div>      
    </div>



  )
}

export default Footer