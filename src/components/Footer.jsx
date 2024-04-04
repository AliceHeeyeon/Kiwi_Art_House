import { IoMdArrowForward } from "react-icons/io";

const Footer = () => {

  function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  }

  return (
    <footer className="main-color">
      <div  
        id="subscribe" className='footer-subscribe'
      >
        <h4>Subscribe to our newsletter</h4>
      
        <div className='input-container'>
          <input placeholder="Email"/>
          <IoMdArrowForward/>
        </div>
      </div>

      <div className="footer-info-section">
        <div className="info-box">
          <h5 className="info-title">GALLERY HOURS</h5>
          <ul>
            <li>Mon : CLOSED</li>
            <li>Tue-Fri : 10.30am - 5.30pm  </li>
            <li>Sat : 10.30am - 5.00pm</li>
            <li>Sun : 10.30am - 4.00pm</li>
          </ul>
        </div>

        <div className="info-box">
          <h5 className="info-title">CONTACT</h5>
          <ul>
            <li>04 385 3083</li>
            <li>021 167 4550</li>
            <li>info@kiwiarthouse.co.nz</li>
          </ul>
        </div>

        <div className="info-box">
          <h5 className="info-title">ADDRESS</h5>
          <ul>
            <li>225 Cuba St,</li>
            <li>Te Aro, Wellington</li>
            <li>6011, New Zealand</li>
          </ul>
        </div>

        <div className="info-box">
          <h5 className="info-title">INFO</h5>
          <ul>
            <li>Purchases</li>
            <li>Shipping</li>
            <li>Refunds</li>
            <li>Swap Certificate</li>
          </ul>
        </div>

        <div className="social">FACEBOOK</div>
      </div>
      <button 
        onClick={() => scrollToTop()}
        className="back-to-top"
      >
        BACK TO TOP
      </button>
        
      <p className="copyright">© 2023  Kiwi Art House</p>
      
    </footer>
  )
}

export default Footer