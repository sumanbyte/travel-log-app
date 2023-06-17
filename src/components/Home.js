import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div >

      <div className='img-banner'>
        <div className="banner-content-wrapper ">

          <div className="banner-left-text margin-top-all">
            <h1 className='banner-text-heading '>TRAVEL LOG</h1>
            <p>Travel Log is a App Built to make travelling much easier by Providing Bunch of features and discussing Capabilities</p>
            <Link type="button" className="btn btn-primary" to={'/login'}>Get Started</Link>
            <button type="button" className="btn btn-outline-dark mx-2">Learn More</button>
          </div>

          <div className="banner-right-image margin-top-all">
            <img src={require('../assets/img/flower.jpg')} alt="" />
          </div>

        </div>
  

      </div>
    </div>
  )
}

export default Home