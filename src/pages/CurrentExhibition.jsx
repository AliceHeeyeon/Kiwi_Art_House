import axios from 'axios'
import {useState, useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Loading from '../components/Loading';
import { Helmet } from 'react-helmet';
import imageUrls from '../../image_urls.json'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const CurrentExhibition = () => {
    const [loading, setLoading] = useState(true)
    const [exhibition, setExhibition] = useState(null)

    const exhibitionEndPoint = `${baseUrl}/posts?_embed`

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
    },[])

    
    if (loading) {
        return (<Loading/>)
      }

    const DisplayAllImages = ({images}) => {
        const imageArray = Object.values(images);
        const mappedImages = imageArray.map((image, index) => {
            return (
                <SwiperSlide key={index}>
                    <img src={image} alt={`image ${index}`}/>
                    <p>{image.title}</p>
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
            className="mySwiper"
            >
               {mappedImages}
            </Swiper>
        )
    }

  return (
    <>
        <Helmet>
            <title>Kiwi Art House - Current Exhibition</title>
            {/* Primary Meta tags */}
            <meta name='title' content='Kiwi Art House - Current Exhibition page' />
            <meta name='description' content={exhibition[0].content.rendered} />
            <meta name='keywords' content='Kiwi Art House, Wellington artists, New Zealand art,paintings, sculptures, contemporary art, fine art, gallery, art for sale, online art gallery' />
            {/* Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Kiwi Art House - Current Exhibition page" />
            <meta property="og:url" content="https://kiwi-art-house.vercel.app/#/"></meta>
            <meta property="og:description" content={exhibition[0].content.rendered} />
            <meta property="og:image" content="https://kiwi-art-house.vercel.app/logo-art.png" />
            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content="Kiwi Art House - Current Exhibition page" />
            <meta name="twitter:url" content="https://kiwi-art-house.vercel.app/#/"></meta>
            <meta property="twitter:description" content={exhibition[0].content.rendered} />
            <meta property="twitter:image" content="https://kiwi-art-house.vercel.app/logo-art.png" />
        </Helmet>

        <div id='current-exhibition' className='page-style'>
            <h2 className='page-title'>Exhibitions</h2>
            <h4 className='page-subtitle'>CURRENT</h4>

            <div className='current-text-area'>
                <h5 className='title'>{exhibition[0].acf.exhibition_title}</h5>
                <h1 className='artist-name'>{exhibition[0].title.rendered}</h1>
                <p className='period'>{exhibition[0].acf.exhibition_period}</p>
                <div 
                    dangerouslySetInnerHTML={{__html: exhibition[0].content.rendered}}
                    className='description'
                />
                <div className='current-image-area'>
                    <DisplayAllImages images={imageUrls.find((item) => item.category === 'New exhibition').image} />
                </div>
            </div>
        </div>
    </>
  )
}

export default CurrentExhibition
