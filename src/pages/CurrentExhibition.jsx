import axios from 'axios'
import {useState, useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

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
            setLoading(false)
        })
        .catch((err)=> {
            console.log(err)
            setLoading(false)
        })
    },[])

    if (loading) {
        return (<div>Loading...</div>)
    }

    const DisplayAllImages = ({exhibition}) => {
        const images = []
        for (const key in exhibition[0].acf) {
            if (exhibition[0].acf.hasOwnProperty(key) && key.startsWith("image")) {
                images.push(exhibition[0].acf[key])
            }   
        }

        const mappedImages = images.map((image, index) => {
            return (
                <SwiperSlide key={index}>
                    <img src={image.url} alt={image.title}/>
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
    <div id='current-exhibition' className='page-style'>
      <h2 className='page-title'>Exhibitions</h2>
      <h4 className='page-subtitle'>CURRENT</h4>

      <div className='current-text-area'>
          <h5 className='title'>{exhibition[0].acf.exhibition_title}</h5>
          <h1 className='artist-name'>{exhibition[0].title.rendered}</h1>
          <p className='period'>{exhibition[0].acf.exhibition_period}</p>
          <div className='description'>
          The first exhibition for The Kiwi Art House Gallery at it's new location, 225 Cuba St, is for Kapiti Coast artist Ronda Thompson. Ronda's rendering of intricate detail using textured oil with a palette knife combined with her paintings' tendency towards the drama of evening or morning light has made her work identifiable and unique. This new collection covers her traditional Wellington city and shore themes along with South Island beauty spots special to the artist.
          </div>
        </div>
        
        <div className='current-image-area'>
            <DisplayAllImages exhibition={exhibition} />
        </div>
    </div>
  )
}

export default CurrentExhibition
