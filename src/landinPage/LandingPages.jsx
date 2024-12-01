import React from 'react'
import Services from './Services';
import Footer from './Footer';
import Header from './Header';
import Banner from './Banner';
import About from './About';
import doctor from '../assets/doc2.jpg'
import doc1 from '../assets/doc1.jpg'
import doctor2 from '../assets/doctors2.jpg'
import doctor1 from '../assets/doctors1.jpg'
import lab from '../assets/lab1.jpg'
import nurse from '../assets/doc3.jpg'
import Department from './Department';
import Contact from './Contact';



function LandingPages() {
  return (
    <>
        <div className="home">
          {/* Header Start */}
          <Header/>

          {/* Banner Starts */}
          <Banner/>

         {/* services */}
         <Services/>

         {/* about */}
        <About img={doctor}
              img2={doctor2} 
              img3={lab} 
              img4={nurse} />
              {/* departments */}
              <Department img={doctor}
              img2={doctor2} 
              img3={doc1} 
              img4={doctor1}
              />
            {/* footer */}
            <Footer/>

        </div>
    </>
  )
}

export default LandingPages