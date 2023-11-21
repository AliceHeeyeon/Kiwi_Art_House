import axios from 'axios'
import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs";
import useCustomiser from '../hooks/useCustomiser';

const printsEndPoint = import.meta.env.VITE_WP_PRODUCTS_URL

const SinglePrints = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [print, setPrint] = useState(null)
    const [loading, setLoading] = useState(true)
    const {mainColor} = useCustomiser()

    const endPoint = `${printsEndPoint}/${id}`

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        axios.get(endPoint)
        .then((res) => {
            setPrint(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
        scrollToTop()
    },[endPoint])

    if (loading) {return (<div>Loading...</div>)}

    function priceWithNoDecimal(price) {
        return (price / 100).toFixed(0)
    }

  return (
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
            <button style={{ backgroundColor: mainColor }} className='main-color'>PURCHASE</button>
        </div>
    </div>
  )
}

export default SinglePrints
