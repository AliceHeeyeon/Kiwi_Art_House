import axios from 'axios'
import {useEffect, useState} from 'react'
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import useCustomiser from '../hooks/useCustomiser';

const productsEndPoint = import.meta.env.VITE_WP_PRODUCTS_URL

const Gifting = () => {
    const [loading, setLoading] = useState(true)
    const [vouchers, setVouchers] = useState(null)
    const [showOptions, setShowOptions] = useState(false)
    const [selectedValue, setSelectedValue] = useState(null)
    const navigate = useNavigate()
    const {mainColor} = useCustomiser()
    
    useEffect(() => {
        axios.get(productsEndPoint)
        .then((res)=> {
            setVouchers(res.data)
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
          style={{ backgroundColor: mainColor }}
          className='main-color'
        >
          PURCHASE
        </button>
      </div>
    </div>
  )
}

export default Gifting
