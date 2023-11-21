import axios from 'axios'
import {useState, useEffect} from 'react'
import { IoMdArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from 'swiper/react';
import Testimonials from '../components/Testimonials';
import useCustomiser from '../hooks/useCustomiser';
import { useNavigate } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [exhibition, setExhibition] = useState(null)
  const [newArt, setNewArt] = useState(null)
  const [slidesPerView, setSlidesPerView] = useState(1);
  const navigate = useNavigate()

  const exhibitionEndPoint = `${baseUrl}/posts?_embed`
  const newArtEndPoint = `${baseUrl}/new_art?_embed`

  const {mainColor ,sectionBgColor} = useCustomiser()

  function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  }

  useEffect(() => {
   setLoading(true)

   // fetch Exhibition data
   const fetchExhibition = axios.get(exhibitionEndPoint)
   // fetch New Art data
   const fetchNewArt = axios.get(newArtEndPoint)

   axios.all([fetchExhibition, fetchNewArt])
    .then(axios.spread((...responses) => {
      const exhibitionResponse = responses[0]
      const newArtResponses = responses[1]

      setExhibition(exhibitionResponse.data)
      setNewArt(newArtResponses.data)
      setLoading(false)
      scrollToTop()
    }))
    .catch((err) => {
      console.log(err)
      setLoading(false)
    })

    // swiper slide change
    const handleResize = () => {
       if (window.innerWidth > 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
    
  },[])

  if (loading) {
    return <div>Loading...</div>
  }


  const NewArts = ({arts}) => {
    const mappedArts = arts.map((art, index) => {
      return (
        <SwiperSlide key={art.slug + "-" + index} className='arts'>
            <img src={art.acf.image.url} alt={art.slug}/>
            <h4>{art.title.rendered}</h4>
            <p>By {art.acf.artist_name}</p>
            <button className='view-btn'>
              VIEW
              <IoMdArrowForward/>
            </button>       
        </SwiperSlide>
      )
    })

    return (
      <Swiper 
      navigation={true} 
      modules={[Navigation]}
      slidesPerView={slidesPerView} 
      spaceBetween={30} 
      className="mySwiper"
      >
           {mappedArts}
      </Swiper>
    )
  }
  

  return (
    <div id='home'>
      <div className='hero'>
        <div className='hero-text-area'>
          <h5 className='title'>{exhibition[0].acf.exhibition_title}</h5>
          <h1 className='artist-name'>{exhibition[0].title.rendered}</h1>
          <p className='period'>{exhibition[0].acf.exhibition_period}</p>
        </div>
        
        <div className='hero-image-area'>
          <img src={exhibition[0].acf.image1.url} alt='hero-image'/>
        </div>

        <div id='view-exhibition' className="button-style">
          <button 
            style={{ backgroundColor: mainColor }} 
            onClick={() => navigate('/current-exhibition')}
            className='main-color'>
              VIEW EXHIBITION
          </button>
        </div>
       
      </div>

      <div className='new-art'>
        <p className='section-title'>NEW ART</p>
        <NewArts arts={newArt} />
      </div>

      <div className='featured'>
        <p className='section-title'>FEATURED</p>
        <div className='option-container'>
          <div className='section-option'>
            <div className='image-box'>
              <img src='/tatyana1.jpeg' alt='custom-made'/>
            </div>
            <h4>Custom Made Arts</h4>
            <button 
             onClick={() => navigate('/commissions')}
            className='view-btn'>
              VIEW AVAILABLE OPTION
              <IoMdArrowForward/>
            </button>       
          </div>

          <div className='section-option'>
            <div className='image-box'>
              <img src='/gift.png' alt='gift-voucher'/>
            </div>
            <h4>Gift Vouchers</h4>
            <button 
              onClick={() => navigate('/gifting')}
              className='view-btn'
            >
            LEARN MORE
              <IoMdArrowForward/>
            </button>       
          </div>

        </div>
      </div>

      <div style={{ backgroundColor: mainColor }} className='about main-color'>
        <div className='about-texts'>
          <p className='section-title'>ABOUT</p>
          <div className='about-description'>
          The Kiwi Art House Gallery owned and operated by Alan Aldridge. 
            <p>
            Our emphasis is on paintings from well known and developing Wellington artists, but we also represent some international artists resident in New Zealand and other artists from around the country. 
            </p>
          We hold about six or seven exhibitions each year. Come and enjoy a curated selection of artworks.
          </div>

          <button className='view-btn'>
            READ MORE
            <IoMdArrowForward/>
          </button>
        </div>

        <div className='about-image'>
          <img src='/kiwiarthouse.jpeg' alt='about-image'/> 
        </div>     
      </div>

      <div style={{ backgroundColor: sectionBgColor }} className='subscribe section-bg-color'>
        <div className='subscribe-text-area'>
          <p className='section-title'>SUBSCRIBE</p>
          <h4>Stay up to date on Kiwi Art House exhibitions, news, events and artists updates</h4>
        </div>
        <div className='signup-btn'>
          <button className='view-btn'>
              SIGN UP
              <IoMdArrowForward/>
          </button>
        </div>
      </div>

      <div className='testimonials'>
        <p className='section-title'>TESTIMONIALS</p>
          <Testimonials/>
      </div>
     
    </div> //end of home
  )
}

export default Home
