
import axios from 'axios'
import {useEffect, useState} from 'react'
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import Loading from '../components/Loading';
import { Helmet } from 'react-helmet';

const productsEndPoint = import.meta.env.VITE_WP_PRODUCTS_URL

const Gifting = () => {
    const [loading, setLoading] = useState(true)
    const [vouchers, setVouchers] = useState(null)
    const [showOptions, setShowOptions] = useState(false)
    const [selectedValue, setSelectedValue] = useState(null)
    const navigate = useNavigate()
    
    useEffect(() => {
        axios.get(productsEndPoint)
        .then((res)=> {
            setVouchers(res.data)
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

    const FindVoucher = () => {
        return vouchers.find(voucher => voucher.categories.some(category => category.name === 'voucher'));  
    }
    const voucherData = FindVoucher()
    const priceOption = voucherData.attributes[0].terms

    const MappedPriceOption = ({onSelect}) => {
        return (
            <div className='price-lists'>
              {priceOption.map((option, index) => (
                <div key={index} onClick={() => onSelect(option)} className='list-option'>
                  ${option.name}
                </div>
              ))}
            </div>
        );
    }

    const handleSelect = (selectedOption) => {
        setSelectedValue("$" + selectedOption.name);
        setShowOptions(false);
    }

  return (
    <>
      <Helmet>
            <title>Kiwi Art House - Gifting</title>
            {/* Primary Meta tags */}
            <meta name='title' content='Kiwi Art House - Gifting page' />
            <meta name='description' content='Purchase a Kiwi Art House gift voucher on this page to share the joy of exquisite art with someone special' />
            <meta name='keywords' content='Kiwi Art House, Wellington artists, New Zealand art,paintings, sculptures, contemporary art, fine art, gallery, art for sale, online art gallery' />
            {/* Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Kiwi Art House - Gifting page" />
            <meta property="og:url" content="https://kiwi-art-house.vercel.app/#/"></meta>
            <meta property="og:description" content="Purchase a Kiwi Art House gift voucher on this page to share the joy of exquisite art with someone special" />
            <meta property="og:image" content="https://kiwi-art-house.vercel.app/logo-art.png" />
            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content="Kiwi Art House - Gifting page" />
            <meta name="twitter:url" content="https://kiwi-art-house.vercel.app/#/"></meta>
            <meta property="twitter:description" content="Purchase a Kiwi Art House gift voucher on this page to share the joy of exquisite art with someone special" />
            <meta property="twitter:image" content="https://kiwi-art-house.vercel.app/logo-art.png" />
      </Helmet>

      <div id='voucher-page' className='page-style'>

        <div className="button-container">
            <BsArrowLeft/>
            <button className='back-btn' onClick={() => navigate(-1)}>
            BACK
            </button>
        </div>

        <div className='page-contents'>

            <h2 className='page-title'>Kiwi Art House</h2>
            <h3 className='page-subtitle'>Gift Voucher</h3>
            <img className='voucher-image' src={voucherData.images[0].src} alt={voucherData.categories[0].name} />
        
          <div className='select-box'>
            <p className='select-label'>VALUE</p>
            <div onClick={() => setShowOptions(!showOptions)} className='select-value'>
                {selectedValue ? selectedValue : 'Select a value'}<IoIosArrowDown />
            </div>
            <div className='option-container'>
                {showOptions && <MappedPriceOption onSelect={handleSelect} />}
            </div>     
          </div>

        </div>
        
        <div id='voucher-purchase-btn' className='button-style'>
          <button 
            className='main-color'
          >
            PURCHASE
          </button>
        </div>
      </div>
    </>
  )
}

export default Gifting
