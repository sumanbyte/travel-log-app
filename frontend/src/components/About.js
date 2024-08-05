import React from 'react'
import Connect from "../assets/img/connect.svg";
import Discuss from "../assets/img/discuss.svg";
import Share from "../assets/img/share.svg";
import Enjoy from "../assets/img/enjoy.svg";

const About = () => {
  return (
    <div className='mt-5 container'>
      <div className="container-fluid px-0">
            <h1 className="display-5 fw-bold font-owsald">Travel Log Application</h1>
            <p className="fs-6">Using a series of features. You can discuss about different travelling destinations and your preferences. Let's go.</p>
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between align-items-center my-5'>
          <img src={Connect} alt="Connecting persons" width={300} height={300} />
          <div className='col-md-5'>
            <h1 className='font-owsald'>Connect...</h1>
            <p>Finding fellow travelers who share your passion and destination preferences. Let's connect and explore together.</p>
          </div>
        </div>

        <div className='d-flex justify-content-between align-items-center my-5'>
          <div className='col-md-5'>
            <h1 className='font-owsald'>Discuss...</h1>
            <p>Join the conversation about your favorite travel spots and share your experiences with others who have been there.</p>
          </div>
          <img src={Discuss} alt="Discussing Person" width={300} height={300} />

        </div>

        <div className='d-flex justify-content-between align-items-center my-5'>
          <img src={Share} alt="Sharing Person" width={300} height={300} />
          <div className='col-md-5'>
            <h1 className='font-owsald'>Share...</h1>
            <p>Post your travel logs and tips about various destinations. Engage with others and share your journey.</p>
          </div>
        </div>

        <div className='d-flex justify-content-between align-items-center my-5'>
          <div className='col-md-5'>
            <h1 className='font-owsald'>Enjoy...</h1>
            <p>Experience the joy of discovering new places through the eyes of fellow travelers. Share, explore, and enjoy your adventures.</p>
          </div>
          <img src={Enjoy} alt="Enjoying Person" width={300} height={300} />

        </div>
      </div>
    </div>
  )
}

export default About