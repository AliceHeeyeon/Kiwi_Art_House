import axios from 'axios'
import {useEffect, useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';


const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState(null)
    const [loading, setLoading] = useState(true)

    const testimonialsUrl = `${baseUrl}/testimonials`
    
    useEffect(() => {
        axios.get(testimonialsUrl)
        .then((res)=> {
            setTestimonials(res.data)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })
    },[])

    if(loading) {
        return (<div>...Loading</div>)
    }

    const Testimonials = ({testimonial}) => {
        const mappedTestimonials = testimonials.map((testimonial, index) => {
          return (
            <SwiperSlide key={testimonial.slug + "-" + index} className='testimonial'>
                <h4>"{testimonial.acf.comments}"</h4>
                <h5>{testimonial.title.rendered}</h5>
            </SwiperSlide>
          )
        })
    
        return (
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
               {mappedTestimonials}
          </Swiper>
        )
      }

  return (
    <div>
        <Testimonials testimonial={testimonials}/>
    </div>
  )
}

export default Testimonials
