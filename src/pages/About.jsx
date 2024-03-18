import axios from 'axios'
import {useEffect, useState} from 'react'
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { Helmet } from 'react-helmet';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const About = () => {
    const [about, setAbout] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const aboutUrl = `${baseUrl}/about?_embed`

    useEffect(() => {
        axios.get(aboutUrl)
        .then((res)=> {
            setAbout(res.data)
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
      
    },[])

    if (loading) {
      return (<Loading/>)
    }

    const AllStoreInfo = () => {
  
        return about[0].acf ? Object.keys(about[0].acf)
        .filter(key => key.startsWith('info-option') && !key.includes('-description'))
        .map((key, index) => (
          <div key={index} className='store-information'>
            <h4>{about[0].acf[key]}</h4>
            <p>{about[0].acf[`${key}-description`]}</p>
          </div>
        )) : null;
    }

    const aboutImage = about[0].acf['image-aboutpage'].url.replace('http://', 'https://https.');

  return (
    <>
      <Helmet>
          <title>Kiwi Art House - About</title>
          {/* Primary Meta tags */}
          <meta name='title' content='Kiwi Art House - About page' />
          <meta name='description' content={about[0].acf.about_description} />
          <meta name='keywords' content='Kiwi Art House, Wellington artists, New Zealand art,paintings, sculptures, contemporary art, fine art, gallery, art for sale, online art gallery' />
          {/* Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Kiwi Art House - About page" />
          <meta property="og:url" content="https://kiwi-art-house.vercel.app/#/"></meta>
          <meta property="og:description" content={about[0].acf.about_description} />
          <meta property="og:image" content="https://kiwi-art-house.vercel.app/logo-art.png" />
          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content="Kiwi Art House - About page" />
          <meta name="twitter:url" content="https://kiwi-art-house.vercel.app/#/"></meta>
          <meta property="twitter:description" content={about[0].acf.about_description} />
          <meta property="twitter:image" content="https://kiwi-art-house.vercel.app/logo-art.png" />
        </Helmet>

        <div id='about-page' className='page-style'>

            <div className="button-container">
                <BsArrowLeft/>
                <button className='back-btn' onClick={() => navigate(-1)}>
                BACK
                </button>
            </div>

            <div className='about-gallery'>
              <h2 className='page-title'>{about[0].title.rendered}</h2>
              <img className='gallery-image' src={aboutImage} alt={about[0].acf['image-aboutpage'].title} />
              <p className='about-description'>{about[0].acf.about_description}</p>
            </div>

            <h2 id='store-info-title' className='page-title'>{about[0].acf['second-title']}</h2>
            <AllStoreInfo />
        </div>
    </>
  )
}

export default About
