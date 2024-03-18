import { useEffect, useState } from "react"
import { useArtworkContext } from "../context/ArtworkContext"
import { useNavigate } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs";
import Enquire from "./Enquire";
import Loading from "./Loading";
import { Helmet } from "react-helmet";

const SingleArtwork = () => {
    const {currentArtwork, setCurrentArtwork} = useArtworkContext()
    const [isEnquireForm, setIsEnquireForm] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    },[])

    const toggleEnquireForm = () => {
      setIsEnquireForm(!isEnquireForm)
    }

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
    },[isEnquireForm])

    if (!currentArtwork) {
      return (<Loading/>)
    }

  return (
    <>
      <Helmet>
            <title>Kiwi Art House - Individual Artwork</title>
            {/* Primary Meta tags */}
            <meta name='title' content='Kiwi Art House - Individual Artwork page' />
            <meta name='description' content='Explore this exquisite artwork, complete with size, pricing details, and artist information, available now at Kiwi Art House.' />
            <meta name='keywords' content='Kiwi Art House, Wellington artists, New Zealand art,paintings, sculptures, contemporary art, fine art, gallery, art for sale, online art gallery' />
            {/* Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Kiwi Art House - Individual Artwork page" />
            <meta property="og:url" content="https://kiwi-art-house.vercel.app/#/"></meta>
            <meta property="og:description" content="Explore this exquisite artwork, complete with size, pricing details, and artist information, available now at Kiwi Art House." />
            <meta property="og:image" content="https://kiwi-art-house.vercel.app/logo-art.png" />
            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content="Kiwi Art House - Individual Artwork page" />
            <meta name="twitter:url" content="https://kiwi-art-house.vercel.app/#/"></meta>
            <meta property="twitter:description" content="Explore this exquisite artwork, complete with size, pricing details, and artist information, available now at Kiwi Art House." />
            <meta property="twitter:image" content="https://kiwi-art-house.vercel.app/logo-art.png" />
      </Helmet>

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
          className="main-color"
          onClick={() => handleEnquireForm()}>ENQUIRE</button>
        </div>

        {isEnquireForm && <Enquire closeMethod={toggleEnquireForm} />}
        
      </div>
    </>
  )
}

export default SingleArtwork

