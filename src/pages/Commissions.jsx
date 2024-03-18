import axios from 'axios'
import {useEffect, useState} from 'react'
import { BsArrowLeft } from "react-icons/bs";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import Loading from '../components/Loading';
import { Helmet } from 'react-helmet';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const Commissions = () => {
  const [commissions, setCommissions] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isArtistsVisible, setIsArtistsVisible] = useState(false)
  const navigate = useNavigate()
  const [slidesPerView, setSlidesPerView] = useState(1);

  const commissionsUrl = `${baseUrl}/commissions?_embed`

  useEffect(() => {
    axios.get(commissionsUrl)
    .then((res)=> {
        setCommissions(res.data)
        const timeout = setTimeout(() => setLoading(false), 1000);
    })
    .catch((err) => {
        console.log(err)
        setLoading(false)
    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });

     // swiper slide change
     const handleResize = () => {
      if (window.innerWidth > 992) {
        setSlidesPerView(3);
      } else if (window.innerWidth > 768) {
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
  return (<Loading/>)
}

const ToggleArtistsLists = () => {
  setIsArtistsVisible(prevState => !prevState)
}

const AllAvailableArtists = () => {
  
  return commissions[0].acf ? Object.keys(commissions[0].acf)
  .filter(key => key.startsWith('artist') && !key.includes('_detail'))
  .map((key, index) => (
    <div key={index} className='available-artists'>
      <h4>{commissions[0].acf[key]}</h4>
      <p>{commissions[0].acf[`${key}_detail`]}</p>
    </div>
  )) : null;
}

const Option1Examples = () => {
  return ( 
    <Swiper 
      navigation={true} 
      modules={[Navigation]} 
      slidesPerView={slidesPerView} 
      spaceBetween={30} 
      className="mySwiper">
      {commissions[0].acf && Object.keys(commissions[0].acf)
        .filter(key => key.startsWith('option1_image'))
        .map((key, index) => (
          <SwiperSlide key={index} className='painting-option'>
            <img src={commissions[0].acf[key].url} alt={commissions[0].acf[key].title}/>
          </SwiperSlide>
        ))
      }
    </Swiper>
  )
}

const Option2Examples = () => {
  return ( 
    <Swiper 
      navigation={true} 
      modules={[Navigation]} 
      slidesPerView={slidesPerView} 
      spaceBetween={30} 
      className="mySwiper">
      {commissions[0].acf && Object.keys(commissions[0].acf)
        .filter(key => key.startsWith('option2_image'))
        .map((key, index) => (
          <SwiperSlide key={index} className='painting-option'>
            <img src={commissions[0].acf[key].url} alt={commissions[0].acf[key].title}/>
          </SwiperSlide>
        ))
      }
    </Swiper>
  )
}

  return (
    <>
      <Helmet>
            <title>Kiwi Art House - Commissions</title>
            {/* Primary Meta tags */}
            <meta name='title' content='Kiwi Art House - Commissions page' />
            <meta name='description' content={commissions[0].acf.option1_description} />
            <meta name='keywords' content='Kiwi Art House, Wellington artists, New Zealand art,paintings, sculptures, contemporary art, fine art, gallery, art for sale, online art gallery' />
            {/* Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Kiwi Art House - Commissions page" />
            <meta property="og:url" content="https://kiwi-art-house.vercel.app/#/"></meta>
            <meta property="og:description" content={commissions[0].acf.option1_description} />
            <meta property="og:image" content="https://kiwi-art-house.vercel.app/logo-art.png" />
            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content="Kiwi Art House - Commissions page" />
            <meta name="twitter:url" content="https://kiwi-art-house.vercel.app/#/"></meta>
            <meta property="twitter:description" content={commissions[0].acf.option1_description} />
            <meta property="twitter:image" content="https://kiwi-art-house.vercel.app/logo-art.png" />
          </Helmet>

          <div id='commissions-page' className='page-style'>

          <div className="button-container">
              <BsArrowLeft/>
              <button className='back-btn' onClick={() => navigate(-1)}>
              BACK
              </button>
          </div>

          <h2 className='page-title'>{commissions[0].title.rendered}</h2>
          <div className='commission-option'>
            <h3>{commissions[0].acf.custom_option1}</h3>
            <p>{commissions[0].acf.option1_description}</p>
          </div>

          <div className='button-container'>
            <button 
              onClick={ToggleArtistsLists}
              className='artists-toggle-btn'
            >
              <p>SEE AVAILABLE ARTISTS</p>
            </button>
            {isArtistsVisible ? <FiMinus /> : <FiPlus />} 
          </div>

          {isArtistsVisible ? 
            <div className='artists-list-container'>
              <AllAvailableArtists/>
            </div>
            : null}
          
          <Option1Examples/>
          
          <div className='commission-option'>
            <h3>{commissions[0].acf.custom_option2}</h3>
            <p>{commissions[0].acf.option2_description}</p>
          </div>

          <Option2Examples />

          <div id='commission-enquire-btn' className='button-style'>
            <button 
              className='main-color'
              onClick={() => navigate('/contact')}
            >
              ENQUIRE
            </button>
          </div>
          
        </div>
    </>
    
  )
}

export default Commissions
