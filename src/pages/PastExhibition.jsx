import axios from 'axios'
import {useState, useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Loading from '../components/Loading';
import { Helmet } from 'react-helmet';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const PastExhibition = () => {
    const [loading, setLoading] = useState(true)
    const [exhibition, setExhibition] = useState(null)
    const [slidesPerView, setSlidesPerView] = useState(1);

    const exhibitionEndPoint = `${baseUrl}/exhibitions?_embed`

    useEffect(() => {
        axios.get(exhibitionEndPoint)
        .then((res)=> {
            setExhibition(res.data)
            const timeout = setTimeout(() => setLoading(false), 1000);
        })
        .catch((err)=> {
            console.log(err)
            setLoading(false)
        })

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

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
      return (<Loading/>)
    }

    const PastExhibitions = ({exhibitions}) => {
        const mappedExhibitions = exhibition.map((exhibition, index) => {
          const imageUrl = exhibition.acf.exhibition_image.url.replace('http://', 'https://https.');
          return (
            <SwiperSlide key={exhibition.slug + "-" + index} className='past-exhibition'>
                <img src={imageUrl} alt={exhibition.slug}/>
                <h4>{exhibition.acf.exhibition_title}</h4>
                <h5>By {exhibition.acf.artist_name}</h5>
                <p>{exhibition.acf.exhibition_period}</p>
                <div className='past-exhibition-description'>{exhibition.acf.description}</div>
            </SwiperSlide>
          )
        })
    
        return (
            <Swiper
            pagination={{
            type: 'progressbar',
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            slidesPerView={slidesPerView} 
            spaceBetween={50} 
            className="mySwiper"
            >
               {mappedExhibitions}
            </Swiper>
        )
      }

  return (
    <>
      <Helmet>
            <title>Kiwi Art House - Past Exhibition</title>
            {/* Primary Meta tags */}
            <meta name='title' content='Kiwi Art House - Past Exhibition page' />
            <meta name='description' content='We hold about six or seven exhibitions each year. Find previous exhibition information here' />
            <meta name='keywords' content='Kiwi Art House, Wellington artists, New Zealand art,paintings, sculptures, contemporary art, fine art, gallery, art for sale, online art gallery' />
            {/* Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Kiwi Art House - Past Exhibition page" />
            <meta property="og:url" content="https://kiwi-art-house.vercel.app/#/"></meta>
            <meta property="og:description" content="We hold about six or seven exhibitions each year. Find previous exhibition information here" />
            <meta property="og:image" content="https://kiwi-art-house.vercel.app/logo-art.png" />
            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content="Kiwi Art House - Past Exhibition page" />
            <meta name="twitter:url" content="https://kiwi-art-house.vercel.app/#/"></meta>
            <meta property="twitter:description" content="We hold about six or seven exhibitions each year. Find previous exhibition information here" />
            <meta property="twitter:image" content="https://kiwi-art-house.vercel.app/logo-art.png" />
      </Helmet>

      <div id='past-exhibition' className='page-style'>
        <h2 className='page-title'>Exhibitions</h2>
        <h4 className='page-subtitle'>PAST</h4>
        <p className='page-description'>
          We hold about six or seven exhibitions each year. For supporters of the Gallery we send invitations to exhibition openings, other Gallery events and special offers.
        </p>

        <div className='past-exhibition-display'>
          <PastExhibitions exhibitions={exhibition} />
        </div>
      </div>
    </>
  )
}

export default PastExhibition
