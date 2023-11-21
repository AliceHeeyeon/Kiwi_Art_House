import axios from 'axios'
import {useEffect, useState} from 'react'
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

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

  return (
    <div id='about-page' className='page-style'>

        <div className="button-container">
            <BsArrowLeft/>
            <button className='back-btn' onClick={() => navigate(-1)}>
            BACK
            </button>
        </div>

        <div className='about-gallery'>
          <h2 className='page-title'>{about[0].title.rendered}</h2>
          <img className='gallery-image' src={about[0].acf['image-aboutpage'].url} alt={about[0].acf['image-aboutpage'].title} />
          <p className='about-description'>{about[0].acf.about_description}</p>
        </div>

        <h2 id='store-info-title' className='page-title'>{about[0].acf['second-title']}</h2>
        <AllStoreInfo />
    </div>
  )
}

export default About
