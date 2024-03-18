import axios from 'axios'
import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs";
import Loading from './Loading';
import { Helmet } from 'react-helmet';

const printsEndPoint = import.meta.env.VITE_WP_PRODUCTS_URL

const SinglePrints = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [print, setPrint] = useState(null)
    const [loading, setLoading] = useState(true)

    const endPoint = `${printsEndPoint}/${id}`

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },[])

    useEffect(() => {
        axios.get(endPoint)
        .then((res) => {
            setPrint(res.data)
            const timeout = setTimeout(() => setLoading(false), 1000);
        })
        .catch((err) => console.log(err))
    },[endPoint])

    if (loading) {
        return (<Loading/>)
    }

    function priceWithNoDecimal(price) {
        return (price / 100).toFixed(0)
    }

  return (
    <>
        <Helmet>
            <title>Buy High-Quality Artwork Prints | Kiwi Art House</title>
            {/* Primary Meta tags */}
            <meta name='title' content='Buy High-Quality Artwork Prints | Kiwi Art House' />
            <meta name='description' content='Discover and purchase high-quality prints of exceptional artwork at Kiwi Art House. Explore our collection of unique, finely-crafted prints available for art lovers.' />
            <meta name='keywords' content='Kiwi Art House, Wellington artists, New Zealand art,paintings, sculptures, contemporary art, fine art, gallery, art for sale, online art gallery' />
            {/* Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Buy High-Quality Artwork Prints | Kiwi Art House" />
            <meta property="og:url" content="https://kiwi-art-house.vercel.app/#/"></meta>
            <meta property="og:description" content="Discover and purchase high-quality prints of exceptional artwork at Kiwi Art House. Explore our collection of unique, finely-crafted prints available for art lovers." />
            <meta property="og:image" content="https://kiwi-art-house.vercel.app/logo-art.png" />
            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content="Buy High-Quality Artwork Prints | Kiwi Art House" />
            <meta name="twitter:url" content="https://kiwi-art-house.vercel.app/#/"></meta>
            <meta property="twitter:description" content="Discover and purchase high-quality prints of exceptional artwork at Kiwi Art House. Explore our collection of unique, finely-crafted prints available for art lovers." />
            <meta property="twitter:image" content="https://kiwi-art-house.vercel.app/logo-art.png" />
        </Helmet>

        <div id='single-print-page' className='page-style'>
            <div className="button-container">
                <BsArrowLeft/>
                <button className='back-btn' onClick={() => navigate(-1)}>
                    BACK
                </button>
            </div>

            <h2 className='page-title'>{print.name}</h2>
            <div className='print-artist'>
                <span>by </span>
                <h3 dangerouslySetInnerHTML={{__html: print.short_description }} />
            </div>
            <img className='print-image' src={print.images[0].src} alt={print.slug} />
            <p className='print-description' dangerouslySetInnerHTML={{__html: print.description}}/>
            <h5 className="print-price">${priceWithNoDecimal(print.prices.price)}</h5>

            <div id='print-purchase-btn' className="button-style">
                <button className='main-color'>PURCHASE</button>
            </div>
        </div>
    </>
  )
}

export default SinglePrints
