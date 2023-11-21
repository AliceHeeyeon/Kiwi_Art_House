import { useEffect, useState } from "react"
import { useArtworkContext } from "../context/ArtworkContext"
import { useNavigate } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs";
import Enquire from "./Enquire";
import useCustomiser from "../hooks/useCustomiser";

const SingleArtwork = () => {
    const {currentArtwork, setCurrentArtwork} = useArtworkContext()
    const [isEnquireForm, setIsEnquireForm] = useState(false)
    const navigate = useNavigate()
    const {mainColor} = useCustomiser()

    const toggleEnquireForm = () => {
      setIsEnquireForm(!isEnquireForm)
    }
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    const handleEnquireForm = () => {
        setIsEnquireForm(true)
    }

    useEffect(() => {
        const storedArtwork = localStorage.getItem('currentArtwork');
        if (storedArtwork) {
        setCurrentArtwork(JSON.parse(storedArtwork));
        }
        if (isEnquireForm) {
          document.body.classList.add('no-scroll');
      } else {
          document.body.classList.remove('no-scroll');
      }
        scrollToTop();
    },[isEnquireForm])

    if (!currentArtwork) {
        return <div>Loading artwork...</div>;
    }

  return (
    <div id='artwork-page' className='page-style'>
        <div className="button-container">
            <BsArrowLeft/>
            <button className='back-btn'    onClick={() => navigate(-1)}>
                BACK
            </button>
        </div>

      <h2 className='page-title'>{currentArtwork.title}</h2>
      <img className="artwork-image" src={currentArtwork.url} alt={currentArtwork.title} />
      <p className="artwork-description">{currentArtwork.description}</p>
      <h5 className="artwork-price">{currentArtwork.caption}</h5>

      <div id="artwork-enquire-btn" className="button-style">
        <button 
        style={{ backgroundColor: mainColor }}
        className="main-color"
        onClick={() => handleEnquireForm()}>ENQUIRE</button>
      </div>

      {isEnquireForm && <Enquire closeMethod={toggleEnquireForm} />}
      
    </div>
  )
}

export default SingleArtwork

