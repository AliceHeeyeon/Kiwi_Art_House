import {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import { Helmet } from 'react-helmet'

const productsEndPoint = import.meta.env.VITE_WP_PRODUCTS_URL

const Prints = () => {
    const [loading, setLoading] = useState(true)
    const [prints, setPrints] = useState(null)

    useEffect(() => {
        axios.get(productsEndPoint)
        .then((res)=> {
            setPrints(res.data)
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
    <>
      <Helmet>
            <title>Kiwi Art House - Shop - Prints</title>
            {/* Primary Meta tags */}
            <meta name='title' content='Kiwi Art House - shop - Print page' />
            <meta name='description' content='Shop high quality giclee digital reproductions.' />
            <meta name='keywords' content='Kiwi Art House, Wellington artists, New Zealand art,paintings, sculptures, contemporary art, fine art, gallery, art for sale, online art gallery' />
            {/* Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Kiwi Art House - shop - Print page" />
            <meta property="og:url" content="https://kiwi-art-house.vercel.app/#/"></meta>
            <meta property="og:description" content="Shop high quality giclee digital reproductions." />
            <meta property="og:image" content="https://kiwi-art-house.vercel.app/logo-art.png" />
            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content="Kiwi Art House - shop - Print page" />
            <meta name="twitter:url" content="https://kiwi-art-house.vercel.app/#/"></meta>
            <meta property="twitter:description" content="Shop high quality giclee digital reproductions." />
            <meta property="twitter:image" content="https://kiwi-art-house.vercel.app/logo-art.png" />
      </Helmet>

      <div id='prints-page' className='page-style'>
        <h2 className='page-title'>Prints</h2>
        <PrintLists prints={prints} />
      </div>
    </>
  )
}

export default Prints
