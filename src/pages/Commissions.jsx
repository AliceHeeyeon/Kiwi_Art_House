import axios from 'axios'
import {useEffect, useState} from 'react'
import { BsArrowLeft } from "react-icons/bs";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import useCustomiser from '../hooks/useCustomiser';

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
  const {mainColor} = useCustomiser()
  const [slidesPerView, setSlidesPerView] = useState(1);

  const commissionsUrl = `${baseUrl}/commissions?_embed`

  useEffect(() => {
    axios.get(commissionsUrl)
    .then((res)=> {
        setCommissions(res.data)
        setLoading(false)
    })
    .catch((err) => {
        console.log(err)
        setLoading(false)
    })

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

if(loading) {
    return (<div>...Loading</div>)
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
          style={{ backgroundColor: mainColor }}
          className='main-color'
          onClick={() => navigate('/contact')}
        >
          ENQUIRE
        </button>
      </div>
      
    </div>
    
  )
}

export default Commissions
