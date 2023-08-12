
import { MdLanguage, } from "react-icons/md";
import { SocialIcon } from 'react-social-icons';


const Footer = () => {
  return(
    <div>
      {/* <div className="bg-white h-10">

      </div> */}
      <div className="bg-gray-200 shadow-lg flex justify-between items-center px-5 my-1">
        <div className="text-4xl py-5 flex">
          <div className="text-black font-extrabold">
            SENDI
          </div>
          <div className="text-red-700 font-extrabold">
            SURE
          </div>
        </div>

        <div className="flex space-x-7">
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