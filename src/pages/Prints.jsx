import {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const productsEndPoint = import.meta.env.VITE_WP_PRODUCTS_URL

const Prints = () => {
    const [loading, setLoading] = useState(true)
    const [prints, setPrints] = useState(null)

    function scrollToTop() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
    }

    useEffect(() => {
        axios.get(productsEndPoint)
        .then((res)=> {
            setPrints(res.data)
            setLoading(false)
            scrollToTop()
        })
        .catch((err)=> {
            console.log(err)
            setLoading(false)
        })
        
    },[])

    if (loading) {
        return (<div>Loading...</div>)
    }

    const PrintLists = ({prints}) => {
      const filteredAndMappedPrints = prints
      .filter(print => !print.categories.some(category => category.name === 'voucher'))
      .map((print, index) => (
        <div key={print.slug + "-" + index} className='prints-list'>
          <Link to={`/prints/${print.id}`}>
            <img src={print.images[0].src} alt={print.slug} />
            <h5>{print.name}</h5>
            <div className='print-artist'>
              <span>by </span>
              <p dangerouslySetInnerHTML={{ __html: print.short_description }} />
            </div>
            <h4></h4>
          </Link>
        </div>
      ));
  
    return (
      <div className='prints-grid-box'>
        {filteredAndMappedPrints}
      </div>
    );
    }

  return (
    <div id='prints-page' className='page-style'>
      <h2 className='page-title'>Prints</h2>
      <PrintLists prints={prints} />
    </div>
  )
}

export default Prints
