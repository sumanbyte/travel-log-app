import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import BeforeDawn from "../assets/img/before_dawn.svg";

const Home = () => {
  return (
    < >

      <div className='img-banner container'>
        <div className="banner-content-wrapper max-width-boundary">

          <div className="banner-left-text margin-top-all">
            <h1 className='banner-text-heading '>Travelling Is Great <br />
              <span>WHAT IF ?</span>
              <br />
              <span className="autotype">You could&nbsp;
                <TypeAnimation
                  sequence={[
                    // Same substring at the start will only be typed out once, initially
                    'Share.',
                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                    'Enjoy.',
                    1000,
                    'Discuss.',
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  style={{ display: 'inline-block' }}
                  repeat={Infinity}
                />
              </span>
            </h1>
            <p>Travel Log is a App Built to make travelling much easier <br /> by Providing Bunch of features and discussing Capabilities</p>

              <Link
                type="button"
                className="btn btn-primary btn-responsive"
                to={'/login'}
              >
                Join Us
              </Link>
              <Link
                type="button"
                className="btn btn-outline-dark btn-responsive mx-2 mx-sm-1"
                to={"/about"}
              >
                Learn More
              </Link>
          </div>

          <div className="banner-right-image px-2 margin-top-all">
            <img src={BeforeDawn} alt="Nature" />
          </div>

        </div>


      </div>
    </>
  )
}

export default Home