import { Footer, Navbar,} from '../components';
import { About, Events, Feedback, GetStarted, Hero, Insights,Contact, WhatsNew,} from '../sections';

const Page = () => (
  <div className="bg-primary-black overflow-hidden">
    <Navbar />
    <div className='pt-10'>
    
    </div>
    <Hero />
    <div className="relative">
      <About />
      <div className="gradient-03 z-0" />
      <Events/>
      
    </div>

    <div className="relative">
      <GetStarted />
      <div className="gradient-04 z-0" />
      <WhatsNew />
    </div>
   
    <div className="relative">
      {/* <Insights /> */}
      
      
      <Feedback />
     
    </div>
    
    <Contact/>
    <Footer />
  </div>
);

export default Page;
