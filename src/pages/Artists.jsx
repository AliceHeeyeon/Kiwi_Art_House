import {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import { Helmet } from 'react-helmet'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const Artists = () => {
    const [loading, setLoading] = useState(true)
    const [artists, setArtists] = useState(null)

    const artistsEndPoint = `${baseUrl}/artists?_embed`

    useEffect(() => {
        axios.get(artistsEndPoint)
        .then((res)=> {
            setArtists(res.data)
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

    const ArtistLists = ({artists}) => {
        const mappedArtists = artists.map((artist, index) => {
          return (
            <div key={artist.slug + "-" + index} className='artists-list'>
              <Link to={`/artists/${artist.id}`}>
                <img src={artist.acf.artist_works1.url} alt={artist.slug}/>
                <h5>{artist.title.rendered}</h5>
              </Link>
            </div>
          )
        })
    
        return (
          <div className='artist-grid'>
               {mappedArtists}
            </div>
        )
    }

  return (
    <>
      <Helmet>
          <title>Kiwi Art House - Artists</title>
          {/* Primary Meta tags */}
          <meta name='title' content='Kiwi Art House - Artists page' />
          <meta name='description' content='Discover the talented artists and their incredible artworks featured at Kiwi Art House' />
          <meta name='keywords' content='Kiwi Art House, Wellington artists, New Zealand art,paintings, sculptures, contemporary art, fine art, gallery, art for sale, online art gallery' />
          {/* Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Kiwi Art House - Artists page" />
          <meta property="og:url" content="https://kiwi-art-house.vercel.app/#/"></meta>
          <meta property="og:description" content="Discover the talented artists and their incredible artworks featured at Kiwi Art House" />
          <meta property="og:image" content="https://kiwi-art-house.vercel.app/logo-art.png" />
          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content="Kiwi Art House - Artists page" />
          <meta name="twitter:url" content="https://kiwi-art-house.vercel.app/#/"></meta>
          <meta property="twitter:description" content="Discover the talented artists and their incredible artworks featured at Kiwi Art House" />
          <meta property="twitter:image" content="https://kiwi-art-house.vercel.app/logo-art.png" />
        </Helmet>

        <div id='artists-page' className='page-style'>
          <h2 className='page-title'>Artists</h2>
            <ArtistLists artists={artists} />
        </div>
    </>
  )
}

export default Artists
