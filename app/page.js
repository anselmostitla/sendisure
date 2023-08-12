import Image from 'next/image'
import Navbar from '@/components/Navbar'
// import Navbar2 from '@/components/Navbar2'
// import CreateContract from './create/page'
import Main from '../components/Main'
import Footer from '@/components/footer'


export default function Home() {
  return (
    <main>
      <Navbar />
      {/* <CreateContract /> */}
      <Main />
      <Footer />
    </main>      
    
  )
}